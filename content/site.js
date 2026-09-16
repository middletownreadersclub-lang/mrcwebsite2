// ---------------------------------------------------------------------------
// Everything editable lives here. Change this file, push, and Vercel redeploys.
// ---------------------------------------------------------------------------

export const site = {
  name: "Middletown Readers Club",
  shortName: "MRC",
  email: "officialsammrc@gmail.com",

  // Get this from https://formspree.io — you already have it.
  formspreeId: "mkjgwdgr",

  tagline: "Read the book. Meet the author. Help them sell it.",

  intro:
    "A virtual club that reads together three to four times a month, puts the author on the call, and spends the last half hour on what actually moves copies.",

  meeting: {
    cadence: "3–4 sessions a month",
    platform: "Zoom",
    note: "Session links go out by email the day before. Nothing to install beyond Zoom.",
  },

  founder: {
    name: "Sam A.",
    role: "Founder",
  },

  host: {
    name: "Pollyanna O.",
    role: "Host",
  },

  // -------------------------------------------------------------------------
  // Photography.
  //
  // Put your files in /public/images and set the paths below. Any slot left as
  // null renders a generated atmosphere panel instead, so the site never shows
  // a broken or empty image. See public/images/README.md for what to download
  // and what each slot wants.
  //
  // Every photo is automatically pushed through the navy/brass duotone, so
  // ordinary stock photography comes out looking like it belongs to the club.
  // -------------------------------------------------------------------------
  images: {
    hero: null, // /images/hero.jpg — wide, low detail, works behind text
    about: null, // /images/about.jpg — people reading, or a reading room
    openCall: null, // /images/authors.jpg — a writer at work
    community: null, // /images/community.jpg — conversation, hands, a table
    sessions: [null, null, null], // three square-ish images for the carousel
  },

  // When you spotlight your first author, add them here and the site fills in
  // automatically. Leave the array empty and the page shows the open call.
  //
  // {
  //   title: "Book Title",
  //   author: "Author Name",
  //   date: "October 2026",
  //   blurb: "One or two sentences on the book.",
  //   takeaway: "The selling lesson that came out of the session.",
  //   accent: "brass",
  // }
  spotlights: [],

  // Shown on the Picks page while the spotlight list is empty.
  openCall: {
    heading: "We are booking our first season",
    body: "If you have a book out, or one landing in the next six months, this is the easiest room you will ever pitch. You read with us, you take questions, and we spend the back half of the call on your metadata, your list, and your launch runway.",
    cta: "Put your book forward",
  },
};

export const faqs = [
  {
    q: "What does a session actually look like?",
    a: "Ninety minutes on Zoom. The first hour is the book — discussion, then questions to the author. The last thirty minutes is the selling desk, where we work on one concrete thing the author can ship that week: a category change, a reader magnet, the first email in a welcome sequence.",
  },
  {
    q: "How often do you meet?",
    a: "Three to four times a month. We announce the schedule by email at the start of each month so you can pick the sessions you want rather than committing to all of them.",
  },
  {
    q: "Do I have to finish the book first?",
    a: "No. Plenty of members come having read a few chapters, and some come having read nothing because the topic caught them. The conversation is built to work either way, and we flag spoilers before they land.",
  },
  {
    q: "Is it free?",
    a: "Yes. Membership is free and there is nothing to upgrade to. We ask that you buy or borrow the book if you can, because that is the point of the room.",
  },
  {
    q: "I am an author. How do I get spotlighted?",
    a: "Use the form on the Picks page or email us. Self-published and small-press authors are explicitly welcome — most of what we cover on the selling desk is aimed at you. We do not charge for a spotlight.",
  },
  {
    q: "Do I need a big following to get value from the selling desk?",
    a: "No, and that is somewhat the point. The strategies we work through — metadata, categories, comp titles, an email list of a few hundred people — are the ones that work before you have an audience, not after.",
  },
  {
    q: "Can I join from outside the United States?",
    a: "Yes. We are virtual and members join from several time zones. Session times rotate across the month so the same people are not always the ones staying up late.",
  },
  {
    q: "What happens to the recordings?",
    a: "We write up each session on the blog — the best questions, the discussion prompts, and the selling takeaway — so you can catch what you missed. We do not publish full recordings without the author's written go-ahead.",
  },
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/picks", label: "Our Picks" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "The Margin" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];
