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

    summary: `Là một Kỹ sư Dữ liệu và Nhà phát triển Phần mềm, tôi chuyên sâu vào việc ứng dụng các công nghệ AI tiên tiến để giải quyết những bài toán phức tạp. Với nền tảng vững chắc về phát triển phần mềm và kiến thức chuyên sâu từ chứng chỉ <strong>IBM AI Engineering</strong>, tôi có năng lực xây dựng, huấn luyện và triển khai các mô hình học máy hiệu quả. Kinh nghiệm của tôi trải dài từ Computer Vision, NLP cho đến các hệ thống AI tạo sinh (Generative AI), với mục tiêu mang lại giá trị và sự đột phá cho sản phẩm.`,

    projects: [
        {
            title: "Crypto Dashboard & AI Report Generator",
            status: "active",
            description: "Hệ thống dashboard toàn diện tích hợp LangGraph Multi-Agent để phân tích thị trường tiền mã hóa và tự động tạo báo cáo thông minh. Ứng dụng sử dụng kiến trúc Agent-based với LangGraph orchestration để cung cấp insights sâu sắc và báo cáo tự động cho nhà đầu tư.",
            highlight: "🤖 LangGraph Multi-Agent System: Triển khai hệ thống multi-agent với LangGraph để orchestrate các AI agents chuyên biệt - Market Analysis Agent, Report Generation Agent. Tích hợp Google Gemini API với workflow automation để tạo ra báo cáo phân tích thị trường chi tiết và có thể hành động.",
            technologies: ["Python", "LangGraph", "Google Gemini API", "Flask","SQLAlchemy", "JavaScript"],
            links: {
                github: "https://github.com/thichuong/Crypto-Dashboard-and-AI-ReportGenerator",
                demo: "https://crypto-dashboard-app-thichuong.vercel.app"
            }
        },
        {
            title: "MobileAppTranslate",
            dateRange: "10/2022 - 02/2023",
            description: "Ứng dụng di động dịch thuật đa năng, tích hợp nhận dạng giọng nói, OCR thời gian thực và nhận diện vật thể.",
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
            description: "Dự án game Mario phát triển bằng C++ và DirectX 10, tái hiện lại các cơ chế gameplay kinh điển với đồ họa và âm thanh chất lượng cao.",
            achievements: [
                { icon: "fas fa-trophy", text: "Physics Engine tự phát triển" }
            ],
            technologies: ["C++", "DirectX 10", "Game Development"],
            links: {
                github: "https://github.com/thichuong/GameMariobros3"
            }
        },
        {
            title: "Paint Application",
            dateRange: "08/2019 - 01/2020",
            description: "Ứng dụng vẽ tương tự Microsoft Paint với giao diện thân thiện và các công cụ vẽ đa dạng, xây dựng trên nền tảng WinForms.",
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
