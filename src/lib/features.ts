// One page per functionality. Every feature in FEATURE_GROUPS appears on exactly one
// page (by name), so the /features hub, each page and llms-full.txt never drift apart.
import { FEATURE_GROUPS, type Faq, type Feature, type FeatureGroup } from "@/lib/content";
import type { ShotKey } from "@/lib/shots";

export type FeaturePage = {
  slug: string;
  name: string;
  group: FeatureGroup["id"];
  /** h1 */
  title: string;
  /** <title>, before the " | FitRank" suffix; keep under 50 characters. */
  metaTitle: string;
  /** Meta description and card text, 110–155 characters. */
  description: string;
  lead: string;
  problem: string;
  steps: string[];
  /** Names from FEATURE_GROUPS. */
  features: string[];
  shots: ShotKey[];
  useCases: string[];
  faqs: Faq[];
};

export const FEATURE_PAGES: FeaturePage[] = [
  {
    slug: "task-intake",
    name: "Plain-language task intake",
    group: "managers",
    title: "Describe a task the way you'd say it",
    metaTitle: "Plain-language task intake for staffing",
    description: "Type the role you need in plain words. FitRank turns it into skills, level, dates and location, and you confirm every field before matching runs.",
    lead: "A staffing request starts as a sentence, not a form. FitRank reads it into fixed fields, asks only about what's missing, and shows a live preview you confirm before anything is created.",
    problem: "Request forms with thirty fields get filled in badly or not at all, so matching starts from half the facts. Free-text requests are worse: nobody can search or check them.",
    steps: [
      "Describe the role like you would to a colleague, or start from an example.",
      "FitRank fills in title, client, domain, level, must-have and nice-to-have skills, start date, duration, allocation and location limits, and asks about anything it couldn't find.",
      "You check the live task preview and confirm. Nothing is created until you do.",
      "The task joins the open list with its priority, client, skills and start date, ready to match.",
    ],
    features: ["Describe the task in plain words"],
    shots: ["newTask", "tasks"],
    useCases: ["staff-open-tasks", "pre-sales-staffing"],
    faqs: [
      { q: "Does AI create the task on its own?", a: "No. AI only reads your description into fixed fields. You see every field in a preview and the task is created only when you confirm it." },
      { q: "What happens if the description leaves something out?", a: "FitRank asks only about the missing details, such as start date or level, instead of guessing them." },
    ],
  },
  {
    slug: "explainable-matching",
    name: "Explained matching and shortlists",
    group: "managers",
    title: "A ranked shortlist with a reason for every person",
    metaTitle: "Explainable AI matching and shortlists",
    description: "One click ranks everyone who can take a task. Each person shows the rules they passed, the facts, the model's probabilities and the band they landed in.",
    lead: "Matching runs in the background and turns your whole pool into a short, ranked list. Every person on it can be traced from rules to facts to five probability answers, so a manager can check a suggestion in seconds.",
    problem: "Most matching tools return a score with no way to check it. Managers either trust it blindly or ignore it, and nobody can say afterwards why a person was suggested or left out.",
    steps: [
      "Hard rules check everyone in code: free in time, no leave clash, location, working-hours overlap, cost band and clearance.",
      "Facts are calculated exactly: must-have and nice-to-have coverage, level, experience against the minimum, domain projects, skill recency and capacity.",
      "The in-house model answers five questions with a probability for every option: skill match, level fit, domain relevance, delivery risk and overall fit.",
      "Safety checks compare the answers with the facts, and your thresholds place each person in Shortlist, Review or Hidden.",
    ],
    features: [
      "One-click matching",
      "Shortlist, Review and Hidden bands",
      "A reason for every suggestion",
      "See who was left out, and why",
      "Resume-backed skills",
    ],
    shots: ["run", "runTrail"],
    useCases: ["staff-open-tasks", "fair-auditable-decisions"],
    faqs: [
      { q: "Can the model put someone on the shortlist who fails a rule?", a: "No. Rules run first in code, and anyone who fails one is excluded with a recorded reason. The model only scores people who passed every rule." },
      { q: "What if the model's answer contradicts the facts?", a: "Code cross-checks every answer. A contradiction, thin data or an unsure model caps the person at Review, so nobody is shortlisted on a doubtful signal." },
      { q: "How long does a matching run take?", a: "Scoring a run took a median of 0.94 seconds on an ordinary laptop CPU in our benchmark. The run happens in the background while you carry on." },
    ],
  },
  {
    slug: "learning-loop",
    name: "Decisions, outcomes and learning",
    group: "managers",
    title: "Every accept and reject makes the next ranking better",
    metaTitle: "Manager feedback and a learning loop",
    description: "Managers accept or reject with a reason, and check in six weeks later. FitRank turns those decisions into training data, but never switches itself on.",
    lead: "The people who staff work know things no dataset does. FitRank records each decision with its reason, follows up on how placements went, and learns from it, with an admin approving every change.",
    problem: "Staffing tools rarely find out whether their suggestions were any good. Without real outcomes, the ranking never improves and nobody can prove it helps.",
    steps: [
      "A manager accepts a person or rejects them with a reason: skill gap, level, domain or timing.",
      "Six weeks after a start, FitRank asks how it went: working well, struggling or released early.",
      "Decisions become training examples; planning reasons such as availability are kept out because they say nothing about fit.",
      "The final scorer retrains overnight on new decisions and tells admins what changed. An admin decides whether to switch it on.",
    ],
    features: [
      "Accept or reject with a reason",
      "Six-week outcome check-ins",
      "Learning loop you approve",
      "What managers value",
      "Nightly retraining that waits for you",
    ],
    shots: ["learning", "fairness"],
    useCases: ["fair-auditable-decisions", "staff-open-tasks"],
    faqs: [
      { q: "Does FitRank change its own model automatically?", a: "No. Retraining runs overnight and admins are told what changed, but a new scorer is only used after an admin switches it on." },
      { q: "Is written feedback read with names attached?", a: "No. Names are removed first, and feedback is grouped into themes in a weekly report that admins accept or dismiss." },
    ],
  },
  {
    slug: "staffing-dashboard",
    name: "Staffing dashboard",
    group: "planning",
    title: "How staffing is going, and what idle time will cost",
    metaTitle: "Staffing dashboard and bench idle cost",
    description: "One screen for delivery leads: model agreement, profile readiness, open tasks with a shortlist, tasks by month and the next 12 months of bench idle cost.",
    lead: "The first screen a delivery lead sees after signing in. Three rings say whether the system can be trusted today, two charts show demand and cost, and the open tasks that start soonest are one click away.",
    problem: "Staffing health lives in five places: the matching tool, a bench spreadsheet, HR's tracker and a finance report. Nobody sees idle cost coming until the month it lands.",
    steps: [
      "Rings show how often managers agree with the model, how many profiles are ready for matching, and how many open tasks already have a shortlist. A ring stays empty until there is enough data to say.",
      "Bars compare tasks opened and filled in each of the last six months.",
      "The open tasks starting soonest are listed with how many people each run recommended.",
      "Bench idle cost for the next 12 months is worked out day by day from the rate card if nothing new is booked, with the part held by people who fit an open task. Download it as CSV.",
    ],
    features: ["Staffing dashboard"],
    shots: ["dashboard"],
    useCases: ["bench-management", "staff-open-tasks"],
    faqs: [
      { q: "Is the idle-cost chart a forecast?", a: "It shows what idle time would cost if nothing new were booked: today's allocations and free-from dates priced at your rate card. It is the cost you can still avoid, not a prediction of what will happen." },
      { q: "Why is a ring empty?", a: "Agreement with the model is only shown once managers have made enough decisions for the rate to mean something. FitRank shows the count so far instead of a misleading percentage." },
    ],
  },
  {
    slug: "bench-management",
    name: "Bench and roll-offs",
    group: "planning",
    title: "See who's free, what idle time costs and where people could go",
    metaTitle: "Bench management and roll-off planning",
    description: "See who is free now or within 30, 60 or 90 days, the weekly idle cost, and the open tasks each person could take next, with roll-off warnings.",
    lead: "The bench view turns idle time into a short list of actions: who is free, what it costs each week at your rate card, and which open task each person fits best. Roll-off warnings show who is coming off a project before they're idle.",
    problem: "Bench reports say who is free, not where they could go. By the time someone spots a match, the person has been idle for weeks and the cost has already been paid.",
    steps: [
      "Pick a window: free now, or within 30, 60 or 90 days.",
      "See each person's free date, idle cost per week from the rate card, and up to three open tasks they could take.",
      "Switch to rolling off to see who leaves a project soon, the task they could move to and the one skill they're short of.",
      "Hold someone for a known task or plan upskilling, straight from the list.",
    ],
    features: ["Bench view", "Roll-off warnings"],
    shots: ["bench", "rolloffs"],
    useCases: ["bench-management", "skill-gap-planning"],
    faqs: [
      { q: "Where does the idle cost come from?", a: "From your own rate card: the weekly cost of each cost band, for the time a person is free. Salaries are never stored." },
      { q: "Does the bench view assign people to tasks?", a: "No. It suggests the tasks each person could take; a manager still runs matching and decides." },
    ],
  },
  {
    slug: "skill-gap-analysis",
    name: "Skill gap analysis",
    group: "planning",
    title: "Find skill shortages before a task stalls",
    metaTitle: "Skill gap analysis for upcoming work",
    description: "FitRank marks every must-have skill across upcoming tasks as shortage, tight or covered, and shows who is closest, so you can train before you hire.",
    lead: "Skill gaps usually surface when a task can't be staffed. FitRank reads the must-have skills of all upcoming work, checks them against the people who'll be free in time, and shows where you're short.",
    problem: "Hiring and training plans are built from guesses about demand, so the wrong skills get taught and the urgent ones get hired in a hurry.",
    steps: [
      "Choose a window: 30, 60 or 90 days, or six months.",
      "Each must-have skill is marked shortage, tight or covered against the people free in time.",
      "For every gap, see the free people who already have the skill and the person closest to it.",
      "Train the closest person, or hire when nobody is close.",
    ],
    features: ["Skill gaps"],
    shots: ["skillGaps"],
    useCases: ["skill-gap-planning", "hire-or-move"],
    faqs: [
      { q: "What counts as a shortage?", a: "A must-have skill that upcoming tasks need and that nobody free in the window has at the required level." },
      { q: "Which skills does it count?", a: "The skills on each person's profile, with level, years and when each was last used. HR keeps profiles up to date and can check them against resumes." },
    ],
  },
  {
    slug: "project-staffing",
    name: "Staff several tasks at once",
    group: "planning",
    title: "Staff a whole project at once, without double-booking anyone",
    metaTitle: "Multi-task project staffing",
    description: "Pick the tasks of one project and FitRank proposes one person per task from finished matching runs, with alternatives and the margin of each plan.",
    lead: "Staffing tasks one at a time gives the best person to whichever task asked first. FitRank looks at a project's tasks together and proposes a team where nobody is booked twice or beyond the time they have free.",
    problem: "When several tasks start together, managers compete for the same few people, and the plan that looks best task by task is often the worst for the project.",
    steps: [
      "Select up to 30 tasks that each have a finished matching run.",
      "FitRank proposes one person per task, never the same person twice, and never beyond their free time.",
      "Each proposal shows its band, fit, alternatives and margin; the plan shows tasks filled and gross margin per week.",
      "Managers still decide on each task.",
    ],
    features: ["Staff several tasks at once"],
    shots: ["staffing"],
    useCases: ["multi-task-staffing", "staff-open-tasks"],
    faqs: [
      { q: "Does the plan assign the people?", a: "No. It's a proposal. Each task is still decided by its manager on the matching results." },
      { q: "What if a task has no matching run yet?", a: "FitRank says so and offers to run matching for it, so the plan is always built from scored results." },
    ],
  },
  {
    slug: "hire-or-move",
    name: "Hire or move",
    group: "planning",
    title: "Hire from outside or move someone in? Compare both",
    metaTitle: "Hire or move: internal vs external",
    description: "For every task, FitRank compares the best internal person with the best outside candidate by fit, start date and margin, with the reasons for each side.",
    lead: "Every open task carries a hire-or-move card: the strongest person inside, the strongest candidate HR has found, and a plain recommendation with its reasons.",
    problem: "Teams hire for roles they could have filled internally, or wait for an internal move that never comes, because nobody puts the two options side by side.",
    steps: [
      "FitRank takes the best recommended person from the task's latest matching run.",
      "It takes the best outside candidate who passes the same rules.",
      "It compares fit, start date and margin, and suggests moving someone inside or hiring from outside.",
      "The manager decides, and the decision is recorded.",
    ],
    features: ["Hire or move"],
    shots: ["taskDetail"],
    useCases: ["hire-or-move", "hr-candidate-pipeline"],
    faqs: [
      { q: "Are outside candidates judged by different rules?", a: "No. Candidates are ranked with the same rules and facts as employees; their availability is their notice period." },
      { q: "Does FitRank decide whether to hire?", a: "No. It shows both options with reasons and suggests one. The manager decides." },
    ],
  },
  {
    slug: "what-if-staffing",
    name: "What-if staffing for pre-sales",
    group: "planning",
    title: "Check you can staff a deal before you win it",
    metaTitle: "What-if staffing checks for pre-sales",
    description: "Describe the roles and start date of a prospective project and see who could staff it from inside, with billing and margin per week. No task is created.",
    lead: "Pre-sales can test a deal against the real bench in seconds: roles, levels, skills and a start date in; staffable roles, people and weekly margin out.",
    problem: "Deals get signed with start dates nobody checked against the bench, and delivery finds out when it's too late to hire.",
    steps: [
      "Enter the start date, length and each role: people needed, level, highest cost band and must-have skills.",
      "FitRank checks who would be free and qualified in time, using rules only.",
      "See how many roles you can staff from inside, the people, and billing and margin per week.",
      "Nothing is created or reserved, so you can try as many scenarios as you like.",
    ],
    features: ["What-if staffing for pre-sales"],
    shots: ["whatIf"],
    useCases: ["pre-sales-staffing", "bench-management"],
    faqs: [
      { q: "Does a what-if check reserve people?", a: "No. It creates no task and holds nobody. Run matching on a real task when the deal is won." },
      { q: "Why rules only?", a: "A what-if check needs to be instant and repeatable. The model's ranking runs on real tasks, where a manager reviews it." },
    ],
  },
  {
    slug: "employee-value",
    name: "Employee value and client profiles",
    group: "planning",
    title: "What each person brings, and a profile a client can see",
    metaTitle: "Employee value and client-ready profiles",
    description: "Estimated revenue, clients, ratings and margin per person from your rate card, plus a printable client profile with no costs or ratings on it.",
    lead: "A value card shows what a person has delivered and where they could go next. One click turns it into a clean profile you can send to a client.",
    problem: "Delivery leads can't see what each person is worth to the business, and client CVs are rebuilt by hand for every proposal.",
    steps: [
      "See estimated revenue billed, clients served, managers' rating and margin on billable work.",
      "See the best next task, current work, project history and skills.",
      "Open the client profile: experience, key skills and projects, with no costs, ratings, revenue or other clients' names.",
      "Print it or save it as a PDF.",
    ],
    features: ["Employee value and client profiles", "Rate card and margin target"],
    shots: ["employeeValue", "clientProfile", "rateCard"],
    useCases: ["bench-management", "pre-sales-staffing"],
    faqs: [
      { q: "Does FitRank store salaries?", a: "No. Value is estimated from your rate card per cost band. Salaries are never stored." },
      { q: "What does a client see on the profile?", a: "Experience, key skills with years and recent projects. Costs, ratings, revenue and other clients' names are left out." },
    ],
  },
  {
    slug: "hiring-requests",
    name: "HR home and hiring requests",
    group: "hr",
    title: "When nobody inside fits, hand it to HR in one click",
    metaTitle: "Hiring requests and an HR home page",
    description: "Managers send HR a hiring request from a task with no internal fit. HR sees every request and candidate on one page and tracks each one to the end.",
    lead: "No internal fit becomes a tracked request, not an email. HR gets one home page for open requests, tasks nobody inside can take, the candidate pipeline and files due for deletion.",
    problem: "When the bench can't cover a task, the request reaches HR as an email with half the details, and nobody can see where it stands.",
    steps: [
      "The manager asks HR for one to ten candidates, straight from the task.",
      "HR sees the request on HR home, with the task's skills, level, dates and the manager's note.",
      "HR uploads resumes, sends the best fits to the manager and tracks each candidate from new to hired or not taken.",
      "The manager marks each candidate as a fit or not, and the request is closed.",
    ],
    features: ["Ask HR when nobody fits", "HR home", "Candidate pipeline"],
    shots: ["hrHome", "hiringRequest", "hiringRequests"],
    useCases: ["hr-candidate-pipeline", "hire-or-move"],
    faqs: [
      { q: "Do managers see candidates' contact details?", a: "No. Contact details are for HR only. Managers see the profile and fit, and HR contacts the people they choose." },
      { q: "How many candidates can a manager ask for?", a: "Between one and ten per request." },
    ],
  },
  {
    slug: "resume-reading",
    name: "Privacy-first resume reading",
    group: "hr",
    title: "Read resumes with personal details removed first",
    metaTitle: "Privacy-first AI resume parsing",
    description: "Upload a PDF or Word resume. Code removes names, contacts and personal attributes before AI reads it, and HR checks every field before it is saved.",
    lead: "FitRank's own code strips the personal part of a resume before any AI sees it. AI only turns the professional part into fields, and HR reviews them before saving.",
    problem: "Resume parsers send the whole document, photo and date of birth included, to an AI service, then save whatever comes back as fact.",
    steps: [
      "HR uploads a PDF or Word resume and records where it came from.",
      "Code removes names, emails, phone numbers, addresses, links, dates of birth and photos.",
      "AI fills professional fields only: designation, level, experience, skills, domains and education. Anything not stated is marked unconfirmed, not guessed.",
      "HR checks the fields and saves. Consent is recorded and the file is deleted after a year unless the person is hired.",
    ],
    features: [
      "Resume reading with privacy first",
      "Nothing guessed silently",
      "Skill suggestions from resumes",
      "Consent and automatic deletion",
    ],
    shots: ["uploadResume", "candidate"],
    useCases: ["hr-candidate-pipeline", "fair-auditable-decisions"],
    faqs: [
      { q: "Is the resume sent to an AI service with the candidate's name?", a: "No. Names, contact details, links, dates of birth and photos are removed by code first. The AI only sees the professional part." },
      { q: "What if the resume doesn't state a notice period or level?", a: "The field is marked unconfirmed for HR to fill in. FitRank never fills it with a guess." },
      { q: "How long are candidate files kept?", a: "One year after upload, then they are deleted automatically, unless the candidate is hired." },
    ],
  },
  {
    slug: "candidate-matching",
    name: "Two-way candidate matching",
    group: "hr",
    title: "Match candidates to tasks, and tasks to candidates",
    metaTitle: "Two-way candidate and task matching",
    description: "Score an outside candidate against every open task, or a task against every candidate, with the same rules as employees and blockers in plain words.",
    lead: "Outside candidates are ranked with the same rules and facts as your own people, so HR and managers compare like with like. Blockers are written in plain words.",
    problem: "Candidates are screened by hand against one role at a time, and good people who'd fit a different open task are never considered for it.",
    steps: [
      "Open a task to see outside candidates ranked by fit, with must-have skills, level match and domain history.",
      "Open a candidate to see every open task they fit.",
      "Blockers read like “can join 6 Nov; task needs 16 Oct”.",
      "HR can put a candidate forward to a manager without waiting to be asked.",
    ],
    features: ["Two-way candidate matching", "Suggest a candidate to a manager"],
    shots: ["taskCandidates", "candidate"],
    useCases: ["hr-candidate-pipeline", "hire-or-move"],
    faqs: [
      { q: "How is a candidate's availability judged?", a: "By their notice period, checked against the task's start date with the same rules as employees." },
      { q: "Can HR suggest a candidate without a request?", a: "Yes. HR can check a resume against a specific task and put the candidate forward to its manager." },
    ],
  },
  {
    slug: "people-data",
    name: "Employee records and CSV import",
    group: "hr",
    title: "Clean people data, because matching is only as good as profiles",
    metaTitle: "Employee records, data health and CSV import",
    description: "Edit employees, skills, leave and clients, see whose profile is missing or stale, and import from CSV or an HRMS export with a preview first.",
    lead: "FitRank shows how ready your people data is for matching, and makes it quick to fix: edit records, confirm profiles every six months, and bring data in from a spreadsheet.",
    problem: "Matching fails quietly when profiles are out of date: missing skills, old levels, no project history. Nobody notices until the wrong person is suggested.",
    steps: [
      "The data-health view counts profiles with missing information, profiles due for review and profiles ready for matching.",
      "Edit an employee's skills (level, years, last used), leave, business unit and details; every change is audited.",
      "Import clients, employees and skills from CSV. Preview first, map your own level, practice and skill names, and only valid rows are saved.",
      "Each person shows their business unit and its head, for context only. It never filters anyone out.",
    ],
    features: ["Employee and client records", "CSV import with mapping", "Business-unit context"],
    shots: ["company", "employee", "import"],
    useCases: ["staff-open-tasks", "skill-gap-planning"],
    faqs: [
      { q: "Can we import from our HRMS?", a: "Yes, from a CSV export. You map your own level, practice and skill names during import. Direct HRMS connectors are on the roadmap." },
      { q: "Is anything saved before we check the file?", a: "No. Every row is checked first, problems are listed, and nothing is saved until you confirm." },
    ],
  },
  {
    slug: "model-governance",
    name: "Thresholds and model versions",
    group: "admins",
    title: "Control the cut-offs and the model, with a safety gate",
    metaTitle: "AI model governance: thresholds, versions",
    description: "Set your own shortlist and review cut-offs, compare model versions on unseen tasks, and switch or roll back in one click. Every change is versioned.",
    lead: "Admins decide how strict the shortlist is and which model is in use. Every model is tested against plain rules before it can be switched on, and every change is kept in history.",
    problem: "AI tools change behaviour without warning, and nobody inside the company can set how cautious they are or undo an update that made things worse.",
    steps: [
      "Set the shortlist and review cut-offs, with a reason. Each change is a new version and applies to the next run.",
      "Compare trained models on test tasks they never saw: best person in the top five, best person first and confidence error.",
      "Switch to a model or roll back in one click. A model that ranks worse than the current one is refused unless you override it on purpose.",
      "Past runs keep the model and cut-offs they used.",
    ],
    features: ["Your own thresholds", "Model versions with a safety gate"],
    shots: ["thresholds", "models", "evalReports"],
    useCases: ["fair-auditable-decisions", "staff-open-tasks"],
    faqs: [
      { q: "Can a worse model be switched on by accident?", a: "No. A model that ranks worse than the current one on held-out tests is refused unless an admin overrides it on purpose." },
      { q: "Do threshold changes rewrite old results?", a: "No. A change applies to the next run; past runs keep the cut-offs they used." },
    ],
  },
  {
    slug: "health-and-fairness",
    name: "Health and fairness dashboards",
    group: "admins",
    title: "Prove the model helps, and that it's fair",
    metaTitle: "AI fairness checks and health dashboard",
    description: "See how often managers agree with the shortlist, override rates by week and model, real placement outcomes, and recommendation rates tested for fairness.",
    lead: "Leadership gets numbers, not promises: agreement with managers, outcomes of top picks, and a fairness test across groups of qualified people.",
    problem: "Most AI staffing tools can't show whether they help, and can't show whether they treat groups of people differently.",
    steps: [
      "Track how often managers agree with the model, by band, week and model version.",
      "See six-week outcomes of placements and the reasons managers gave for rejecting suggestions.",
      "Among qualified people, compare recommendation rates by location and practice with the four-fifths rule and a significance test.",
      "Rates appear only once there are enough decisions to mean something.",
    ],
    features: ["Health dashboard", "Fairness checks"],
    shots: ["health", "fairness"],
    useCases: ["fair-auditable-decisions"],
    faqs: [
      { q: "Which groups does the fairness check compare?", a: "Recommendation rates by location and practice among qualified people. Protected attributes such as gender, age and religion are never stored, so they cannot be used." },
      { q: "What is the four-fifths rule?", a: "A group recommended at less than 80% of the best group's rate is flagged for a look, when a significance test says the gap is unlikely to be chance." },
    ],
  },
  {
    slug: "security-and-access",
    name: "Roles, sign-in and audit",
    group: "admins",
    title: "Roles, secure sign-in and a full audit trail",
    metaTitle: "Roles, secure sign-in and audit export",
    description: "Admin, resource manager, HR and viewer roles, hashed passwords and short-lived tokens, row-level security per company, and an audit CSV of every decision.",
    lead: "FitRank is built to hold people decisions: every request is checked against a role, every company's data is walled off in the database, and every decision can be exported.",
    problem: "People data needs tighter controls than most internal tools give it, and auditors want a record of who decided what, with which model.",
    steps: [
      "Give each user a role: admin, resource manager, HR or read-only viewer. Temporary passwords must be changed at first sign-in.",
      "Passwords are hashed, tokens are short-lived with a secure refresh cookie, and repeated failed sign-ins lock the account.",
      "Row-level security in the database means a missing filter returns nothing rather than another company's data.",
      "Export a CSV of every recommendation and decision: model, versions, score, band and what the manager did.",
    ],
    features: ["Users and roles", "Secure sign-in", "Multi-company by design", "Audit export"],
    shots: ["users", "audit"],
    useCases: ["fair-auditable-decisions"],
    faqs: [
      { q: "Can one company see another company's data?", a: "No. Every record belongs to one company and the database enforces it with row-level security." },
      { q: "Does FitRank support single sign-on?", a: "Not yet. Microsoft Entra ID single sign-on is on the roadmap and is prioritised with early-access customers." },
    ],
  },
  {
    slug: "in-house-decision-model",
    name: "In-house decision model",
    group: "platform",
    title: "A small AI model of your own, not a chatbot",
    metaTitle: "In-house AI decision model on CPU",
    description: "Matching runs on a small transformer distilled from an open-weight LLM. It runs on an ordinary CPU, costs nothing per run and is calibrated per company.",
    lead: "FitRank doesn't send your people to a chatbot to be ranked. A small model, trained for exactly these five questions, runs inside the product on an ordinary CPU.",
    problem: "Ranking people with a hosted chatbot costs money per call, returns free text you can't test, and can change whenever the provider updates it.",
    steps: [
      "An open-weight LLM labelled thousands of task–person pairs, and a small transformer learned its probability for every answer.",
      "The model answers five fixed questions per person and can't answer outside the options.",
      "Each company gets its own final scorer, calibration and cut-offs, learned from its own managers' decisions.",
      "It ships as Docker images for the API, worker and web app, with a Postgres-only job queue. No extra infrastructure.",
    ],
    features: ["An in-house decision model", "Calibrated per company", "Runs in containers"],
    shots: ["runTrail", "evalReports"],
    useCases: ["decision-api", "fair-auditable-decisions"],
    faqs: [
      { q: "Does matching call ChatGPT or another hosted LLM?", a: "No. Matching uses FitRank's own model on CPU. A hosted LLM is used only to read free text, such as a task description or a resume, into fixed fields." },
      { q: "How accurate is it?", a: "On a synthetic benchmark of 40 unseen tasks and 647 people it put the best person in the top five 94.3% of the time, against 91.4% for rules only. Every pilot measures it on your own managers' decisions." },
    ],
  },
  {
    slug: "decision-api",
    name: "Decision API",
    group: "platform",
    title: "Ask typed AI questions from your own tools",
    metaTitle: "Decision API for typed AI answers",
    description: "Your own services ask FitRank typed questions over an API and get a probability for every option, with per-project keys, rate limits and budgets.",
    lead: "The typed-decision engine behind matching is open to your other systems. Each question has a fixed list of options and declared inputs; you get a probability for every option, or an abstain when the model isn't sure.",
    problem: "Calling a chatbot from internal tools returns free text you can't test, cap or audit, and costs grow with every call.",
    steps: [
      "Create a project and an API key in the admin area.",
      "Call a question by name with its inputs, from your service or the Python client. Built-in questions help AI agents choose a cheap or strong model, approve a tool action and check a result.",
      "Get a probability for every option, or an abstain when the model isn't sure. Inputs that state protected attributes are refused.",
      "Every call is logged, rate-limited and counted against the project's monthly budget.",
    ],
    features: ["Decision API"],
    shots: [],
    useCases: ["decision-api"],
    faqs: [
      { q: "Can the API return free text?", a: "No. It returns a probability for each of the question's options, or an abstain. That's what makes the answers testable." },
      { q: "Which plan includes the Decision API?", a: "Enterprise, with per-project keys and budgets." },
    ],
  },
];

export function featurePage(slug: string): FeaturePage | undefined {
  return FEATURE_PAGES.find((p) => p.slug === slug);
}

/** The page a feature (by name) is described on. */
export function featurePageFor(featureName: string): FeaturePage | undefined {
  return FEATURE_PAGES.find((p) => p.features.includes(featureName));
}

export const FEATURE_BY_NAME: Record<string, Feature> = Object.fromEntries(
  FEATURE_GROUPS.flatMap((g) => g.features).map((f) => [f.name, f]),
);
