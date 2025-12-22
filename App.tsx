import React, { useState, useEffect, useRef } from 'react';
import { Language, ExperienceItem, TechSkill, AwardItem, EduItem } from './types';
import BackgroundCanvas from './components/BackgroundCanvas';
import Guestbook from './components/Guestbook';

// --- DATA ---

const experienceData: ExperienceItem[] = [
  {
    id: 'exp1',
    companyCn: '吉利汽车研究院 (Geely Auto)',
    companyEn: 'Geely Auto Research Institute',
    titleCn: '大数据产品策划主管工程师',
    titleEn: 'Big Data Product Planning Supervisor',
    period: '2025.03 - PRESENT',
    descCn: [
      '核心职责：负责 AIGC 技术在品牌营销端的落地应用，搭建智能化内容生产管线。',
      'AIGC 工作流架构设计：主导开发企业级 AI 模型及工具，部署 AI 数字人与自动化脚本，实现广告视频规模化生产，大幅降低成本。',
      'AI 创意矩阵构建：利用 Gemini, Runway, Midjourney 等工具批量产出高视觉冲击力创意视频，解决素材匮乏痛点，提升 ROI。',
      '技术赋能营销：推动从“传统拍摄”向“智能生成”转型，确立团队技术领先地位。'
    ],
    descEn: [
      'Core Responsibility: Lead the application of AIGC technology in brand marketing and build intelligent content production pipelines.',
      'AIGC Workflow Design: Led development of enterprise AI models/tools, deployed AI Digital Humans and automated scripts for scalable ad video production, significantly reducing costs.',
      'AI Creative Matrix: Utilized Gemini, Runway, Midjourney to mass-produce high-impact creative videos, solving asset scarcity and boosting ROI.',
      'Tech-Driven Marketing: Drove the transition from traditional shooting to intelligent generation, establishing technical leadership within the group.'
    ]
  },
  {
    id: 'exp2',
    companyCn: '吉利雷达 (Geely Radar)',
    companyEn: 'Geely Radar',
    titleCn: '视觉内容专家 & 导演',
    titleEn: 'Visual Content Expert & Director',
    period: '2023.03 - 2025.03',
    descCn: [
      '核心职责：全权负责品牌视觉体系构建与高端用户故事影像化呈现。',
      '品牌视觉定义：主导策划拍摄《超级皮卡》系列战役，通过电影级镜头语言将 RD6 车型与户外生活方式深度绑定。',
      '高端用户叙事：负责用户纪录片制作，挖掘情感，提升品牌人文温度。',
      '全案执行与品控：作为导演/摄影/剪辑核心主创，统筹跨部门协作，确保输出物料符合全球化标准。'
    ],
    descEn: [
      'Core Responsibility: Fully responsible for building the brand visual system and visualizing high-end user stories.',
      'Brand Visual Identity: Led the "Super Pickup" campaign, using cinematic language to deeply bind the RD6 model with outdoor lifestyles.',
      'User Storytelling: Produced user documentaries to mine emotional connections and enhance brand warmth.',
      'Execution & Quality Control: Served as lead Director/DP/Editor, coordinating cross-functional teams to ensure global brand standards.'
    ]
  },
  {
    id: 'exp3',
    companyCn: '中天模型 (Zhongtian Models)',
    companyEn: 'Zhongtian Models',
    titleCn: '新媒体内容运营经理',
    titleEn: 'New Media Content Operation Manager',
    period: '2021.08 - 2023.02',
    descCn: [
      '增长黑客：全权负责官方抖音账号运营，通过数据分析优化内容，实现单平台单月涨粉 1.7W+。',
      '产品内容化：将硬核产品说明转化为高互动创意视频，提升完播率与转化率。'
    ],
    descEn: [
      'Growth Hacking: Managed official TikTok (Douyin) accounts, optimizing content via data analysis to achieve 17k+ followers growth in a single month.',
      'Product Contentization: Transformed hardcore product specs into interactive creative videos, boosting completion and conversion rates.'
    ]
  },
  {
    id: 'exp4',
    companyCn: '零跑汽车 (Leapmotor)',
    companyEn: 'Leapmotor',
    titleCn: '视觉传播主管',
    titleEn: 'Visual Communication Supervisor',
    period: '2018.03 - 2021.02',
    descCn: [
      '爆款事件营销：ChinaJoy 期间策划现场短视频，抖音斩获 12万+ 播放与 2.7万+ 点赞。',
      '供应商管理与 QC：把控 TVC 及 UGC 内容质量，确保百万级预算项目完美交付。'
    ],
    descEn: [
      'Viral Event Marketing: Planned on-site short videos during ChinaJoy, achieving 120k+ views and 27k+ likes on TikTok.',
      'Supplier Management & QC: Controlled quality for TVC and UGC content, ensuring perfect delivery of million-budget projects.'
    ]
  },
  {
    id: 'exp5',
    companyCn: '早期经历 (浙江文广 / 一典文化)',
    companyEn: 'Early Career (ZMG / Yidian)',
    titleCn: '核心主创 / 广电编导',
    titleEn: 'Core Creator / TV Director',
    period: '2013.02 - 2018.03',
    descCn: [
      '代表作《完美男人——入殓师》实现全网播放量破亿。',
      '为“弹个车”制作广告片单日播放超 42 万。',
      '参与《中国好声音》海选宣传片等大型广电项目制作。'
    ],
    descEn: [
      'Representative work "The Perfect Man" achieved over 100 million views across the web.',
      'Created ads for "Tan Ge Che" with 420k+ daily views.',
      'Participated in major TV projects including "The Voice of China" audition promos.'
    ]
  }
];

const skillsData: TechSkill[] = [
  { name: 'Runway Gen-2/3 & Kling AI', level: 98, highlight: true, category: 'AI' },
  { name: 'Midjourney & Stable Diffusion', level: 95, highlight: true, category: 'AI' },
  { name: 'Google Gemini & LLMs', level: 90, highlight: false, category: 'AI' },
  { name: 'Premiere / AE / CapCut', level: 98, highlight: false, category: 'PRO' },
  { name: 'Sony CineLine / Ronin / DJI drone&FPV', level: 94, highlight: false, category: 'PRO' },
  { name: 'Unreal Engine 5 & C4D', level: 80, highlight: false, category: 'PRO' }
];

const awardsData: AwardItem[] = [
  { titleCn: 'LiblibAI 认证“Lib 原创者”', titleEn: 'LiblibAI Certified Creator' },
  { titleCn: '新片场签约供稿人', titleEn: 'New Studios Signed Contributor' },
  { titleCn: '网易/抖音认证音乐人', titleEn: 'NetEase/TikTok Certified Musician' },
  { titleCn: '亚洲微电影大赛“金海棠奖”', titleEn: 'Asian Micro-film Festival "Golden Begonia" Award' },
  { titleCn: '浙江青年微电影大赛 金奖', titleEn: 'Zhejiang Youth Micro-film Festival Gold Award' },
];

const educationData: EduItem = {
  schoolCn: '杭州师范大学钱江学院',
  schoolEn: 'Hangzhou Normal University Qianjiang College',
  degreeCn: '播音与主持艺术 | 文学学士',
  degreeEn: 'Broadcast & Hosting Art | Bachelor of Arts',
  period: '2009.09 - 2013.06'
};

const secondHorizonImages = [
  "https://i.ibb.co/nMZ2prKH/compressed.jpg",
  "https://i.ibb.co/93nwyjFQ/compressed.jpg",
  "https://i.ibb.co/RG4dYTdP/compressed-1.jpg",
  "https://i.ibb.co/fGySmPft/compressed-seedream-4-high-res-fal-b-A-black-car-is-parke.jpg",
  "https://i.ibb.co/4wKBKND5/compressed-see-dream4.jpg",
  "https://i.ibb.co/b5yYTFGs/compressed-retouch-2024093020205305.jpg",
  "https://i.ibb.co/23C3hBB1/compressed-retouch-2024093020202954.jpg",
  "https://i.ibb.co/q3vLt0wh/compressed-retouch-2024093020200828.jpg",
  "https://i.ibb.co/8g5Brh73/compressed-retouch-2024093020185078.jpg",
  "https://i.ibb.co/ycKpBcwy/compressed-retouch-2024041023271366.jpg",
  "https://i.ibb.co/fGxVVgq2/compressed-retouch-2024030112544775.jpg",
  "https://i.ibb.co/0yfZHDdt/compressed-retouch-2024012919414161.jpg",
  "https://i.ibb.co/p6cMdn3x/compressed-retouch-2023071716500659.jpg",
  "https://i.ibb.co/bjnVzStG/compressed-retouch-2022101021113505.jpg",
  "https://i.ibb.co/pB3XWb7S/compressed-mmexport1679835284179-2.jpg",
  "https://i.ibb.co/SXqcd9K0/compressed-mmexport1676347429109.jpg",
  "https://i.ibb.co/gLWRFsPz/compressed-mmexport1667478647462.jpg",
  "https://i.ibb.co/8gbMvx26/compressed-mmexport1667139486483.jpg",
  "https://i.ibb.co/zdZCWnM/compressed-mmexport1666789117344.jpg",
  "https://i.ibb.co/fzPkTpwv/compressed-mmexport1665577080323.jpg",
  "https://i.ibb.co/DjKQzmx/compressed-mmexport1665486944342.jpg",
  "https://i.ibb.co/Xfs4d7pB/compressed-mmexport1663665828609.jpg",
  "https://i.ibb.co/m5txBC3T/compressed-mmexport1663567113446.jpg",
  "https://i.ibb.co/20dwHyb5/compressed-mmexport1662365711994.jpg",
  "https://i.ibb.co/Z6pKgmQZ/compressed-mmexport1662089036630.jpg",
  "https://i.ibb.co/G4ZCLVWH/compressed-mmexport1661494200585.jpg",
  "https://i.ibb.co/4RZXQzq5/compressed-mmexport1661306645553.jpg",
  "https://i.ibb.co/DfxZSmfV/compressed-mmexport1661230124367.jpg",
  "https://i.ibb.co/KxNz2MdN/compressed-gemini-3-pro-image-preview-nano-banana-pro-b-A-car-was-parked-at.jpg",
  "https://i.ibb.co/HDVHdjYg/compressed-gemini-3-pro-image-preview-nano-banana-pro-a-Generate-a-vehicle-i.jpg",
  "https://i.ibb.co/gFVz0R59/compressed-gemini-3-pro-image-preview-nano-banana-pro-a-A-car-was-parked-at.jpg",
  "https://i.ibb.co/C3YK9JFr/compressed-gemini-3-pro-image-preview-nano-banana-pro-a-A-car-was-parked-at-1.jpg",
  "https://i.ibb.co/3ykd19Xc/compressed-gemini-3-pro-image-preview-nano-banana-pro-a-A-black-car-parked-u.jpg",
  "https://i.ibb.co/V0M7TYfn/compressed-gemini-3-pro-image-preview-nano-banana-pro-a-A-black-car-is-parke.jpg",
  "https://i.ibb.co/pjKNB6xX/compressed-dbfd0b132c9d8de92preview-jpeg-tplv-a9rns2rl98-image-pre-watermark-1-5.jpg",
  "https://i.ibb.co/MkPRWBSX/compressed-d16b935ee87848eaa3a6b97041447d7b-jpeg-tplv-a9rns2rl98-image-raw.jpg",
  "https://i.ibb.co/Zp5RnQkW/compressed-banana1.jpg",
  "https://i.ibb.co/39ytdcdZ/compressed-banana-pro.jpg",
  "https://i.ibb.co/Wvm1zRKM/compressed-Wechat-IMG528.jpg",
  "https://i.ibb.co/3msWtjMb/compressed-Wechat-IMG527.jpg",
  "https://i.ibb.co/BHZr27zr/compressed-Wechat-IMG462.jpg",
  "https://i.ibb.co/Kxc9Mqzq/compressed-Wechat-IMG461.jpg",
  "https://i.ibb.co/vCWSXfK9/compressed-Wechat-IMG460.jpg",
  "https://i.ibb.co/VY3D2SZy/compressed-Wechat-IMG459.jpg",
  "https://i.ibb.co/BVMVV3Cf/compressed-Wechat-IMG458.jpg",
  "https://i.ibb.co/MDbf61gx/compressed-Screenshot-2024-09-30-20-06-13-679-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/qLsGXrwL/compressed-Screenshot-2024-09-30-20-05-27-322-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/j9F54Sp2/compressed-Screenshot-2024-09-30-20-04-57-027-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/N63rC7L3/compressed-Screenshot-2024-09-30-20-04-34-925-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/m5Z9rcsQ/compressed-Screenshot-2024-09-30-19-51-07-359-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/m5C4Cpy4/compressed-Screenshot-2024-09-30-19-50-36-300-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/ynQGgSv5/compressed-Screenshot-2024-09-30-19-50-12-255-com-miui-gallery-edit.jpg",
  "https://i.ibb.co/whggxxKs/compressed-IMG-20240930-201111.jpg",
  "https://i.ibb.co/jPMM4jPJ/compressed-IMG-20240930-201100.jpg",
  "https://i.ibb.co/6ctQvWD6/compressed-IMG-20240930-201050.jpg",
  "https://i.ibb.co/zv0cQNQ/compressed-IMG-20240930-201038.jpg",
  "https://i.ibb.co/dJ6t8dbK/compressed-IMG-20240930-201029.jpg",
  "https://i.ibb.co/B7ZWzBJ/compressed-IMG-20240930-201018.jpg",
  "https://i.ibb.co/VbLtKZ0/compressed-IMG-20240930-201009.jpg",
  "https://i.ibb.co/1tgf6K8f/compressed-IMG-20240930-200955.jpg",
  "https://i.ibb.co/7xP078Sc/compressed-IMG-20240930-200945.jpg",
  "https://i.ibb.co/S7nRkbRp/compressed-IMG-20240930-200934.jpg",
  "https://i.ibb.co/7d052C1M/compressed-IMG-20240930-195402.jpg",
  "https://i.ibb.co/SDCkBP4K/compressed-IMG-20240930-195346.jpg",
  "https://i.ibb.co/PvwYBhHj/compressed-IMG-20240930-195332.jpg",
  "https://i.ibb.co/dJb7drjt/compressed-IMG-20240930-195317.jpg",
  "https://i.ibb.co/C304vnVV/compressed-IMG-20240930-195305.jpg",
  "https://i.ibb.co/y9Fkzbd/compressed-IMG-20221009-144255-2.jpg",
  "https://i.ibb.co/VY0dykB2/compressed-65b3f11ffa4b41fc89f9699afacb97ae-jpeg-tplv-a9rns2rl98-image-raw.jpg",
  "https://i.ibb.co/7fz29K6/compressed-4d9e880fff40415b99221d1f969989ce-jpeg-tplv-a9rns2rl98-image-raw.jpg",
  "https://i.ibb.co/q3FMP1Qc/compressed-34998323-f856b6ba15520c138924a64d5fe4c571933e09141425c450f7e49bce3c19fee8.jpg",
  "https://i.ibb.co/ksSLPjzf/compressed-289979787-ed0d6f6636a02db901b3867a9cc24570950fbf3abc3c0bc51058a8a15b58c4cc.jpg",
  "https://i.ibb.co/CKfFtYj1/compressed-2335975e6597a2d56a46af1547bf275d265018111b10badb297d3896871c6c1b.jpg",
  "https://i.ibb.co/vxhHdPvz/compressed-1766382198235.jpg",
  "https://i.ibb.co/BVtPZjJZ/compressed-1766382198208.jpg",
  "https://i.ibb.co/wF40wjsJ/compressed-1766382198198.jpg",
  "https://i.ibb.co/Z6Dv1wVg/compressed-1766382198187.jpg",
  "https://i.ibb.co/GvZk6H80/compressed-1766382198176.jpg",
  "https://i.ibb.co/5gWXTcz7/compressed-1766382198166.jpg",
  "https://i.ibb.co/Wv5mSmJD/compressed-1766382198156.jpg",
  "https://i.ibb.co/xS1MTsV6/compressed-1766382198086.jpg",
  "https://i.ibb.co/G3fHmDxK/compressed-1766382198076.jpg",
  "https://i.ibb.co/t0VMPP3/compressed-1766382198048.jpg",
  "https://i.ibb.co/F4vjQs81/compressed-1766382198029.jpg",
  "https://i.ibb.co/MDQ67QGm/compressed-1766382198019.jpg",
  "https://i.ibb.co/YTcf9dP6/compressed-1766382197999.jpg",
  "https://i.ibb.co/gMvzc9kk/compressed-1766382197990.jpg",
  "https://i.ibb.co/Psq88sRP/compressed-1766382197979.jpg",
  "https://i.ibb.co/5x23FgK9/compressed-1766382197960.jpg",
  "https://i.ibb.co/RkvFhTRK/compressed-1766382197950.jpg",
  "https://i.ibb.co/pvW3FgQ5/compressed-1766382197932.jpg",
  "https://i.ibb.co/9HB3LBWq/compressed-1766382197922.jpg",
  "https://i.ibb.co/93937Lw3/compressed-1766382197893.jpg",
  "https://i.ibb.co/DPmmQ8Cs/compressed-1766382197873.jpg",
  "https://i.ibb.co/S7N9QJQ8/compressed-1766382197861.jpg",
  "https://i.ibb.co/8L83hvwr/compressed-1766382197839.jpg",
  "https://i.ibb.co/bMJbHdZ4/compressed-1766382197829.jpg",
  "https://i.ibb.co/wFLxM5yy/compressed-1766382197819.jpg",
  "https://i.ibb.co/m5SYFv9Q/compressed-1766382197809.jpg",
  "https://i.ibb.co/ync978wY/compressed-1766382197788.jpg",
  "https://i.ibb.co/jZwdQVF9/compressed-1766382197778.jpg",
  "https://i.ibb.co/n8kDCG6D/compressed-1766382197768.jpg",
  "https://i.ibb.co/2YfMSyTf/compressed-1766382197738.jpg",
  "https://i.ibb.co/VpN0s0tC/compressed-1766382197715.jpg",
  "https://i.ibb.co/kgmTdgsQ/compressed-1766382197675.jpg",
  "https://i.ibb.co/dwn1wwk7/compressed-1766382197646.jpg",
  "https://i.ibb.co/60dt1YYy/compressed-1766382197636.jpg",
  "https://i.ibb.co/FLGrFT58/compressed-1766382197627.jpg",
  "https://i.ibb.co/9JLp5yL/compressed-1766382197618.jpg",
  "https://i.ibb.co/BKwCxfWR/compressed-1766382197609.jpg",
  "https://i.ibb.co/9mhbNDMt/compressed-1766382197599.jpg",
  "https://i.ibb.co/svc7cCP5/compressed-1766382197570.jpg",
  "https://i.ibb.co/VpN0s0tC/compressed-1766382197715.jpg"
];

const workItemsOriginal = [
  {
    id: 'p35X-kv1ek4',
    titleCn: '极氪009光辉版AIGC视频-塔克拉玛干沙漠篇',
    titleEn: 'ZEEKR 009 Radiant Edition AIGC Video - Taklamakan Desert Chapter',
    statsCn: ' AIGC全流程制作',
    statsEn: 'AIGC full-process production',
    descCn: '利用 Gemini, Runway, Midjourney等AI平台，打造的高视觉冲击力视频。',
    descEn: 'Videos with high visual impact created using AI platforms such as Gemini, Runway, and Midjourney.',
    useHqThumb: false
  },
  {
    id: 'fMoDHmxzzM4',
    titleCn: '极氪009光辉版AIGC视频-喜马拉雅雪山篇',
    titleEn: 'ZEEKR 009 Radiance Edition AIGC Video - Himalayan Snow Mountain Chapter',
    statsCn: 'AIGC 自动化工作流',
    statsEn: 'AIGC Workflow',
    descCn: '利用 Gemini, Runway, Midjourney等AI平台，打造的高视觉冲击力视频。',
    descEn: 'Videos with high visual impact created using AI platforms such as Gemini, Runway, and Midjourney.',
    useHqThumb: true
  },
  {
    id: '817C7H8Tjm8',
    titleCn: '吉利银河A7 AIGC视频 - For the journey within',
    titleEn: 'Geely Galaxy A7 AIGC Video - For the journey within',
    statsCn: 'For the journey within',
    statsEn: 'For the journey within',
    descCn: '探索内在之旅 - 概念创意视频',
    descEn: 'Exploring the Inner Journey - Concept Creative Video',
    useHqThumb: true
  },
  {
    id: 'HHsxlZnsQv8',
    titleCn: '商业视觉项目展示 I',
    titleEn: 'Commercial Visual Project I',
    statsCn: '全流程主创',
    statsEn: 'Full Stack Creator',
    descCn: '核心主创：负责策划、拍摄、剪辑及后期全流程。',
    descEn: 'Lead Creator: Responsible for planning, shooting, editing, and post-production.',
    useHqThumb: true
  },
  {
    id: 'cf46s1C6Wfo',
    titleCn: '商业视觉项目展示 II',
    titleEn: 'Commercial Visual Project II',
    statsCn: '导演 / 摄影 / 剪辑',
    statsEn: 'Dir / DP / Edit',
    descCn: '深度参与视觉呈现，把控镜头语言与后期调色。',
    descEn: 'Deeply involved in visual presentation, controlling camera language and color grading.',
    useHqThumb: true
  },
  {
    id: 'XjO9hTzDBWY',
    titleCn: '商业视觉项目展示 III',
    titleEn: 'Commercial Visual Project III',
    statsCn: '全案策划与执行',
    statsEn: 'Planning & Execution',
    descCn: '从创意构思到成片交付，精准传达品牌理念。',
    descEn: 'From creative concept to final delivery, accurately conveying brand philosophy.',
    useHqThumb: true
  },
  {
    id: 'Lafpc0y6eQ0',
    titleCn: '商业视觉项目展示 IV',
    titleEn: 'Commercial Visual Project IV',
    statsCn: '视觉叙事与后期',
    statsEn: 'Visual Storytelling',
    descCn: '结合实拍与后期特效，打造高质感影像作品。',
    descEn: 'Combining live-action with VFX to create high-quality visual works.',
    useHqThumb: true
  },
  {
    id: 'Vbm-42Z7gEk',
    titleCn: '商业视觉项目展示 V',
    titleEn: 'Commercial Visual Project V',
    statsCn: '影像艺术创作',
    statsEn: 'Cinematic Art',
    descCn: '探索光影与构图的极致，展现独特视觉风格。',
    descEn: 'Exploring the extremes of light and composition, showcasing unique visual style.',
    useHqThumb: true
  },
  {
    id: 'more',
    titleCn: 'MORE',
    titleEn: 'MORE',
    statsCn: '点击进入 了解更多',
    statsEn: 'Click to explore more',
    descCn: '进入第二视界 保持对此生物持续探索',
    descEn: 'Enter the second horizon, continue exploring this creature',
    useHqThumb: false
  }
];

// No longer duplicating items. Using exactly 9 cards.
const workItems = workItemsOriginal;

// --- 3D Carousel Component ---
const Carousel3D: React.FC<{ language: Language; onMoreClick: () => void }> = ({ language, onMoreClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dotsContainerRef = useRef<HTMLDivElement>(null);
    
    // Card Dragging State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const hasDragged = useRef(false);

    // Dot Scrubbing State
    const [isScrubbing, setIsScrubbing] = useState(false);

    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateCards = () => {
        const container = containerRef.current;
        if (!container) return;
        
        const center = container.scrollLeft + container.clientWidth / 2;
        const cards = container.querySelectorAll('.carousel-card');
        let closestIndex = 0;
        let minDistance = Infinity;
        
        cards.forEach((card, index) => {
            const el = card as HTMLElement;
            const cardCenter = el.offsetLeft + el.offsetWidth / 2;
            const dist = (center - cardCenter) / (container.clientWidth / 1.5); // Normalize distance
            const absDist = Math.abs(dist);

            if (absDist < minDistance) {
                minDistance = absDist;
                closestIndex = index;
            }
            
            // Calculate scale and rotation based on distance from center
            const scale = Math.max(0.85, 1 - absDist * 0.3);
            const rotateY = dist * -35; // Inverse rotation for "surround" effect
            const zIndex = 100 - Math.round(absDist * 10);
            const opacity = Math.max(0.4, 1 - absDist * 0.8);
            
            el.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`;
            el.style.zIndex = `${zIndex}`;
            el.style.opacity = `${opacity}`;
            
            // Highlight effect for center card
            if (absDist < 0.2) {
                el.style.borderColor = 'rgba(0, 242, 255, 0.5)';
                el.style.boxShadow = '0 0 30px rgba(0, 242, 255, 0.1)';
                el.classList.add('is-center');
            } else {
                el.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                el.style.boxShadow = 'none';
                el.classList.remove('is-center');
            }
        });

        if (closestIndex !== currentIndex) {
            setCurrentIndex(closestIndex);
        }
    };

    const scrollToItem = (index: number, behavior: ScrollBehavior = 'smooth') => {
        const container = containerRef.current;
        if (!container) return;
        const cards = container.querySelectorAll('.carousel-card');
        const targetCard = cards[index] as HTMLElement;
        if (targetCard) {
             const scrollLeft = targetCard.offsetLeft - container.clientWidth / 2 + targetCard.offsetWidth / 2;
             container.scrollTo({ left: scrollLeft, behavior });
        }
    };

    const snapToCenter = () => {
        const container = containerRef.current;
        if (!container) return;
        
        const center = container.scrollLeft + container.clientWidth / 2;
        const cards = container.querySelectorAll('.carousel-card');
        let closestIndex = 0;
        let minDistance = Infinity;
        
        cards.forEach((card, index) => {
            const el = card as HTMLElement;
            const cardCenter = el.offsetLeft + el.offsetWidth / 2;
            const dist = Math.abs(center - cardCenter);
            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = index;
            }
        });
        
        scrollToItem(closestIndex, 'smooth');
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => requestAnimationFrame(updateCards);
        container.addEventListener('scroll', handleScroll);
        
        // Initial update
        updateCards();
        // Center initial view to the first video
        const initialCard = container.querySelectorAll('.carousel-card')[0];
        if (initialCard) {
            const cardLeft = (initialCard as HTMLElement).offsetLeft;
            const cardWidth = (initialCard as HTMLElement).offsetWidth;
            container.scrollLeft = cardLeft - container.clientWidth / 2 + cardWidth / 2;
        }

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Card Drag Handlers ---
    const handleCardMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        hasDragged.current = false;
        setStartX(e.pageX);
        setStartScrollLeft(containerRef.current.scrollLeft);
    };

    const handleCardMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            snapToCenter();
        }
    };

    const handleCardMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            snapToCenter();
        }
    };

    const handleCardMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const walk = (e.pageX - startX) * 1.5; // Scroll speed
        if (Math.abs(walk) > 5) hasDragged.current = true;
        containerRef.current.scrollLeft = startScrollLeft - walk;
    };

    const handleCardClick = (index: number) => {
        if (hasDragged.current) return; // Prevent click if dragged

        if (workItems[index].id === 'more') {
            onMoreClick();
            return;
        }
        // Clicking the card body just centers it
        scrollToItem(index);
    };
    
    // --- Dot Scrub Handlers ---
    const updateScrub = (clientX: number, behavior: ScrollBehavior = 'auto') => {
        if (!dotsContainerRef.current) return;
        
        // Find nearest dot based on X position
        const dots = Array.from(dotsContainerRef.current.children) as HTMLElement[];
        let closestIndex = 0;
        let minDistance = Infinity;

        dots.forEach((dot, index) => {
            const rect = dot.getBoundingClientRect();
            const dotCenter = rect.left + rect.width / 2;
            const dist = Math.abs(clientX - dotCenter);
            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = index;
            }
        });
        
        // Instant update while scrubbing, Smooth for clicks
        scrollToItem(closestIndex, behavior);
    };

    const handleDotMouseDown = (e: React.MouseEvent) => {
        // e.preventDefault() removed to allow click events on buttons to fire
        setIsScrubbing(true);
        // Use smooth for initial click to avoid jarring jump if just clicking
        updateScrub(e.clientX, 'smooth');
    };

    const handleDotMouseMove = (e: React.MouseEvent) => {
        if (isScrubbing) {
            e.preventDefault();
            // Use auto for fast scrubbing responsiveness
            updateScrub(e.clientX, 'auto');
        }
    };

    const handleDotMouseUp = () => {
        if (isScrubbing) {
            setIsScrubbing(false);
            snapToCenter(); // Ensure correct alignment on release
        }
    };

    const handleDotMouseLeave = () => {
        if (isScrubbing) {
            setIsScrubbing(false);
            snapToCenter();
        }
    };
    
    const handlePlayClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setPlayingIndex(index);
    };

    return (
        <div className="relative w-full py-12 group/carousel select-none">
             {/* Fade Edges */}
             <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-black to-transparent z-20 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-black to-transparent z-20 pointer-events-none"></div>

             <div 
                ref={containerRef}
                className="flex gap-8 overflow-x-auto overflow-y-hidden py-10 px-[50vw] scrollbar-hide perspective-container cursor-grab active:cursor-grabbing"
                onMouseDown={handleCardMouseDown}
                onMouseLeave={handleCardMouseLeave}
                onMouseUp={handleCardMouseUp}
                onMouseMove={handleCardMouseMove}
                style={{ perspective: '1000px' }}
             >
                {workItems.map((item, index) => {
                    const isPlaying = playingIndex === index;
                    const isMoreCard = item.id === 'more';
                    
                    return (
                        <div 
                            key={`${item.id}-${index}`}
                            onClick={() => handleCardClick(index)}
                            className="carousel-card relative flex-shrink-0 w-[400px] md:w-[600px] aspect-video rounded-xl overflow-hidden glass-card transition-all duration-300 ease-out border border-white/5 bg-black group/card"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {isMoreCard ? (
                                /* --- MORE CARD DESIGN --- */
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md group-hover/card:bg-white/10 transition-colors duration-500 cursor-pointer">
                                    <h2 className="text-6xl md:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-widest uppercase hover:scale-110 transition-transform duration-500">
                                        MORE
                                    </h2>
                                </div>
                            ) : (
                                /* --- VIDEO CARD DESIGN --- */
                                <>
                                    {/* Original Thumbnail Image - Always visible unless playing */}
                                    <img 
                                        draggable={false}
                                        src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                                        alt="thumbnail"
                                        className={`thumb-img absolute inset-0 w-full h-full object-cover z-20 transition-all duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover/card:grayscale-0 grayscale'}`}
                                        style={{ filter: 'inherit' }} // Controlled by CSS class below
                                    />

                                    {/* Play Button Overlay - Visible on Hover (or center) when not playing */}
                                    {!isPlaying && (
                                        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                            {/* Pointer events auto for button to catch click */}
                                            <div 
                                                onClick={(e) => handlePlayClick(e, index)}
                                                className="w-16 h-16 bg-brand-cyan/20 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-cyan/50 shadow-[0_0_20px_rgba(0,242,255,0.3)] pointer-events-auto cursor-pointer transition-all duration-300 opacity-0 group-hover/card:opacity-100 hover:scale-125 hover:bg-brand-cyan/40 hover:shadow-[0_0_30px_rgba(0,242,255,0.6)]"
                                            >
                                                <svg className="w-6 h-6 text-brand-cyan ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Iframe - Only mounts when playing to avoid autoplay/error issues */}
                                    {isPlaying && (
                                        <div className="absolute inset-0 w-full h-full z-10 bg-black">
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src={`https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`} 
                                                title="YouTube video player" 
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                className="w-full h-full object-cover"
                                            ></iframe>
                                        </div>
                                    )}
                                </>
                            )}
                             
                             {/* Content Overlay */}
                             <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none translate-z-10 z-30 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                                <h4 className="text-white font-mono text-lg mb-1 drop-shadow-md">{language === 'cn' ? item.titleCn : item.titleEn}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full shadow-[0_0_5px_#00F2FF]"></span>
                                    <span className="text-[10px] text-gray-300 uppercase tracking-widest drop-shadow-md">{language === 'cn' ? item.statsCn : item.statsEn}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{language === 'cn' ? item.descCn : item.descEn}</p>
                             </div>

                             {/* CSS for grayscale handling */}
                             <style dangerouslySetInnerHTML={{__html: `
                                .carousel-card img.thumb-img { filter: grayscale(100%); transition: filter 0.5s ease; }
                                .carousel-card.is-center img.thumb-img { filter: grayscale(0%); } 
                                .carousel-card:hover img.thumb-img { filter: grayscale(0%) !important; }
                             `}} />
                        </div>
                    );
                })}
             </div>

             {/* Indicator Dots - DRAG TO SCRUB */}
             <div 
                ref={dotsContainerRef}
                className="flex justify-center flex-wrap gap-1 mt-8 px-4 py-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleDotMouseDown}
                onMouseLeave={handleDotMouseLeave}
                onMouseUp={handleDotMouseUp}
                onMouseMove={handleDotMouseMove}
             >
                {workItems.map((_, i) => (
                    <button
                        key={i}
                        // Click is handled by MouseDown/Up sequence now
                        onClick={(e) => { e.stopPropagation(); scrollToItem(i); }}
                        className="group/dot p-3 cursor-pointer focus:outline-none" // Increased hit area with padding
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        <div className={`rounded-full transition-all duration-300 ease-out
                            ${i === currentIndex 
                                ? 'w-3 h-3 bg-brand-cyan shadow-[0_0_8px_rgba(0,242,255,0.6)]' 
                                : 'w-1.5 h-1.5 bg-gray-600 group-hover/dot:w-3 group-hover/dot:h-3 group-hover/dot:bg-brand-cyan/70'
                            }
                        `}></div>
                    </button>
                ))}
             </div>
        </div>
    );
};


const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('cn');
  const [currentPage, setCurrentPage] = useState<'home' | 'second'>('home');
  // State to handle scrolling to work section when returning
  const [scrollToWorkOnReturn, setScrollToWorkOnReturn] = useState(false);
  
  // Changed to array to support multiple expanded items
  const [expandedExpIds, setExpandedExpIds] = useState<string[]>(['exp1']);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  
  // States for contact interactions
  const [showEmail, setShowEmail] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false); // New state for copy feedback
  const [showWeChat, setShowWeChat] = useState(false);
  
  // Back to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle Page Change and Scroll Logic
  useEffect(() => {
    if (currentPage === 'second') {
        window.scrollTo(0, 0);
    } else if (currentPage === 'home') {
        if (scrollToWorkOnReturn) {
            // Wait for DOM paint
            setTimeout(() => {
                const workSection = document.getElementById('work');
                if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth' });
                }
                setScrollToWorkOnReturn(false);
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }
  }, [currentPage]); // Dependency only on currentPage is sufficient as flags are set before

  // Monitor Scroll for Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReturnToHome = () => {
      setScrollToWorkOnReturn(true);
      setCurrentPage('home');
  };

  // Close email bubble when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowEmail(false);
    if (showEmail) {
        window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showEmail]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
      document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
      
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.exp-toggle')) return;
      
      const ripple = document.createElement('div');
      ripple.classList.add('click-ripple');
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Typewriter
  const useTypewriter = (phrases: string[]) => {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
      const currentPhrase = phrases[phraseIndex];
      const timeout = setTimeout(() => {
        if (isDeleting) {
          setText(currentPhrase.substring(0, text.length - 1));
        } else {
          setText(currentPhrase.substring(0, text.length + 1));
        }

        if (!isDeleting && text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, isDeleting ? 50 : 150);

      return () => clearTimeout(timeout);
    }, [text, isDeleting, phraseIndex, phrases]);

    return text;
  };

  const typewriterText = useTypewriter([
    'AIGC Visual Expert',
    'Video Director',
    'Content Strategist',
    'Visual Engineer'
  ]);

  const toggleLang = () => {
    setLang(prev => prev === 'cn' ? 'en' : 'cn');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle single item
  const toggleExp = (id: string) => {
    setExpandedExpIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Toggle all items
  const toggleAllExp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If all are currently expanded, collapse all. Otherwise, expand all.
    if (expandedExpIds.length === experienceData.length) {
        setExpandedExpIds([]);
    } else {
        setExpandedExpIds(experienceData.map(item => item.id));
    }
  };

  return (
    <>
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[#030303] -z-20"></div> {/* Fallback Solid Background */}
      <BackgroundCanvas />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none z-0"></div> {/* Deep space vignette */}
      
      <div className="global-glow"></div>

      {/* Language Toggle - Fixed for both pages */}
      <button 
        onClick={toggleLang}
        className="fixed top-8 right-8 z-50 group cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        <div className="relative flex items-center justify-center px-4 py-1.5 rounded-full glass-card border-brand-cyan/20 animate-pulse-glow">
          <span className="absolute inset-0 rounded-full bg-brand-cyan/5 blur-sm"></span>
          <span className="relative text-[10px] font-mono tracking-[0.2em] text-brand-cyan font-bold">
            {lang === 'cn' ? 'EN' : '中文'}
          </span>
        </div>
      </button>

      {/* Minimalist Tech Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center glass-card border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan transition-all duration-500 transform group ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        {/* Tech Corner Accents */}
        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-brand-cyan/60"></span>
        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-brand-cyan/60"></span>
        
        <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button>

      {/* --- HOME PAGE --- */}
      {currentPage === 'home' && (
        <>
            {/* Dynamic Island Nav */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 group hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-top-4">
                <div className="dynamic-island px-1.5 py-1.5 rounded-full flex items-center gap-1">
                {[
                    { id: 'hero', cn: 'Pony', en: 'Pony' },
                    { id: 'core', cn: '理念', en: 'CORE' },
                    { id: 'skill', cn: '技能', en: 'SKILL' },
                    { id: 'exp', cn: '经历', en: 'EXP' },
                    { id: 'work', cn: '作品', en: 'WORK' },
                    { id: 'awards', cn: '荣誉', en: 'HONOR' }
                ].map((item, index) => (
                    <React.Fragment key={item.id}>
                        {index === 1 || index === 5 ? <div className="w-[1px] h-3 bg-white/10"></div> : null}
                        <a 
                        href={`#${item.id}`} 
                        onClick={(e) => scrollToSection(e, item.id)}
                        className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                        {lang === 'cn' ? item.cn : item.en}
                        </a>
                    </React.Fragment>
                ))}
                <div className="w-[1px] h-3 bg-white/10"></div>
                <a 
                    href="#contact" 
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-brand-cyan/80 hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all cursor-pointer"
                >
                    {lang === 'cn' ? '联系' : 'LINK'}
                </a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 w-full">

                {/* Hero */}
                <div id="hero" className="col-span-1 md:col-span-6 lg:col-span-12 flex justify-center mb-12 lg:mb-20 float-anim-1 scroll-mt-32">
                    <div className="glass-card hero-card p-10 md:p-14 rounded-2xl flex flex-col items-center text-center max-w-3xl relative group">
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-cyan/20 transition-all duration-1000"></div>
                    
                    <div className="relative w-36 h-36 md:w-44 md:h-44 mb-8 rounded-full p-[1px] bg-gradient-to-b from-gray-700 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-black">
                        <img src="https://i.ibb.co/Q7y4ctpJ/image.png" alt="QIANG ZENG" className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute inset-0 scanline-overlay opacity-30"></div>
                        </div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 font-mono">
                        {lang === 'cn' ? (<span>曾 <span className="text-gray-600">强</span></span>) : (<span>QIANG <span className="text-gray-600">ZENG</span></span>)}
                    </h1>
                    
                    <div className="h-6 flex items-center justify-center mb-6">
                        <span className="text-brand-cyan font-mono text-sm md:text-base tracking-widest uppercase">{typewriterText}</span>
                        <span className="cursor-blink"></span>
                    </div>

                    <div className="text-[#adadad] text-sm md:text-base leading-relaxed max-w-2xl font-mono mt-6">
                        {lang === 'cn' ? (
                        <span className="font-bold">
                            以工业级的严谨，重构 AI 时代的视觉叙事。
                        </span>
                        ) : (
                        <span className="font-bold">
                            Restructuring visual narratives in the AI Era with industrial rigor.
                        </span>
                        )}
                    </div>
                    </div>
                </div>

                {/* Philosophy */}
                <div id="core" className="col-span-1 md:col-span-4 lg:col-span-7 float-anim-2 scroll-mt-24">
                    <div className="glass-card h-full p-8 rounded-xl flex flex-col justify-between group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 rounded-full bg-white/5 text-brand-cyan">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">01 / CORE</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-mono text-white mb-4">{lang === 'cn' ? '个人总结' : 'Summary'}</h3>
                        <p className="text-gray-400 text-sm leading-loose">
                        {lang === 'cn' ? (
                            <>
                            拥有 <span className="text-brand-cyan font-bold">12 年+</span> 全链路影像制作与营销经验，曾深耕广电及新能源汽车赛道。作为一名“<span className="text-brand-cyan font-bold">视觉工程师</span>”，我精通从商业脚本、拍摄执导到后期特效的全流程管理，并擅长利用数据驱动策略打造病毒式内容。现专注于 <span className="text-brand-cyan font-bold">AIGC 企业级落地</span> 与 AI+视频自动化工作流构建，致力于用技术实现视觉审美的极致降本增效。
                            </>
                        ) : (
                            <>
                            With <span className="text-brand-cyan font-bold">12+ years</span> of full-stack video production and marketing experience, deeply rooted in broadcasting and NEV sectors. As a "<span className="text-brand-cyan font-bold">Visual Engineer</span>", I master the entire workflow from commercial scripting and directing to post-production VFX. Currently focusing on <span className="text-brand-cyan font-bold">Enterprise AIGC</span> and AI+Video automated workflows, dedicated to achieving extreme cost efficiency through technology.
                            </>
                        )}
                        </p>
                    </div>
                    </div>
                </div>

                {/* Core Tags (Replaces Old Guestbook) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-5 float-anim-3 scroll-mt-24">
                    <div className="glass-card h-full p-8 rounded-xl flex flex-col justify-center relative group">
                        <div className="absolute top-4 right-4 text-[10px] font-mono text-gray-700 uppercase tracking-widest">KEY TAGS</div>
                        <div className="flex flex-wrap gap-3 content-center h-full">
                            {[
                                lang === 'cn' ? '🏷️ 12+ 年影像沉淀' : '🏷️ 12+ Years Experience',
                                lang === 'cn' ? '🏷️ Automotive 行业背景' : '🏷️ Automotive Industry',
                                lang === 'cn' ? '🏷️ AIGC 全流控构建者' : '🏷️ AIGC Workflow Architect',
                                lang === 'cn' ? '🏷️ Viral 病毒式传播专家' : '🏷️ Viral Content Expert'
                            ].map((tag, i) => (
                                <div key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all cursor-default">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div id="stats" className="col-span-1 md:col-span-3 lg:col-span-4 float-anim-1 scroll-mt-24">
                    <div className="glass-card h-full p-8 rounded-xl flex flex-col items-center justify-center text-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="text-6xl font-bold text-white mb-2 font-mono group-hover:text-brand-cyan transition-colors duration-300">100M+</span>
                    <span className="text-xs text-gray-500 font-mono uppercase tracking-[0.2em]">{lang === 'cn' ? '全网播放量破亿' : 'Total Views'}</span>
                    </div>
                </div>

                {/* Tech Stack */}
                <div id="skill" className="col-span-1 md:col-span-3 lg:col-span-8 float-anim-2 scroll-mt-24">
                    <div className="glass-card h-full p-8 rounded-xl group">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-mono text-white">{lang === 'cn' ? '技能组合' : 'Skills'}</h3>
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">02 / TECH</span>
                    </div>
                    <div className="space-y-5">
                        {skillsData.map((skill, i) => (
                        <div key={i} className="group/item">
                            <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono">
                            <span className="flex items-center gap-2">
                                {skill.category === 'AI' && <span className="w-1 h-1 rounded-full bg-brand-cyan shadow-[0_0_5px_#00F2FF]"></span>}
                                {skill.name}
                            </span>
                            <span className={skill.highlight ? 'text-brand-cyan' : 'text-white'}>{skill.level}%</span>
                            </div>
                            <div className="w-full h-[1.5px] bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${skill.highlight ? 'bg-brand-cyan shadow-[0_0_8px_#00F2FF]' : 'bg-white'}`} 
                                style={{ width: `${skill.level}%` }}
                            ></div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Experience */}
                <div id="exp" className="col-span-1 md:col-span-6 lg:col-span-12 float-anim-1 scroll-mt-24">
                    <div className="glass-card h-full p-8 rounded-xl group min-h-[500px] relative overflow-hidden">
                        {/* Decorative Background for Evolution/Boolean feel */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                                {/* Dashed circular orbits */}
                                <circle cx="700" cy="100" r="150" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                                <circle cx="700" cy="100" r="80" fill="none" stroke="#333" strokeWidth="1" />
                                {/* Connecting lines */}
                                <path d="M620 100 L 100 100" stroke="#333" strokeWidth="0.5" strokeDasharray="10 10" />
                                <path d="M100 100 L 100 600" stroke="#333" strokeWidth="0.5" />
                                {/* Intersecting shapes */}
                                <rect x="650" y="50" width="100" height="100" stroke="#00F2FF" strokeWidth="0.5" fill="none" transform="rotate(45 700 100)" />
                            </svg>
                        </div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="text-lg font-mono text-white">{lang === 'cn' ? '工作经历' : 'Experience'}</h3>
                        <div className="flex items-center gap-4">
                            {/* Expand/Collapse All Button */}
                            <button 
                                onClick={toggleAllExp}
                                className="text-[10px] font-mono text-brand-cyan hover:text-white transition-colors uppercase tracking-wider border border-brand-cyan/30 rounded px-2 py-1 hover:bg-brand-cyan/10"
                            >
                                {expandedExpIds.length === experienceData.length 
                                    ? (lang === 'cn' ? '全部折叠' : 'COLLAPSE ALL') 
                                    : (lang === 'cn' ? '一键展开' : 'EXPAND ALL')
                                }
                            </button>
                            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">03 / EXP</span>
                        </div>
                        </div>
                        <div className="space-y-6 relative z-10">
                        {experienceData.map((item) => {
                            const isExpanded = expandedExpIds.includes(item.id);
                            return (
                            <div 
                                key={item.id} 
                                className={`relative pl-6 border-l transition-all duration-300 cursor-pointer exp-toggle ${isExpanded ? 'border-brand-cyan' : 'border-gray-800 hover:border-gray-600'}`}
                                onClick={() => toggleExp(item.id)}
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                                    <h4 className={`text-base font-medium transition-colors ${isExpanded ? 'text-brand-cyan' : 'text-white'}`}>
                                    {lang === 'cn' ? item.companyCn : item.companyEn}
                                    </h4>
                                    <span className="text-xs font-mono text-gray-500">{item.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-2">{lang === 'cn' ? item.titleCn : item.titleEn}</p>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                                >
                                    <ul className="list-disc list-outside ml-4 space-y-2">
                                    {(lang === 'cn' ? item.descCn : item.descEn).map((point, idx) => (
                                        <li key={idx} className="text-xs text-gray-300 leading-relaxed pl-1">
                                        {point}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                
                                {!isExpanded && (
                                    <div className="text-[10px] text-gray-600 mt-2 font-mono flex items-center gap-1 opacity-60">
                                    <span>{lang === 'cn' ? '点击展开' : 'CLICK TO EXPAND'}</span>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                )}
                            </div>
                            );
                        })}
                        </div>
                    </div>
                </div>

                {/* NEW 3D Carousel Work Section */}
                <div id="work" className="col-span-1 md:col-span-6 lg:col-span-12 float-anim-3 scroll-mt-24">
                    <Carousel3D language={lang} onMoreClick={() => setCurrentPage('second')} />
                </div>

                {/* Awards & Education */}
                <div id="awards" className="col-span-1 md:col-span-6 lg:col-span-12 float-anim-1 scroll-mt-24">
                    <div className="glass-card h-full p-8 rounded-xl relative overflow-hidden">
                    {/* Boolean Decoration - Updated to overlapping squares/circles for boolean feel */}
                    <div className="absolute bottom-0 right-0 pointer-events-none opacity-20">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            {/* Intersecting Squares */}
                            <rect x="120" y="120" width="80" height="80" stroke="#00F2FF" strokeWidth="0.5" fill="none" />
                            <rect x="80" y="80" width="80" height="80" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4,4" />
                            
                            {/* Subtractive Circle */}
                            <circle cx="120" cy="120" r="30" stroke="#00F2FF" strokeWidth="1" fill="none" />
                            
                            {/* Connecting Lines */}
                            <line x1="120" y1="120" x2="40" y2="40" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                            <circle cx="40" cy="40" r="2" fill="white" />
                        </svg>
                    </div>

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="text-lg font-mono text-white">{lang === 'cn' ? '荣誉与教育' : 'Awards & Education'}</h3>
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">04 / HONOR</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {/* Awards */}
                        <div>
                        <h4 className="text-xs font-mono text-brand-cyan mb-4 uppercase tracking-widest">{lang === 'cn' ? '奖项 & 认证' : 'Awards & Certs'}</h4>
                        <ul className="space-y-3">
                            {awardsData.map((award, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className="text-brand-cyan mt-1">✦</span>
                                <span>{lang === 'cn' ? award.titleCn : award.titleEn}</span>
                            </li>
                            ))}
                        </ul>
                        </div>

                        {/* Education */}
                        <div>
                        <h4 className="text-xs font-mono text-brand-cyan mb-4 uppercase tracking-widest">{lang === 'cn' ? '教育背景' : 'Education'}</h4>
                        <div className="border-l border-white/10 pl-4">
                            <h5 className="text-white font-medium">{lang === 'cn' ? educationData.schoolCn : educationData.schoolEn}</h5>
                            <p className="text-sm text-gray-400 mt-1">{lang === 'cn' ? educationData.degreeCn : educationData.degreeEn}</p>
                            <p className="text-xs text-gray-600 font-mono mt-1">{educationData.period}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Contact & Guestbook Row (Bottom) */}
                
                {/* Contact - Left */}
                <div id="contact" className="col-span-1 md:col-span-6 lg:col-span-5 float-anim-2 scroll-mt-24 relative z-30">
                    <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center gap-6 relative min-h-[160px] h-full" style={{ overflow: 'visible', zIndex: 30 }}>
                    
                    <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {lang === 'cn' ? '联系' : 'LINK'}
                    </div>

                    <div className="flex gap-4 w-full mt-4 items-end justify-center px-4">
                        {/* Email Button Wrapper */}
                        <div className="relative flex-1 group/email">
                            {showEmail && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[240px] bg-black/90 border border-brand-cyan/30 rounded-lg p-4 shadow-[0_0_20px_rgba(0,242,255,0.15)] backdrop-blur-xl animate-in fade-in zoom-in duration-200 z-[9999]">
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-r border-b border-brand-cyan/30 transform rotate-45"></div>
                                    
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <span className="text-[10px] text-brand-cyan uppercase tracking-wider font-bold mb-0.5 block">Overseas</span>
                                            <div className="text-xs text-white font-mono bg-white/5 p-1.5 rounded border border-white/10 select-all">zengqiang5@gmail.com</div>
                                        </div>
                                        <div className="relative">
                                            <span className="text-[10px] text-brand-cyan uppercase tracking-wider font-bold mb-0.5 block">Domestic</span>
                                            <div className="text-xs text-white font-mono bg-white/5 p-1.5 rounded border border-white/10 select-all">ponydawu@qq.com</div>
                                        </div>

                                        {/* Copy All Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText("zengqiang5@gmail.com\nponydawu@qq.com");
                                                setEmailCopied(true);
                                                setTimeout(() => setEmailCopied(false), 2000);
                                            }}
                                            className="mt-3 w-full py-1.5 rounded-full border border-white/10 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all flex items-center justify-center gap-1.5 group/copy"
                                        >
                                            {emailCopied ? (
                                                 <>
                                                    <svg className="w-3 h-3 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    <span className="text-[10px] font-mono text-brand-cyan font-bold">COPIED</span>
                                                 </>
                                            ) : (
                                                <>
                                                    <svg className="w-3 h-3 text-gray-500 group-hover/copy:text-brand-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                                    <span className="text-[10px] font-mono text-gray-400 group-hover/copy:text-brand-cyan transition-colors">COPY ALL</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowEmail(!showEmail); }}
                                className={`w-full py-4 rounded-xl border font-mono uppercase text-xs tracking-wider transition-all duration-300
                                    ${showEmail 
                                        ? 'bg-brand-cyan text-black border-brand-cyan shadow-[0_0_15px_rgba(0,242,255,0.4)]' 
                                        : 'border-gray-700 text-gray-300 hover:border-white hover:text-white bg-white/5'
                                    }`}
                            >
                                Email
                            </button>
                        </div>

                        {/* WeChat Button Wrapper */}
                        <div className="relative flex-1 group/wechat"
                            onMouseEnter={() => setShowWeChat(true)}
                            onMouseLeave={() => setShowWeChat(false)}
                        >
                            {showWeChat && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[180px] bg-black/90 border border-brand-cyan/30 rounded-lg p-1 shadow-[0_0_20px_rgba(0,242,255,0.15)] backdrop-blur-xl animate-in fade-in zoom-in duration-200 z-[9999]">
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-r border-b border-brand-cyan/30 transform rotate-45 z-0"></div>
                                    
                                    <div className="relative z-10 rounded overflow-hidden bg-white">
                                        <img 
                                            src="https://i.ibb.co/jkGzR2pV/20251220134418-115-75.jpg" 
                                            alt="WeChat QR" 
                                            className="w-full h-auto object-cover block"
                                        />
                                    </div>
                                </div>
                            )}

                            <button 
                                className="w-full py-4 rounded-xl border border-gray-700 text-gray-300 bg-white/5 font-mono uppercase text-xs tracking-wider transition-all duration-300 hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                            >
                                WeChat
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                
                {/* Guestbook - Right */}
                <div id="guestbook" className="col-span-1 md:col-span-6 lg:col-span-7 float-anim-3 scroll-mt-24">
                    <Guestbook language={lang} />
                </div>

                </div>

                <footer className="w-full text-center py-12 mt-12 border-t border-white/5">
                <p className="text-[10px] text-gray-700 font-mono tracking-[0.3em] uppercase">
                    Designed & Coded by Qiang Zeng © 2025
                </p>
                </footer>
            </main>
        </>
      )}

      {/* --- SECOND PAGE --- */}
      {currentPage === 'second' && (
          <main className="relative z-10 w-full min-h-screen max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 animate-in fade-in zoom-in duration-500">
                {/* Back Button */}
                <button 
                onClick={handleReturnToHome}
                className="fixed top-8 left-8 z-50 group flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/10 transition-all border border-white/5 hover:border-brand-cyan/30"
                >
                    <svg className="w-4 h-4 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    <span className="text-xs font-mono text-gray-300 group-hover:text-white uppercase tracking-widest">{lang === 'cn' ? '返回' : 'BACK'}</span>
                </button>

                <div className="w-full h-full flex flex-col min-h-[60vh]">
                    <div className="text-center mb-16">
                        <h1 className="text-2xl md:text-4xl font-mono font-bold text-white mb-8 tracking-[0.5em] relative z-10 inline-block">
                            {lang === 'cn' ? '第二视界' : 'SECOND HORIZON'}
                            <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-50"></div>
                        </h1>
                        <p className="text-gray-400 font-mono text-xs md:text-sm tracking-widest mt-2 max-w-2xl mx-auto leading-relaxed px-4">
                            {lang === 'cn' 
                                ? '宇宙的答案或许是个玩笑，但请继续你的探索和推演。' 
                                : 'The answer to the universe might be a joke, but please continue your exploration.'}
                        </p>
                    </div>

                    {/* Pinterest Waterfall Flow - Less Crowded & Smaller Images */}
                    <div className="columns-2 md:columns-3 lg:columns-5 xl:columns-6 gap-6 space-y-6 pb-20 mx-auto max-w-[1600px]">
                        {secondHorizonImages.map((src, index) => (
                            <div key={index} className="break-inside-avoid relative group rounded-xl overflow-hidden glass-card transition-all duration-500 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 50}ms` }}>
                                <img 
                                    src={src} 
                                    alt={`Gallery ${index}`} 
                                    className="w-full h-auto transform transition-all duration-700 ease-out grayscale blur-[2px] scale-100 group-hover:grayscale-0 group-hover:blur-0 group-hover:scale-105" 
                                    loading="lazy"
                                    decoding="async" 
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute bottom-3 left-3">
                                        <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full mb-1"></div>
                                        <div className="text-[10px] font-mono text-white/80 tracking-widest uppercase">IMG_0{index + 1}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none">
                    <p className="text-[10px] text-gray-700 font-mono tracking-[0.3em] uppercase">
                        STAY CURIOUS
                    </p>
                </footer>
          </main>
      )}
    </>
  );
};

export default App;