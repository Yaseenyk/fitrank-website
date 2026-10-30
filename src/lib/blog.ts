import { MORE_POSTS } from "@/lib/blog-more";
import { SCHEDULING_POSTS } from "@/lib/blog-scheduling";

// Ten problem-first posts. Each one owns its own group of search terms, so no two posts compete:
// it describes the problem, says honestly why it is hard, then shows how FitRank approaches it.
// Links inside text use [label](href); FitRank is described as it is today: in pilot.
// Each post has its own publish day (two a week). A post is built only once its day has come in
// India, and the deploy workflow rebuilds the site every morning, so posts go live by themselves.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  topic: string;
  /** The search terms this post is written for (structured data, meta and Open Graph tags). */
  keywords: string[];
  blocks: Block[];
};

const FIRST: Post[] = [
  {
    slug: "bench-management-cost",
    keywords: ["bench management", "reduce bench time", "billable utilization", "RMG", "bench to billable"],
    title: "The bench is costing you more than you think",
    seoTitle: "Bench management: the real cost of idle people",
    description:
      "In IT services, people on the bench are paid but bill nothing. Why bench management stays hard, and how to move people from bench to billable faster.",
    date: "2026-10-28",
    topic: "Bench management",
    blocks: [
      { type: "p", text: "If you have worked in an IT services company, you know the Monday call. The RMG team shares a sheet, somebody reads out the names on the bench, and every manager says the same thing: nobody on this list fits my project. Two weeks later the same names are still on the sheet." },
      { type: "p", text: "Bench is normal. Projects end, new ones have not started, people finish one engagement before the next is signed. A small bench is even healthy because it lets you say yes to a client quickly. The problem starts when people stay there and nobody can say why." },
      { type: "h2", text: "What the bench actually costs" },
      { type: "p", text: "Take a simple example. Say 30 engineers are on the bench and the average cost to the company is ₹1 lakh a month each. That is ₹30 lakh a month going out with nothing billed against it. If even ten of them could have moved to an open task two weeks earlier, that is ₹5 lakh saved in one month, without hiring anyone or winning a new deal. Your numbers will be different, but the math works the same way for every services company." },
      { type: "p", text: "And money is only half of it. People who sit on the bench for long start looking outside. The good ones leave first, because they get calls from recruiters every week." },
      { type: "h2", text: "Why bench management is so hard to fix" },
      { type: "ul", items: [
        "The data is scattered. Skills are in the HRMS (often years old), availability is in a project tracker, and who is rolling off next month lives in a manager's head.",
        "Nobody sees the next 30 days. Most companies look at who is on the bench today, not who will be there in three weeks. By the time someone shows up on the sheet, the open tasks that fit them are already gone.",
        "Matching is done by memory. A manager asks around, a few names come up, and the person who is actually the best fit is never mentioned because nobody remembered them.",
        "There is no clear next step. Even when you know someone is free, the question is what now: propose them for an open task, train them on a missing skill, or lend them to another unit.",
      ] },
      { type: "p", text: "None of these is a hard technical problem on its own. It is hard because all of them have to be solved together, every week, while delivery keeps running." },
      { type: "h2", text: "What usually gets tried" },
      { type: "p", text: "A bigger Excel sheet. A resource management module inside the HRMS that nobody updates. A weekly review meeting. These help a little, but they all depend on someone remembering to update data and someone else remembering to look at it. Utilization dashboards tell you the bench is high. They do not tell you who should go where." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "We built FitRank around one question for every person on the bench: what is the one next step for this person this week? It shows who is free now and who frees up in the next 14 to 90 days, and for each of them it picks the best open task they fit, or the single skill they are short of for that task." },
      { type: "p", text: "The matching runs over everyone, not just the names somebody remembers, and every suggestion comes with plain reasons: has 4 of 5 must-have skills, free from the 12th, missing Kafka. A manager still makes every call. FitRank never assigns anyone by itself." },
      { type: "p", text: "You can see how it works on the [bench management](/features/bench-management/) page. FitRank is in pilot right now, so if bench time is a problem you are dealing with, we would like to hear how your team handles it today: [pre-register here](/early-access/)." },
    ],
  },
  {
    slug: "skills-based-resource-matching",
    keywords: ["skills-based resource matching", "resource allocation software", "project staffing software", "resource scheduling", "PSA software", "AI resource allocation"],
    title: "Why finding the right person for a project still takes days",
    seoTitle: "Skills-based resource matching: why it takes days",
    description:
      "Resource allocation in IT services still runs on calls and spreadsheets. Why skills-based matching is hard and what PSA tools miss.",
    date: "2026-10-30",
    topic: "Resource allocation",
    blocks: [
      { type: "p", text: "A client asks for a senior React developer who has worked in banking, can start on the 15th and overlaps four hours with US time. The account manager forwards it to delivery, delivery forwards it to RMG, and RMG starts calling project managers. Three days later you have two names, one of them is not really senior, and the other is already promised to another project." },
      { type: "p", text: "This is how resource allocation still works in a lot of IT services companies, including big ones. Not because people are lazy, but because finding the right person for a project is actually a hard problem." },
      { type: "h2", text: "Why it is harder than it looks" },
      { type: "ul", items: [
        "Skills are not yes or no. Someone who did React five years ago and Angular since is not the same as someone who shipped React last month. Proficiency and how recently a skill was used matter as much as the skill itself.",
        "Requirements come in mixed up. Must-haves, nice-to-haves, level, domain, start date, location and timezone all arrive in one email, and half of them are only implied.",
        "Availability keeps moving. People roll off early, projects get extended, leave gets approved. A list that was right on Monday is wrong by Thursday.",
        "Close matches get missed. If you search for Azure Data Factory, you will not find the person who has done the same work in AWS Glue, even if they could pick it up in a week.",
        "It has to be fair. If the same five people always get the good projects, others stop growing and eventually leave.",
      ] },
      { type: "h2", text: "What the current tools do" },
      { type: "p", text: "Most resource scheduling software and PSA (professional services automation) tools are really scheduling tools. They show who is booked where and let you filter by a skill tag. That works if your skill data is clean and your requirement is one keyword. It breaks when the requirement is a real client brief and the skill data is two years old." },
      { type: "p", text: "Newer \"AI resource allocation\" tools mostly add a match percentage. The problem is that a percentage with no reason behind it is hard to trust, and managers fall back to calling people they know." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "FitRank does skills-based resource matching in layers. First the hard rules run in code: available on the start date, right location or remote, enough timezone overlap. Then every person who passes is checked on five fixed questions: how well the skills match, whether the level is right, whether they know the domain, how risky delivery would be, and the overall fit. Each answer is a probability, not a guess written as text." },
      { type: "p", text: "The result is a short list with the reasons next to every name, so a manager can see why someone is there and why someone else is not. The manager accepts or rejects, and those decisions are what the system learns from." },
      { type: "p", text: "See [how FitRank decides](/how-it-works/) and the [candidate matching](/features/candidate-matching/) page for the details. It is in pilot, and we are looking for teams who want to try it on real open tasks." },
    ],
  },
  {
    slug: "job-description-to-staffing-request",
    keywords: ["job description parser", "JD to requirements", "staffing request automation"],
    title: "Managers don't have time to fill a staffing form",
    seoTitle: "From job description to staffing request, faster",
    description:
      "Staffing requests stall because managers will not fill long forms. Why turning a client JD into clean requirements is hard, and how to automate it safely.",
    date: "2026-11-03",
    topic: "Staffing requests",
    blocks: [
      { type: "p", text: "Every staffing system has a request form. Skills, level, years, start date, duration, location, work mode, priority. It looks reasonable when you design it. Then a delivery manager with three escalations and a client call in ten minutes opens it, sees fifteen fields, and sends RMG a WhatsApp message instead: need 2 Java devs asap, JD attached." },
      { type: "p", text: "We saw this happen with our own first version. We built a step-by-step chat to create a task, and managers told us straight: it is too long. They already have the client's job description. Why should they type it all again?" },
      { type: "h2", text: "Why a JD is hard to turn into requirements" },
      { type: "ul", items: [
        "JDs are written for candidates, not for matching. They mix the company pitch, the role, perks and requirements in one block.",
        "Must-have and nice-to-have are rarely labelled clearly. \"Experience with Kafka is a plus\" and \"strong Kafka\" mean very different things.",
        "Important details are missing. Start date, how many people, timezone overlap and duration are often not in the JD at all.",
        "Skill names are messy. React, ReactJS and React.js are the same skill. Node and Node.js too. A naive job description parser treats them as three different things.",
        "Some JDs come as scanned PDFs or screenshots of an email.",
      ] },
      { type: "h2", text: "What usually happens" },
      { type: "p", text: "Either someone in RMG reads every JD and types the requirements by hand, which is slow and depends on that person, or a tool copies keywords out of the JD and calls it done. The first does not scale. The second gives you a requirement list that looks complete but quietly drops half of what matters." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "In FitRank the manager uploads the JD (PDF, Word or an image) or pastes it. An AI model reads it into a fixed set of fields, and then code checks every one of them: skills are matched against the company's own skill list, unknown clients are flagged, dates are calculated in code, and anything out of range is dropped instead of trusted." },
      { type: "p", text: "Then the screen asks only what is still missing, most important first, and never more than five questions. Everything else gets a sensible default that never narrows the search, marked as default so the manager can change it. If the JD mentions a timezone or the overlap the client needs, that is picked up too." },
      { type: "p", text: "Emails and phone numbers in the document are masked before the AI reads it, and the file is not kept. You can see it on the [task intake](/features/task-intake/) page." },
    ],
  },
  {
    slug: "hire-or-move-internal-mobility",
    keywords: ["internal mobility", "internal talent marketplace", "redeploy bench employees", "build vs buy talent"],
    title: "Hiring outside while the right person sits on your bench",
    seoTitle: "Internal mobility: hire outside or move someone in?",
    description:
      "Companies hire externally while a fitting employee waits on the bench. Why internal mobility is hard in IT services, and how to decide hire or move first.",
    date: "2026-11-06",
    topic: "Internal mobility",
    blocks: [
      { type: "p", text: "This one is painful to watch. A manager cannot find anyone for a role, asks HR to hire, HR posts on Naukri, screens 300 resumes, runs interviews for three weeks and finally makes an offer. The new joiner comes in with a 60-day notice period. Meanwhile someone with almost the same skills has been on the bench in another unit the whole time." },
      { type: "p", text: "Nobody did anything wrong. The manager asked around and nobody mentioned that person. HR did what it was asked. The system just never checked inside first." },
      { type: "h2", text: "Why internal mobility is hard" },
      { type: "ul", items: [
        "Visibility stops at the unit. Managers know their own people well and everyone else barely at all.",
        "People hold on to their own people. A manager who has a good engineer finishing a project would rather keep them for the next one than lend them out.",
        "Skill data is too thin to trust. If the HRMS says someone knows Java, does that mean last month or in 2019?",
        "The comparison is never side by side. Nobody puts the internal option and the cost and time of hiring outside next to each other before deciding.",
      ] },
      { type: "p", text: "Internal talent marketplace products try to fix this by letting employees apply for internal roles. That helps people who are actively looking, but most people on the bench are not browsing a portal. They are waiting to be told what is next." },
      { type: "h2", text: "Build vs buy, for talent" },
      { type: "p", text: "There is also a middle option that gets skipped: the person inside is a near fit, missing one skill that could be trained in two or three weeks. Hiring takes longer than that, costs more, and the new person still needs onboarding. But this only works if somebody can see the near fit and the gap early enough." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "In FitRank every task is matched against everyone inside first, across units. If a good internal fit exists, the manager sees them with reasons. If someone is close but missing a skill, that is shown too. Only when nobody inside fits does the manager send a hiring request to HR, with the task attached, so HR does not start from a blank page." },
      { type: "p", text: "When HR uploads outside resumes, they are scored by the same rules as employees, and the manager marks each one fit or not. Every hand-off is tracked, so later you can see how many roles were filled from inside. More on the [hire or move](/features/hire-or-move/) page." },
    ],
  },
  {
    slug: "project-team-builder",
    keywords: ["project team builder", "team staffing tool", "project staffing"],
    title: "Staffing a project is a team problem, not a one-person problem",
    seoTitle: "Project team builder: staffing a whole team",
    description:
      "Most tools find one person per role. Real projects need a team: a lead, the right members, no double booking. Why team staffing is hard and how to do it.",
    date: "2026-11-10",
    topic: "Team staffing",
    blocks: [
      { type: "p", text: "When we showed an early version of FitRank to a manager, the first feedback was simple: where is the team? It had found one person. But the client had asked for three React developers and a lead, not one developer." },
      { type: "p", text: "That is how real staffing works. Projects need a team, and picking a good team is not the same as picking the best person four times." },
      { type: "h2", text: "Why building a team is harder" },
      { type: "ul", items: [
        "The lead changes everything. A strong lead can carry a less experienced member. A weak lead with a strong team still struggles. So the lead has to be picked first.",
        "People can only be in one place. The best person for role A may also be the best for role B. Picking greedily one role at a time ends up double booking people or leaving the last role with a poor fit.",
        "Levels have to make sense. Members should normally be below the lead's level, and the mix should not be all seniors or all juniors.",
        "Teams work better when people already know each other. Same unit or same practice is a small but real advantage.",
        "Some companies want to put a learner on the project too, someone shadowing, not billed, getting ready for the next one.",
      ] },
      { type: "h2", text: "What usually happens" },
      { type: "p", text: "Team staffing tools in PSA suites are mostly booking screens. You can drag people onto a project, but the tool does not tell you who should lead or which combination works. So managers still do it in their head and in long calls." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "FitRank has a simple team builder. The manager picks a task, and FitRank suggests up to three Team Lead options: people at the right level or with technical leadership experience, free when the project starts. The manager picks one." },
      { type: "p", text: "Then it fills the members: the best fits from the task's match, below the lead's level, with a small preference for the lead's own unit or practice. The lead counts towards the headcount, nobody is booked twice, and an optional shadow can be added as a learner who is not counted or billed. The team is saved with its own page." },
      { type: "p", text: "The rules are plain and visible, and the final call stays with the manager. See [project staffing](/features/project-staffing/) for how it looks." },
    ],
  },
  {
    slug: "skills-gap-key-person-risk",
    keywords: ["skills gap analysis", "skills inventory", "capacity planning", "key person risk", "workforce planning IT services"],
    title: "You find out about a skill gap when the project is already late",
    seoTitle: "Skills gap analysis and key-person risk, early",
    description:
      "Skill gaps show up after a project stalls. Why skills inventory and capacity planning fail, and how to see gaps and key-person risk early.",
    date: "2026-11-13",
    topic: "Skills gap analysis",
    blocks: [
      { type: "p", text: "A new project kicks off in two weeks and needs Kafka. Delivery asks RMG, RMG checks, and there is exactly one person with real Kafka experience, already on another critical project. Now it is a scramble: hire in a hurry, borrow from another account, or start the project and hope." },
      { type: "p", text: "The thing is, this was visible a month ago. The deal was in the pipeline, the skill was in the JD, and the company knew how many people had Kafka. Nobody put those three things together." },
      { type: "h2", text: "Why skill gaps are found late" },
      { type: "ul", items: [
        "The skills inventory is out of date. People fill their profile once when they join. After that it ages quietly.",
        "Demand is spread across places. Open tasks are in one system, upcoming deals in the sales CRM, and nobody adds them up by skill.",
        "Capacity planning is done in headcount, not skills. \"We need 20 more people in Q1\" does not tell you that 6 of them need Spark.",
        "Key-person risk is invisible until it hurts. When one person holds a skill that two running projects depend on, it is fine until they resign or fall sick.",
      ] },
      { type: "h2", text: "What usually gets tried" },
      { type: "p", text: "Skills gap analysis software in HR suites often works on job families and competency frameworks. That is useful for career planning, but it is too slow and too general for a delivery manager who needs to know who can do Kafka next month." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "FitRank works from the same data it uses for matching. For upcoming tasks it lists the skills that are short, who is closest to having them, and how much training would close the gap. It flags skills held by only one or two people that running work depends on, and people who alone carry a skill on a live project." },
      { type: "p", text: "Profiles also stay fresher on their own: when someone finishes a project that used a skill, the \"last used\" date for that skill moves forward without anyone filling a form. So the gap list is based on what people actually did recently, not on what they typed when they joined." },
      { type: "p", text: "Details on the [skill gap analysis](/features/skill-gap-analysis/) page. This is workforce planning for IT services at the level a delivery manager can act on this week." },
    ],
  },
  {
    slug: "ai-resume-screening-india",
    keywords: ["AI resume screening", "AI resume screener India", "ATS software India", "resume parser", "AI recruitment software India"],
    title: "500 applications for one role: resume screening in India today",
    seoTitle: "AI resume screening in India: the 500-resume problem",
    description:
      "Indian employers get hundreds of applications per role, many AI-written. Why resume screening and ATS keyword filters struggle, and what screening should do.",
    date: "2026-11-17",
    topic: "Resume screening",
    blocks: [
      { type: "p", text: "Post a developer role on Naukri or LinkedIn in India and you know what comes next. By the end of the day there are a few hundred applications. By the end of the week, maybe a thousand. Somebody in HR has to go through them, and that somebody also has ten other open roles." },
      { type: "p", text: "It has got worse recently. Candidates now use AI to write resumes and tailor them to every job description, so a lot of resumes look almost the same and repeat the JD's own keywords back. Applying takes one click now, so the count per role keeps going up, while the time HR has for each role does not." },
      { type: "h2", text: "Why screening is so hard now" },
      { type: "ul", items: [
        "Keyword matching stopped working. If every resume contains the keywords from the JD, a keyword filter cannot tell the good ones apart.",
        "Reading every resume properly is not possible. At three minutes each, 500 resumes is 25 hours of work for one role.",
        "The real signal is buried. Whether someone actually used Spark in production for two years or just listed it is in the project descriptions, not in the skills section.",
        "Speed matters. The best candidates have three offers in two weeks. If screening takes ten days, they are gone.",
      ] },
      { type: "h2", text: "What the current tools do" },
      { type: "p", text: "Most applicant tracking systems in India (ATS software from the big HRMS vendors and the standalone ones) store applications, move them through stages and filter by keywords. A resume parser pulls out fields, and some tools add an AI resume screener that gives a score. It saves time, but a score without reasons is hard to trust, and it is easy to quietly reject good people because their resume was worded differently." },
      { type: "h2", text: "What screening should do instead" },
      { type: "p", text: "In our view, an AI recruitment tool should do three things: read for evidence, not keywords (which skills, at what level, used how recently); explain every suggestion in plain words; and never reject anyone on its own. HR should spend their time on the top of a well-sorted list, with reasons, not on reading 500 PDFs." },
      { type: "h2", text: "How FitRank Hire approaches it" },
      { type: "p", text: "[FitRank Hire](/hire/) gives an employer a careers page where candidates apply with just a resume. The resume is read into fixed fields, personal details are removed before AI reads it, and the file itself is not kept. Each application is scored against the role's must-have skills by the same rules FitRank uses for staffing, and HR sees Strong fit, Possible fit or Not a match with the skills it has and misses. Applications that are worded almost the same as another one are flagged for a closer read." },
      { type: "p", text: "Nobody is rejected by the software. A person decides every time. FitRank Hire is in pilot for employers in India." },
    ],
  },
  {
    slug: "candidate-ghosting-blind-screening",
    keywords: ["candidate ghosting", "candidate experience", "blind resume screening", "careers page builder", "DPDP compliant recruitment"],
    title: "Candidates hear nothing back. That is a hiring problem too",
    seoTitle: "Candidate ghosting and blind screening in India",
    description:
      "Most job seekers in India say employers ghosted them. Why it happens, how blind resume screening helps, and what the DPDP Act asks.",
    date: "2026-11-20",
    topic: "Candidate experience",
    blocks: [
      { type: "p", text: "Ask anyone who looked for a job in India recently. They applied to fifty places and heard back from five. The rest never replied, not even a no. A 2024 survey reported that 73% of job seekers said employers had ghosted them ([source](https://salarybox.in/blog/candidate-ghosting-a-growing-hiring-challenge-in-india/))." },
      { type: "p", text: "Companies usually see this as the candidate's problem. It is not. People remember which company never replied. Some of them become clients, some refer friends, and some apply again two years later when they are exactly who you need." },
      { type: "h2", text: "Why replying to everyone is hard" },
      { type: "ul", items: [
        "Volume. When a role gets 500 applications, writing to each of them by hand is not going to happen.",
        "Nobody owns the \"no\". The recruiter moves to the next role, the hiring manager never sees the rejected ones, and the status stays \"under review\" forever.",
        "Saying why feels risky. Many companies avoid giving reasons because they worry about saying the wrong thing.",
      ] },
      { type: "h2", text: "Blind screening: fairer first reads" },
      { type: "p", text: "There is a second problem in how resumes are read. Names, photos, colleges and even addresses carry signals that have nothing to do with whether someone can do the job, and people (and AI models) react to them. Blind resume screening means the first read is only on skills and experience, and the name appears later. It is a simple idea that is surprisingly rare in practice." },
      { type: "h2", text: "What the DPDP Act changes" },
      { type: "p", text: "India's Digital Personal Data Protection Act also matters here. In short, candidates should be told what is collected and why, and their data should be erased once the purpose is served instead of sitting in an ATS forever. Specific rules, like a 48-hour notice before erasure, are written for very large platforms, and most obligations are expected to apply from around May 2027 ([summary](https://www.sansalegal.com/post/how-to-build-a-data-retention-and-erasure-schedule-under-the-dpdp-rules-2025)). This is our reading, not legal advice, so check with your lawyer." },
      { type: "h2", text: "How FitRank Hire approaches it" },
      { type: "p", text: "In [FitRank Hire](/hire/) every applicant hears back. When the employer shortlists someone or marks them \"not now\", the candidate gets an email. A \"not now\" says which must-have skills they had and which they were missing, from the matching facts. The recruiter's own note stays private." },
      { type: "p", text: "The first read is blind: the employer sees skills, experience and fit, and the name and contact only after shortlisting. Every applicant gets a private link to see what was saved, check their status, leave the talent pool or delete everything. Data is deleted after a year, and we send a heads-up two days before even though the strict 48-hour rule is aimed at big platforms. The careers page itself works as a simple careers page builder with Google job posting data." },
    ],
  },
  {
    slug: "explainable-fair-ai-hiring",
    keywords: ["explainable AI hiring", "bias-free hiring", "fair AI recruitment", "human in the loop AI hiring", "audit trail hiring"],
    title: "If an AI can't explain a hiring decision, it shouldn't make it",
    seoTitle: "Explainable AI hiring: fair, with a human in the loop",
    description:
      "AI hiring tools have shown bias and now face lawsuits. Why fair AI recruitment is hard, and why explainable scores, human decisions and audit trails matter.",
    date: "2026-11-24",
    topic: "Fair AI hiring",
    blocks: [
      { type: "p", text: "In 2024 researchers at the University of Washington tested large language models on ranking resumes that were identical except for the name. The models preferred white-associated names 85% of the time and Black-associated names 9% of the time ([UW News](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/)). Same resume, different name, different result." },
      { type: "p", text: "In the US, a lawsuit against Workday over AI screening (Mobley v. Workday) was allowed to go ahead as a collective action in 2025 for applicants over 40 who say they were rejected by its AI tools ([Holland & Knight](https://www.hklaw.com/en/insights/publications/2025/05/federal-court-allows-collective-action-lawsuit-over-alleged)). The case is not decided, but the direction is clear: companies will be asked to explain how their tools decided." },
      { type: "h2", text: "Why fair AI recruitment is hard" },
      { type: "ul", items: [
        "Bias hides in proxies. Even if you remove gender, things like college, location, career gaps or hobbies can stand in for it.",
        "Most AI tools cannot say why. A score of 72 has no reasons attached, so nobody can check whether it was fair.",
        "Automatic rejection removes the last check. When the software rejects people before any person looks, a biased model affects thousands of people quietly.",
        "Fairness is not one number. Comparing groups only makes sense among people who were actually qualified, otherwise you mistake a skills difference for bias.",
      ] },
      { type: "h2", text: "What explainable AI hiring should mean" },
      { type: "p", text: "For us it means four plain rules. Protected attributes like gender, age, religion and caste are never used as signals and never sent to an AI model. Every score can be traced to facts a person can check. A human in the loop makes every decision, and the system never rejects on its own. And every decision leaves an audit trail: what the system suggested, what the person decided, and why." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "FitRank was built on those rules from the start. Names and personal details are removed in code before any AI reads a resume. Matching uses fixed questions answered as probabilities, with the facts behind them shown on screen. Managers accept or reject, and \"not now\" needs a reason." },
      { type: "p", text: "There is also a fairness check that compares how often qualified people are recommended across groups such as location and practice, and flags a gap only when it is unlikely to be chance. More on [trust, privacy and fairness](/security/)." },
      { type: "p", text: "None of this makes bias impossible. It makes it visible and checkable, which is what bias-free hiring can honestly mean today." },
    ],
  },
  {
    slug: "ai-agent-guardrails",
    keywords: ["AI agent guardrails", "human in the loop approval", "tool approval for AI agents", "LLM guardrails API", "AI action governance"],
    title: "Letting an AI agent act on its own is the easy part",
    seoTitle: "AI agent guardrails: approve actions before they run",
    description:
      "AI agents can now run commands, send emails and change data. Why guardrails and human approval are hard to get right, and a typed way to check agent actions.",
    date: "2026-11-27",
    topic: "AI agent guardrails",
    blocks: [
      { type: "p", text: "Building an AI agent that can do things is easier than ever. Give it a few tools, a goal, and it will read files, run commands, update tickets and send emails. The hard part comes after: what stops it from deleting the wrong table, emailing all your customers, or spending money nobody approved?" },
      { type: "p", text: "Most teams find this out the first time an agent does something they did not expect. Usually it is small. Sometimes it is not." },
      { type: "h2", text: "Why agent guardrails are hard" },
      { type: "ul", items: [
        "Language models sound sure even when they are wrong. A check that asks the model \"is this safe?\" in free text gets a confident answer either way.",
        "Asking a human every time does not scale. If every step needs approval, people start clicking approve without reading.",
        "Not every action is equal. Reading a file is fine. Deleting production rows, deploying, emailing customers or buying capacity needs a person. Leaking a secret should simply be blocked.",
        "Cost adds up. Using the biggest model for every small step is slow and expensive, but the cheap model is not enough for everything.",
      ] },
      { type: "h2", text: "What the frameworks give you" },
      { type: "p", text: "Agent frameworks now have the basic pieces. OpenAI's Agents SDK, for example, separates guardrails that check a tool's input or output from approvals that pause a run before a sensitive action ([OpenAI docs](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)). That is the right shape. What is still left to you is deciding which actions need a human, and doing it in a way that is consistent and logged." },
      { type: "h2", text: "A typed way to check actions" },
      { type: "p", text: "The idea we use is simple: do not ask the model an open question, ask a typed one with fixed answers, and read the probability of each answer. Before an action: allow, ask a person, or block. Before a call: cheap model or strong model. After a result: pass, retry or escalate. If the top answer is not confident enough, or the model gives different answers when the options are shuffled, the check says \"not sure\" and a person decides." },
      { type: "h2", text: "How FitRank's decision service approaches it" },
      { type: "p", text: "The same engine that makes FitRank's staffing decisions is available as a [decision API](/features/decision-api/) for other projects: tool approval, model choice and result checks for AI agents, with per-project keys, a budget, and every call logged for audit. It is early. We have measured it on test cases with known answers, where it answered correctly when it answered and held back on the risky borderline cases, but it still needs real agent traffic before anyone should rely on it alone. That is the honest state of AI action governance today." },
    ],
  },
];

/** Every post, published or scheduled. */
export const POSTS: Post[] = [...FIRST, ...MORE_POSTS, ...SCHEDULING_POSTS];

export function post(slug: string): Post | undefined {
  return PUBLISHED.find((p) => p.slug === slug);
}

export function words(p: Post): number {
  return p.blocks
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
}

/** Today in India (YYYY-MM-DD), when the site is built. */
function todayInIndia(): string {
  return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

/** Posts whose publish day has come, newest first. Everything on the site reads this list. */
// BLOG_PREVIEW_ALL=1 builds every post, for checking and share cards locally; deploys never set it.
const PREVIEW_ALL = process.env.BLOG_PREVIEW_ALL === "1";

export const PUBLISHED: Post[] = POSTS.filter((p) => PREVIEW_ALL || p.date <= todayInIndia()).sort((a, b) =>
  b.date.localeCompare(a.date),
);

