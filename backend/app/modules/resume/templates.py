
TEMPLATES = {
    "software_engineer": {
        "name": "Software Engineer",
        "icon": "💻",
        "sections": ["Summary", "Skills", "Experience", "Projects", "Education", "Certifications"],
        "keywords": ["python", "java", "developer", "engineer", "software", "backend", "frontend", "fullstack", "api", "react", "node"],
        "color": "#3b82f6"
    },
    "data_analyst": {
        "name": "Data Analyst",
        "icon": "📊",
        "sections": ["Summary", "Skills", "Experience", "Projects", "Education", "Certifications"],
        "keywords": ["data", "analyst", "sql", "excel", "power bi", "tableau", "analytics", "visualization", "pandas", "numpy"],
        "color": "#8b5cf6"
    },
    "ai_ml_engineer": {
        "name": "AI/ML Engineer",
        "icon": "🤖",
        "sections": ["Summary", "Skills", "Experience", "Research", "Projects", "Education"],
        "keywords": ["machine learning", "deep learning", "ai", "neural", "tensorflow", "pytorch", "nlp", "computer vision", "llm"],
        "color": "#22c55e"
    },
    "full_stack": {
        "name": "Full Stack Developer",
        "icon": "🌐",
        "sections": ["Summary", "Tech Stack", "Experience", "Projects", "Education"],
        "keywords": ["fullstack", "full stack", "mern", "django", "react", "node", "mongodb", "postgresql", "api", "rest"],
        "color": "#f59e0b"
    },
    "fresher": {
        "name": "Fresher / Campus",
        "icon": "🎓",
        "sections": ["Objective", "Education", "Skills", "Projects", "Internships", "Achievements", "Certifications"],
        "keywords": ["fresher", "student", "graduate", "campus", "intern", "btech", "mca", "bca", "college"],
        "color": "#ec4899"
    },
    "business_analyst": {
        "name": "Business Analyst",
        "icon": "💼",
        "sections": ["Summary", "Skills", "Experience", "Projects", "Education", "Certifications"],
        "keywords": ["business analyst", "requirement", "stakeholder", "agile", "scrum", "jira", "process", "workflow", "ba"],
        "color": "#14b8a6"
    },
    "devops": {
        "name": "DevOps Engineer",
        "icon": "⚙️",
        "sections": ["Summary", "Skills", "Experience", "Infrastructure", "Projects", "Education"],
        "keywords": ["devops", "docker", "kubernetes", "aws", "azure", "gcp", "ci/cd", "jenkins", "terraform", "linux"],
        "color": "#f97316"
    },
    "ui_ux": {
        "name": "UI/UX Designer",
        "icon": "🎨",
        "sections": ["Summary", "Skills", "Experience", "Portfolio", "Projects", "Education"],
        "keywords": ["ui", "ux", "design", "figma", "sketch", "prototype", "wireframe", "user experience", "adobe"],
        "color": "#a855f7"
    },
}

def detect_role(resume_text: str) -> str:
    text = resume_text.lower()
    scores = {}
    for role, data in TEMPLATES.items():
        score = sum(1 for kw in data["keywords"] if kw in text)
        scores[role] = score
    return max(scores, key=scores.get, default="fresher")

def get_template(role: str) -> dict:
    return TEMPLATES.get(role, TEMPLATES["fresher"])
