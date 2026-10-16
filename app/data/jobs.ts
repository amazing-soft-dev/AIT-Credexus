import type { RegionSlug } from "./regions";

/**
 * Job listings.
 *
 * ⚠️  The entries below are EXAMPLE listings (sample: true) that show the layout.
 * Replace them with real openings before launch. Sample jobs:
 *   - show an "Example role" badge on the site
 *   - are excluded from JobPosting structured data (Google penalises fake postings)
 *   - are excluded from the sitemap
 */
export type Job = {
  id: string;
  title: string;
  summary: string;
  regions: RegionSlug[];
  type: "Contract" | "Part-time contract" | "Full-time contract";
  /** Human-readable pay, e.g. "USD 40–70 / hour". Leave undefined to hide. */
  pay?: string;
  payRange?: { min: number; max: number; currency: "USD"; unit: "HOUR" };
  stack: string[];
  seniority: "Mid" | "Senior" | "Staff+";
  hoursPerWeek: string;
  posted: string; // ISO date
  validThrough?: string; // ISO date
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  sample?: boolean;
};

const all: RegionSlug[] = ["latam", "asia", "europe", "canada"];

export const jobs: Job[] = [
  {
    id: "python-ai-code-evaluator",
    title: "Python Engineer — AI Code Evaluation",
    summary:
      "Review, debug and rank code written by large language models, and write reference solutions that teach models to code better.",
    regions: all,
    type: "Part-time contract",
    pay: "USD 30–60 / hour",
    payRange: { min: 30, max: 60, currency: "USD", unit: "HOUR" },
    stack: ["Python", "pytest", "Algorithms"],
    seniority: "Mid",
    hoursPerWeek: "10–40 hrs/week, flexible",
    posted: "2026-10-01",
    responsibilities: [
      "Evaluate model-generated Python for correctness, efficiency and style",
      "Write clear rationales explaining why one response is better than another",
      "Author test cases and gold-standard solutions for tricky prompts",
    ],
    requirements: [
      "3+ years of professional Python experience",
      "Strong grasp of data structures, algorithms and testing",
      "Written English at C1 level or above",
    ],
    niceToHave: ["Competitive programming background", "Experience with code review at scale"],
    sample: true,
  },
  {
    id: "senior-fullstack-agentic-tasks",
    title: "Senior Full-Stack Engineer — Agentic Coding Tasks",
    summary:
      "Design realistic multi-file engineering tasks and grade how AI coding agents solve them in real repositories.",
    regions: ["latam", "europe", "canada"],
    type: "Contract",
    pay: "USD 50–90 / hour",
    payRange: { min: 50, max: 90, currency: "USD", unit: "HOUR" },
    stack: ["TypeScript", "React", "Node.js", "Docker"],
    seniority: "Senior",
    hoursPerWeek: "20–40 hrs/week",
    posted: "2026-10-06",
    responsibilities: [
      "Create end-to-end tasks in real-world codebases with clear acceptance criteria",
      "Review agent trajectories and identify where reasoning went wrong",
      "Write concise, technical feedback that improves model behaviour",
    ],
    requirements: [
      "5+ years building production web applications",
      "Comfort navigating unfamiliar codebases quickly",
      "Excellent written English",
    ],
    sample: true,
  },
  {
    id: "java-backend-rlhf",
    title: "Java / Backend Engineer — RLHF Specialist",
    summary:
      "Compare and rate model answers to backend engineering questions, from concurrency bugs to API design.",
    regions: ["asia", "europe"],
    type: "Part-time contract",
    pay: "USD 25–50 / hour",
    payRange: { min: 25, max: 50, currency: "USD", unit: "HOUR" },
    stack: ["Java", "Spring", "SQL"],
    seniority: "Mid",
    hoursPerWeek: "10–30 hrs/week",
    posted: "2026-09-28",
    responsibilities: [
      "Rate pairs of model responses against detailed quality rubrics",
      "Rewrite flawed responses into ideal answers",
      "Flag safety and hallucination issues",
    ],
    requirements: ["3+ years of backend Java experience", "Solid SQL and system fundamentals"],
    sample: true,
  },
  {
    id: "ml-engineer-model-evaluation",
    title: "ML Engineer — Model Evaluation & Benchmarks",
    summary:
      "Build challenging evaluation sets and benchmark problems that probe the limits of frontier models in ML and data science.",
    regions: all,
    type: "Contract",
    pay: "USD 60–120 / hour",
    payRange: { min: 60, max: 120, currency: "USD", unit: "HOUR" },
    stack: ["Python", "PyTorch", "NumPy", "Statistics"],
    seniority: "Senior",
    hoursPerWeek: "15–40 hrs/week",
    posted: "2026-10-09",
    responsibilities: [
      "Author hard, verifiable ML/data problems with reference solutions",
      "Analyse model failure modes and document patterns",
    ],
    requirements: [
      "Hands-on ML engineering or research experience",
      "MSc/PhD or equivalent depth in a quantitative field",
    ],
    sample: true,
  },
  {
    id: "spanish-bilingual-software-engineer",
    title: "Bilingual Software Engineer (Spanish/Portuguese)",
    summary:
      "Evaluate coding assistants in Spanish or Portuguese, judging both technical accuracy and language quality.",
    regions: ["latam", "europe"],
    type: "Part-time contract",
    pay: "USD 25–45 / hour",
    payRange: { min: 25, max: 45, currency: "USD", unit: "HOUR" },
    stack: ["Python", "JavaScript", "Spanish or Portuguese"],
    seniority: "Mid",
    hoursPerWeek: "10–25 hrs/week",
    posted: "2026-10-03",
    responsibilities: [
      "Review technical answers written in Spanish or Portuguese",
      "Write natural, idiomatic reference explanations",
    ],
    requirements: ["Native Spanish or Portuguese", "Professional English", "2+ years coding"],
    sample: true,
  },
  {
    id: "cpp-systems-engineer-ai-training",
    title: "C++ / Systems Engineer — AI Training",
    summary:
      "Create and review low-level programming tasks covering memory, performance and concurrency for advanced coding models.",
    regions: ["europe", "canada", "asia"],
    type: "Contract",
    pay: "USD 45–85 / hour",
    payRange: { min: 45, max: 85, currency: "USD", unit: "HOUR" },
    stack: ["C++", "Rust", "Linux"],
    seniority: "Senior",
    hoursPerWeek: "15–40 hrs/week",
    posted: "2026-09-30",
    responsibilities: [
      "Write systems-programming prompts with verifiable outcomes",
      "Debug and explain subtle model mistakes in low-level code",
    ],
    requirements: ["5+ years C++ or Rust", "Strong OS and performance fundamentals"],
    sample: true,
  },
];

export const jobById = (id: string) => jobs.find((j) => j.id === id);
