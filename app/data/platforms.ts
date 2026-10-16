/**
 * Platforms our candidates work on.
 *
 * IMPORTANT: Credexus is an independent recruiting agency. These descriptions are
 * intentionally general. Do not add pay rates. Listing a platform is not an
 * endorsement; trademarks belong to their owners.
 *
 * Logos: a file at /public/platforms/<slug>.svg (or .png) with `logo: true`.
 * Marks are copied from each company's public site. A typeset wordmark is used
 * only when that brand does not publish a clean mark.
 */
export type Platform = {
  slug: string;
  name: string;
  /** Parent company / operator, when the platform runs under another brand. */
  operator?: string;
  category: "Expert marketplace" | "AI training platform" | "Human data lab" | "Talent network";
  summary: string;
  workTypes: string[];
  skills: string[];
  logo?: boolean;
  /** Set when the file under /platforms is not an SVG. */
  logoExt?: "png";
};

export const platforms: Platform[] = [
  {
    slug: "outlier",
    logo: true,
    name: "Outlier",
    operator: "Scale AI",
    category: "AI training platform",
    summary:
      "Scale AI's contributor platform, where domain experts write, review and rate data used to train and evaluate large language models.",
    workTypes: ["Code generation & review", "RLHF rating", "Prompt writing"],
    skills: ["Python", "JavaScript", "SQL", "Reasoning"],
  },
  {
    slug: "surge-ai",
    logo: true,
    name: "Surge AI",
    category: "Human data lab",
    summary:
      "A human-data company producing high-quality RLHF and evaluation datasets for AI labs, with a strong emphasis on expert, carefully vetted contributors.",
    workTypes: ["RLHF", "Model evaluation", "Adversarial testing"],
    skills: ["Python", "Algorithms", "Technical writing"],
  },
  {
    slug: "mercor",
    logo: true,
    name: "Mercor",
    category: "Expert marketplace",
    summary:
      "An AI-assisted hiring marketplace that places engineers and domain experts on contract projects for AI research labs.",
    workTypes: ["Coding evaluation", "Agentic task design", "Expert review"],
    skills: ["Full-stack", "Python", "TypeScript", "Systems"],
  },
  {
    slug: "turing",
    logo: true,
    name: "Turing",
    category: "Talent network",
    summary:
      "A global engineering talent network that supplies coding, reasoning and agent-trajectory data to frontier AI labs alongside traditional remote engineering roles.",
    workTypes: ["Coding datasets", "SFT & RLHF", "Agent trajectories"],
    skills: ["Python", "Java", "Go", "C++"],
  },
  {
    slug: "micro1",
    logo: true,
    name: "micro1",
    category: "Expert marketplace",
    summary:
      "An AI-led recruiting platform that sources and vets experts for human-data projects at AI labs.",
    workTypes: ["Code evaluation", "Data generation", "Expert review"],
    skills: ["Python", "JavaScript", "Data engineering"],
  },
  {
    slug: "braintrust",
    logo: true,
    logoExt: "png",
    name: "Braintrust",
    category: "Talent network",
    summary:
      "A user-owned freelance talent network connecting technical professionals with enterprise and AI-training contracts.",
    workTypes: ["Contract engineering", "AI training projects"],
    skills: ["Full-stack", "Cloud", "Data"],
  },
  {
    slug: "alignerr",
    logo: true,
    name: "Alignerr",
    operator: "Labelbox",
    category: "AI training platform",
    summary:
      "Labelbox's expert network, where specialists help train and evaluate AI models across coding, STEM and language domains.",
    workTypes: ["Code annotation", "Evaluation", "Reasoning tasks"],
    skills: ["Python", "Math", "Domain expertise"],
  },
  {
    slug: "dataannotation",
    logo: true,
    name: "DataAnnotation.tech",
    category: "AI training platform",
    summary:
      "A flexible remote platform where coders and writers complete AI training tasks such as writing, reviewing and rating model responses.",
    workTypes: ["Coding tasks", "Response rating", "Fact-checking"],
    skills: ["Python", "JavaScript", "SQL", "Writing"],
  },
  {
    slug: "handshake-ai",
    logo: true,
    name: "Handshake AI",
    operator: "Handshake",
    category: "Expert marketplace",
    summary:
      "Handshake's AI program connecting students, graduates and PhDs with paid projects that improve frontier models.",
    workTypes: ["Expert evaluation", "Problem authoring"],
    skills: ["CS fundamentals", "STEM", "Research"],
  },
  {
    slug: "mindrift",
    logo: true,
    name: "Mindrift",
    operator: "Toloka",
    category: "AI training platform",
    summary:
      "Toloka's platform for domain experts who create and refine data for generative AI, from code to specialised knowledge tasks.",
    workTypes: ["Data creation", "Code review", "Evaluation"],
    skills: ["Python", "Writing", "Domain expertise"],
  },
  {
    slug: "toloka-ai",
    logo: true,
    name: "Toloka AI",
    category: "Human data lab",
    summary:
      "A data partner for AI development that combines expert contributors with tooling for training, evaluation and safety work.",
    workTypes: ["Evaluation", "Red-teaming", "Data labeling"],
    skills: ["Python", "Analysis", "Languages"],
  },
  {
    slug: "afterquery",
    logo: true,
    name: "AfterQuery",
    category: "Human data lab",
    summary:
      "A research-driven human-data lab that works with experts to build challenging datasets and benchmarks for frontier models.",
    workTypes: ["Benchmark design", "Expert datasets"],
    skills: ["Software engineering", "Research", "Math"],
  },
  {
    slug: "opentrain-ai",
    logo: true,
    name: "OpenTrain AI",
    category: "Expert marketplace",
    summary:
      "A marketplace that matches AI teams with freelance data trainers, labelers and evaluators.",
    workTypes: ["Freelance AI training", "Labeling", "Evaluation"],
    skills: ["Python", "Annotation tools", "Languages"],
  },
  {
    slug: "rws-trainai",
    logo: true,
    logoExt: "png",
    name: "RWS TrainAI",
    operator: "RWS",
    category: "AI training platform",
    summary:
      "RWS's AI data services, sourcing a global community for data generation, annotation and model evaluation, with deep multilingual reach.",
    workTypes: ["Data generation", "Multilingual evaluation"],
    skills: ["Languages", "Coding", "Localization"],
  },
  {
    slug: "mindy",
    logo: true,
    name: "Mindy",
    operator: "Centific",
    category: "AI training platform",
    summary:
      "Centific's contributor community for AI data and evaluation projects, spanning code, language and domain tasks.",
    workTypes: ["AI data projects", "Evaluation"],
    skills: ["Coding", "Languages", "Analysis"],
  },
  {
    slug: "meridial",
    logo: true,
    name: "Meridial",
    operator: "Invisible",
    category: "AI training platform",
    summary:
      "An expert-contributor programme associated with Invisible Technologies, supporting model training and evaluation for AI companies.",
    workTypes: ["Model training", "Evaluation", "Reasoning tasks"],
    skills: ["Python", "Reasoning", "Domain expertise"],
  },
  {
    slug: "workada",
    logo: true,
    name: "Workada",
    category: "Expert marketplace",
    summary:
      "A remote work platform offering AI training and evaluation projects to technical contributors.",
    workTypes: ["AI training projects", "Evaluation"],
    skills: ["Coding", "Writing"],
  },
  {
    slug: "10x-team",
    logo: true,
    logoExt: "png",
    name: "10x Team",
    category: "Talent network",
    summary:
      "A network of remote engineers placed on AI-focused and product engineering engagements.",
    workTypes: ["AI engineering", "Contract roles"],
    skills: ["Full-stack", "Python", "ML"],
  },
  {
    slug: "terac",
    logo: true,
    name: "Terac",
    category: "Expert marketplace",
    summary: "A platform connecting experts with paid AI data and evaluation work.",
    workTypes: ["Expert tasks", "Evaluation"],
    skills: ["Coding", "Domain expertise"],
  },
];

export const platformBySlug = (slug: string) => platforms.find((p) => p.slug === slug);

export const platformNames = platforms.map((p) => p.name);
