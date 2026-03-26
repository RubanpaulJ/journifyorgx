import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { connectDb } from "./lib/db.js";
import { env } from "./lib/env.js";
import { User } from "./models/User.js";
import { Service } from "./models/Service.js";
import { Project } from "./models/Project.js";
import { Testimonial } from "./models/Testimonial.js";
import { BlogPost } from "./models/BlogPost.js";
import { Order } from "./models/Order.js";

await connectDb();

async function upsertAdmin() {
  const passwordHash = await bcrypt.hash(env.ADMIN_SEED_PASSWORD, 10);
  const admin = await User.findOneAndUpdate(
    { email: env.ADMIN_SEED_EMAIL },
    { name: "Admin", email: env.ADMIN_SEED_EMAIL, passwordHash, role: "admin" },
    { new: true, upsert: true }
  );
  return admin;
}

async function seedServices() {
  const services = [
    {
      slug: "final-year-project-development",
      title: "Final Year Project Development",
      description:
        "End-to-end project guidance and development for CSE/IT/AI/ML/Web, including documentation and presentation support.",
      priceFromInr: 7999
    },
    {
      slug: "ieee-paper-writing",
      title: "IEEE Paper Writing",
      description:
        "Paper structuring, plagiarism-safe writing, formatting and revision cycles aligned to IEEE templates.",
      priceFromInr: 5999
    },
    {
      slug: "scopus-journal-assistance",
      title: "Scopus Journal Assistance",
      description:
        "Journal selection shortlisting, scope match, submission checklist, and revision guidance for indexed journals.",
      priceFromInr: 9999
    },
    {
      slug: "implementation-with-source-code",
      title: "Implementation with Source Code",
      description:
        "Research idea implementation with clean code, dataset handling, evaluation metrics and documentation.",
      priceFromInr: 8999
    },
    {
      slug: "plagiarism-report",
      title: "Plagiarism Reduction & Report",
      description:
        "Plagiarism reduction guidance with a detailed report and rewriting support where required.",
      priceFromInr: 1499
    },
    {
      slug: "ppt-viva-preparation",
      title: "PPT & Viva Preparation",
      description:
        "High-impact PPT, viva Q&A preparation and project demo plan tailored to your institution guidelines.",
      priceFromInr: 999
    }
  ];

  for (const s of services) {
    await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true });
  }
}

async function seedPortfolio() {
  const projects = [
    {
      title: "AI Fake Currency Detection",
      slug: "ai-fake-currency-detection",
      techStack: ["Python", "OpenCV", "CNN", "Flask"],
      abstract:
        "A vision-based pipeline to classify counterfeit currency notes using feature extraction and CNN-based classification with a simple web interface.",
      screenshots: ["/sample/ai-currency-1.png", "/sample/ai-currency-2.png"],
      isPublic: true
    },
    {
      title: "Online PDF Editor",
      slug: "online-pdf-editor",
      techStack: ["React", "Node.js", "PDF-lib", "MongoDB"],
      abstract:
        "A web app to upload PDFs, annotate, merge, split, and export with user accounts, history and secure file handling.",
      screenshots: ["/sample/pdf-editor-1.png", "/sample/pdf-editor-2.png"],
      isPublic: true
    },
    {
      title: "Blockchain Voting System",
      slug: "blockchain-voting-system",
      techStack: ["Solidity", "Ethereum", "React", "Hardhat"],
      abstract:
        "A transparent voting platform using smart contracts with voter verification, immutable tallying and an admin-controlled election lifecycle.",
      screenshots: ["/sample/blockchain-vote-1.png"],
      isPublic: true
    }
  ];

  for (const p of projects) {
    await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }
}

async function seedTestimonials() {
  const testimonials = [
    {
      name: "Ananya S",
      college: "ABC Engineering College",
      rating: 5,
      quote:
        "They helped me finalize my topic, implement the code and prepare the PPT. The review rounds were super helpful.",
      isPublic: true
    },
    {
      name: "Rahul K",
      college: "XYZ Institute of Technology",
      rating: 5,
      quote:
        "Paper formatting and plagiarism guidance saved me a lot of time. The submission checklist was spot on.",
      isPublic: true
    },
    {
      name: "Meera P",
      college: "State University",
      rating: 4,
      quote:
        "Good communication and clear deliverables. The implementation documentation was very professional.",
      isPublic: true
    }
  ];

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonials);
}

async function seedBlog() {
  const posts = [
    {
      slug: "how-to-publish-paper-in-ieee",
      title: "How to publish paper in IEEE (2026 guide)",
      excerpt:
        "A student-friendly checklist covering topic selection, paper structure, formatting, submission steps and revision cycles.",
      tags: ["IEEE", "paper-writing", "final-year"],
      content: `
## Overview
Publishing in IEEE can be smooth if you treat it like a process: topic → novelty → implementation → writing → formatting → submission → revisions.

## Fast checklist
- Pick a realistic problem with measurable results
- Ensure originality (no copy-paste)
- Provide implementation + experiments
- Use IEEE template and follow reference style
- Prepare responses for reviewer comments

## Common mistakes
- Weak problem statement
- No baseline comparisons
- Poor figures and tables
- Inconsistent citations

If you want expert support, we can help from idea to implementation to publication guidance.
      `.trim()
    },
    {
      slug: "scopus-journals-list-2026",
      title: "Scopus journals list 2026: how to shortlist safely",
      excerpt:
        "How to shortlist Scopus-indexed journals without falling for fake or mismatched outlets, plus a scope-fit method.",
      tags: ["Scopus", "journals", "submission"],
      content: `
## Don’t rely on random lists
Always validate indexing and scope before submission.

## Shortlisting method
- Match your keywords with journal aims & scope
- Check recent papers for similarity to your domain
- Review acceptance timelines and fees transparently

## Safety tips
- Avoid suspicious 'guaranteed acceptance' claims
- Verify publisher and indexing sources

We provide journal selection & submission guidance (not acceptance guarantees).
      `.trim()
    }
  ];

  for (const p of posts) {
    await BlogPost.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }
}

async function seedOrders() {
  const existing = await Order.countDocuments();
  if (existing > 0) return;
  await Order.create({
    trackingCode: `PP-${nanoid(8).toUpperCase()}`,
    customerName: "Demo Student",
    customerEmail: "demo@student.com",
    customerPhone: "9999999999",
    package: "standard",
    topic: "Research paper implementation + IEEE writing",
    amountInr: 15999,
    status: "in_progress",
    timelineNotes: ["Requirement received", "Consultation done", "Implementation started"]
  });
}

const admin = await upsertAdmin();
await seedServices();
await seedPortfolio();
await seedTestimonials();
await seedBlog();
await seedOrders();

// eslint-disable-next-line no-console
console.log("[seed] done", { adminEmail: admin.email });
process.exit(0);

