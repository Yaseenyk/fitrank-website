import { MORE_POSTS } from "@/lib/blog-more";
import { SCHEDULING_POSTS } from "@/lib/blog-scheduling";
import { STORY_POSTS } from "@/lib/blog-stories";

// Ten problem-first posts. Each one owns its own group of search terms, so no two posts compete:
// it describes the problem, says honestly why it is hard, then shows how FitRank approaches it.
// Links inside text use [label](href); FitRank is described as it is today: in pilot.
// Each post has its own publish day (two a week). A post is built only once its day has come in
// India, and the deploy workflow rebuilds the site every morning, so posts go live by themselves.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tldr"; text: string }
  | { type: "faq"; items: { q: string; a: string }[] };

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
    keywords: ["bench management", "bench management meaning", "bench management in hr", "bench management roles and responsibilities", "bench management tool", "reduce bench time", "bench to billable"],
    title: "The bench is costing you more than you think",
    seoTitle: "Bench management: meaning, roles and real cost",
    description: "Bench management meaning in HR and IT services, who handles it, what bench time really costs, and how to move people from bench to billable faster.",
    date: "2026-10-28",
    topic: "Bench management",
    blocks: [
      { type: "p", text: "If you have worked in an IT services company, you know the Monday call. The RMG team shares a sheet, somebody reads out the names on the bench, and every manager says the same thing: nobody on this list fits my project. Two weeks later the same names are still on the sheet." },
      { type: "p", text: "Bench is normal. Projects end, new ones have not started, people finish one engagement before the next is signed. A small bench is even healthy because it lets you say yes to a client quickly. The problem starts when people stay there and nobody can say why." },
      { type: "h2", text: "What bench management means" },
      { type: "p", text: "Bench management is how a services company handles people who are employed but not on a billable project: tracking who is free, planning when people will roll off, and moving them to the next project, to training or to internal work. In HR terms it sits between resource management, which decides who works where, and talent management, which decides how people grow." },
      { type: "h2", text: "Who handles bench management: roles and responsibilities" },
      { type: "ul", items: ["Resource manager or RMG team: keeps the bench list current, matches people to open requests and reports bench cost.", "Delivery and project managers: release people on time and say early when a project is ending.", "HR: runs training plans and internal moves, and handles exits when nothing else works.", "Leadership: sets the target bench size and decides when to hire and when to redeploy."] },
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
      { type: "p", text: "If you are comparing bench management tools or bench management software, check three things: does it show who frees up in the next 30 days, does it suggest a next step for each person, and does it explain why." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "We built FitRank around one question for every person on the bench: what is the one next step for this person this week? It shows who is free now and who frees up in the next 14 to 90 days, and for each of them it picks the best open task they fit, or the single skill they are short of for that task." },
      { type: "p", text: "The matching runs over everyone, not just the names somebody remembers, and every suggestion comes with plain reasons: has 4 of 5 must-have skills, free from the 12th, missing Kafka. A manager still makes every call. FitRank never assigns anyone by itself." },
      { type: "p", text: "You can see how it works on the [bench management](/features/bench-management/) page. FitRank is in pilot right now, so if bench time is a problem you are dealing with, we would like to hear how your team handles it today: [pre-register here](/early-access/)." },
    ],
  },
  {
    slug: "skills-based-resource-matching",
    keywords: ["resource allocation in project management", "skills-based resource matching", "resource allocation software", "resource management software for professional services", "project staffing", "AI resource allocation"],
    title: "Why finding the right person for a project still takes days",
    seoTitle: "Resource allocation in IT projects: why it is slow",
    description: "Resource allocation in project management still runs on calls and spreadsheets in IT services. Why skills-based matching is hard and what PSA tools miss.",
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
      { type: "h2", text: "Turn the brief into a request that can be matched" },
      { type: "p", text: "Whatever tool you use, matching is only as good as the request. Before anyone searches, split the client's email into fixed fields and send back what is missing:" },
      { type: "ol", items: [
        "Role and level: senior React developer, not just React.",
        "Must-have skills, each with the level needed. Keep this list short; every extra must-have removes people.",
        "Nice-to-have skills, kept apart so they rank people instead of excluding them.",
        "Domain: banking experience is a must-have only if the client said so.",
        "Start date, length and allocation, so availability can be checked against real free dates and leave.",
        "Location and working-hours overlap, written as hours, for example four hours with US Eastern time.",
      ] },
      { type: "p", text: "A request in this shape can be checked by a person in minutes and by software in seconds. A forwarded email cannot be checked by either." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "FitRank does skills-based resource matching in layers. First the hard rules run in code: available on the start date, right location or remote, enough timezone overlap. Then every person who passes is checked on five fixed questions: how well the skills match, whether the level is right, whether they know the domain, how risky delivery would be, and the overall fit. Each answer is a probability, not a guess written as text." },
      { type: "p", text: "The result is a short list with the reasons next to every name, so a manager can see why someone is there and why someone else is not. The manager accepts or rejects, and those decisions are what the system learns from." },
      { type: "p", text: "See [how FitRank decides](/how-it-works/), [plain-language task intake](/features/task-intake/) and [explained matching](/features/explainable-matching/) for the details. It is in pilot, and we are looking for teams who want to try it on real open tasks." },
    ],
  },
  {
    slug: "job-description-to-staffing-request",
    keywords: ["job description format", "job description parser", "JD to requirements", "staffing request automation", "job description and resume match"],
    title: "Managers don't have time to fill a staffing form",
    seoTitle: "From job description to staffing request, faster",
    description:
      "Staffing requests stall because managers will not fill long forms. Why turning a client JD into clean requirements is hard, and how to automate it safely.",
    date: "2026-11-20",
    topic: "Staffing requests",
    blocks: [
      { type: "p", text: "Every staffing system has a request form. Skills, level, years, start date, duration, location, work mode, priority. It looks reasonable when you design it. Then a delivery manager with three escalations and a client call in ten minutes opens it, sees fifteen fields, and sends RMG a WhatsApp message instead: need 2 Java devs asap, JD attached." },
      { type: "p", text: "We saw this happen with our own first version. We built a step-by-step chat to create a task, and managers told us straight: it is too long. They already have the client's job description. Why should they type it all again?" },
      { type: "p", text: "The fix is not a shorter form. The fix is to treat the JD as the input, pull out what is in it, and ask the manager only for what is not. This post shows how to do that by hand in about ten minutes per JD, what a parser has to get right if you automate it, and the mistakes that make a request look complete when it is not." },
      { type: "h2", text: "A JD and a staffing request answer different questions" },
      { type: "p", text: "A job description is written to attract a candidate. It sells the company, describes the work and lists skills, often generously. A staffing request is written so that somebody can say yes or no about a specific person on a specific date. The second needs fields that are checkable; the first rarely provides them." },
      { type: "ul", items: [
        "JDs mix the company pitch, the role, perks and requirements in one block.",
        "Must-have and nice-to-have are rarely labelled clearly. \"Experience with Kafka is a plus\" and \"strong Kafka\" mean very different things.",
        "Important details are missing. Start date, how many people, timezone overlap and duration are often not in the JD at all.",
        "Skill names are messy. React, ReactJS and React.js are the same skill. Node and Node.js too. A naive job description parser treats them as three different things.",
        "Some JDs come as scanned PDFs or screenshots of an email.",
      ] },
      { type: "h2", text: "The fields a request needs" },
      { type: "p", text: "Whatever system you use, a request that can be matched has roughly these fields. If your form has many more, the extra ones are probably reporting fields that can be filled later by RMG, not by the manager." },
      { type: "ol", items: [
        "Role title and level, in your company's own level names (for example Senior Engineer, not \"5+ years\").",
        "Must-have skills, each with the level needed. Three to five is a healthy number; every extra must-have removes people from the pool.",
        "Nice-to-have skills, kept separate so they rank people rather than exclude them.",
        "Client and domain, and whether domain experience is truly required or only preferred.",
        "Headcount: how many people with this profile.",
        "Start date, duration and allocation (full time, or a share of a person's week).",
        "Location, work mode and working-hours overlap, written in hours (for example four hours with UK time).",
        "Priority, so RMG knows which request to work first when two compete for the same person.",
      ] },
      { type: "h2", text: "Worked example: one JD, read by hand" },
      { type: "p", text: "Here is a shortened, made-up JD of the kind a client forwards: \"We are a fast-growing fintech looking for a passionate backend engineer to join our payments team. You will build scalable microservices in Java and Spring Boot. Strong SQL required. Kafka experience is a plus. AWS exposure preferred. 6+ years. Hybrid, Pune. Immediate joiners preferred.\"" },
      { type: "p", text: "Read it in three passes. First, delete everything that describes the company or the culture (fast-growing, passionate, join our team). Second, sort what is left into must-have and nice-to-have using the JD's own words: required and strong mean must-have; a plus, preferred and exposure mean nice-to-have. Third, list what is missing." },
      { type: "ul", items: [
        "Must-have: Java (senior), Spring Boot (senior), SQL (strong). Microservices is a way of working rather than a separate skill; keep it as a note unless your skill list has it.",
        "Nice-to-have: Kafka, AWS.",
        "Domain: payments / fintech. The JD does not say it is required, so record it as preferred.",
        "Level: 6+ years maps to whatever your company calls that band. Write the band, not the years.",
        "Location: Pune, hybrid. Overlap: not stated, probably Indian hours, but ask.",
        "Missing: headcount, start date (\"immediate\" is not a date), duration, allocation, and whether the client will interview.",
      ] },
      { type: "p", text: "That is five questions back to the manager, not fifteen fields. The manager can answer them in one short reply, and RMG has a request that can be checked against real people and real free dates." },
      { type: "h2", text: "Normalise skill names before you search" },
      { type: "p", text: "Most bad matches from a good JD come from names, not from people. Keep one short list of canonical skill names and the spellings that map to each: ReactJS and React.js to React, Node and NodeJS to Node.js, Postgres to PostgreSQL, \"Spring\" to Spring Boot only if your teams use it that way. A spreadsheet with two columns, spelling and canonical name, is enough to start. Add a row every time you find a new spelling. If a JD names a skill that is not on the list at all, do not drop it silently; flag it so someone decides whether it is new or a typo." },
      { type: "h2", text: "Mistakes that make a request look complete" },
      { type: "ul", items: [
        "Copying every technology in the JD into must-have. Clients list their whole stack; a request with nine must-haves usually matches nobody.",
        "Turning \"6+ years\" into a hard minimum on years instead of a level. Someone with five strong years at the right level is often the better fit.",
        "Writing \"ASAP\" as the start date. Availability can only be checked against a date. If the client really means as soon as possible, write a date two weeks out and say so.",
        "Leaving out overlap hours for an offshore role, then finding that the shortlisted person cannot join the client's morning stand-up.",
        "Filling unknown fields with guesses that narrow the search, such as a city when the client never said one. A default should widen the search, never narrow it, and it should be visibly marked as a default.",
        "Keeping personal data from forwarded emails. Client JDs often carry a recruiter's name, email and phone. They are not needed for matching.",
      ] },
      { type: "h2", text: "If you automate it: what a parser has to get right" },
      { type: "p", text: "Large language models are good at the first reading step, turning messy text into fields. They are not reliable as the last step. A safe design lets the model propose fields and then checks every field in code: skills against your own skill list, clients against your client list, dates calculated in code rather than written by the model, numbers within sensible ranges, and anything that fails a check dropped or flagged instead of trusted. It then asks the manager only the questions that are left, most important first." },
      { type: "p", text: "Two simple tests tell you whether a JD parser is safe to use: give it a JD with no start date and see whether it invents one, and give it a JD with a skill you do not have on your list and see whether it silently drops it. Either failure means the request will look complete and be wrong." },
      { type: "h2", text: "How FitRank's task intake handles a JD" },
      { type: "p", text: "In FitRank the manager uploads the JD (PDF, Word or an image) or pastes it, or simply describes the task in plain words. An AI model reads it into fixed fields: title, client, domain, level, must-have and nice-to-have skills, start date, duration, allocation and location limits. Code then checks the fields as described above, and the screen asks only about what is still missing, never more than five questions. Defaults never narrow the search and are marked so the manager can change them. Nothing is created until the manager confirms the live preview." },
      { type: "p", text: "Emails and phone numbers in the document are masked before the AI reads it, and the file is not kept. FitRank is in early access, so treat this as a description of how the product works rather than a track record. You can see the screens on the [task intake](/features/task-intake/) page, and how the finished request is matched on [how FitRank decides](/how-it-works/). For the step after this one, turning the request into a shortlist, see [why finding the right person still takes days](/blog/skills-based-resource-matching/)." },
    ],
  },
  {
    slug: "hire-or-move-internal-mobility",
    keywords: ["internal mobility", "internal mobility meaning", "internal mobility rate formula", "internal talent marketplace", "redeploy bench employees", "build vs buy talent"],
    title: "Hiring outside while the right person sits on your bench",
    seoTitle: "Internal mobility: meaning, rate formula, hire vs move",
    description: "Internal mobility meaning, how to calculate the internal mobility rate, and why IT services companies hire outside while a fitting employee waits on the bench.",
    date: "2026-11-13",
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
      { type: "h2", text: "Internal mobility meaning and rate formula" },
      { type: "p", text: "Internal mobility means filling roles by moving people already in the company: to another project, unit or role. A simple measure is the internal mobility rate = roles filled by internal moves \u00f7 all roles filled in the period \u00d7 100. If 12 of 40 roles this quarter went to people already in the company, the rate is 30%. Track it per unit as well; one unit holding on to its people can hide behind a good company average." },
      { type: "h2", text: "Build vs buy, for talent" },
      { type: "p", text: "There is also a middle option that gets skipped: the person inside is a near fit, missing one skill that could be trained in two or three weeks. Hiring takes longer than that, costs more, and the new person still needs onboarding. But this only works if somebody can see the near fit and the gap early enough." },
      { type: "h2", text: "Putting the two options side by side" },
      { type: "p", text: "The comparison that gets skipped is simple to write down. For one open role, fill in two columns, inside and outside, before anyone posts a job:" },
      { type: "ul", items: [
        "Start date: the internal person's free date against the outside candidate's notice period plus the time to find them. A 60-day notice period starts only after the offer is accepted.",
        "Fit: must-have skills at the needed level, and how recently each was used. A near fit missing one skill goes in the inside column with the gap named.",
        "Cost and margin: the internal person's cost band against the expected offer, both priced against the rate the client pays.",
        "Ramp-up: someone who knows your tools, clients and delivery process starts useful sooner than a new joiner, who also needs onboarding.",
        "What happens to the bench: if the outside hire goes ahead, the internal person is still idle and still paid.",
      ] },
      { type: "p", text: "Neither column always wins. An outside hire can be right when nobody inside is close, or when the skill is needed for years. The mistake is deciding without looking at both." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "In FitRank every task is matched against everyone inside first, across units. If a good internal fit exists, the manager sees them with reasons. If someone is close but missing a skill, that is shown too. Only when nobody inside fits does the manager send a hiring request to HR, with the task attached, so HR does not start from a blank page." },
      { type: "p", text: "When HR uploads outside resumes, they are scored by the same rules as employees, and the manager marks each one fit or not. Every hand-off is tracked, so later you can see how many roles were filled from inside. Each open task also carries a hire-or-move card that compares the best internal person with the best outside candidate by fit, start date and margin, with the reasons for each side; the manager decides. More on the [skill gaps and hire-or-move](/features/skill-gap-analysis/) page." },
    ],
  },
  {
    slug: "project-team-builder",
    keywords: ["project staffing plan", "project staffing plan template", "team allocation", "team allocation template", "project team builder", "team staffing tool"],
    title: "Staffing a project is a team problem, not a one-person problem",
    seoTitle: "Project staffing plan: building the whole team",
    description:
      "Most tools find one person per role. Real projects need a team: a lead, the right members, no double booking. Why team staffing is hard and how to do it.",
    date: "2026-12-11",
    topic: "Team staffing",
    blocks: [
      { type: "p", text: "When we showed an early version of FitRank to a manager, the first feedback was simple: where is the team? It had found one person. But the client had asked for three React developers and a lead, not one developer." },
      { type: "p", text: "That is how real staffing works. Projects need a team, and picking a good team is not the same as picking the best person four times. This post covers what a project staffing plan should hold, why role-by-role picking goes wrong, and a procedure you can follow in a spreadsheet." },
      { type: "h2", text: "What a project staffing plan template should hold" },
      { type: "p", text: "A project staffing plan, or team allocation plan, lists each role and who fills it. Most teams keep it in an Excel template. The template is not the hard part. Choosing who goes in each row is. Still, a good template makes the choices easier to check. One row per role, with these columns:" },
      { type: "ul", items: [
        "Role and level, for example Team Lead at level 4 or React developer at level 2.",
        "Must-have skills, copied from the client's request, not paraphrased.",
        "Person proposed, and a second option.",
        "Allocation as a percentage, and the start and end dates.",
        "Date the person is actually free, from their current project.",
        "Billing status: billable, partly billable or shadow.",
        "Who approved the move, and when.",
      ] },
      { type: "p", text: "The free date column is the one that catches most mistakes. A person listed at 100% from the 1st who is still on another project until the 15th is two weeks of overlap nobody planned for." },
      { type: "h2", text: "Why the best person per role is not the best team" },
      { type: "p", text: "Picking one role at a time, in the order the request lists them, is the natural way to fill the sheet. It is also how teams end up with a weak lead. An invented example shows why." },
      { type: "p", text: "Example, made-up fit scores out of 10. The project needs a Team Lead and two React developers. Four people are free: Asha (lead 9, React 9), Ravi (lead 6, React 8), Meena (lead 4, React 7) and Kiran (lead 7, React 5). Kiran is booked on another project until the second month, so he cannot start." },
      { type: "ul", items: [
        "Role by role, in request order: the first React slot gets Asha (9), the second gets Ravi (8), and the lead goes to the best person left, Meena (4). Total 21, and the team has its weakest possible lead.",
        "Lead first: Asha leads (9), Ravi (8) and Meena (7) take the React slots. Total 24, and the strongest leader is leading.",
      ] },
      { type: "p", text: "Same people, same scores, a very different team. The difference comes from Asha being the best option for two roles at once. Whenever one person tops several rows, the order you fill them in decides the result." },
      { type: "h2", text: "Pick the lead first" },
      { type: "p", text: "The lead changes everything. A strong lead can carry a less experienced member. A weak lead with a strong team still struggles. So choose the lead before anyone else, and look for:" },
      { type: "ul", items: [
        "The right level, or real technical leadership on an earlier project, not only years of experience.",
        "Free on the start date, not a week later. The lead sets up the first sprint.",
        "Enough overlap with the client's domain to talk to their people on day one.",
        "Two or three options, not one, so the manager is choosing, not rubber-stamping.",
      ] },
      { type: "h2", text: "Rules for the members" },
      { type: "ul", items: [
        "Members should normally be below the lead's level. A member senior to the lead makes reviews and decisions awkward.",
        "Avoid an all-senior or all-junior mix. All seniors cost too much and often argue about design. All juniors need more lead time than the lead has.",
        "People can only be in one place. Check that nobody is booked twice across this project and the others starting in the same month.",
        "Teams work better when people already know each other. Same unit or same practice is a small but real advantage, worth using to break a tie, not to override fit.",
        "Some companies add a learner, someone shadowing, not billed, getting ready for the next project. Keep the shadow out of the headcount the client pays for.",
      ] },
      { type: "h2", text: "Building the team by hand" },
      { type: "p", text: "Without any tool, this procedure works with a skill matrix and the staffing sheet:" },
      { type: "ol", items: [
        "List every role with level, must-have skills and start date. Confirm the request with the delivery manager before you search.",
        "Filter the bench and people rolling off by hard rules: free in time, right location, inside the cost band. Write down why each person was dropped.",
        "Score the people who are left for each role, using the same scale for every role. A [skill matrix template](/tools/employee-skill-matrix-template/) gives you the raw material.",
        "Mark anyone who is in the top three for more than one role. These are the contested people.",
        "Choose the lead first from the lead options.",
        "Fill the remaining roles, giving each contested person to the role where the next-best option is weakest.",
        "Check levels, the mix and double bookings across all projects starting that month.",
        "Send the plan with a second option per role, so the manager can swap without starting over.",
      ] },
      { type: "p", text: "Step 6 is the one most people skip. In the example, Asha beats Ravi by one point at React, but she beats him by three as a lead and Meena by five. Taking her out of React costs little; taking her out of the lead role costs a lot. The question is always where losing the best person hurts least." },
      { type: "h2", text: "Checks before the plan goes out" },
      { type: "ul", items: [
        "Does the lead count towards the headcount the client asked for? Usually yes, so do not add an extra person by mistake.",
        "Is every start date at or after the person's free date?",
        "Does any allocation, added across all projects, go over 100%?",
        "Is there a single person whose absence would stall the project? If so, note who covers them.",
        "Has each person's current manager been told before the plan is shared?",
      ] },
      { type: "p", text: "For staffing several projects at once, the same logic applies at a larger scale. The [multi-task staffing](/use-cases/multi-task-staffing/) page shows why one task at a time gives the best people to whoever asked first." },
      { type: "h2", text: "FitRank's team builder" },
      { type: "p", text: "FitRank has a simple team builder. The manager picks a task, and FitRank suggests up to three Team Lead options: people at the right level or with technical leadership experience, free when the project starts. The manager picks one. Then it fills the members from the task's match, below the lead's level, with a small preference for the lead's own unit or practice. The lead counts towards the headcount, nobody is booked twice, and an optional shadow can be added who is not counted or billed." },
      { type: "p", text: "The rules are plain and visible, and the final call stays with the manager. See [project staffing](/features/project-staffing/) for how it looks." },
    ],
  },
  {
    slug: "skills-gap-key-person-risk",
    keywords: ["skill gap analysis", "skill gap analysis template", "skill gap analysis meaning", "skills inventory", "key person risk", "workforce planning"],
    title: "You find out about a skill gap when the project is already late",
    seoTitle: "Skill gap analysis: template and key-person risk",
    description: "Skill gap analysis meaning, a simple template for IT services teams, and how to spot key-person risk before a project stalls instead of after it.",
    date: "2026-11-17",
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
      { type: "h2", text: "A simple skill gap analysis template" },
      { type: "ul", items: ["Demand by skill: open tasks plus pipeline deals likely to close, by month.", "Supply by skill: people who have it at the needed level and used it recently.", "Gap = demand minus supply, per skill and month.", "One action per gap: train someone close, move someone from another unit, or hire.", "Review it every two weeks; demand changes faster than people expect."] },
      { type: "h2", text: "Key-person risk: a check you can run this week" },
      { type: "p", text: "You do not need software for a first look. List the projects running now and, for each, the skills it cannot do without. Then count how many people hold each skill at a level where they could carry it alone:" },
      { type: "ol", items: [
        "One holder on a live project: a key-person risk. If that person resigns or falls sick, the project stalls.",
        "One holder across the whole company: a bigger risk, because there is nobody to borrow from another account.",
        "Two or three holders who are all fully booked: the skill is covered on paper and short in practice.",
      ] },
      { type: "p", text: "For each risk, pick one action: pair a second person with the holder, write down what only that person knows, or plan training for the closest colleague. Re-run the count when a project starts or ends." },
      { type: "h2", text: "What usually gets tried" },
      { type: "p", text: "Skills gap analysis software in HR suites often works on job families and competency frameworks. That is useful for career planning, but it is too slow and too general for a delivery manager who needs to know who can do Kafka next month." },
      { type: "h2", text: "How FitRank approaches it" },
      { type: "p", text: "FitRank works from the same data it uses for matching. For a window you choose (30, 60 or 90 days, or six months), it reads the must-have skills of upcoming tasks and marks each one shortage, tight or covered against the people who will be free in time. For every gap it shows the free people who already have the skill and the person closest to it, so you can train before you hire." },
      { type: "p", text: "The result is only as good as the profiles. Each skill on a profile carries a level, years of experience and when it was last used; a data-health view lists profiles that are missing information or due for their six-monthly review, and HR can check skills against a resume. When nobody is close, each open task's hire-or-move card compares the best internal person with the best outside candidate." },
      { type: "p", text: "Details on the [skill gaps and hire-or-move](/features/skill-gap-analysis/) page. This is workforce planning for IT services at the level a delivery manager can act on this week." },
    ],
  },
  {
    slug: "ai-resume-screening-india",
    keywords: ["ai resume screening", "ai resume screening tools", "resume screening software", "ai recruitment tools in india", "applicant tracking systems in india", "ats software for hr", "resume parser"],
    title: "500 applications for one role: resume screening in India today",
    seoTitle: "AI resume screening tools in India: what to expect",
    description: "AI resume screening in India: why ATS keyword filters fail with hundreds of AI-written resumes, what screening software should do, and what to avoid.",
    date: "2026-11-27",
    topic: "Resume screening",
    blocks: [
      { type: "p", text: "Post a developer role on Naukri or LinkedIn in India and you know what comes next. By the end of the day there are a few hundred applications. By the end of the week, maybe a thousand. Somebody in HR has to go through them, and that somebody also has ten other open roles." },
      { type: "p", text: "It has got worse recently. Candidates now use AI to write resumes and tailor them to every job description, so a lot of resumes look almost the same and repeat the JD's own keywords back. Applying takes one click, so the count per role keeps going up, while the time HR has for each role does not." },
      { type: "p", text: "This post is about doing first-round screening well at that volume: what breaks, a method that works with or without software, a worked example, and what to ask before you buy an AI resume screening tool." },
      { type: "h2", text: "Where keyword screening stops working" },
      { type: "ul", items: [
        "If every resume contains the keywords from the JD, a keyword filter cannot tell the good ones apart. It mostly rewards whoever copied the JD most closely.",
        "Reading every resume properly is not possible. At three minutes each, 500 resumes is 25 hours of work for one role.",
        "The real signal is buried. Whether someone actually used Spark in production for two years or just listed it is in the project descriptions, not in the skills section.",
        "Good people get filtered out for wording. A filter for \"Kubernetes\" misses the candidate who wrote \"K8s\" or described running EKS clusters.",
        "Speed matters. Strong candidates often have several offers in progress. If screening takes ten days, they are gone.",
      ] },
      { type: "h2", text: "Screen for evidence, not words" },
      { type: "p", text: "The fix is to change what you look for. Instead of asking \"does the resume mention X\", ask \"what evidence is there that this person has done X, at what level, and how recently\". Evidence lives in project descriptions: what was built, with which tools, for how long, and what the person's own part was." },
      { type: "p", text: "Before the first resume is opened, write a one-page screening card for the role. It takes fifteen minutes and saves hours:" },
      { type: "ol", items: [
        "Three to five must-have skills, each with the level needed and what counts as evidence. For example: Java, senior, means at least one project described where the candidate built or owned services in Java within the last three years.",
        "Nice-to-have skills, kept separate. They change the order, never the yes or no.",
        "Hard limits that are real: location or relocation, earliest joining date the project can accept, work authorisation if relevant. Nothing else is a hard limit.",
        "Things you will deliberately ignore at this stage: college name, photo, gaps without context, the summary paragraph, and the skills list on its own.",
        "Three result buckets with written meaning: strong (all must-haves evidenced), possible (one must-have unclear or one level short), not a match (a hard limit fails or two or more must-haves have no evidence).",
      ] },
      { type: "h2", text: "Worked example: three resumes against one card" },
      { type: "p", text: "Made-up role: data engineer, must-haves Spark (mid), SQL (strong), one cloud data platform (AWS or Azure), joining within 60 days. Nice-to-have: Airflow, Kafka. Three invented applicants:" },
      { type: "ul", items: [
        "Applicant A lists Spark, SQL, AWS, Airflow, Kafka, Databricks and twelve more tools in the skills section. The only project described is a reporting dashboard in Power BI. No evidence of Spark work. Result: not a match on evidence, though a keyword filter would rank A first.",
        "Applicant B lists fewer skills, but two projects describe building daily Spark jobs on Azure Databricks for two years and tuning slow SQL. No Airflow. Notice period 60 days. Result: strong.",
        "Applicant C describes a year of PySpark on AWS Glue and good SQL, but the resume does not state a notice period or current location. Result: possible, with two questions for the first call.",
      ] },
      { type: "p", text: "The point of the example: the keyword ranking and the evidence ranking come out in opposite orders. And the possible bucket is not a polite no; it is a list of specific questions that a five-minute call can answer." },
      { type: "h2", text: "What applicant tracking systems in India usually do" },
      { type: "p", text: "Most applicant tracking systems (ATS software from the big HRMS vendors and the standalone ones) store applications, move them through stages and filter by keywords. A resume parser pulls out fields, and some tools add an AI resume screener that gives a score. It saves time, but a score without reasons is hard to trust, and it is easy to quietly reject good people because their resume was worded differently." },
      { type: "h2", text: "Questions to ask before you buy a screening tool" },
      { type: "ul", items: [
        "Does every suggestion come with reasons a recruiter can check against the resume, such as which must-haves were found and which were missing?",
        "Can the tool reject anyone on its own? If yes, who reviews those rejections, and how would you notice a pattern?",
        "What happens when a resume does not state something, like notice period or location? Does it guess, or mark the field as unknown?",
        "Are names, photos, addresses and dates of birth removed before any AI model reads the resume?",
        "Where is the resume file stored, for how long, and how does a candidate ask for it to be deleted?",
        "Can you export what the tool suggested and what your team decided, so you can check it later for fairness?",
      ] },
      { type: "h2", text: "Mistakes that cost good candidates" },
      { type: "ul", items: [
        "Using the skills section as the evidence. It is the easiest part of a resume to copy from the JD.",
        "Treating a career gap as a negative without asking. Gaps have many ordinary reasons and say nothing about skill.",
        "Screening for the ideal candidate instead of the role. If the card has eight must-haves, the strong bucket stays empty and recruiters start making exceptions by feel.",
        "Leaving the possible bucket for later. Those are often the best candidates whose resumes are simply less polished.",
        "Never telling the rejected applicants anything. That is a separate problem, covered in a later post on candidate ghosting.",
      ] },
      { type: "h2", text: "What FitRank Hire does with the same idea" },
      { type: "p", text: "[FitRank Hire](/hire/) gives an employer a careers page where candidates apply with just a resume, with no account and no long form. Email addresses and phone numbers are removed in code before an AI service reads the resume into fixed fields such as skills and years of experience. The fit itself is worked out by rules, the same rules FitRank uses for internal staffing, and each application is marked Strong fit, Possible fit or Not a match with the skills it has, the skills it misses and why. The resume file is read once and then dropped." },
      { type: "p", text: "Nothing is rejected by the software: choosing Not now asks a person for a short reason, so every decision can be explained later. FitRank Hire is in pilot for employers in India, so this describes how it is built, not results from customers." },
    ],
  },
  {
    slug: "candidate-ghosting-blind-screening",
    keywords: ["candidate ghosting", "candidate ghosting meaning", "candidates ghosting interviews", "candidate ghosting after offer", "blind resume screening", "candidate experience", "DPDP compliant recruitment"],
    title: "Candidates hear nothing back. That is a hiring problem too",
    seoTitle: "Candidate ghosting: meaning, causes, blind screening",
    description:
      "Most job seekers in India say employers ghosted them. Why it happens, how blind resume screening helps, and what the DPDP Act asks.",
    date: "2026-12-01",
    topic: "Candidate experience",
    blocks: [
      { type: "p", text: "Ask anyone who looked for a job in India recently. They applied to fifty places and heard back from five. The rest never replied, not even a no. A 2024 online survey reported that 73% of job seekers said employers had ghosted them ([source](https://salarybox.in/blog/candidate-ghosting-a-growing-hiring-challenge-in-india/))." },
      { type: "p", text: "This post is for the people on the other side of that silence: recruiters and hiring managers who do not mean to ghost anyone but end up doing it anyway. It covers why it happens, a reply routine a small HR team can actually keep, how blind first reads make the process fairer, and what India's data protection law adds." },
      { type: "h2", text: "Candidate ghosting meaning" },
      { type: "p", text: "Candidate ghosting usually means an employer stops replying to a candidate partway through hiring, with no rejection and no reason. The word is also used the other way round, when candidates stop replying, skip interviews or do not join after accepting an offer. This post is about the first kind, though the two are linked: candidates who expect silence are quicker to go silent themselves." },
      { type: "p", text: "Companies usually see this as the candidate's problem. It is not. People remember which company never replied. Some of them become clients, some refer friends, and some apply again two years later when they are exactly who you need." },
      { type: "h2", text: "Where the silence comes from" },
      { type: "ul", items: [
        "Volume. When a role gets 500 applications, writing to each of them by hand is not going to happen.",
        "Nobody owns the \"no\". The recruiter moves to the next role, the hiring manager never sees the rejected ones, and the status stays \"under review\" forever.",
        "Roles go on hold. The project is delayed, the budget is frozen, and nobody wants to tell fifty candidates something that might change next week.",
        "Saying why feels risky. Many companies avoid giving reasons because they worry about saying the wrong thing.",
        "The ATS makes silence the default. If no action is taken, nothing is sent.",
      ] },
      { type: "h2", text: "A reply routine a small team can keep" },
      { type: "p", text: "You do not need software to stop ghosting. You need a rule about time and four short templates. Here is a routine that works with a spreadsheet and an email account:" },
      { type: "ol", items: [
        "Acknowledge every application within two working days. One line is enough: received, here is roughly when you will hear from us.",
        "Set a decision date per stage and write it in the tracker. Screening: within ten working days of applying. After an interview: within five working days.",
        "Every Friday, filter the tracker for anyone past their decision date with no reply sent. That list is your ghosting list; clear it before the weekend.",
        "If a role goes on hold, tell everyone in the pipeline that week. \"The role is paused; we will write again by a date\" is better than silence.",
        "After an interview, never send only a template. Two specific sentences from the interviewer turn a rejection into something the candidate can use.",
      ] },
      { type: "h2", text: "What a useful \"not now\" says" },
      { type: "p", text: "A reply does not have to be long to be respectful. Compare two versions for a made-up applicant to a data engineer role:" },
      { type: "ul", items: [
        "Version one: \"We regret to inform you that we will not be proceeding with your application at this time.\"",
        "Version two: \"Thank you for applying. For this role we needed hands-on Spark and one cloud data platform. Your resume shows strong SQL and reporting work, but we could not see Spark projects. We will not move forward this time; if you build Spark experience, we would be glad to see a new application.\"",
      ] },
      { type: "p", text: "The second version names facts from the role's requirements, not opinions about the person. That is also what keeps it safe: refer to the must-have skills you published, never to age, gender, family, college reputation or anything else that has nothing to do with the job. Keep the recruiter's private notes private." },
      { type: "h2", text: "Blind screening: fairer first reads" },
      { type: "p", text: "There is a second problem in how resumes are read. Names, photos, colleges and even addresses carry signals that have nothing to do with whether someone can do the job, and people (and AI models) react to them. Blind resume screening means the first read is only on skills and experience, and the name appears later." },
      { type: "p", text: "You can run it by hand. One person, not the screener, copies each resume's work history, projects and skills into a sheet with a candidate number, leaving out the name, photo, address, date of birth and contact details. The screener marks fit against the role's must-haves using only that sheet. Names are matched back only for people who move forward. It costs a few minutes per resume, which is why it is usually done only for the first round, and that is where it matters most." },
      { type: "h2", text: "What the DPDP Act changes" },
      { type: "p", text: "India's Digital Personal Data Protection Act also matters here. In short, candidates should be told what is collected and why, and their data should be erased once the purpose is served instead of sitting in an ATS forever. Specific rules, like a 48-hour notice before erasure, are written for very large platforms, and most obligations are expected to apply from around May 2027 ([summary](https://www.sansalegal.com/post/how-to-build-a-data-retention-and-erasure-schedule-under-the-dpdp-rules-2025)). This is our reading, not legal advice, so check with your lawyer." },
      { type: "p", text: "In practice that points to the same habits as above: a short privacy notice on the application page, a clear end date for keeping resumes of people you did not hire, and a way for a candidate to ask what you hold and to have it deleted. A tracker column with the date each resume should be deleted, checked monthly, is a reasonable start for a team without an ATS." },
      { type: "h2", text: "Measuring whether it is working" },
      { type: "ul", items: [
        "Share of applicants who received a decision, per role, after the role closed. The target is all of them.",
        "Median days from application to first reply, and from interview to decision.",
        "Number of people on the Friday ghosting list each week. It should shrink, not grow.",
        "Roles put on hold without a message to the pipeline. Ideally none.",
      ] },
      { type: "h2", text: "In FitRank Hire" },
      { type: "p", text: "[FitRank Hire](/hire/) builds these habits into the careers page. The first read is blind: the employer sees skills and experience first, and names and contact details appear only when someone is shortlisted. Nothing is rejected automatically; choosing Not now asks for a short reason, so every decision can be explained later. Every applicant gets a private link to see what was saved, check their status and delete everything at once, and applications are deleted automatically 365 days after applying. FitRank Hire is in pilot, so this describes how it is built rather than results from employers using it." },
    ],
  },
  {
    slug: "explainable-fair-ai-hiring",
    keywords: ["ai in hr", "ai in recruitment", "explainable AI hiring", "bias-free hiring", "fair AI recruitment", "human in the loop AI hiring"],
    title: "If an AI can't explain a hiring decision, it shouldn't make it",
    seoTitle: "AI in HR hiring: why it must explain every decision",
    description:
      "AI hiring tools have shown bias and now face lawsuits. Why fair AI recruitment is hard, and why explainable scores, human decisions and audit trails matter.",
    date: "2026-12-18",
    topic: "Fair AI hiring",
    blocks: [
      { type: "p", text: "In 2024 researchers at the University of Washington tested large language models on ranking resumes that were identical except for the name. The models preferred white-associated names 85% of the time and Black-associated names 9% of the time. Male-associated names were preferred 52% of the time and female-associated names 11% ([UW News](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/)). Same resume, different name, different result." },
      { type: "h2", text: "What the evidence says so far" },
      { type: "p", text: "The UW study was not a toy. According to the university's write-up, it used more than 550 real resumes and more than 500 real job listings across nine occupations, with three language models, and ran over three million comparisons. The only thing that changed was the name at the top." },
      { type: "p", text: "Courts are starting to look at the same question. In the US, a lawsuit against Workday over AI screening (Mobley v. Workday) was allowed to go ahead in May 2025 as a nationwide collective action under age discrimination law, for applicants aged 40 and over who say they were turned down through its AI tools ([Holland & Knight](https://www.hklaw.com/en/insights/publications/2025/05/federal-court-allows-collective-action-lawsuit-over-alleged)). The ruling was preliminary and Workday disputes the claims. But the direction is clear: companies will be asked to explain how their tools decided." },
      { type: "h2", text: "Where bias gets into a screening pipeline" },
      { type: "p", text: "Removing the name and gender field is a start, not a fix. Bias hides in proxies, details that stand in for a protected attribute without naming it. In Indian hiring, watch these:" },
      { type: "ul", items: [
        "Surnames and home towns, which can signal caste, religion or region even after a first name is removed.",
        "College tier, which often reflects family income and coaching access more than skill.",
        "Career gaps, which can follow maternity leave or caring for family, and so can stand in for gender.",
        "Pin codes and addresses, which can stand in for community or income.",
        "Photos, date of birth and marital status, which some resumes still include by habit.",
        "Hobbies and languages, which can quietly signal background.",
      ] },
      { type: "p", text: "A model trained on past hiring decisions learns whatever those decisions rewarded. If the past favoured one college list, the model will too, and it will do it faster and at scale." },
      { type: "h2", text: "What an explanation has to contain" },
      { type: "p", text: "Most AI tools cannot say why. A score of 72 has no reasons attached, so nobody can check whether it was fair. A useful test: could you read the explanation aloud to the candidate without embarrassment, and could they check it against their own resume?" },
      { type: "p", text: "Example, invented candidate. A weak explanation: Score 72. Good communication skills, strong profile. A useful one: Has 3 of the 4 must-have skills (Java, Spring, SQL; no Kafka found in the resume). 4 years of backend work against 3 required. Can join in 60 days; the role needs 30. Each line points to a fact a person can confirm or correct." },
      { type: "p", text: "A real explanation has three parts: the facts used, where each fact came from, and the rule or threshold that turned them into a result. If any part is missing, a reviewer cannot tell a fair decision from a lucky one." },
      { type: "h2", text: "A fairness check you can run in a spreadsheet" },
      { type: "p", text: "Fairness is not one number. Comparing groups only makes sense among people who were actually qualified, otherwise you mistake a skills difference for bias. One common screen is the four-fifths rule: a group recommended at less than 80% of the best group's rate gets a closer look." },
      { type: "p", text: "Example, made-up numbers. Among qualified applicants, 80 are from city A and 40 of them were shortlisted, a rate of 50%. 50 are from city B and 18 were shortlisted, 36%. 36 ÷ 50 = 0.72, below 0.8, so it is flagged." },
      { type: "p", text: "Now the caution. With 50 people, a few decisions move the rate a lot. Had 22 people from city B been shortlisted, the rate would be 44% and the ratio 0.88. So add a significance test before treating a gap as real, and wait until you have enough decisions for the numbers to mean something. Note too that you can only test groups you record. Many companies rightly do not store religion or caste, which means testing by proxies such as location and checking those." },
      { type: "h2", text: "Questions to ask any AI hiring vendor" },
      { type: "ol", items: [
        "Which fields does the model see? Are names, photos, dates of birth and addresses removed before it reads a resume?",
        "Can every score be traced to facts a person can check?",
        "Does the software ever reject someone without a person deciding?",
        "What is recorded for each decision, and can we export it?",
        "How do you test for bias, on which groups, and how often?",
        "What happens when the model is updated? Can we see the change and roll it back?",
      ] },
      { type: "p", text: "Automatic rejection deserves special attention. When the software rejects people before any person looks, a biased model affects thousands of people quietly, and nobody has a chance to notice. Keeping a human in the loop is the cheapest safeguard there is. We wrote about where that line belongs in [human in the loop](/blog/human-in-the-loop-ai/)." },
      { type: "h2", text: "The rules FitRank was built on" },
      { type: "p", text: "Protected attributes like gender, age, religion and caste are never stored, sent to an AI model or used as signals. Names and personal details are removed in code before any AI reads a resume. Matching uses fixed questions answered as probabilities, with the facts behind them shown on screen, and an explanation that cites a fact that does not exist is rejected. Managers accept or reject, nothing is assigned or rejected automatically, and every recommendation and decision goes into an exportable audit trail." },
      { type: "p", text: "There is also a fairness check that compares recommendation rates among qualified people by location and practice, using the four-fifths rule and a significance test. More on [trust, privacy and fairness](/security/) and [auditing AI staffing decisions](/use-cases/fair-auditable-decisions/). None of this makes bias impossible. It makes it visible and checkable, which is what bias-free hiring can honestly mean today." },
    ],
  },
  {
    slug: "ai-agent-guardrails",
    keywords: ["ai agent guardrails", "ai agent guardrails framework", "ai agent guardrails example", "human in the loop approval", "tool approval for AI agents", "AI action governance"],
    title: "Letting an AI agent act on its own is the easy part",
    seoTitle: "AI agent guardrails: a simple framework with examples",
    description:
      "AI agents can now run commands, send emails and change data. Why guardrails and human approval are hard to get right, and a typed way to check agent actions.",
    date: "2026-12-22",
    topic: "AI agent guardrails",
    blocks: [
      { type: "p", text: "Building an AI agent that can do things is easier than ever. Give it a few tools, a goal, and it will read files, run commands, update tickets and send emails. The hard part comes after: what stops it from deleting the wrong table, emailing all your customers, or spending money nobody approved?" },
      { type: "p", text: "Most teams find this out the first time an agent does something they did not expect. Usually it is small. Sometimes it is not. This post is a practical framework: sort actions by how much damage they can do, put plain code checks first, ask the model typed questions only where code cannot decide, and log enough to answer what happened the next morning." },
      { type: "h2", text: "Sort every tool by blast radius" },
      { type: "p", text: "Not every action is equal. Before writing any guardrail, list every tool the agent can call and put each in one of four tiers:" },
      { type: "ul", items: [
        "Read only: search docs, read a file, query a replica. Allow, and log.",
        "Reversible writes: create a draft, open a ticket, write to a scratch branch. Allow within limits, such as a cap per run.",
        "Irreversible or external: delete production rows, deploy, email customers, pay or buy capacity. Pause and ask a person.",
        "Never: print a secret, disable logging, change the agent's own permissions. Block in code, with no override from the model.",
      ] },
      { type: "p", text: "The tier belongs to the tool and its arguments, not only the tool. Sending an email to one colleague and to 4,200 customers is the same function with a very different blast radius. A good guardrail looks at the arguments." },
      { type: "h2", text: "What the frameworks give you" },
      { type: "p", text: "Agent frameworks now have the basic pieces. OpenAI's Agents SDK, for example, has input guardrails that block a request before the main model runs, output guardrails that check or redact the final answer, tool guardrails that check a tool call's arguments or results, and approvals that pause a run before a sensitive tool executes. A paused run returns its interruptions with a state you can resume after a person approves or rejects ([OpenAI docs](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals))." },
      { type: "p", text: "That is the right shape. What is still left to you is deciding which actions need a human, writing the checks themselves, and doing it in a way that is consistent and logged." },
      { type: "h2", text: "Put plain code in front of the model" },
      { type: "p", text: "Language models sound sure even when they are wrong. A check that asks the model whether something is safe, in free text, gets a confident answer either way. So run the cheap, exact checks first:" },
      { type: "ol", items: [
        "Allowlist the tools per agent. An agent that triages tickets has no reason to hold a deploy tool.",
        "Validate arguments against a schema. Wrong types, unknown fields and empty filters are rejected before anything runs.",
        "Write hard rules for the obvious disasters: a DELETE or UPDATE with no WHERE clause, a recipient list above a set size, a payment above a limit.",
        "Cap spend and calls per run and per day, and stop the run when a cap is hit.",
        "Scan outputs for secrets and personal data before they leave the system.",
        "Only then, for what code cannot decide, ask the model.",
      ] },
      { type: "h2", text: "A typed way to check actions" },
      { type: "p", text: "The idea we use is simple: do not ask the model an open question, ask a typed one with fixed answers, and read the probability of each answer. Before an action: allow, ask a person, or block. Before a call: cheap model or strong model. After a result: pass, retry or escalate." },
      { type: "p", text: "Example, made-up numbers. The agent wants to send a pricing update to a customer list. The check returns allow 0.31, ask a person 0.58, block 0.11. With a rule that the top answer needs at least 0.8 to act alone, this goes to a person. Then shuffle the order of the options and ask again. If the answer flips, the model is reacting to the order, not the action, and the check says not sure. Not sure always means a person decides." },
      { type: "p", text: "Typed answers make the check testable. You can build a set of past actions with known right answers, run the check on all of them, and count how often it was right when it acted and how often it held back." },
      { type: "h2", text: "Approvals people will actually read" },
      { type: "p", text: "Asking a human every time does not scale. If every step needs approval, people start clicking approve without reading. A few rules keep approvals useful:" },
      { type: "ul", items: [
        "Show the exact action and arguments, a diff for changes, and the count of records or recipients affected.",
        "Show why the check paused it, in one line.",
        "Default to deny on timeout. A request nobody answered is not a yes.",
        "Record who approved, when, and any reason given.",
        "Track the approval rate. If it sits near 100%, too many safe actions are being sent for review.",
      ] },
      { type: "h2", text: "Log for the morning after" },
      { type: "p", text: "When something goes wrong, someone will ask what the agent did and why. Each tool call should leave a record of the run, the tool, the arguments, the check results with their probabilities, the decision, who approved it if anyone, the model version, and the cost. With that, a bad action takes minutes to trace instead of a day." },
      { type: "h2", text: "Mistakes that defeat the guardrails" },
      { type: "ul", items: [
        "Using the same model, in the same conversation, to check its own plan. It tends to agree with itself.",
        "An approve-all switch added during a demo that never got removed.",
        "Secrets placed in the prompt or context, where any output check is the last line of defence.",
        "Retries that repeat side effects. Use idempotency keys so a retried email or payment happens once.",
        "Using the biggest model for every small step. It is slow and expensive, but the cheapest model is not enough for every check either, so pick per task.",
      ] },
      { type: "h2", text: "FitRank's decision API" },
      { type: "p", text: "The same typed-decision engine that answers FitRank's staffing questions is available as a [decision API](/features/in-house-decision-model/). It has built-in questions to help agents approve a tool action, choose a cheap or strong model and check a result. Each call returns a probability per option or an abstain, with per-project keys, rate limits, a monthly budget and every call logged. It is early. We have measured it on test cases with known answers, where it answered correctly when it answered and held back on the risky borderline cases, but it still needs real agent traffic before anyone should rely on it alone. That is the honest state of AI action governance today." },
    ],
  },
];

/** Every post, published or scheduled. */
export const POSTS: Post[] = [...FIRST, ...MORE_POSTS, ...SCHEDULING_POSTS, ...STORY_POSTS];

export function post(slug: string): Post | undefined {
  return PUBLISHED.find((p) => p.slug === slug);
}

export function words(p: Post): number {
  return p.blocks
    .map((b) => (b.type === "ul" || b.type === "ol" ? b.items.join(" ") : b.type === "faq" ? b.items.map((i) => `${i.q} ${i.a}`).join(" ") : b.text))
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

/**
 * 19 Nov 2026 (AdSense "low-value content" review of streamerosai.com): a post with fewer words than this is still built for
 * readers on its day, but it is noindex and left out of the sitemap, llms.txt, the feed and the image sitemap until it is
 * deepened with real substance. Add words only by adding real information; never pad a post to pass this line.
 */
export const MIN_INDEXED_WORDS = 600;
export const isShortPost = (p: Post): boolean => words(p) < MIN_INDEXED_WORDS;
/** Published posts that search engines are pointed to. */
export const INDEXED: Post[] = PUBLISHED.filter((p) => !isShortPost(p));

