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
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "eswar.dev@outlook.com",
      resume: "#resume"
    }
  },

  projects: [
    {
      id: "task-manager",
      title: "Task Manager",
      category: "ENTERPRISE REST SERVICE",
      stack: ["Spring Boot", "REST API", "MySQL", "CRUD", "JPA/Hibernate"],
      tagline: "Scalable Task Orchestration & Management Engine",
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
      accent: "#2b4c7e"
    },
    {
      id: "banking-system",
      title: "Online Banking System",
      category: "FINANCIAL TRANSACTION ENGINE",
      stack: ["Java", "OOP", "Database-Driven", "Transactions", "ACID Compliance"],
      tagline: "High-Integrity Core Ledger & Account Transfer Platform",
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
      accent: "#3a6048"
    },
    {
      id: "youmate",
      title: "YouMate",
      category: "MODERN WEB UTILITY SUITE",
      stack: ["Next.js", "TypeScript", "Web Utilities", "SEO", "Tailored API"],
      tagline: "High-Performance Content Tools & Developer Utilities",
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
      accent: "#8b4513"
    }
  ],

  backendArchitecture: {
    title: "BACKEND ARCHITECTURE PIPELINE",
    subtitle: "HOW REQUESTS FLOW THROUGH ESWAR'S SYSTEMS",
    nodes: [
      {
        id: "client",
        name: "CLIENT / CONSUMER",
        type: "HTTP/2 & REST Requests",
        annotation: "Incoming JSON / JWT payload",
        details: "Single-Page Apps, Mobile clients, Third-party Webhooks",
        specs: "TLS 1.3 • Keep-Alive • Gzip/Brotli"
      },
      {
        id: "controller",
        name: "CONTROLLER LAYER",
        type: "Spring REST Controller",
        annotation: "Request routing & DTO validation",
        details: "Extracts URI parameters, performs @Valid checking, sanitizes inputs, enforces authorization interceptors.",
        specs: "@RestController • Bean Validation • GlobalExceptionHandler"
      },
      {
        id: "service",
        name: "SERVICE LAYER",
        type: "Business Logic & Orchestration",
        annotation: "@Transactional Boundary",
        details: "Executes business domain rules, calculates state mutations, handles multi-entity transactional integrity and rollback.",
        specs: "@Service • Propagation.REQUIRED • Isolation.READ_COMMITTED"
      },
      {
        id: "repository",
        name: "DATA ACCESS (REPOSITORY)",
        type: "Spring Data JPA / Hibernate",
        annotation: "Object-Relational Mapping (ORM)",
        details: "Constructs type-safe JPQL and native SQL queries, manages session persistence context, batches insert/update operations.",
        specs: "HikariCP Pool • L2 Cache • PagingAndSortingRepository"
      },
      {
        id: "database",
        name: "DATABASE PERSISTENCE",
        type: "MySQL Relational Engine",
        annotation: "ACID Guaranteed Storage",
        details: "InnoDB storage engine, B-Tree indexes, foreign key constraints, binary transaction logs, automated point-in-time recovery.",
        specs: "InnoDB • UTF8MB4 • ACID Compliant • Indexed Queries"
      }
    ]
  },

  techStack: [
    {
      name: "JAVA",
      category: "CORE RUNTIME",
      version: "Java 17 / 21 LTS",
      details: "OOP, Streams API, Concurrency, JVM Internals, Garbage Collection tuning",
      annotation: "public static void main(String[] args)"
    },
    {
      name: "SPRING BOOT",
      category: "FRAMEWORK",
      version: "Spring Boot 3.x",
      details: "REST APIs, Spring Data JPA, Spring Security, IoC & Dependency Injection",
      annotation: "@SpringBootApplication"
    },
    {
      name: "REST API",
      category: "API DESIGN",
      version: "OpenAPI / Swagger 3.0",
      details: "Idempotent HTTP verbs, RESTful resource naming, status codes, JSON schemas",
      annotation: "Content-Type: application/json"
    },
    {
      name: "MYSQL",
      category: "RELATIONAL DATABASE",
      version: "MySQL 8.0 / InnoDB",
      details: "Schema normalization, indexing strategies, complex JOINs, ACID transactions",
      annotation: "SELECT * FROM sys.performance_schema"
    },
    {
      name: "LINUX",
      category: "OPERATING SYSTEM",
      version: "Ubuntu / Debian / RHEL",
      details: "Shell scripting (Bash), systemd services, process monitoring, file permissions",
      annotation: "$ sudo systemctl status eswar-backend"
    },
    {
      name: "NETWORKING",
      category: "PROTOCOLS & INFRA",
      version: "TCP/IP • HTTP/HTTPS • DNS",
      details: "Sockets, load balancing fundamentals, CORS configuration, SSL/TLS certificates",
      annotation: "SYN -> SYN-ACK -> ACK"
    },
    {
      name: "GIT",
      category: "VERSION CONTROL",
      version: "Git CLI & Workflows",
      details: "Feature branching, rebase workflows, semantic commits, PR code reviews",
      annotation: "git commit -m 'feat: scalable backend pipeline'"
    },
    {
      name: "CLOUD",
      category: "INFRASTRUCTURE",
      version: "AWS / Containers",
      details: "Docker containers, environment configurations, cloud databases, CI/CD pipelines",
      annotation: "docker run -p 8080:8080 eswar/api"
    }
  ],

  experienceTimeline: [
    {
      period: "2023",
      milestone: "JAVA DEVELOPMENT FOUNDATION",
      role: "Core Software & Algorithms",
      narrative: "Deep-dived into Object-Oriented Programming, Data Structures, Multithreading, and Memory Management in Java. Built solid foundations in algorithms and software patterns."
    },
    {
      period: "2024",
      milestone: "FULL STACK INTEGRATION",
      role: "Modern Web & API Engineering",
      narrative: "Bridged client and server realms. Engineered end-to-end applications integrating responsive Next.js frontends with robust backend data pipelines."
    },
    {
      period: "2025",
      milestone: "BACKEND ARCHITECTURE",
      role: "Spring Boot & Distributed Systems",
      narrative: "Specialized in microservice architectures, Spring Boot ecosystems, relational database optimization, and high-throughput RESTful services."
    },
    {
      period: "PRESENT",
      milestone: "SOFTWARE ENGINEERING",
      role: "Production Systems & Cloud Readiness",
      narrative: "Designing scalable, maintainable enterprise backends with automated CI/CD, Linux system administration, and resilient transactional databases."
    }
  ]
};
