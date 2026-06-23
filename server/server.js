// ============================================================
// AI Resume Analyzer — Express Server
// ============================================================

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeResume } = require("./analyzer");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Ensure uploads directory exists ─────────────────────────
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Multer configuration ────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ── POST /api/analyze ───────────────────────────────────────
app.post("/api/analyze", (req, res) => {
  upload.single("resume")(req, res, async (err) => {
    // Handle multer errors
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          error: "File size exceeds the 5 MB limit.",
        });
      }
      return res.status(400).json({ success: false, error: err.message });
    }

    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded. Please select a PDF resume.",
      });
    }

    const filePath = req.file.path;

    try {
      // Read and parse the PDF
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);

      if (!pdfData.text || pdfData.text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "The uploaded PDF appears to be empty or unreadable.",
        });
      }

      // Run analysis
      const analysis = analyzeResume(pdfData.text);

      return res.status(200).json({
        success: true,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        pages: pdfData.numpages,
        ...analysis,
      });
    } catch (parseError) {
      console.error("PDF parse error:", parseError);
      return res.status(500).json({
        success: false,
        error: "Failed to parse the PDF. Make sure it is a valid PDF file.",
      });
    } finally {
      // Clean up the uploaded file
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete temp file:", unlinkErr);
      });
    }
  });
});

// ── Health check ────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Global error handler ────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error." });
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 AI Resume Analyzer server running on http://localhost:${PORT}\n`);
});
