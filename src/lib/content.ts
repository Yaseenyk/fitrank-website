// Single source of product content. Pages, JSON-LD, llms.txt and llms-full.txt all read
// from here. Everything listed is built; roadmap items live only in ROADMAP.

export type Feature = { name: string; body: string };
export type FeatureGroup = { id: string; role: string; summary: string; features: Feature[] };

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "managers",
    role: "Resource managers",
    summary: "Staff a task in minutes and see exactly why each person was suggested.",
    features: [
      { name: "Describe the task in plain words", body: "Type the task the way you'd say it. FitRank turns it into fixed fields (skills, level, start date, location) and you confirm them before anything runs." },
      { name: "One-click matching", body: "A match run checks availability and hard rules, works out the facts for each person, and ranks everyone who qualifies. It runs in the background while you carry on." },
      { name: "Shortlist, Review and Hidden bands", body: "Every person gets a probability, and your thresholds turn it into a band. Strong, agreed matches are shortlisted; anything uncertain or contradictory goes to Review." },
      { name: "A reason for every suggestion", body: "Each person shows the five answers behind their score, a numbered list of facts, and an explanation that cites those facts. Nothing is written that the facts don't support." },
      { name: "See who was left out, and why", body: "The excluded list names the rule each person failed: not free in time, on leave, wrong location, outside the cost band or missing clearance." },
      { name: "Accept or reject with a reason", body: "Your decision is recorded with its reason (skill gap, level, domain, timing). Those decisions are what FitRank learns from next." },
      { name: "Resume-backed skills", body: "The shortlist marks which must-have skills a person's resume actually supports, so you can tell claimed skills from evidenced ones." },
      { name: "Ask HR when nobody fits", body: "If no one inside qualifies, send HR a hiring request for one to ten candidates, then mark each candidate they send as a fit or not." },
      { name: "Six-week outcome check-ins", body: "For every placement, FitRank asks how it went: working well, struggling or released early. Real outcomes, not just clicks, show whether the picks were good." },
      { name: "Business-unit context", body: "Each person shows their business unit and its head, so you know who to talk to. It informs you; it never filters anyone out." },
    ],
  },
  {
    id: "planning",
    role: "Planning and delivery heads",
    summary: "See next quarter's staffing problems while there's still time to fix them.",
    features: [
      { name: "Bench view", body: "Who is free now, or within 30, 60 or 90 days, what that idle time costs each week, and up to three open tasks each person could take." },
      { name: "Skill gaps", body: "Every must-have skill across upcoming tasks is marked shortage, tight or covered, with the people closest to it, so you can train before you hire." },
      { name: "Staff several tasks at once", body: "FitRank proposes one person per task across all open tasks without double-booking anyone, and shows the margin of each plan." },
      { name: "Hire or move", body: "For each task, compare the best internal person with the best external candidate, side by side, with the reasons for each." },
      { name: "Roll-off warnings", body: "See who is coming off a project soon and act early: hold them for a known task or plan upskilling." },
      { name: "What-if staffing for pre-sales", body: "Check whether you could staff a deal before you win it. It uses rules only and creates no task." },
      { name: "Employee value and client profiles", body: "Estimated revenue per person from your rate card (never salary), and a printable client-ready profile with no cost or ratings on it." },
    ],
  },
  {
    id: "hr",
    role: "HR and talent teams",
    summary: "Keep people data clean and bring in outside candidates when the bench runs out.",
    features: [
      { name: "HR home", body: "Open tasks, tasks with no internal fit, the candidate pipeline and candidates due for deletion, on one page." },
      { name: "Employee and client records", body: "Add and edit employees, their skills, leave and business unit, and your client list. Every change is audited, and a data-health view shows what's missing." },
      { name: "CSV import with mapping", body: "Import clients, employees and skills from a spreadsheet or an HRMS export. Preview first, map your own level, practice and skill names, and only valid rows are saved." },
      { name: "Resume reading with privacy first", body: "Upload a PDF or Word resume. Names, contact details and personal attributes are removed in code before any AI reads it; the AI fills professional fields only and HR reviews before saving." },
      { name: "Nothing guessed silently", body: "When a resume doesn't state notice period, location or level, the field is marked unconfirmed rather than filled in with a guess." },
      { name: "Candidate pipeline", body: "Track every outside candidate from new to screened, contacted, interviewing and hired or not taken." },
      { name: "Two-way candidate matching", body: "Score a candidate against every open task, or a task against every candidate, with plain blockers such as “can join 6 Nov; task needs 16 Oct”." },
      { name: "Suggest a candidate to a manager", body: "HR can check a resume against a specific task and put a candidate forward without waiting to be asked." },
      { name: "Skill suggestions from resumes", body: "Upload an employee's resume and FitRank suggests skills it found evidence for. HR accepts or dismisses each one." },
      { name: "Consent and automatic deletion", body: "Candidate consent is recorded, and a candidate's file is deleted automatically one year after upload unless they're hired." },
    ],
  },
  {
    id: "admins",
    role: "Admins and leadership",
    summary: "Control the model, prove it's fair, and keep a full audit trail.",
    features: [
      { name: "Users and roles", body: "Admin, resource manager, HR and read-only viewer. Temporary passwords must be changed at first sign-in, and the last admin can't be removed." },
      { name: "Your own thresholds", body: "Set the shortlist and review cut-offs for your company, with a reason. Every change is versioned and audited." },
      { name: "Model versions with a safety gate", body: "Switch to a newer model, or roll back, in one click. A model that ranks worse than the current one is refused unless you override it on purpose." },
      { name: "Health dashboard", body: "How often managers agree with the shortlist, override rates by week and by model, reject reasons and the outcomes of top picks." },
      { name: "Fairness checks", body: "Recommendation rates by location and practice among qualified people, tested with the four-fifths rule and a significance test." },
      { name: "What managers value", body: "The final scorer shown as plain factors, so you can see what your managers' decisions have taught it." },
      { name: "Learning loop you approve", body: "Feedback is grouped into themes in a weekly report with names removed. Admins accept or dismiss each suggestion; nothing changes on its own." },
      { name: "Rate card and margin target", body: "Rates per role and a margin target (30% by default) drive the value and planning views." },
      { name: "Audit export", body: "A CSV of every recommendation and decision: the model and versions used, and what the manager did." },
    ],
  },
  {
    id: "platform",
    role: "Platform and integrations",
    summary: "Built to run inside your company, on your data, at almost no running cost.",
    features: [
      { name: "An in-house decision model", body: "A small transformer model, trained from an open-weight LLM, answers the matching questions. It runs on an ordinary CPU, so scoring costs nothing per run." },
      { name: "Calibrated per company", body: "Each company gets its own final scorer, calibration and cut-offs, learned from its own managers' decisions." },
      { name: "Nightly retraining that waits for you", body: "The scorer retrains on new decisions overnight and tells admins what changed. It never switches itself on." },
      { name: "Multi-company by design", body: "Every record belongs to one company and the database enforces it with row-level security, so one company can never see another's data." },
      { name: "Decision API", body: "Other internal tools can ask FitRank the same typed questions over an API, with per-project keys, rate limits, monthly budgets and a Python client." },
      { name: "Secure sign-in", body: "Hashed passwords, short-lived tokens with a secure refresh cookie, lockout after failed attempts and a role check on every request." },
      { name: "Runs in containers", body: "Docker images for the API, worker and web app, with a Postgres-only job queue. No extra infrastructure to run." },
    ],
  },
];

export type UseCase = {
  slug: string;
  title: string;
  who: string;
  problem: string;
  how: string[];
  outcome: string;
  description: string;
};

export const USE_CASES: UseCase[] = [
  {
    slug: "staff-open-tasks",
    title: "Staff an open task with the right person",
    who: "Resource managers in IT services and consulting",
    description: "Rank everyone who can actually take a task, with a probability and a cited reason for each person, and keep the final call with the manager.",
    problem: "Matching usually means a spreadsheet, a few phone calls and whoever the manager remembers. Good people on the bench get missed, and nobody can say afterwards why someone was picked.",
    how: [
      "Describe the task in plain words and confirm the skills, level, dates and location FitRank reads from it.",
      "Hard rules remove anyone who isn't free in time, is on leave, is in the wrong location or outside the cost band, and record why.",
      "The decision model answers five questions for each remaining person: skill match, level fit, domain relevance, delivery risk and overall fit.",
      "Your thresholds put each person in Shortlist, Review or Hidden, and you accept or reject with a reason.",
    ],
    outcome: "A ranked, explained shortlist in seconds, and a record of every choice and why it was made.",
  },
  {
    slug: "bench-management",
    title: "Cut bench time and idle cost",
    who: "Delivery heads and resource management offices",
    description: "See who is free now and in the next 30, 60 and 90 days, what idle time costs each week, and which open tasks each person could take.",
    problem: "Bench reports show who is free, not where they could go. By the time someone notices a match, the person has been idle for weeks.",
    how: [
      "The bench view lists who is free now and soon, with the weekly idle cost from your rate card.",
      "Each person shows up to three open tasks they could take, from the latest match runs.",
      "Roll-off warnings flag people coming off projects so you can hold or upskill them early.",
    ],
    outcome: "Idle time turned into a short, actionable list instead of a weekly report.",
  },
  {
    slug: "skill-gap-planning",
    title: "Find skill shortages before they cost you a deal",
    who: "Practice leads and capability planners",
    description: "Mark every must-have skill across upcoming tasks as shortage, tight or covered, and see who is closest to filling each gap.",
    problem: "Skill gaps surface when a task can't be staffed, which is too late to train anyone.",
    how: [
      "FitRank reads the must-have skills of all upcoming tasks.",
      "Each skill is marked shortage, tight or covered against the people who will be free in time.",
      "For each gap it lists the people closest to it, so you can train before you hire.",
    ],
    outcome: "A training and hiring plan based on real demand.",
  },
  {
    slug: "hire-or-move",
    title: "Decide whether to hire or move someone",
    who: "Delivery and talent leaders",
    description: "Compare the best internal person with the best outside candidate for each task, with reasons on both sides.",
    problem: "Teams hire for roles they could have filled internally, or wait on an internal move that never comes.",
    how: [
      "For each task, FitRank finds the best internal person and the best candidate HR has in the pipeline.",
      "It compares the two side by side, with the reasons and blockers for each.",
      "The manager decides, and the decision is recorded.",
    ],
    outcome: "Fewer unnecessary hires and faster internal moves.",
  },
  {
    slug: "hr-candidate-pipeline",
    title: "Bring in outside candidates when nobody inside fits",
    who: "HR and talent acquisition teams",
    description: "Turn 'no internal fit' into a hiring request, read resumes with personal details removed, and match candidates to every open task.",
    problem: "When the bench can't cover a task, the request reaches HR as an email with half the details, and candidates are screened by hand.",
    how: [
      "The manager sends a hiring request straight from a task with no internal fit.",
      "HR uploads resumes. Personal details are removed in code before AI reads them, and HR reviews every extracted field.",
      "Candidates are scored against the task with plain blockers, and the manager marks each one as a fit or not.",
    ],
    outcome: "One tracked hand-off from manager to HR and back, with privacy built in.",
  },
  {
    slug: "multi-task-staffing",
    title: "Staff a whole portfolio of tasks at once",
    who: "Resource management offices",
    description: "Propose one person per task across every open task without double-booking anyone, and see the margin of each plan.",
    problem: "Staffing tasks one at a time gives the best person to whichever task asked first.",
    how: [
      "FitRank takes the latest match runs for all open tasks.",
      "It proposes one person per task without assigning anyone twice.",
      "It shows the margin for each proposal so you can compare plans.",
    ],
    outcome: "A staffing plan for the whole portfolio, not just the loudest task.",
  },
  {
    slug: "pre-sales-staffing",
    title: "Check you can staff a deal before you win it",
    who: "Pre-sales and account teams",
    description: "Run a what-if staffing check for a prospective deal using rules only, without creating a task.",
    problem: "Deals get signed with start dates nobody checked against the bench.",
    how: [
      "Describe the roles and start date of the prospective deal.",
      "FitRank checks who could be free and qualified in time, using rules only.",
      "Nothing is created or reserved, so you can test as many scenarios as you like.",
    ],
    outcome: "Start dates you can commit to with confidence.",
  },
  {
    slug: "fair-auditable-decisions",
    title: "Make staffing decisions you can audit and defend",
    who: "Leadership, HR and compliance",
    description: "Keep a full trail of every recommendation, test recommendation rates for fairness, and never use protected attributes.",
    problem: "AI hiring and staffing tools are hard to trust when nobody can see why they suggested someone, or whether they treat groups differently.",
    how: [
      "Protected attributes such as gender, age, religion and caste are never stored, sent to AI or used as signals.",
      "Every recommendation records the model, versions, probabilities and what the manager did, in an exportable audit CSV.",
      "The fairness view tests recommendation rates by location and practice with the four-fifths rule.",
    ],
    outcome: "Answers for auditors, works councils and your own leadership.",
  },
  {
    slug: "decision-api",
    title: "Add typed AI decisions to your own tools",
    who: "Engineering and platform teams",
    description: "Ask bounded questions over an API and get a probability for every option, with keys, budgets and rate limits per project.",
    problem: "Calling a chatbot from internal tools returns free text you can't test, cap or audit.",
    how: [
      "Create a project and an API key in the admin area.",
      "Send a question with a fixed list of options; get back a probability for each option, or an abstain when the model isn't sure.",
      "Every call is logged, rate-limited and counted against a monthly budget.",
    ],
    outcome: "AI answers your code can rely on, with limits you control.",
  },
];

export type Metric = { label: string; fitrank: string; baseline?: string; note?: string };

/** Measured on a synthetic benchmark (40 unseen tasks, 647 people), October 2026. */
export const METRICS: Metric[] = [
  { label: "Best person in the top five", fitrank: "94.3%", baseline: "91.4%" },
  { label: "Pairs of people ranked in the right order", fitrank: "88.7%", baseline: "86.1%" },
  { label: "Fit or not-fit decisions correct", fitrank: "91.3%", baseline: "90.4%" },
  { label: "Calibration error of the fit probability", fitrank: "2.2%", note: "Lower is better: a 90% score means about 90%." },
  { label: "Correct when the model is at least 90% sure", fitrank: "98.5%", note: "Covers about 70% of people; the rest go to Review." },
  { label: "Scoring time per match run (median)", fitrank: "0.94 s", note: "On an ordinary laptop CPU." },
  { label: "AI cost to score a match run", fitrank: "$0.00", note: "The decision model runs in-house; no per-call API fees." },
];

export const UNSEEN_COMPANIES = [
  { name: "IT services company", value: "85.6%" },
  { name: "AI lab (never seen in training)", value: "89.5%" },
  { name: "QA company (never seen in training)", value: "91.9%" },
];

export const DECISIONS = [
  { key: "Skill match", options: "none, weak, partial, good, excellent", body: "How well the person's skills, including closely related ones, cover what the task needs." },
  { key: "Level fit", options: "under, right, over", body: "Whether their seniority suits the task." },
  { key: "Domain relevance", options: "yes, no", body: "Whether they've worked in the task's domain before." },
  { key: "Delivery risk", options: "low, medium, high", body: "Signals such as recent gaps, stale skills or overload." },
  { key: "Overall fit", options: "yes, no", body: "The final judgement, given the other four answers and the facts." },
];

export const PIPELINE = [
  { name: "Rules in code", body: "Availability, leave, location, time zone, cost band and clearance are checked in code. Anyone who fails gets a recorded reason, not a low score." },
  { name: "Facts in code", body: "Skill coverage, level gap, years of experience, domain projects and skill recency are calculated exactly, never guessed by AI." },
  { name: "Typed decisions", body: "The in-house model answers five fixed questions, returning a probability for every option. It cannot answer outside the list." },
  { name: "Checks and bands", body: "Code cross-checks each answer against the facts. A contradiction, thin data or an unsure model caps the person at Review." },
  { name: "A person decides", body: "The manager accepts or rejects. Nothing is ever assigned automatically, and every decision teaches the next version." },
];

export const GUARANTEES = [
  { name: "No automatic assignment", body: "FitRank only recommends. A task is filled only when a person says so, and model changes, threshold changes and feedback suggestions all need an admin." },
  { name: "No protected attributes", body: "Gender, age, religion, caste, ethnicity, nationality, marital status, disability, health, sexual orientation, political views, photos and salaries are never stored, sent to AI or used as signals." },
  { name: "Names stay out of AI", body: "Names and employee codes are never sent to a language model. Codes typed into free text are masked." },
  { name: "Resumes are cleaned first", body: "Names, emails, phone numbers, addresses, links, dates of birth and photos are removed in code before any AI reads a resume." },
  { name: "Answers can't drift into free text", body: "AI returns option letters scored by probability, or strict-schema JSON. Free text is never stored as fact." },
  { name: "Explanations cite facts", body: "Every explanation points to numbered facts. One that cites a fact that doesn't exist is rejected and never shown." },
  { name: "Every company is walled off", body: "Row-level security in the database means a missing filter returns nothing rather than another company's data." },
  { name: "Full audit trail", body: "Sign-ins, user changes, task changes, decisions, thresholds, model switches, imports and outcomes are all audited, and exportable." },
  { name: "Consent and retention", body: "Candidate consent is recorded and candidate files are deleted after a year unless the person is hired." },
];

export const ROADMAP = [
  "Microsoft Entra ID single sign-on",
  "HRMS connectors (Keka first, then Darwinbox, Workday and SuccessFactors)",
  "Email and Microsoft Teams notifications",
  "Bulk resume upload",
  "Hosting in your own Azure tenant with Azure OpenAI",
];

export type Tier = { name: string; forWho: string; features: string[]; cta: string; highlight?: boolean };

export const TIERS: Tier[] = [
  {
    name: "Early access pilot",
    forWho: "One team proving FitRank on its own data",
    features: [
      "Task intake, matching, shortlists and explanations",
      "Accept and reject with reasons",
      "CSV import of employees, skills and clients",
      "Guided setup and a calibration review with your managers",
      "Annual licence, with early-access terms",
    ],
    cta: "Pre-register",
    highlight: true,
  },
  {
    name: "Team",
    forWho: "A delivery organisation staffing every week",
    features: [
      "Everything in the pilot",
      "Planning: bench, skill gaps, roll-offs, hire or move, what-if",
      "HR suite: resume reading, candidate pipeline, hiring requests",
      "Fairness, health and audit dashboards",
      "Annual licence",
    ],
    cta: "Contact sales",
  },
  {
    name: "Enterprise",
    forWho: "Groups with several companies or strict data rules",
    features: [
      "Everything in Team",
      "Several companies, each with its own model calibration",
      "Decision API with per-project keys and budgets",
      "Private deployment options",
      "Annual licence with a named contact",
    ],
    cta: "Contact sales",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "What is FitRank?", a: "FitRank is staffing software that ranks your employees for open tasks. Rules and facts are worked out in code, a small in-house AI model answers five fixed questions with a probability for each answer, and a manager makes every final decision." },
  { q: "Does FitRank assign people automatically?", a: "No. FitRank only recommends. A task is filled only when a manager accepts someone, and there is no code path that assigns a person on its own." },
  { q: "How is FitRank different from asking ChatGPT to pick someone?", a: "A chatbot returns free text you can't check or measure. FitRank asks typed questions with fixed options, returns a probability for every option, checks each answer against facts calculated in code, and records everything. Its own model runs in-house, so scoring costs nothing per run." },
  { q: "Which AI model does FitRank use?", a: "Matching uses a small transformer model trained by distilling an open-weight LLM. It runs on an ordinary CPU. A hosted LLM is used only to read free text, such as a task description or a resume, into fixed fields; it never ranks or decides about people." },
  { q: "Does FitRank use gender, age or other personal attributes?", a: "No. Protected attributes are never stored, sent to AI or used as signals. Names and employee codes are never sent to a language model, and resumes have personal details removed in code before AI reads them." },
  { q: "How accurate is FitRank?", a: "On a synthetic benchmark of 40 unseen tasks and 647 people, FitRank put the best person in the top five 94.3% of the time and ranked pairs of people correctly 88.7% of the time, ahead of a rules-only ranking. These figures are from synthetic data; measuring accuracy on your own managers' decisions is part of every pilot." },
  { q: "Can we import our existing employee data?", a: "Yes. Import employees, skills and clients from CSV, including HRMS exports. You preview the file, map your own level, practice and skill names, and only valid rows are saved." },
  { q: "Does it integrate with our HRMS or single sign-on?", a: "Today FitRank imports CSV exports. Keka and other HRMS connectors, and Microsoft Entra ID single sign-on, are on the roadmap and are prioritised with early-access customers." },
  { q: "How is FitRank priced?", a: "FitRank is sold as an annual licence in three tiers: Early access pilot, Team and Enterprise. Pricing depends on team size and deployment, so contact sales or pre-register for a quote." },
  { q: "Is FitRank available now?", a: "FitRank is in early access. The product is built and running; we are taking on a small number of pilot companies to validate it on real staffing decisions. Pre-register to be considered." },
];

export const HOME_FAQS = FAQS.filter((_, i) => [0, 1, 2, 4, 5, 8].includes(i));
export const PRICING_FAQS = FAQS.filter((_, i) => [8, 9, 6, 7, 1].includes(i));
