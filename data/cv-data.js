// CV Data Configuration
const CVData = {
    personal: {
        name: "Thi Thanh Chương",
        title: "DEVELOPER / DATA ENGINEER",
        contact: {
            address: "13/1 ấp Chợ, xã Phú Phụng, Vĩnh Long",
            email: "thichuong22022000@gmail.com",
            github: "https://github.com/thichuong",
            kaggle: "https://www.kaggle.com/chuongthi"
        }
    },

    skills: {
        programming: [
            { name: "Python", level: 95 },
            { name: "JavaScript", level: 90 },
            { name: "C#", level: 85 },
            { name: "C++", level: 80 }
        ],
        ai: [
            { name: "Machine Learning", level: "expert" },
            { name: "Deep Learning", level: "expert" },
            { name: "LangGraph", level: "expert" },
            { name: "LangChain", level: "advanced" },
            { name: "Multi-Agent Systems", level: "advanced" },
            { name: "NLP", level: "advanced" },
            { name: "Computer Vision", level: "advanced" },
            { name: "Generative AI", level: "expert" },
            { name: "PyTorch", level: "advanced" },
            { name: "MLOps", level: "intermediate" }
        ],
        frameworks: [
            { name: ".NET", level: "expert" },
            { name: "Flask", level: "advanced" },
            { name: "Flutter", level: "advanced" },
            { name: "ASP.NET", level: "intermediate" },
            { name: "GitHub", level: "expert" },
            { name: "Cloud", level: "advanced" }
        ],
        database: [
            { name: "SQL", level: "expert" },
            { name: "PostgreSQL", level: "advanced" },
            { name: "NoSQL", level: "intermediate" },
            { name: "Google Gemini API", level: "expert" },
            { name: "Data Visualization", level: "advanced" }
        ]
    },

    education: [
        {
            institution: "ĐH CNTT - ĐHQG TP.HCM",
            degree: "Kỹ thuật Phần mềm",
            startDate: "2018-09",
            endDate: "2022-07"
        }
    ],

    certificates: [
        {
            name: "IBM Data Science",
            url: "https://coursera.org/share/75ad6ec2a87cd7649f05993d738b5cfe",
            date: "2023-06"
        },
        {
            name: "IBM AI Engineering",
            url: "https://coursera.org/share/0bbe63bf39a4d44f5978396166de16d6",
            date: "2025-07"
        }
    ],

    experience: [
        {
            position: "Freelancer",
            startDate: "2023-08",
            endDate: "2025-07"
        }
    ],

    summary: `I am a Data Engineer and Software Developer specializing in applying advanced AI technologies to solve complex problems. With a strong foundation in software development and in-depth knowledge from the <strong>IBM AI Engineering</strong> certificate, I am capable of building, training, and deploying effective machine learning models. My experience spans Computer Vision, NLP, and generative AI systems, with the goal of delivering value and breakthrough results for products.`,

    projects: [
        {
            title: "Crypto Dashboard & AI Report Generator",
            status: "active",
            description: "A comprehensive dashboard system integrating a LangGraph multi-agent architecture to analyze cryptocurrency markets and automatically generate intelligent reports. The application uses an agent-based design with LangGraph orchestration to provide deep insights and automated reporting for investors.",
            highlight: "🤖 LangGraph Multi-Agent System: Implemented a multi-agent system using LangGraph to orchestrate specialized AI agents — Market Analysis Agent and Report Generation Agent. Integrated Google Gemini API with workflow automation to produce detailed, actionable market analysis reports.",
            technologies: ["Python", "LangGraph", "Google Gemini API", "Flask","SQLAlchemy", "JavaScript"],
            links: {
                github: "https://github.com/thichuong/Crypto-Dashboard-and-AI-ReportGenerator",
                demo: "https://crypto-dashboard-app-thichuong.vercel.app"
            }
        },
        {
            title: "MobileAppTranslate",
            dateRange: "10/2022 - 02/2023",
            description: "A versatile mobile translation app integrating speech recognition, real-time OCR, and object detection.",
            features: [
                { icon: "fas fa-microphone", text: "Speech Recognition" },
                { icon: "fas fa-camera", text: "Real-time OCR" },
                { icon: "fas fa-eye", text: "Object Detection" }
            ],
            technologies: ["Flutter", "Google ML Kit", "Dart"],
            links: {
                github: "https://github.com/thichuong/MobileAppTranslate"
            }
        },
        {
            title: "Game Mario Bros 3 Clone",
            dateRange: "10/2020 - 01/2021",
            description: "A Mario-style game developed in C++ using DirectX 10, recreating classic gameplay mechanics with high-quality graphics and sound.",
            achievements: [
                { icon: "fas fa-trophy", text: "Custom-built physics engine" }
            ],
            technologies: ["C++", "DirectX 10", "Game Development"],
            links: {
                github: "https://github.com/thichuong/GameMariobros3"
            }
        },
        {
            title: "Paint Application",
            dateRange: "08/2019 - 01/2020",
            description: "A painting application similar to Microsoft Paint with a user-friendly interface and a variety of drawing tools, built on WinForms.",
            features: [
                { icon: "fas fa-palette", text: "Multi-layer Support" },
                { icon: "fas fa-brush", text: "Custom Brushes" }
            ],
            technologies: ["C#", ".NET Framework", "WinForms"],
            links: {
                github: "https://github.com/thichuong/Paint"
            }
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CVData;
}
