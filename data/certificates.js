const certificatesData = [
    {
        id: 1,
        title: "Cloud Computing: AWS · Azure · Google Cloud",
        subtitle: "Fundamentos de Nube",
        issuer: "Universidad Nacional de Ingeniería · UNI",
        issuerShort: "UNI",
        date: "Feb 2025",
        grade: "19/20",
        hours: "24 horas",
        level: "Programa de Iniciación Tecnológica PIT",
        certificateNumber: "017-0016703",
        description: "Programa intensivo en las tres principales plataformas cloud. Cubre infraestructura, almacenamiento, redes virtuales, identidad y acceso, seguridad y administración de costos en AWS, Azure y Google Cloud.",
        skills: [
            { name: "Arquitectura Cloud", icon: "fas fa-cloud", description: "Diseño de arquitecturas escalables y de alta disponibilidad en la nube." },
            { name: "Multi-Cloud", icon: "fas fa-server", description: "Servicios en AWS, Azure y Google Cloud Platform." },
            { name: "Seguridad", icon: "fas fa-shield-halved", description: "Identidad, acceso y modelo de confianza cero." }
        ],
        quote: "Esta certificación me da las bases para diseñar soluciones cloud robustas y multi-plataforma.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        type: "image",
        link: "#"
    },
    {
        id: 2,
        title: "SQL Server · Base de Datos 2",
        subtitle: "Procedimientos, Triggers y Cursores",
        issuer: "Universidad Nacional de Ingeniería · UNI",
        issuerShort: "UNI",
        date: "Mar 2025",
        grade: "17/20",
        hours: "16 horas",
        level: "Programa de Iniciación Tecnológica PIT",
        certificateNumber: "017-0020987",
        description: "Profundización en SQL Server: procedimientos almacenados, funciones (escalares, tabla, agregación, ventana), triggers (INSERT/UPDATE/DELETE) anidados y cursores con optimización de rendimiento.",
        skills: [
            { name: "Stored Procedures", icon: "fas fa-database", description: "Optimización y control de flujo en SQL Server." },
            { name: "Triggers", icon: "fas fa-bolt", description: "INSERT, UPDATE, DELETE y triggers anidados." },
            { name: "Cursores y Funciones", icon: "fas fa-code", description: "Funciones escalares, tabla, agregación y ventana." }
        ],
        quote: "Domino la lógica de servidor en SQL Server para construir capas de datos eficientes.",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        type: "image",
        link: "#"
    },
    {
        id: 3,
        title: "Machine Learning con Python",
        subtitle: "Aprendizaje Supervisado y No Supervisado",
        issuer: "Universidad Nacional de Ingeniería · UNI",
        issuerShort: "UNI",
        date: "Mar 2025",
        grade: "18/20",
        hours: "16 horas",
        level: "Programa de Iniciación Tecnológica PIT",
        certificateNumber: "017-0028879",
        description: "Fundamentos prácticos de Machine Learning con Python. Cubre numpy, pandas, matplotlib, seaborn, regresión lineal y logística, árboles de decisión, bosques aleatorios y técnicas de clustering.",
        skills: [
            { name: "Aprendizaje Supervisado", icon: "fas fa-brain", description: "Regresión, clasificación y barrido de hiperparámetros." },
            { name: "Análisis de Datos", icon: "fas fa-chart-line", description: "Pandas, NumPy y visualización con Matplotlib/Seaborn." },
            { name: "Algoritmos", icon: "fas fa-sitemap", description: "Árboles, bosques aleatorios y clustering." }
        ],
        quote: "Aplico técnicas de ML para resolver problemas de clasificación y predicción con Python.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        type: "image",
        link: "#"
    },
    {
        id: 4,
        title: "Bachiller en Ingeniería de Sistemas e Informática",
        subtitle: "Grado Académico",
        issuer: "UNASAM · Santiago Antúnez de Mayolo",
        issuerShort: "UNASAM",
        date: "Oct 2025",
        level: "Grado Académico Oficial",
        certificateNumber: "Res. 915-2025-UNASAM",
        description: "Grado académico oficial otorgado por la Universidad Nacional Santiago Antúnez de Mayolo tras 5 años de formación en ingeniería de sistemas e informática. Modalidad presencial, X ciclo completado.",
        skills: [
            { name: "Ingeniería de Software", icon: "fas fa-laptop-code", description: "Desarrollo full-stack y arquitectura de sistemas." },
            { name: "Bases de Datos", icon: "fas fa-database", description: "Modelado, administración y optimización de BD." },
            { name: "Gestión de Proyectos", icon: "fas fa-tasks", description: "Metodologías ágiles y gestión de proyectos tech." }
        ],
        quote: "Esta formación sólida es la base de todo mi trabajo profesional como ingeniero de sistemas.",
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        type: "image",
        link: "#"
    },
    {
        id: 5,
        title: "Prácticas Pre-Profesionales en Gestión de Sistemas",
        subtitle: "Oficina de Tecnologías de Información",
        issuer: "UNASAM · Oficina de Tecnologías de Información",
        issuerShort: "UNASAM",
        date: "Jul 2025",
        hours: "400 horas",
        level: "Constancia Oficial",
        description: "400 horas de práctica pre-profesional en la OGTISE de la UNASAM. Soporte técnico, gestión de bases de datos institucionales y desarrollo de módulos internos para la Unidad de Gestión de Sistemas.",
        skills: [
            { name: "Gestión de Sistemas", icon: "fas fa-server", description: "Administración de sistemas internos y trazabilidad de activos." },
            { name: "Soporte Técnico", icon: "fas fa-headset", description: "Soporte especializado a usuarios académicos." },
            { name: "Desarrollo", icon: "fas fa-code", description: "Módulos internos y scripts de automatización." }
        ],
        quote: "Mis prácticas me dieron experiencia real en entornos públicos con sistemas críticos.",
        image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        type: "image",
        link: "#"
    },
    {
        id: 6,
        title: "Inglés Básico A1",
        subtitle: "Comprensión y Producción Oral/Escrita",
        issuer: "UNASAM · Centro de Idiomas",
        issuerShort: "UNASAM",
        date: "Sep 2023",
        hours: "285 horas",
        level: "Nivel Básico A1",
        certificateNumber: "0571.1.23-0571",
        description: "Programa intensivo de 285 horas académicas en inglés básico, certificado oficialmente por la Vicerrectoría Académica de UNASAM. Comprensión y producción oral y escrita en contextos cotidianos y profesionales.",
        skills: [
            { name: "Conversación", icon: "fas fa-comments", description: "Comunicación oral en contextos cotidianos." },
            { name: "Comprensión Auditiva", icon: "fas fa-headphones", description: "Escucha activa y comprensión de inglés básico." },
            { name: "Lectura y Escritura", icon: "fas fa-book-open", description: "Lectura comprensiva y producción escrita." }
        ],
        quote: "Cuento con base sólida en inglés para comunicarme en contextos técnicos.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        type: "image",
        link: "#"
    }
];
