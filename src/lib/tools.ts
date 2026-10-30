// Free scheduling tools: a page each under /tools/. The hub, footer, routes and llms.txt read this list.
export type Tool = { slug: string; name: string; title: string; description: string };

export const TOOLS: Tool[] = [
  {
    slug: "schedule-generator",
    name: "Free automatic schedule generator",
    title: "Free Automatic Schedule Generator Online",
    description:
      "Free automatic schedule generator online: enter people, shifts, availability and shift limits, get a weekly schedule in your browser, copy it or download CSV.",
  },
  {
    slug: "employee-schedule-template-excel",
    name: "Employee schedule template (Excel)",
    title: "Employee Schedule Template (Excel), Free Download",
    description:
      "Free employee schedule template for Excel: a weekly and a monthly sheet with shift codes, hours per person and coverage by formula. Download the .xlsx, no sign-up.",
  },
];

export const TEMPLATE_FILE = "/templates/employee-schedule-template.xlsx";
