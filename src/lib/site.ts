export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitrank.streamerosai.com"
).replace(/\/$/, "");

export const PRODUCT = "FitRank";

export const SITE_TAGLINE = "Staffing decisions you can check";

export const SITE_DESCRIPTION =
  "FitRank ranks your people for open tasks with typed AI decisions: rules in code, a probability for every answer, and a manager who makes every final call.";

export const CONTACT = {
  email: "contact@streamerosai.com",
  phone: "8208335028",
  phoneDisplay: "+91 82083 35028",
  phoneHref: "tel:+918208335028",
  city: "Hyderabad",
  country: "India",
} as const;

export const MAKER = {
  name: "Yaseen Khatib",
  url: "https://yaseenkhatib.streamerosai.com",
  // Same @id the portfolio uses, so search engines join the two sites into one entity.
  id: "https://yaseenkhatib.streamerosai.com/#person",
  jobTitle: "Senior Full-Stack AI Engineer",
  sameAs: [
    "https://www.linkedin.com/in/yaseen-yk",
    "https://github.com/Yaseenyk",
  ],
} as const;

/** Search-console verification tokens. Empty strings are left out of the page. */
export const VERIFICATION = {
  google: "",
  bing: "",
} as const;
