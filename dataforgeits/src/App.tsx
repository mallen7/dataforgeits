import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { send } from "@emailjs/browser";
import HeaderImg from "./assets/Header.png";
import BgImg from "./assets/chip-line-background.png";
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

// Vite injects base URL – '/' in dev, your configured path in production
const basename = import.meta.env.BASE_URL;
const SITE_URL = "https://dataforgeitsolutions.com";

/**********************
 * Typewriter Utility *
 **********************/
function Typewriter({
  words,
  typingSpeed = 120,
  deletingSpeed = 60,
  pause = 2000,
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
    const currentWord = words[wordIndex];

    if (subIndex === currentWord.length && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setWordIndex((wordIndex + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="border-r-2 border-gray-100 pr-1">
      {words[wordIndex].substring(0, subIndex)}
    </span>
  );
}

/**********************
 * Layout component   *
 **********************/
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-screen flex flex-col bg-fixed bg-cover bg-center font-display text-gray-100"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <header className="flex flex-nowrap items-center justify-between gap-8 p-4">
        <a href={SITE_URL} className="inline-block">
          <img
            src={HeaderImg}
            alt="DataForge IT Solutions logo"
            className="h-24 w-auto"
          />
        </a>

        <nav className="flex gap-8 text-lg whitespace-nowrap text-gray-100">
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

      <main className="flex-grow p-8 flex flex-col gap-4">{children}</main>

      <footer className="py-6 text-center text-lg font-medium">
        New web experience coming soon
      </footer>
    </div>
  );
}

/**********************
 * Pages              *
 **********************/
function Home() {
  const terms = [
    "AI Integration",
    "Business Process Automation",
    "Executive AI Strategy",
    "DevOps Automation",
    "Data Engineering",
    "Cloud Infrastructure",
  ];

  return (
    <div className="space-y-3">
      <h1 className="text-6xl font-bold">DataForge IT Solutions</h1>
      <h2 className="text-2xl">
        Your premiere partner for <Typewriter words={terms} />
      </h2>
    </div>
  );
}

function Services() {
  const services = [
    {
      title: "AI Strategy & Roadmapping",
      icon: BrainCircuit,
      desc: "Align your business goals with practical AI initiatives. We design data-driven roadmaps, calculate ROI, and prioritise high‑impact use‑cases so you invest where it matters most.",
    },
    {
      title: "Machine Learning Development",
      icon: Code,
      desc: "Our engineers build, train, and deploy bespoke ML models—supervised, unsupervised, or deep learning—that integrate seamlessly with your products and workflows.",
    },
    {
      title: "Generative AI Solutions",
      icon: Sparkles,
      desc: "Unlock LLMs and diffusion models to automate content, code, and design. We fine‑tune on your domain data and wrap everything in robust governance layers.",
    },
    {
      title: "DevOps Automation & CI/CD",
      icon: Settings,
      desc: "Cut release cycle times with infrastructure‑as‑code, container orchestration, and self‑healing pipelines that keep compliance and security baked in.",
    },
    {
      title: "Cloud Architecture & Migration",
      icon: Cloud,
      desc: "Modernise legacy workloads or design green‑field platforms using AWS, Azure, or GCP best‑practices for cost efficiency, scalability, and governance.",
    },
    {
      title: "Data Engineering & Warehousing",
      icon: Database,
      desc: "We build data lakes, ELT pipelines, and real‑time streams that turn raw data into actionable insights using modern stacks like Snowflake, Redshift, and dbt.",
    },
    {
      title: "AI Governance & Compliance",
      icon: ShieldCheck,
      desc: "Establish policies, audit trails, and explainability frameworks that keep your AI initiatives ethical, secure, and aligned with global regulations.",
    },
    {
      title: "Intelligent Process Automation",
      icon: Workflow,
      desc: "Combine RPA with cognitive services to eliminate repetitive tasks, reduce error rates, and let your team focus on high‑value creativity and strategy.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-center">Our Services</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map(({ title, icon: Icon, desc }) => (
          <div
            key={title}
            className="space-y-3 rounded-xl bg-white/10 p-5 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <Icon size={28} className="text-blue-300 shrink-0" />
              <span className="text-xl font-bold">{title}</span>
            </div>
            <p className="text-sm leading-snug text-gray-200">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

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
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace placeholders with your EmailJS service ID, template ID, and public key.
    try {
      await send(
        "service_b7gnolr",
        "template_ry39kne",
        formData,
        "FreuttiBqtkiSu4JO"
      );
      setSent(true);
    } catch (err) {
      alert(
        "There was a problem sending your message. Please try again later."
      );
    }
  };

  if (sent) {
    return (
      <h1 className="text-3xl font-bold text-center">
        Thanks! We'll be in touch shortly.
      </h1>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-center">Contact Us</h1>
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
  );
}

/**************************************
 * App wrapper        *
 **********************/
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
