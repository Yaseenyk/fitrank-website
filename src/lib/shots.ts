// Real captures of the FitRank app running on synthetic demo data (no real people).
// Alt text says what is on the screen, not the marketing line next to it.
// Each shot has a phone version: the app's own mobile layout, cropped to its top.

export type ShotSource = { src: string; width: number; height: number };
export type Shot = ShotSource & { alt: string; caption: string; mobile: ShotSource };

const shot = (name: string, height: number, alt: string, caption: string, width = 1440, mobileHeight = 1500): Shot => ({
  src: `/screenshots/${name}.webp`,
  width,
  height,
  alt,
  caption,
  mobile: { src: `/screenshots/${name}-m.webp`, width: 780, height: mobileHeight },
});

export const SHOTS = {
  dashboard: shot("dashboard", 1000, "FitRank dashboard: staffing-health rings (managers agree with the model, profiles ready, open tasks with a shortlist), tasks opened and filled by month, the open tasks starting soonest with how many people each has recommended, and the bench idle cost for the next 12 months with the part open tasks could recover", "The whole staffing picture on one screen"),
  tasks: shot("tasks", 900, "FitRank task list with seven open tasks, each showing priority, client, must-have skills, start date and status", "Every open task in one list"),
  newTask: shot("new-task", 960, "FitRank new-task assistant asking which role you need to fill, with example prompts and a live task preview of role, skills, timing and location fields", "Describe the role in plain words"),
  taskDetail: shot("task-detail", 1000, "A FitRank task page for a React developer with Java: must-have and nice-to-have skills, two completed matching runs and a hire-or-move card recommending an internal person", "A task, its runs and the hire-or-move call"),
  run: shot("run", 1000, "FitRank matching results: a funnel from 720 people considered to 95 who passed the rules, 26 ranked by the model and 17 recommended, with the top shortlisted person at over 99% overall fit", "From 720 people to a shortlist of 15"),
  runTrail: shot("run-trail", 1000, "FitRank 'How this was decided' panel: rules passed, facts from the data, the model's probability for every answer to five questions, safety checks and the resulting band", "Every score, traced back to rules, facts and probabilities", 1148, 2000),
  bench: shot("bench", 1000, "FitRank bench view: 629 people free now, $441,660 idle cost per week, people freeing within 30 and 90 days, and the open task each person could take next", "Who is free, what it costs, where they could go"),
  rolloffs: shot("rolloffs", 1000, "FitRank rolling-off view: 51 people rolling off within 45 days, weekly cost at risk, and for each person the task they could move to and the one skill they are short of", "Act before people come off a project"),
  skillGaps: shot("skill-gaps", 900, "FitRank skill gaps table marking Go, Rust and Swift as shortages for upcoming tasks, with free people who have each skill and who is closest", "Shortages found before a task stalls"),
  staffing: shot("staffing", 1000, "FitRank project staffing: four tasks selected, three of four filled, gross margin per week, and a proposed person per task with alternatives and margins", "One person per task, nobody double-booked"),
  whatIf: shot("whatif", 900, "FitRank what-if check for a prospective project: two data engineers at level L4 with Python, both staffable from inside, with billing and margin per week", "Can we staff the deal before we win it?"),
  employeeValue: shot("employee-value", 1000, "FitRank employee value card: estimated revenue billed, clients served, managers' rating, margin on billable work, best next task and project history", "What a person is worth to delivery"),
  clientProfile: shot("client-profile", 900, "FitRank client profile for an employee: experience summary, key skills with years and recent projects, with no cost, ratings or other clients' names", "A profile you can send to a client"),
  hrHome: shot("hr-home", 1000, "FitRank HR home: requests needing HR, tasks with no internal fit, candidates in progress, items needing attention and candidates by status", "HR's whole queue on one page"),
  hiringRequests: shot("hiring-requests", 900, "FitRank hiring requests list with three requests from managers, how many candidates were wanted and sent, and each request's status", "Every hand-off from manager to HR"),
  hiringRequest: shot("hiring-request", 900, "A FitRank hiring request for an iOS developer: two candidates sent to the manager with fit scores, request details and the manager's note", "One request, tracked end to end"),
  uploadResume: shot("upload-resume", 900, "FitRank resume upload: personal details are removed by code before AI reads the file, then HR checks the extracted fields before saving", "Privacy first, then AI"),
  candidate: shot("candidate", 1000, "A FitRank external candidate page: pipeline stage, the open task they fit at 93%, the profile read from the resume and checked by HR, and consent with an automatic deletion date", "A candidate, their fit and their consent"),
  taskCandidates: shot("task-candidates", 900, "FitRank external candidates ranked for a QA automation task, each with must-have skills met, level match and a fit score", "Outside candidates ranked by the same rules"),
  company: shot("company", 1000, "FitRank company view: data health for 720 employees with missing information, profiles due for review and ready counts, and the employee table", "People data you can trust before matching"),
  employee: shot("employee", 1000, "A FitRank employee record: skills with level, years and last used, profile details, leave, and a prompt to confirm the profile is up to date", "Skills, leave and history in one record"),
  import: shot("import", 900, "FitRank CSV import: choose what the file contains and upload it; every row is checked first and nothing is saved until you confirm", "Bring your data in from a spreadsheet"),
  thresholds: shot("admin-thresholds", 900, "FitRank band cut-offs: shortlist from 80% and review from 50%, with a reason for each change and a versioned change history", "Your cut-offs, versioned and audited"),
  health: shot("admin-health", 1000, "FitRank health dashboard: outcome check-ins, how often managers agree with the model, rejected shortlist suggestions and decisions by band and by model version", "Is the model helping? The numbers say"),
  fairness: shot("admin-fairness", 1000, "FitRank 'What your managers value' chart showing the factors that raise or lower the final score, above a fairness check of recommendation rates", "What the scorer learned, in plain words"),
  learning: shot("admin-learning", 1000, "FitRank learning view: feedback received, accepted and held out, rejections by reason, and how each kind of feedback becomes training data", "Feedback that becomes training data"),
  models: shot("admin-models", 1000, "FitRank model versions table comparing trained models on held-out test tasks, with the active model, switch buttons and switch history", "Switch or roll back a model in one click"),
  users: shot("admin-users", 900, "FitRank users and roles: HR, admin, resource managers and a read-only viewer, with role pickers, password reset and deactivate actions", "Who can sign in and what they can do"),
  audit: shot("admin-audit", 900, "FitRank audit export: download a spreadsheet of every recommendation with model version, score, band and the manager's decision", "Every decision, exportable"),
  evalReports: shot("admin-eval", 1000, "FitRank test reports: each model tested on unseen tasks against a simple ranking, with right person in top five, right person first and confidence error", "Every model tested against plain rules"),
  rateCard: shot("admin-rate-card", 929, "FitRank rate card: weekly cost and bill rate per cost band with the margin for each", "Rates that drive value and margin views"),
} satisfies Record<string, Shot>;

export type ShotKey = keyof typeof SHOTS;
