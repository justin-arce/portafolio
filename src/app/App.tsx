import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import perfilImg from "@/imports/perfil.png";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Download,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Code2,
  Briefcase,
  Layers,
  Globe,
  MessageSquare,
  Wrench,
  FileText,
  Database,
  GitBranch,
  Terminal,
  Server,
  Users,
  Settings,
  HardDrive,
  Headphones,
  Menu,
  X,
} from "lucide-react";

// ─── Intersection Observer reveal ─────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const { ref, inView } = useInView();
  const translate =
    from === "left" ? "translateX(-28px)" :
    from === "right" ? "translateX(28px)" :
    "translateY(24px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : translate,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#about", label: "Sobre mí" },
    { href: "#skills", label: "Habilidades" },
    { href: "#experience", label: "Experiencia" },
    { href: "#projects", label: "Proyectos" },
    { href: "#tools", label: "Herramientas" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-bold text-lg"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: scrolled ? "#0f172a" : "#fff",
          }}
        >
          Justin<span style={{ color: "#2563eb" }}>.</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: scrolled ? "#475569" : "rgba(255,255,255,0.8)",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#2563eb")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = scrolled
                  ? "#475569"
                  : "rgba(255,255,255,0.8)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:arcemejiasjustin@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{
            background: "#2563eb",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
          }}
        >
          <Mail size={14} />
          Contactar
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: scrolled ? "#0f172a" : "#fff" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "300px" : "0",
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-1"
              onClick={() => setOpen(false)}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blue glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)",
          transform: "translate(-20%, 20%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-6"
              style={{
                borderColor: "rgba(96,165,250,0.3)",
                color: "#93c5fd",
                background: "rgba(37,99,235,0.12)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ boxShadow: "0 0 6px #4ade80" }}
              />
              Disponible · Open to remote work
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Justin{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Arce
              </span>
            </h1>

            <p
              className="text-base md:text-lg font-medium mb-5"
              style={{ color: "#93c5fd", fontFamily: "'Outfit', sans-serif" }}
            >
              Virtual Assistant · IT Support · Administrative Support
            </p>

            <p
              className="text-base leading-relaxed mb-8 max-w-lg"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Inter', sans-serif" }}
            >
              Profesional de Costa Rica con experiencia en soporte técnico,
              atención al cliente, gestión administrativa y herramientas
              digitales. Enfocado en brindar soluciones eficientes y mejorar
              procesos.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  boxShadow: "0 4px 18px rgba(37,99,235,0.5)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Download size={15} />
                Descargar CV
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "#fff",
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Mail size={15} />
                Contactarme
              </a>
              <a
                href="#experience"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  color: "#93c5fd",
                  background: "transparent",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Ver experiencia →
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { n: "3+", label: "Años de experiencia" },
                { n: "50+", label: "Clientes atendidos" },
                { n: "100%", label: "Trabajo remoto" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {s.n}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Card behind */}
              <div
                className="absolute -inset-3 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(96,165,250,0.1))",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: "300px",
                  height: "360px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
                }}
              >
                <ImageWithFallback
                  src={perfilImg}
                  alt="Justin Arce — Virtual Assistant & IT Support Professional"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Justin Arce
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={12} style={{ color: "#93c5fd" }} />
                    <span
                      className="text-xs"
                      style={{ color: "#93c5fd", fontFamily: "'Inter', sans-serif" }}
                    >
                      Costa Rica · Remote
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-2.5 border"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  borderColor: "rgba(0,0,0,0.06)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <p
                  className="text-xs font-semibold text-slate-700"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  🌐 Trabajo Remoto
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-16">
          <a
            href="#about"
            className="text-white/30 hover:text-white/60 transition-colors"
            style={{ animation: "pulse-down 2.5s ease-in-out infinite" }}
          >
            <ChevronDown size={22} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-down {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const strengths = [
    { icon: Layers, text: "Organización y gestión de tareas" },
    { icon: MessageSquare, text: "Comunicación efectiva con clientes" },
    { icon: Wrench, text: "Resolución rápida de problemas" },
    { icon: Monitor, text: "Manejo de herramientas digitales" },
    { icon: Settings, text: "Adaptación rápida a nuevos sistemas" },
    { icon: Globe, text: "Experiencia en trabajo remoto" },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sobre mí
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Profesional orientado a resultados
            </h2>
            <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-blue-600" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal from="left" delay={100}>
            <div>
              <p
                className="text-base leading-relaxed text-slate-600 mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Soy un profesional comprometido de Costa Rica, especializado en
                brindar soporte administrativo, técnico y de atención al cliente
                de manera remota. Mi objetivo es simplificar procesos, mantener
                la comunicación fluida y agregar valor real a cada equipo con el
                que trabajo.
              </p>
              <p
                className="text-base leading-relaxed text-slate-600 mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Combino habilidades técnicas en IT Support y desarrollo web con
                competencias blandas clave para el trabajo remoto: organización,
                comunicación clara, proactividad y enfoque en resultados.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Inglés básico-intermedio", "Zona horaria CST", "Alta disponibilidad", "Autodidacta"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={160}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {strengths.map((s, i) => (
                <div
                  key={s.text}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#bfdbfe";
                    (e.currentTarget as HTMLElement).style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                    (e.currentTarget as HTMLElement).style.background = "#f8fafc";
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#dbeafe" }}
                  >
                    <s.icon size={16} style={{ color: "#2563eb" }} />
                  </div>
                  <p
                    className="text-sm font-medium text-slate-700 leading-snug pt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      title: "Administración",
      subtitle: "Gestión · Documentos · Comunicación",
      icon: Briefcase,
      color: "#2563eb",
      bg: "#eff6ff",
      items: [
        "Gestión de correos electrónicos",
        "Organización de documentos",
        "Atención al cliente",
        "Manejo de información",
        "Microsoft Office",
        "Google Workspace",
        "Excel avanzado",
      ],
    },
    {
      title: "Soporte Tecnológico",
      subtitle: "Help Desk · Hardware · Usuarios",
      icon: Monitor,
      color: "#0891b2",
      bg: "#ecfeff",
      items: [
        "Help Desk",
        "Windows",
        "Configuración de equipos",
        "Solución de problemas",
        "Soporte a usuarios",
      ],
    },
    {
      title: "Desarrollo Web",
      subtitle: "Frontend · Backend · Bases de datos",
      icon: Code2,
      color: "#7c3aed",
      bg: "#f5f3ff",
      items: ["HTML", "CSS", "JavaScript", "Node.js", "SQL", "Git / GitHub"],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 px-6"
      style={{ background: "#f8fafc" }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Habilidades
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Áreas de expertise
            </h2>
            <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-blue-600" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 120}>
              <div
                className="rounded-2xl p-6 h-full transition-shadow duration-300 hover:shadow-lg"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: cat.bg }}
                  >
                    <cat.icon size={20} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-slate-900 text-sm"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {cat.title}
                    </h3>
                    <p
                      className="text-xs text-slate-500"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <CheckCircle2
                        size={14}
                        style={{ color: cat.color, flexShrink: 0 }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  const cards = [
    {
      icon: Users,
      title: "Atención al Cliente",
      period: "2021 – 2022",
      color: "#2563eb",
      bg: "#eff6ff",
      desc: "Gestión de consultas y solicitudes de clientes con enfoque en satisfacción y resolución eficiente.",
      items: [
        "Gestión de consultas y casos de soporte",
        "Comunicación efectiva con usuarios",
        "Resolución de problemas en tiempo real",
        "Registro en sistemas de gestión (CRM)",
        "Atención multicanal: correo, teléfono y chat",
      ],
    },
    {
      icon: HardDrive,
      title: "Soporte Técnico",
      period: "2022 – Presente",
      color: "#0891b2",
      bg: "#ecfeff",
      desc: "Diagnóstico, mantenimiento y soporte técnico a usuarios residenciales y empresariales.",
      items: [
        "Mantenimiento preventivo de equipos",
        "Instalación y configuración de software",
        "Diagnóstico y solución de fallas técnicas",
        "Reparación de laptops y desktops",
        "Soporte remoto y presencial",
      ],
    },
    {
      icon: FileText,
      title: "Administración",
      period: "2021 – Presente",
      color: "#7c3aed",
      bg: "#f5f3ff",
      desc: "Organización de información, gestión de documentos y uso de sistemas digitales empresariales.",
      items: [
        "Organización y archivo de información",
        "Uso de herramientas Office y Google Workspace",
        "Gestión de correos y calendarios",
        "Manejo de sistemas administrativos",
        "Preparación de reportes y documentos",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Experiencia
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Trayectoria profesional
            </h2>
            <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-blue-600" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <div
                className="rounded-2xl p-6 flex flex-col h-full transition-shadow duration-300 hover:shadow-xl"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: c.bg }}
                  >
                    <c.icon size={22} style={{ color: c.color }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: c.bg,
                      color: c.color,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {c.period}
                  </span>
                </div>

                <h3
                  className="font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-sm text-slate-500 leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {c.desc}
                </p>

                <ul className="space-y-2 mt-auto">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: c.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: "Portafolio Profesional",
      desc: "Página web personal desarrollada con React mostrando habilidades, experiencia y proyectos ante empresas internacionales y reclutadores.",
      tags: ["React", "CSS", "JavaScript"],
      color: "#2563eb",
      img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=360&fit=crop&auto=format",
    },
    {
      title: "Arce Technologic Solutions",
      desc: "Proyecto personal de servicios tecnológicos: mantenimiento de equipos, soporte técnico y atención personalizada a clientes.",
      tags: ["HTML", "CSS", "JavaScript"],
      color: "#0891b2",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=360&fit=crop&auto=format",
    },
    {
      title: "Sistemas y Automatizaciones",
      desc: "Proyectos usando herramientas digitales y programación para automatizar procesos, gestionar datos y optimizar flujos de trabajo.",
      tags: ["Node.js", "SQL", "APIs REST"],
      color: "#7c3aed",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=360&fit=crop&auto=format",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 px-6"
      style={{ background: "#f8fafc" }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Proyectos
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Mi trabajo
            </h2>
            <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-blue-600" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div
                className="rounded-2xl overflow-hidden flex flex-col h-full group transition-shadow duration-300 hover:shadow-xl"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="relative overflow-hidden h-44 bg-slate-100">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 50%, ${p.color}22 100%)`,
                    }}
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{
                          background: `${p.color}12`,
                          color: p.color,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm text-slate-500 leading-relaxed flex-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.desc}
                  </p>

                  <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                      style={{
                        background: `${p.color}10`,
                        color: p.color,
                        border: `1px solid ${p.color}20`,
                      }}
                    >
                      <Github size={12} />
                      Código
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 text-slate-500 hover:text-slate-700"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <ExternalLink size={12} />
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tools ────────────────────────────────────────────────────────────────────
const TOOL_SVG: Record<string, string> = {
  "Microsoft Office":
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=80&h=80&fit=crop&auto=format",
  "Google Workspace":
    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&h=80&fit=crop&auto=format",
  Excel:
    "https://images.unsplash.com/photo-1516321165247-4aa89a48be4d?w=80&h=80&fit=crop&auto=format",
  Slack:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=80&h=80&fit=crop&auto=format",
  Trello:
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&auto=format",
  Canva:
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=80&h=80&fit=crop&auto=format",
};

function ToolIcon({ label, icon: Icon }: { label: string; icon?: React.ElementType }) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 group cursor-default"
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,99,235,0.12)";
        (e.currentTarget as HTMLElement).style.borderColor = "#bfdbfe";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {Icon ? (
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
          <Icon size={22} className="text-slate-500" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
          <span className="text-xl font-bold text-slate-400">
            {label.charAt(0)}
          </span>
        </div>
      )}
      <span
        className="text-xs font-medium text-slate-600 text-center leading-tight"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function Tools() {
  const tools: { label: string; icon?: React.ElementType }[] = [
    { label: "Microsoft Office", icon: FileText },
    { label: "Google Workspace", icon: Globe },
    { label: "Excel", icon: Database },
    { label: "GitHub", icon: Github },
    { label: "VS Code", icon: Terminal },
    { label: "Slack", icon: MessageSquare },
    { label: "Trello", icon: Layers },
    { label: "Canva", icon: Briefcase },
  ];

  return (
    <section id="tools" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Herramientas
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Stack de trabajo
            </h2>
            <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-blue-600" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {tools.map((t) => (
              <ToolIcon key={t.label} label={t.label} icon={t.icon} />
            ))}
          </div>
        </Reveal>

        {/* CTA band */}
        <Reveal delay={200}>
          <div
            className="mt-16 rounded-2xl p-8 md:p-12 text-center"
            style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
            }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Listo para trabajar contigo
            </h3>
            <p
              className="text-slate-400 mb-6 max-w-md mx-auto text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Disponible para posiciones remotas en atención al cliente,
              asistencia virtual, soporte técnico y administración.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:arcemejiasjustin@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.5)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Mail size={14} />
                arcemejiasjustin@gmail.com
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Download size={14} />
                Descargar CV
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "arcemejiasjustin@gmail.com",
      href: "mailto:arcemejiasjustin@gmail.com",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "justin-arce-mejias",
      href: "https://www.linkedin.com/in/justin-arce-mejias-b21263340/",
      color: "#0077b5",
      bg: "#e7f3fb",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/justin-arce",
      href: "https://github.com/justin-arce",
      color: "#0f172a",
      bg: "#f1f5f9",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Costa Rica · Remote Ready",
      href: "#",
      color: "#dc2626",
      bg: "#fef2f2",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "#f8fafc" }}
    >
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contacto
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Hablemos
            </h2>
            <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-blue-600" />
            <p
              className="text-slate-500 mt-5 text-base max-w-md mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Estoy abierto a nuevas oportunidades remotas. Respondo en menos
              de 24 horas.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 group"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${c.color}18`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${c.color}30`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: c.bg }}
                >
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-sm font-semibold text-slate-800 truncate mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {c.value}
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="ml-auto flex-shrink-0 text-slate-300 group-hover:text-slate-500 transition-colors"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{
        background: "#0f172a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
        >
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#60a5fa" }}>Justin Arce</span> · Costa Rica
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/justin-arce" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/justin-arce-mejias-b21263340/" },
            { icon: Mail, href: "mailto:arcemejiasjustin@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#60a5fa")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")
              }
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Tools />
      <Contact />
      <Footer />
    </div>
  );
}
