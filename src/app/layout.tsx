import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { shareImage, siteGraphJsonLd } from "@/lib/seo";
import { MAKER, PRODUCT, SITE_DESCRIPTION, SITE_URL, VERIFICATION } from "@/lib/site";

// One family, as in the app: weights carry the hierarchy.
// Figtree (latin, variable 400-700) is kept in the repo so the build never fetches Google Fonts;
// that fetch failed once on GitHub Actions and stopped a deploy.
const sans = localFont({
  src: "./fonts/Figtree-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
});
const display = localFont({
  src: "./fonts/Figtree-latin.woff2",
  weight: "400 700",
  variable: "--font-display",
  display: "swap",
});

const OG_ALT = "FitRank: staff scheduling recommendations with a probability and a reason for every person";

const other: Record<string, string> = {};
if (VERIFICATION.bing) other["msvalidate.01"] = VERIFICATION.bing;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FitRank: AI Staff Scheduling Your Managers Can Check",
    template: `%s | ${PRODUCT}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: PRODUCT,
  keywords: [
    "AI staff scheduling software",
    "staff scheduling software",
    "employee scheduling app",
    "workforce scheduling software",
    "AI resource management software",
    "resource allocation software for IT services",
    "employee to project matching",
    "bench management software",
    "skill gap analysis tool",
    "explainable AI scheduling",
    "human in the loop AI",
    "workforce planning software",
  ],
  authors: [{ name: MAKER.name, url: MAKER.url }],
  creator: MAKER.name,
  alternates: {
    canonical: `${SITE_URL}/`,
    types: { "text/plain": `${SITE_URL}/llms.txt` },
  },
  openGraph: {
    type: "website",
    siteName: PRODUCT,
    locale: "en_US",
    url: `${SITE_URL}/`,
    title: "FitRank: AI Staff Scheduling Your Managers Can Check",
    description: SITE_DESCRIPTION,
    images: [shareImage("", OG_ALT)],
  },
  twitter: { card: "summary_large_image", images: [shareImage("", OG_ALT)] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#EFEDF9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        {/* Google tag (GA4): the bootstrap below runs immediately (events queue in dataLayer); gtag.js and Clarity
            are injected once by the loader at the end, on first interaction or after load + idle. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search)){window.gaEvent=function(){};window.gtag=function(){};return}var w=window,d=document,q=new URLSearchParams(location.search),st=null;try{st=w.localStorage}catch(e){}function g(k){return q.get(k)||''}var ref=g('ref'),hasUtm=!!g('utm_source');var ft=null;try{ft=JSON.parse(st.getItem('ga_ft')||'null')}catch(e){}if(!ft){var rh='';try{rh=d.referrer?new URL(d.referrer).hostname:''}catch(e){}ft={s:g('utm_source')||ref||rh||'direct',m:g('utm_medium')||(ref?'share':(rh?'referral':'none')),c:g('utm_campaign')||(ref?'ref-tag':'(not set)')};try{st.setItem('ga_ft',JSON.stringify(ft))}catch(e){}}w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=gtag;gtag('js',new Date());var cfg={};if(!hasUtm&&ref){cfg.campaign_source=ref;cfg.campaign_medium='share';cfg.campaign_name='ref-tag'}gtag('config','G-64FMK4BV5Z',cfg);w.gaEvent=function(n,p){try{p=p||{};p.first_source=ft.s;p.first_medium=ft.m;p.first_campaign=ft.c;p.cta_page=p.cta_page||location.pathname;gtag('event',n,p)}catch(e){}};d.addEventListener('click',function(e){try{var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'',n='';if(/^(https?:)?\\/\\/(wa\\.me|api\\.whatsapp\\.com)|^whatsapp:/i.test(h))n='whatsapp_click';else if(/^mailto:/i.test(h))n='email_click';else if(/^tel:/i.test(h))n='phone_click';else if(/\\.(apk|ipa)([?#]|$)/i.test(h))n='app_download';else if(/\\.md([?#]|$)/i.test(h))n='template_download';var u=h;if(!n){var x=new URL(h,location.href);if(x.origin!==location.origin||!/^https?:$/.test(x.protocol))return;n=a.closest('header,nav')?'nav_click':a.closest('footer')?'footer_click':'internal_link_click';u=x.pathname}w.gaEvent(n,{cta_text:(a.textContent||'').trim().slice(0,60),link_url:u.slice(0,100)});}catch(x){}},true);})();",
          }}
        />
        {/* Third-party loader: gtag.js (GA4) and Microsoft Clarity (free heatmaps and session replay; forms carry data-clarity-mask,
            so typed text is hidden). Injected once, at the first of: user interaction, load + idle, or 4 s after load. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){if(/^(localhost|127.0.0.1|0.0.0.0)$/.test(location.hostname)&&!/ga_test=1/.test(location.search)){window.gaEvent=function(){};window.gtag=function(){};return}var w=window,d=document,done=false;function go(){if(done)return;done=true;var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-64FMK4BV5Z';d.head.appendChild(s);(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(w,d,'clarity','script','z8awz5dimz');}['pointerdown','keydown','scroll','touchstart'].forEach(function(e){w.addEventListener(e,go,{once:true,passive:true})});function onLoad(){setTimeout(go,4000);if('requestIdleCallback' in w)w.requestIdleCallback(go,{timeout:3000});else setTimeout(go,3000)}if(d.readyState==='complete')onLoad();else w.addEventListener('load',onLoad,{once:true})})();",
          }}
        />
      </head>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <JsonLd data={siteGraphJsonLd} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
