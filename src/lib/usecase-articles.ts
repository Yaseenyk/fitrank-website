// Long-form articles for the /use-cases/<slug>/ pages. Same block model as the blog.
// Everything product-related is grounded in lib/content.ts and lib/features.ts; worked examples are
// labelled illustrative and use made-up people and numbers.
import type { Block } from "@/lib/blog";
import { ARTICLES_A } from "@/lib/usecase-articles-a";
import { ARTICLES_B } from "@/lib/usecase-articles-b";

export const UC_ARTICLES: Record<string, Block[]> = {
  ...ARTICLES_A,
  ...ARTICLES_B,
};
