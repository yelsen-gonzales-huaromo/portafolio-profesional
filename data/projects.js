const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        tagline: "Plataforma de comercio electrónico end-to-end",
        description: "Plataforma de comercio electrónico completa con pasarela de pagos, gestión de inventario y panel administrativo.",
        images: [
            "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        repoLink: "#",
        demoLink: "#",
        caseStudy: {
            featured: true,
            fullDescription: "Plataforma e-commerce completa con arquitectura JAMstack. Manejo de catálogo de productos, carrito persistente, integración con Stripe para pagos, panel administrativo con métricas en tiempo real y notificaciones automáticas por email.",
            badges: ["E-Commerce", "Full Stack", "Pagos Stripe", "Tiempo Real"],
            challenge: {
                description: "El cliente necesitaba migrar de una solución legacy en PHP con problemas críticos de rendimiento y mantenibilidad.",
                bullets: [
                    "Tiempos de carga superiores a 8 segundos en páginas de catálogo",
                    "Procesamiento manual de pagos vía transferencia bancaria",
                    "Sin reportería ni métricas de ventas en tiempo real",
                    "Inventario desincronizado entre canales online y físico"
                ]
            },
            solution: {
                description: "Migración completa a stack moderno con React + Node.js, integrando Stripe para pagos automatizados y MongoDB para catálogo dinámico.",
                code: {
                    language: "javascript",
                    snippet: "// Procesamiento de pagos con Stripe\nasync function processPayment(items, customer) {\n  const session = await stripe.checkout.sessions.create({\n    payment_method_types: ['card'],\n    line_items: items.map(formatLineItem),\n    mode: 'payment',\n    success_url: `${BASE_URL}/order/success`,\n    customer_email: customer.email\n  });\n  return session.url;\n}"
                }
            },
            results: [
                { value: "85%", label: "Reducción", sublabel: "Tiempo carga (8s → 1.2s)", icon: "fas fa-bolt" },
                { value: "+340%", label: "Conversión", sublabel: "Vs sitio anterior", icon: "fas fa-chart-line" },
                { value: "24/7", label: "Disponibilidad", sublabel: "SLA 99.9%", icon: "fas fa-shield-halved" },
                { value: "50K+", label: "Órdenes", sublabel: "Procesadas / mes", icon: "fas fa-shopping-cart" }
            ],
            architecture: [
                { name: "Cliente Web", icon: "fab fa-react", description: "React + Redux" },
                { name: "API Gateway", icon: "fab fa-node-js", description: "Express + JWT" },
                { name: "Base de Datos", icon: "fas fa-database", description: "MongoDB Atlas" },
                { name: "Pagos", icon: "fab fa-stripe-s", description: "Stripe Checkout" },
                { name: "CDN / Storage", icon: "fab fa-aws", description: "AWS S3 + CloudFront" }
            ]
        },
        liveDemo: {
            url: "demo.ecommerce-platform.com",
            menu: ["Inicio", "Catálogo", "Carrito", "Órdenes", "Inventario", "Configuración"],
            stats: [
                { label: "Ventas Hoy", value: "$12,847", trend: "+18.3%", icon: "fas fa-dollar-sign" },
                { label: "Órdenes", value: "247", trend: "+12%", icon: "fas fa-shopping-cart" },
                { label: "Conversión", value: "4.8%", trend: "+0.6%", icon: "fas fa-percentage" },
                { label: "Productos", value: "1,284", trend: "Activos", icon: "fas fa-box" }
            ]
        }
    },
    {
        id: 2,
        title: "Task Management System",
        tagline: "Gestión colaborativa con tiempo real",
        description: "Sistema de gestión de tareas colaborativo con notificaciones en tiempo real y reportes analíticos.",
        images: [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        tags: ["Vue.js", "Django", "PostgreSQL", "Docker"],
        repoLink: "#",
        demoLink: "#",
        caseStudy: {
            featured: false,
            fullDescription: "Sistema colaborativo de gestión de tareas con tableros Kanban, asignación de responsables, notificaciones en tiempo real vía WebSockets, y reportes analíticos personalizables.",
            badges: ["Colaboración", "Tiempo Real", "Kanban", "Analíticas"],
            challenge: {
                description: "Equipos distribuidos requerían una herramienta unificada para coordinar trabajo sin depender de múltiples apps fragmentadas.",
                bullets: [
                    "Coordinación fragmentada entre Slack, Trello y email",
                    "Sin visibilidad del progreso global del proyecto",
                    "Difícil rastrear bloqueos y dependencias entre tareas",
                    "Reportería manual y propensa a errores"
                ]
            },
            solution: {
                description: "Single source of truth con boards Kanban, WebSockets vía Django Channels para sincronización en vivo, y dashboards con Chart.js.",
                code: {
                    language: "python",
                    snippet: "# Notificación en tiempo real con Django Channels\nclass TaskConsumer(AsyncWebsocketConsumer):\n    async def connect(self):\n        self.team_id = self.scope['url_route']['kwargs']['team_id']\n        await self.channel_layer.group_add(\n            f'team_{self.team_id}', self.channel_name)\n        await self.accept()\n\n    async def task_updated(self, event):\n        await self.send(text_data=json.dumps(event['payload']))"
                }
            },
            results: [
                { value: "60%", label: "Más Rápido", sublabel: "Ciclo de tareas", icon: "fas fa-bolt" },
                { value: "98%", label: "Adopción", sublabel: "Del equipo en 2 semanas", icon: "fas fa-users" },
                { value: "3x", label: "Productividad", sublabel: "Mediciones internas", icon: "fas fa-chart-line" },
                { value: "0", label: "Apps Externas", sublabel: "Reemplazó 4 herramientas", icon: "fas fa-check-circle" }
            ],
            architecture: [
                { name: "Frontend", icon: "fab fa-vuejs", description: "Vue.js + Vuex" },
                { name: "WebSockets", icon: "fas fa-bolt", description: "Django Channels" },
                { name: "Backend", icon: "fab fa-python", description: "Django REST" },
                { name: "Base de Datos", icon: "fas fa-database", description: "PostgreSQL" },
                { name: "Container", icon: "fab fa-docker", description: "Docker + Compose" }
            ]
        },
        liveDemo: {
            url: "demo.taskflow.app",
            menu: ["Dashboard", "Tableros", "Mis Tareas", "Calendario", "Reportes", "Equipo"],
            stats: [
                { label: "Tareas Activas", value: "47", trend: "+8 hoy", icon: "fas fa-tasks" },
                { label: "Completadas", value: "128", trend: "Esta semana", icon: "fas fa-check-circle" },
                { label: "En Progreso", value: "19", trend: "Activas", icon: "fas fa-spinner" },
                { label: "Miembros", value: "12", trend: "8 en línea", icon: "fas fa-users" }
            ]
        }
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        tagline: "Visualización de datos en tiempo real",
        description: "Dashboard interactivo para visualización de datos en tiempo real con integración de múltiples fuentes.",
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        tags: ["Next.js", "Python", "AWS", "D3.js"],
        repoLink: "#",
        demoLink: "#",
        caseStudy: {
            featured: false,
            fullDescription: "Dashboard analítico que centraliza datos de múltiples fuentes (CRM, marketing, ventas) con visualizaciones interactivas D3.js, métricas en tiempo real vía WebSockets y pipelines de datos serverless en AWS.",
            badges: ["Big Data", "Visualización", "Serverless", "ETL"],
            challenge: {
                description: "El equipo de gerencia tomaba decisiones basadas en reportes Excel desactualizados, con datos dispersos en 5 plataformas distintas.",
                bullets: [
                    "Datos fragmentados en Salesforce, HubSpot, Google Analytics y bases internas",
                    "Reportes manuales que tardaban 2 días en consolidarse",
                    "Sin visibilidad de KPIs en tiempo real",
                    "Diferentes versiones de la verdad entre departamentos"
                ]
            },
            solution: {
                description: "Pipelines ETL en AWS Lambda que ingestan datos cada 5 minutos, dashboard Next.js con D3.js para visualizaciones custom, y caching agresivo con Redis.",
                code: {
                    language: "python",
                    snippet: "# ETL serverless con AWS Lambda\ndef lambda_handler(event, context):\n    sources = ['salesforce', 'hubspot', 'analytics']\n    data = parallel_fetch(sources)\n    \n    normalized = transform_to_schema(data)\n    upsert_to_redshift(normalized)\n    invalidate_cache_keys(['dashboard:*'])\n    \n    return {'statusCode': 200, 'records': len(normalized)}"
                }
            },
            results: [
                { value: "5min", label: "Frescura", sublabel: "Vs 2 días anteriores", icon: "fas fa-bolt" },
                { value: "15", label: "Dashboards", sublabel: "Personalizados por rol", icon: "fas fa-chart-bar" },
                { value: "1 fuente", label: "De verdad", sublabel: "Para 5 departamentos", icon: "fas fa-database" },
                { value: "70%", label: "Tiempo Ahorrado", sublabel: "Reportes automáticos", icon: "fas fa-clock" }
            ],
            architecture: [
                { name: "Fuentes", icon: "fas fa-plug", description: "CRM, GA, APIs" },
                { name: "ETL Lambda", icon: "fab fa-aws", description: "Python + Pandas" },
                { name: "Data Warehouse", icon: "fas fa-warehouse", description: "AWS Redshift" },
                { name: "API", icon: "fab fa-python", description: "FastAPI + Redis" },
                { name: "Dashboard", icon: "fas fa-chart-line", description: "Next.js + D3.js" }
            ]
        },
        liveDemo: {
            url: "demo.analytics-suite.io",
            menu: ["Resumen", "Ventas", "Marketing", "Web Analytics", "Reportes", "Configuración"],
            stats: [
                { label: "Visitantes", value: "12.4K", trend: "+23% vs ayer", icon: "fas fa-users" },
                { label: "Conversiones", value: "847", trend: "+12.5%", icon: "fas fa-bullseye" },
                { label: "Ingresos", value: "$34.2K", trend: "+18.7%", icon: "fas fa-dollar-sign" },
                { label: "Bounce Rate", value: "32.1%", trend: "-4.2%", icon: "fas fa-chart-line" }
            ]
        }
    },
    {
        id: 4,
        title: "AI Chat Interface",
        tagline: "Conversaciones con IA contextual",
        description: "Interfaz de chat moderna potenciada por IA con soporte para procesamiento de lenguaje natural.",
        images: [
            "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        tags: ["TypeScript", "OpenAI API", "Tailwind"],
        repoLink: "#",
        demoLink: "#",
        caseStudy: {
            featured: false,
            fullDescription: "Interfaz de chat empresarial integrada con GPT-4 que mantiene contexto multi-turno, permite uploads de documentos, y se conecta a la base de conocimiento interna vía RAG (Retrieval Augmented Generation).",
            badges: ["IA / LLM", "RAG", "TypeScript", "OpenAI"],
            challenge: {
                description: "El equipo de soporte resolvía 200+ tickets/día respondiendo preguntas repetitivas sobre productos internos.",
                bullets: [
                    "85% de los tickets eran consultas repetitivas con respuestas en documentación",
                    "Tiempo promedio de primera respuesta: 4 horas",
                    "Base de conocimiento dispersa entre wiki, PDFs y Slack",
                    "Costo alto en tiempo de agentes humanos"
                ]
            },
            solution: {
                description: "Chatbot con GPT-4 + RAG sobre la knowledge base interna, embeddings con Pinecone, y handoff a humanos cuando la confianza es baja.",
                code: {
                    language: "typescript",
                    snippet: "// Generación con contexto RAG\nasync function answerWithContext(query: string) {\n  const embedding = await openai.embeddings.create({\n    model: 'text-embedding-3-small',\n    input: query\n  });\n  const docs = await pinecone.query(embedding, { topK: 5 });\n  const context = docs.matches.map(d => d.metadata.text).join('\\n');\n  \n  return openai.chat.completions.create({\n    model: 'gpt-4-turbo',\n    messages: buildPrompt(query, context)\n  });\n}"
                }
            },
            results: [
                { value: "78%", label: "Auto-resueltos", sublabel: "Sin agente humano", icon: "fas fa-robot" },
                { value: "12s", label: "Primera Respuesta", sublabel: "Vs 4h promedio", icon: "fas fa-bolt" },
                { value: "94%", label: "Satisfacción", sublabel: "CSAT del usuario", icon: "fas fa-smile" },
                { value: "$8K", label: "Ahorro Mensual", sublabel: "En horas-agente", icon: "fas fa-dollar-sign" }
            ],
            architecture: [
                { name: "Frontend Chat", icon: "fab fa-react", description: "Next.js + Streaming" },
                { name: "API LLM", icon: "fas fa-brain", description: "OpenAI GPT-4" },
                { name: "Vector DB", icon: "fas fa-database", description: "Pinecone" },
                { name: "Embeddings", icon: "fas fa-cogs", description: "text-embedding-3" },
                { name: "Handoff", icon: "fas fa-headset", description: "Zendesk API" }
            ]
        },
        liveDemo: {
            url: "demo.ai-chat.app",
            menu: ["Conversaciones", "Knowledge Base", "Configuración", "Analíticas", "Modelos", "Agentes"],
            stats: [
                { label: "Conversaciones Hoy", value: "1,247", trend: "+18%", icon: "fas fa-comments" },
                { label: "Auto-Resueltos", value: "78%", trend: "+5%", icon: "fas fa-robot" },
                { label: "Latencia P95", value: "1.4s", trend: "Excelente", icon: "fas fa-bolt" },
                { label: "Tokens Hoy", value: "428K", trend: "Dentro de límite", icon: "fas fa-coins" }
            ]
        }
    },
    {
        id: 5,
        title: "Crypto Portfolio Tracker",
        tagline: "Seguimiento móvil de criptomonedas",
        description: "Aplicación móvil para seguimiento de criptomonedas con alertas de precios y análisis de mercado.",
        images: [
            "https://images.unsplash.com/photo-1621416894512-5363b68d7724?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        tags: ["React Native", "Firebase", "CoinGecko API"],
        repoLink: "#",
        demoLink: "#",
        caseStudy: {
            featured: false,
            fullDescription: "App móvil cross-platform para tracking de portafolios crypto con alertas push personalizadas, análisis técnico básico, sincronización en la nube y soporte para 10,000+ monedas vía CoinGecko.",
            badges: ["Mobile", "Crypto", "Tiempo Real", "Push Notifications"],
            challenge: {
                description: "Los traders crypto necesitaban una vista unificada de sus holdings dispersos en múltiples exchanges con alertas confiables.",
                bullets: [
                    "Tracking manual de holdings en 5+ exchanges distintos",
                    "Alertas de precio inconsistentes en apps oficiales",
                    "Sin vista consolidada de ganancia/pérdida total",
                    "Apps existentes lentas y con muchos anuncios"
                ]
            },
            solution: {
                description: "App React Native nativa con Firebase Realtime DB para sync multi-dispositivo, polling inteligente de CoinGecko, y notificaciones push con FCM.",
                code: {
                    language: "javascript",
                    snippet: "// Alertas de precio con polling inteligente\nasync function checkPriceAlerts(userId) {\n  const alerts = await firestore\n    .collection('alerts')\n    .where('userId', '==', userId)\n    .where('triggered', '==', false)\n    .get();\n  \n  const prices = await coinGecko.getPrices(\n    alerts.docs.map(d => d.data().coinId)\n  );\n  \n  for (const alert of alerts.docs) {\n    if (priceMatchesCondition(prices, alert.data())) {\n      await sendPushNotification(userId, alert);\n      await alert.ref.update({ triggered: true });\n    }\n  }\n}"
                }
            },
            results: [
                { value: "10K+", label: "Monedas", sublabel: "Soportadas", icon: "fas fa-coins" },
                { value: "<1s", label: "Sync", sublabel: "Tiempo real entre devices", icon: "fas fa-sync" },
                { value: "4.7★", label: "Rating", sublabel: "App Store + Play Store", icon: "fas fa-star" },
                { value: "0", label: "Anuncios", sublabel: "Modelo freemium limpio", icon: "fas fa-ban" }
            ],
            architecture: [
                { name: "App Móvil", icon: "fas fa-mobile-screen", description: "React Native + Expo" },
                { name: "Backend", icon: "fas fa-fire", description: "Firebase Functions" },
                { name: "Base de Datos", icon: "fas fa-database", description: "Firestore" },
                { name: "Precios", icon: "fas fa-chart-line", description: "CoinGecko API" },
                { name: "Notificaciones", icon: "fas fa-bell", description: "Firebase Cloud Messaging" }
            ]
        },
        liveDemo: {
            url: "demo.crypto-tracker.app",
            menu: ["Portfolio", "Mercado", "Alertas", "Watchlist", "Historial", "Ajustes"],
            stats: [
                { label: "Valor Total", value: "$24,847", trend: "+5.2%", icon: "fas fa-wallet" },
                { label: "Ganancia 24h", value: "+$1,247", trend: "+5.27%", icon: "fas fa-arrow-trend-up" },
                { label: "Monedas", value: "12", trend: "Activas", icon: "fas fa-coins" },
                { label: "Alertas", value: "3", trend: "Pendientes", icon: "fas fa-bell" }
            ]
        }
    },
    {
        id: 6,
        title: "Smart Home Controller",
        tagline: "Control IoT del hogar inteligente",
        description: "Panel de control IoT para dispositivos inteligentes del hogar con automatización y control por voz.",
        images: [
            "https://images.unsplash.com/photo-1558002038-109177381792?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        tags: ["IoT", "Raspberry Pi", "Python", "MQTT"],
        repoLink: "#",
        demoLink: "#",
        caseStudy: {
            featured: false,
            fullDescription: "Sistema IoT casero corriendo en Raspberry Pi que orquesta 30+ dispositivos (luces, sensores, cámaras, termostato) vía MQTT, con app web responsive y rutinas automatizadas basadas en eventos.",
            badges: ["IoT", "MQTT", "Raspberry Pi", "Automatización"],
            challenge: {
                description: "Tener dispositivos de diferentes marcas que no se comunicaban entre sí, con apps fragmentadas y sin lógica de automatización avanzada.",
                bullets: [
                    "8 apps distintas para controlar dispositivos de marcas diferentes",
                    "Sin posibilidad de crear rutinas cross-marca (ej. Philips + Xiaomi)",
                    "Dependencia total de servicios cloud externos",
                    "Latencia alta al controlar dispositivos vía cloud"
                ]
            },
            solution: {
                description: "Hub central en Raspberry Pi con Mosquitto MQTT broker, integraciones custom para cada marca, y motor de reglas event-driven en Python.",
                code: {
                    language: "python",
                    snippet: "# Motor de reglas IoT con MQTT\nclass RuleEngine:\n    def on_event(self, topic, payload):\n        rules = self.match_rules(topic, payload)\n        for rule in rules:\n            if rule.condition(payload):\n                self.execute(rule.actions)\n    \n    def execute(self, actions):\n        for action in actions:\n            self.mqtt.publish(\n                action.topic,\n                action.payload,\n                qos=1\n            )"
                }
            },
            results: [
                { value: "30+", label: "Dispositivos", sublabel: "Unificados en 1 app", icon: "fas fa-plug" },
                { value: "<50ms", label: "Latencia", sublabel: "Control local sin cloud", icon: "fas fa-bolt" },
                { value: "24 rutinas", label: "Automáticas", sublabel: "Basadas en eventos", icon: "fas fa-robot" },
                { value: "100%", label: "Privacidad", sublabel: "Sin datos a la nube", icon: "fas fa-lock" }
            ],
            architecture: [
                { name: "Hub Central", icon: "fab fa-raspberry-pi", description: "Raspberry Pi 4" },
                { name: "MQTT Broker", icon: "fas fa-broadcast-tower", description: "Mosquitto" },
                { name: "Motor Lógico", icon: "fab fa-python", description: "Python + AsyncIO" },
                { name: "Dispositivos", icon: "fas fa-microchip", description: "Zigbee, WiFi, BLE" },
                { name: "Frontend", icon: "fas fa-mobile-screen", description: "Web App PWA" }
            ]
        },
        liveDemo: {
            url: "demo.smarthome-hub.local",
            menu: ["Inicio", "Habitaciones", "Dispositivos", "Rutinas", "Sensores", "Configuración"],
            stats: [
                { label: "Dispositivos", value: "34", trend: "32 online", icon: "fas fa-plug" },
                { label: "Rutinas Activas", value: "24", trend: "Auto-ejecutando", icon: "fas fa-robot" },
                { label: "Temperatura", value: "22°C", trend: "Ideal", icon: "fas fa-thermometer-half" },
                { label: "Consumo", value: "1.2kW", trend: "-15% vs ayer", icon: "fas fa-bolt" }
            ]
        }
    }
];
