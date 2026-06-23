// ============================================================
// AI Resume Analyzer — Core Analysis Engine
// ============================================================

const keywords = {
  languages: ["java", "python", "c", "c++", "javascript", "typescript"],
  frontend: ["react", "html", "css", "tailwind", "bootstrap"],
  backend: ["node", "express", "spring", "rest api"],
  databases: ["mysql", "postgresql", "mongodb"],
  tools: ["git", "github", "docker", "aws"],
};

const resumeSections = [
  "education",
  "skills",
  "projects",
  "experience",
  "certifications",
  "achievements",
];

// ── Normalize raw PDF text ──────────────────────────────────
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[\r\n]+/g, " ")
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ── Match skills against the keyword dataset ────────────────
function matchSkills(normalizedText) {
  const matched = [];
  const missing = [];

  for (const [category, skills] of Object.entries(keywords)) {
    for (const skill of skills) {
      const pattern = skill.replace(/[+]/g, "\\+");
      const regex = new RegExp(`\\b${pattern}\\b`, "i");
      if (regex.test(normalizedText)) {
        matched.push({ skill, category });
      } else {
        missing.push({ skill, category });
      }
    }
  }

  return { matched, missing };
}

// ── Detect resume sections ──────────────────────────────────
function detectSections(normalizedText) {
  const results = {};

  const sectionPatterns = {
    education: /\b(education|academic|qualification|university|college|degree|bachelor|master|b\.?tech|m\.?tech|b\.?e|m\.?e|b\.?sc|m\.?sc|b\.?ca|m\.?ca)\b/i,
    skills: /\b(skills|technical skills|technologies|proficiencies|competencies|tech stack)\b/i,
    projects: /\b(projects|project work|personal projects|academic projects|side projects)\b/i,
    experience: /\b(experience|work experience|professional experience|internship|employment|work history)\b/i,
    certifications: /\b(certifications|certification|certified|certificate|credentials)\b/i,
    achievements: /\b(achievements|accomplishments|awards|honors|recognition|hackathon)\b/i,
  };

  for (const section of resumeSections) {
    results[section] = sectionPatterns[section].test(normalizedText);
  }

  return results;
}

// ── Calculate ATS score ─────────────────────────────────────
function calculateScore(matched, missing, sections, normalizedText) {
  // ── 1. Skill Coverage Score (60%) ──
  const totalSkills = matched.length + missing.length;
  const skillCoverage = totalSkills > 0 ? (matched.length / totalSkills) * 100 : 0;
  const skillScore = skillCoverage * 0.6;

  // ── 2. Section Completeness (20%) ──
  const totalSections = resumeSections.length;
  const foundSections = Object.values(sections).filter(Boolean).length;
  const sectionScore = (foundSections / totalSections) * 100 * 0.2;

  // ── 3. Resume Quality (20%) ──
  let qualityPoints = 0;
  const wordCount = normalizedText.split(/\s+/).length;

  // Word count quality
  if (wordCount >= 150) qualityPoints += 20;
  else if (wordCount >= 100) qualityPoints += 15;
  else if (wordCount >= 50) qualityPoints += 10;
  else qualityPoints += 5;

  // Contact info signals
  if (/\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/.test(normalizedText)) qualityPoints += 15;
  if (/\b(linkedin|github|portfolio|website)\b/.test(normalizedText)) qualityPoints += 15;
  if (/\b\d{10}\b/.test(normalizedText.replace(/\s/g, ""))) qualityPoints += 10;

  // Category diversity bonus
  const categoriesMatched = new Set(matched.map((m) => m.category));
  qualityPoints += Math.min(categoriesMatched.size * 8, 40);

  const qualityScore = Math.min(qualityPoints, 100) * 0.2;

  // ── Final Score ──
  const finalScore = Math.round(Math.min(skillScore + sectionScore + qualityScore, 100));

  return { finalScore, skillCoverage, sectionScore, qualityScore };
}

// ── Generate strengths ──────────────────────────────────────
function generateStrengths(matched, sections) {
  const strengths = [];
  const categories = new Set(matched.map((m) => m.category));

  if (matched.length >= 8) {
    strengths.push("Excellent breadth of technical skills across multiple domains.");
  } else if (matched.length >= 5) {
    strengths.push("Good range of technical skills listed on the resume.");
  } else if (matched.length >= 3) {
    strengths.push("Multiple relevant technical skills identified.");
  }

  if (categories.has("languages") && matched.filter((m) => m.category === "languages").length >= 2) {
    strengths.push("Proficiency in multiple programming languages demonstrates versatility.");
  }

  if (categories.has("frontend") && categories.has("backend")) {
    strengths.push("Full-stack capabilities with both frontend and backend technologies.");
  }

  if (sections.projects) {
    strengths.push("Projects section is present — showcases hands-on experience.");
  }

  if (sections.experience) {
    strengths.push("Work experience section is included — adds professional credibility.");
  }

  if (sections.certifications) {
    strengths.push("Certifications present — indicates commitment to continuous learning.");
  }

  if (sections.achievements) {
    strengths.push("Achievements section highlights standout accomplishments.");
  }

  if (sections.education) {
    strengths.push("Education section is well-documented.");
  }

  if (categories.has("tools")) {
    strengths.push("DevOps and tooling skills add operational maturity to the profile.");
  }

  if (categories.has("databases")) {
    strengths.push("Database knowledge shows data management competence.");
  }

  if (categories.size >= 4) {
    strengths.push("Outstanding technology coverage spanning multiple domains.");
  }

  if (strengths.length === 0) {
    strengths.push("Resume uploaded successfully — room for significant improvement.");
  }

  return strengths;
}

// ── Generate weaknesses ─────────────────────────────────────
function generateWeaknesses(missing, sections) {
  const weaknesses = [];
  const missingCategories = {};

  for (const { skill, category } of missing) {
    if (!missingCategories[category]) missingCategories[category] = [];
    missingCategories[category].push(skill);
  }

  if (!sections.projects) {
    weaknesses.push("No projects section detected — projects demonstrate practical ability.");
  }

  if (!sections.experience) {
    weaknesses.push("Missing experience section — employers look for professional history.");
  }

  if (!sections.certifications) {
    weaknesses.push("No certifications found — certifications can boost credibility.");
  }

  if (!sections.achievements) {
    weaknesses.push("Achievements section is absent — quantified accomplishments stand out.");
  }

  if (missingCategories.languages && missingCategories.languages.length >= 3) {
    weaknesses.push("Limited programming language coverage — consider broadening your repertoire.");
  }

  if (missingCategories.tools && missingCategories.tools.length >= 3) {
    weaknesses.push("Minimal DevOps / tooling mentioned — modern roles expect Git, Docker, or AWS.");
  }

  if (missingCategories.frontend && missingCategories.frontend.length >= 3) {
    weaknesses.push("Frontend technology stack is thin — consider adding React, Tailwind, etc.");
  }

  if (missingCategories.backend && missingCategories.backend.length >= 3) {
    weaknesses.push("Backend technologies underrepresented — Node, Express, or Spring are in demand.");
  }

  if (missingCategories.databases && missingCategories.databases.length >= 2) {
    weaknesses.push("Database skills not clearly listed — add MySQL, PostgreSQL, or MongoDB.");
  }

  if (missing.length > 15) {
    weaknesses.push("Significant ATS keyword gaps detected — many in-demand skills are missing.");
  }

  if (weaknesses.length === 0) {
    weaknesses.push("No major weaknesses detected — keep refining for a competitive edge.");
  }

  return weaknesses;
}

// ── Generate suggestions ────────────────────────────────────
function generateSuggestions(matched, missing, sections) {
  const suggestions = [];
  const missingSet = new Set(missing.map((m) => m.skill));
  const matchedSet = new Set(matched.map((m) => m.skill));

  // Section-based suggestions
  if (!sections.projects) {
    suggestions.push({
      title: "Add a Projects Section",
      description: "Include 2–3 projects with clear descriptions, tech stacks used, and quantified outcomes (e.g., 'reduced load time by 40%').",
      priority: "high",
    });
  } else {
    suggestions.push({
      title: "Enhance Project Descriptions",
      description: "Add measurable impact to each project — numbers, percentages, and user counts make a big difference.",
      priority: "medium",
    });
  }

  if (!sections.achievements) {
    suggestions.push({
      title: "Add an Achievements Section",
      description: "List hackathon wins, scholarships, academic awards, or notable recognitions.",
      priority: "high",
    });
  }

  if (!sections.certifications) {
    suggestions.push({
      title: "Earn and List Certifications",
      description: "Add certifications like AWS Certified Cloud Practitioner, Google Data Analytics, or relevant Coursera/Udemy credentials.",
      priority: "high",
    });
  }

  // Skill-based suggestions
  if (missingSet.has("docker")) {
    suggestions.push({
      title: "Mention Docker Experience",
      description: "Containerization is increasingly expected. Even basic Docker knowledge (Dockerfile, docker-compose) is a plus.",
      priority: "medium",
    });
  }

  if (missingSet.has("aws")) {
    suggestions.push({
      title: "Include Cloud Technologies",
      description: "Cloud platforms like AWS, GCP, or Azure are highly valued. Mention any deployment or cloud service usage.",
      priority: "medium",
    });
  }

  if (missingSet.has("git") && missingSet.has("github")) {
    suggestions.push({
      title: "Add Version Control Skills",
      description: "Git and GitHub are essential. Add them to your skills and include GitHub profile links.",
      priority: "high",
    });
  } else if (missingSet.has("github")) {
    suggestions.push({
      title: "Add Your GitHub Profile Link",
      description: "Include a link to your GitHub profile so recruiters can review your code and contributions.",
      priority: "medium",
    });
  }

  if (missingSet.has("typescript") && matchedSet.has("javascript")) {
    suggestions.push({
      title: "Learn TypeScript",
      description: "Since you know JavaScript, learning TypeScript is a natural next step and is in high demand.",
      priority: "medium",
    });
  }

  if (missingSet.has("react") && missingSet.has("tailwind")) {
    suggestions.push({
      title: "Strengthen Frontend Skills",
      description: "Add React and Tailwind CSS to your toolkit — they are among the most sought-after frontend technologies.",
      priority: "medium",
    });
  }

  if (missingSet.has("mongodb") && missingSet.has("postgresql")) {
    suggestions.push({
      title: "Expand Database Knowledge",
      description: "Learn at least one NoSQL (MongoDB) and one relational (PostgreSQL) database to round out your data skills.",
      priority: "medium",
    });
  }

  if (!sections.experience) {
    suggestions.push({
      title: "Add an Experience / Internship Section",
      description: "Even short internships or freelance work counts. Describe your responsibilities and impact using action verbs.",
      priority: "high",
    });
  }

  // General quality suggestions
  suggestions.push({
    title: "Use Action Verbs",
    description: "Start bullet points with strong verbs: Developed, Implemented, Designed, Optimized, Led, Deployed.",
    priority: "low",
  });

  suggestions.push({
    title: "Keep It Concise",
    description: "Aim for a 1-page resume for early-career roles. Remove filler and focus on impact.",
    priority: "low",
  });

  return suggestions;
}

// ── Main analysis function ──────────────────────────────────
function analyzeResume(rawText) {
  const normalizedText = normalizeText(rawText);

  const { matched, missing } = matchSkills(normalizedText);
  const sections = detectSections(normalizedText);
  const { finalScore } = calculateScore(matched, missing, sections, normalizedText);

  const strengths = generateStrengths(matched, sections);
  const weaknesses = generateWeaknesses(missing, sections);
  const suggestions = generateSuggestions(matched, missing, sections);

  return {
    score: finalScore,
    matchedSkills: matched.map((m) => ({ skill: m.skill, category: m.category })),
    missingSkills: missing.map((m) => ({ skill: m.skill, category: m.category })),
    strengths,
    weaknesses,
    suggestions,
    sections,
  };
}

module.exports = { analyzeResume };
