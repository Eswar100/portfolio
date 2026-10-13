export const PORTFOLIO_DATA = {
  developer: {
    name: "ESWAR",
    role: "BACKEND / SOFTWARE DEVELOPER",
    headline: "Architecting resilient distributed systems, robust APIs, and performant database architectures.",
    coreStack: ["JAVA", "SPRING BOOT", "DATABASES", "LINUX", "CLOUD"],
    location: "Bengaluru, India (Remote Available)",
    status: "READY FOR PRODUCTION",
    stats: [
      { label: "PRIMARY STACK", value: "Java & Spring Boot" },
      { label: "ARCHITECTURE", value: "REST / Microservices" },
      { label: "PERSISTENCE", value: "MySQL / Relational ACID" },
      { label: "SYSTEM RUNTIME", value: "Linux / JVM Engine" }
    ],
    social: {
      github: "https://github.com/Eswar100",
      linkedin: "https://linkedin.com/in/eswar-srinivasan",
      email: "eswar911@outlook.com"
    }
  },

  projects: [
    {
      id: "illvora-interiors",
      title: "Illvora Interiors",
      category: "LIVE COMMERCIAL WEBSITE",
      stack: ["Next.js", "React", "Responsive Web", "SEO Architecture"],
      tagline: "Live Commercial Web Presence & Interior Design Showcase",
      image: "/assets/projects/illvora-interiors.png",
      description: "Designed and developed a live website for Illvora Interiors, an interior design brand. The website is publicly accessible and used by real users, providing an online presence for its interior design services and offerings.",
      architectureHighlight: "Multi-section production website with interactive design catalog, cost estimation workflow, and customer inquiry integration.",
      endpoints: [
        { method: "GET", path: "/", desc: "Homepage & interactive design catalog" },
        { method: "GET", path: "/#estimate", desc: "Interactive interior cost estimator" },
        { method: "GET", path: "/#consult", desc: "Consultation booking & contact inquiry" }
      ],
      metrics: {
        status: "Production Live",
        deployment: "Public Access",
        platform: "Mobile & Desktop"
      },
      live: "https://www.illvorainteriors.com/",
      accent: "#121316"
    },
    {
      id: "task-manager",
      title: "Task Manager",
      category: "ENTERPRISE REST SERVICE",
      stack: ["Spring Boot", "REST API", "MySQL", "CRUD", "JPA/Hibernate"],
      tagline: "Scalable Task Orchestration & Management Engine",
      image: "/assets/projects/task-manager.png",
      description: "A production-grade RESTful web service architected with Spring Boot and MySQL. Implements layered architecture, comprehensive CRUD operations, DTO validation, and automated transaction rollback handling.",
      architectureHighlight: "Layered Spring MVC with Hibernate second-level caching & HikariCP connection pooling.",
      endpoints: [
        { method: "POST", path: "/api/v1/tasks", desc: "Create task with payload validation" },
        { method: "GET", path: "/api/v1/tasks?status=ACTIVE", desc: "Paginated query with indexed filter" },
        { method: "PUT", path: "/api/v1/tasks/{id}", desc: "Atomic status update & audit logging" },
        { method: "DELETE", path: "/api/v1/tasks/{id}", desc: "Soft deletion with cascade handling" }
      ],
      metrics: {
        latency: "< 12ms",
        reliability: "99.98%",
        coverage: "88% JUnit"
      },
      github: "https://github.com",
      live: "https://demo.eswar.dev/tasks",
      accent: "#121316"
    },
    {
      id: "banking-system",
      title: "Online Banking System",
      category: "FINANCIAL TRANSACTION ENGINE",
      stack: ["Java", "OOP", "Database-Driven", "Transactions", "ACID Compliance"],
      tagline: "High-Integrity Core Ledger & Account Transfer Platform",
      image: "/assets/projects/banking-system.png",
      description: "A secure, database-driven financial application built on pure Object-Oriented principles in Java. Features strict ACID transaction isolation levels, ledger reconciliation, thread-safe concurrent account debits/credits, and cryptographic password hashing.",
      architectureHighlight: "Optimistic locking with row-level mutex locks preventing race conditions in high-throughput transfer queues.",
      endpoints: [
        { method: "POST", path: "/api/v1/transfer", desc: "Atomic transfer across dual account ledgers" },
        { method: "GET", path: "/api/v1/accounts/{num}/statement", desc: "Cryptographically verified ledger audit" },
        { method: "POST", path: "/api/v1/auth/session", desc: "HMAC signed token & role-based access control" }
      ],
      metrics: {
        concurrency: "Thread-Safe",
        isolation: "SERIALIZABLE",
        audit: "100% Immutable"
      },
      github: "https://github.com",
      live: "https://demo.eswar.dev/banking",
      accent: "#121316"
    },
    {
      id: "youmate",
      title: "YouMate",
      category: "MODERN WEB UTILITY SUITE",
      stack: ["Next.js", "TypeScript", "Web Utilities", "SEO", "Tailored API"],
      tagline: "High-Performance Content Tools & Developer Utilities",
      image: "/assets/projects/youmate.png",
      description: "A fast, SEO-optimized web application built with Next.js and TypeScript. Delivers intuitive utilities with server-side rendering, sub-second TTFB, dynamic OpenGraph card generation, and streamlined workflow automation.",
      architectureHighlight: "Edge server caching with incremental static regeneration (ISR) and strict TypeScript type boundaries.",
      endpoints: [
        { method: "GET", path: "/api/metadata/inspect", desc: "Automated SEO meta tag extraction" },
        { method: "POST", path: "/api/transform/stream", desc: "Edge streaming pipeline for media payloads" }
      ],
      metrics: {
        lighthouse: "99/100",
        ttfb: "45ms",
        seoScore: "100%"
      },
      github: "https://github.com",
      live: "https://youmate.app",
      accent: "#121316"
    }
  ],

  techStack: [
    {
      name: "JAVA",
      category: "CORE RUNTIME",
      version: "Java 17 / 21 LTS",
      logo: "/assets/tech/java.svg",
      details: "OOP, Streams API, Concurrency, JVM Internals, Garbage Collection tuning",
      annotation: "public static void main(String[] args)"
    },
    {
      name: "SPRING BOOT",
      category: "FRAMEWORK",
      version: "Spring Boot 3.x",
      logo: "/assets/tech/springboot.svg",
      details: "REST APIs, Spring Data JPA, Spring Security, IoC & Dependency Injection",
      annotation: "@SpringBootApplication"
    },
    {
      name: "MYSQL",
      category: "RELATIONAL DATABASE",
      version: "MySQL 8.0 / InnoDB",
      logo: "/assets/tech/mysql.svg",
      details: "Schema normalization, indexing strategies, complex JOINs, ACID transactions",
      annotation: "SELECT * FROM sys.performance_schema"
    },
    {
      name: "PYTHON",
      category: "SCRIPTING & DATA",
      version: "Python 3.11+",
      logo: "/assets/tech/python.svg",
      details: "Automation, data scripts, backend utilities, microservices & async APIs",
      annotation: "def handle_transaction(ctx):"
    },
    {
      name: "LINUX",
      category: "OPERATING SYSTEM",
      version: "Ubuntu / Debian / RHEL",
      logo: "/assets/tech/linux.svg",
      details: "Shell scripting (Bash), systemd services, process monitoring, file permissions",
      annotation: "$ sudo systemctl status eswar-backend"
    },
    {
      name: "GIT",
      category: "VERSION CONTROL",
      version: "Git CLI & Workflows",
      logo: "/assets/tech/git.svg",
      details: "Feature branching, rebase workflows, semantic commits, PR code reviews",
      annotation: "git commit -m 'feat: scalable backend pipeline'"
    },
    {
      name: "DOCKER & CLOUD",
      category: "INFRASTRUCTURE",
      version: "Docker / AWS Containers",
      logo: "/assets/tech/docker.svg",
      details: "Containerization, multi-stage builds, cloud deployments, CI/CD pipelines",
      annotation: "docker run -p 8080:8080 eswar/api"
    },
    {
      name: "REST API",
      category: "API DESIGN",
      version: "OpenAPI / Swagger 3.0",
      logo: "/assets/tech/restapi.svg",
      details: "Idempotent HTTP verbs, RESTful resource naming, status codes, JSON schemas",
      annotation: "Content-Type: application/json"
    }
  ]
};
