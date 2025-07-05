/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { send } from "@emailjs/browser";

// ── assets (PNG + WebP) ───────────────────────────────────────────────
import HeaderImg from "./assets/Header.png";
import LogoWebp1x from "./assets/Header@1x.webp";
import LogoWebp768 from "./assets/Header@768.webp";

import BgImg from "./assets/chip-line-background.png";
import BgWebp1x from "./assets/Bg@1x.webp";
import BgWebp768 from "./assets/Bg@768.webp";

// ── icons ────────────────────────────────────────────────────────────
import {
  BrainCircuit,
  Code,
  Sparkles,
  Settings,
  Cloud,
  Database,
  ShieldCheck,
  Workflow,
} from "lucide-react";

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const basename = import.meta.env.BASE_URL; // vite base
const SITE_URL = "https://dataforgeitsolutions.com"; // canonical url

/********************************
 * Typewriter Utility
 ********************************/
function Typewriter({
  words,
  typingSpeed = 120,
  deletingSpeed = 60,
  pause = 2_000,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (subIndex === current.length && !deleting) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setWordIndex((wordIndex + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="font-extrabold border-r-2 border-gray-100 pr-1">
      {words[wordIndex].substring(0, subIndex)}
    </span>
  );
}

/********************************
 * Layout
 ********************************/
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ─────── Schema.org Organization markup ─────── */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DataForge IT Solutions LLC",
            url: SITE_URL,
            logo: `${SITE_URL}/assets/Header@1x.webp`,
          })}
        </script>
      </Helmet>

      {/* ─────── Site layout ─────── */}
      <div className="relative flex min-h-screen w-screen flex-col font-display text-gray-100">
        {/* responsive background */}
        <picture>
          <source
            srcSet={`${BgWebp1x} 1920w, ${BgWebp768} 768w`}
            type="image/webp"
          />
          <img
            src={BgImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* dim overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/40" />

        {/* Header */}
        <header className="relative flex flex-nowrap items-center justify-between gap-8 p-4">
          <a href={SITE_URL} className="block h-24 w-auto">
            <picture>
              <source
                srcSet={`${LogoWebp1x} 400w, ${LogoWebp768} 200w`}
                type="image/webp"
              />
              <img
                src={HeaderImg}
                alt="DataForge IT Solutions logo"
                className="h-full w-auto"
                decoding="async"
              />
            </picture>
          </a>

          <nav className="flex gap-8 whitespace-nowrap text-lg">
            <a href={SITE_URL} className="hover:underline">
              Home
            </a>
            <Link to="/services" className="hover:underline">
              Services
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </header>

        <main className="relative flex flex-grow flex-col gap-4 p-8">
          {children}
        </main>

        <footer className="relative py-4 text-center text-sm text-gray-400">
          © 2023 DataForge IT Solutions LLC
        </footer>
      </div>
    </>
  );
}

/********************************
 * Home Page (+ SEO meta)
 ********************************/
function Home() {
  const terms = [
    "AI Integration",
    "Business Process Automation",
    "Executive AI Strategy",
    "DevOps Automation",
    "Data Engineering",
    "Cloud Infrastructure",
  ];

  const highlights = [
    {
      title: "Executive AI Advisory",
      icon: BrainCircuit,
      desc: "Board-level guidance on AI investments, ethics, and risk—turning buzzwords into bottom-line impact.",
    },
    {
      title: "Custom AI Solutions",
      icon: Sparkles,
      desc: "We architect, train, and deploy models tailored to your data, wrapped in secure, scalable APIs.",
    },
    {
      title: "Full-Stack Delivery",
      icon: Settings,
      desc: "From data pipelines to MLOps, we operationalise AI so it runs, scales, and improves continuously.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI &amp; Software Development | DataForge IT Solutions</title>
        <meta
          name="description"
          content="End-to-end AI, DevOps automation, and data-engineering services that turn innovation into bottom-line impact."
        />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="DataForge IT Solutions" />
        <meta
          property="og:description"
          content="Strategic advisory and full-stack delivery of AI, cloud, and automation solutions."
        />
      </Helmet>

      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-6xl font-bold">DataForge IT Solutions</h1>
          <h2 className="text-2xl">
            Your premiere partner for <Typewriter words={terms} />
          </h2>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          {highlights.map(({ title, icon: Icon, desc }) => (
            <div
              key={title}
              className="max-w-xs space-y-2 rounded-xl bg-white/10 p-5 text-center backdrop-blur-md"
            >
              <Icon size={32} className="mx-auto text-blue-300" />
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-gray-200">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/********************************
 * Services Page (+ SEO meta)
 ********************************/
function Services() {
  const services = [
    {
      title: "AI Strategy & Roadmapping",
      icon: BrainCircuit,
      desc: "Align your business goals with practical AI initiatives. We design data-driven roadmaps, calculate ROI, and prioritise high-impact use-cases.",
    },
    {
      title: "Machine Learning Development",
      icon: Code,
      desc: "We build, train, and deploy bespoke ML models that integrate seamlessly with your products and workflows.",
    },
    {
      title: "Generative AI Solutions",
      icon: Sparkles,
      desc: "Unlock LLMs and diffusion models to automate content, code, and design—securely and at scale.",
    },
    {
      title: "DevOps Automation & CI/CD",
      icon: Settings,
      desc: "Cut release cycles with IaC, container orchestration, and self-healing pipelines.",
    },
    {
      title: "Cloud Architecture & Migration",
      icon: Cloud,
      desc: "Modernise legacy workloads or build green-field platforms on AWS, Azure, or GCP.",
    },
    {
      title: "Data Engineering & Warehousing",
      icon: Database,
      desc: "From ELT to real-time streams, we convert raw data into actionable insight.",
    },
    {
      title: "AI Governance & Compliance",
      icon: ShieldCheck,
      desc: "Policies, audit trails, and explainability frameworks that keep your AI ethical and secure.",
    },
    {
      title: "Intelligent Process Automation",
      icon: Workflow,
      desc: "Combine RPA with cognitive services to eliminate repetitive tasks and boost productivity.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services | DataForge IT Solutions</title>
        <meta
          name="description"
          content="Explore our full-stack services: AI strategy, ML development, DevOps automation, cloud architecture, and more."
        />
        <link rel="canonical" href={`${SITE_URL}/services`} />
      </Helmet>

      <section className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-center text-4xl font-bold">Our Services</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map(({ title, icon: Icon, desc }) => (
            <div
              key={title}
              className="space-y-3 rounded-xl bg-white/10 p-5 backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <Icon size={28} className="shrink-0 text-blue-300" />
                <span className="text-xl font-bold">{title}</span>
              </div>
              <p className="text-sm leading-snug text-gray-200">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/********************************
 * Contact Page (+ SEO meta)
 ********************************/
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch {
      alert(
        "There was a problem sending your message. Please try again later."
      );
    }
  };

  if (sent)
    return (
      <>
        <Helmet>
          <title>Message Sent | DataForge IT Solutions</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-center text-3xl font-bold">
          Thanks! We’ll be in touch shortly.
        </h1>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Contact | DataForge IT Solutions</title>
        <meta
          name="description"
          content="Reach out to discuss AI integration, automation, or any data challenge. We'd love to help."
        />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
      </Helmet>

      <section className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-4xl font-bold">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="rounded-md bg-white/10 p-3 backdrop-blur-md placeholder-gray-300"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="rounded-md bg-white/10 p-3 backdrop-blur-md placeholder-gray-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="rounded-md bg-white/10 p-3 backdrop-blur-md placeholder-gray-300 md:col-span-2"
            />
            <input
              type="text"
              name="type"
              placeholder="Type of Project"
              value={formData.type}
              onChange={handleChange}
              className="rounded-md bg-white/10 p-3 backdrop-blur-md placeholder-gray-300 md:col-span-2"
            />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md bg-white/10 p-3 backdrop-blur-md placeholder-gray-300"
          />

          <button
            type="submit"
            className="mx-auto block rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}

/********************************
 * App Wrapper
 ********************************/
export default function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
