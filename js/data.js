// ==========================================
// サイト設定・画面テキスト (Site Config & Text)
// ==========================================
const translations = {
    en: {
        title: "GRΛILIT",
        splashTagline: "AUTHENTIC VINTAGE GEAR",
        all: "ALL GEAR",
        vintage: "VINTAGE",
        original: "ORIGINALS",
        soldOut: "SOLD OUT"
    },
    ja: {
        title: "GRΛILIT",
        splashTagline: "本物のヴィンテージギア",
        all: "すべての商品",
        vintage: "ヴィンテージ",
        original: "オリジナル",
        soldOut: "SOLD OUT"
    },
    ko: {
        title: "GRΛILIT",
        splashTagline: "진정한 빈티지 기어",
        all: "전체 상품",
        vintage: "빈티지",
        original: "오리지널",
        soldOut: "품절"
    }
};

// ==========================================
// 商品データ (Product Data)
// ==========================================
const products = [
    {
        id: "v-001",
        name: {
            en: "U.S. SURPLUS: Leather Aviator Jacket",
            ja: "軍放出品: レザーアビエイタージャケット",
            ko: "군용 보급품: 레더 에비에이터 재킷"
        },
        category: "Outer",
        price: 38000,
        image: "assets/images/vintage_jacket_1776445116196.png",
        description: {
            en: "An authentic 1940s surplus leather aviator coat. Built for rigorous duty and extreme conditions, this heavyweight hide jacket has seen action and stands the test of time.",
            ja: "本物の1940年代軍放出品のレザーアビエイターコート。過酷な任務と極寒の条件に耐えるために作られたこの重厚なレザージャケットは、数々の戦線を経験し、時を越えて残りました。",
            ko: "1940년대 진짜 군용 보급 레더 에비에이터 코트입니다. 가죽 재킷은 전투를 경험했으며 시간의 시험을 견뎌냈습니다."
        },
        inventory: 1,
        sizes: ["L"],
        stripeLink: ""
    },
    {
        id: "o-001",
        name: {
            en: "METROPOLITAN: Standard Issue Pullover",
            ja: "METROPOLITAN: 標準支給プルオーバー",
            ko: "METROPOLITAN: 표준 보급 풀오버"
        },
        category: "Top",
        price: 18000,
        image: "assets/images/original_hoodie_1776445130755.png",
        description: {
            en: "A brand new garment designed for modern factory and street wear. Thick cotton rationing approved. Featuring minimalistic typography.",
            ja: "現代の工場やストリートでの着用に向けてデザインされた真新しい一着。厚手のコットンで大都市の産業を象徴するミニマルなタイポグラフィが特徴。",
            ko: "현대적인 공장 및 거리 마모를 위해 설계된 완전히 새로운 의류입니다."
        },
        inventory: 20,
        sizes: ["M", "L", "XL"],
        stripeLink: ""
    },
    {
        id: "v-002",
        name: {
            en: "RECLAIMED: Utility Work Denim",
            ja: "RECLAIMED: ユーティリティワークデニム",
            ko: "RECLAIMED: 유틸리티 워크 데님"
        },
        category: "Pants",
        price: 24000,
        image: "assets/images/vintage_denim_1776445144742.png",
        description: {
            en: "Salvaged from the domestic steel mills. These high-waisted utility denims provide exceptional comfort and rugged utility for shift workers. Faded gracefully.",
            ja: "国内の製鉄所から回収された品。このハイウエストのユーティリティデニムは、交代勤務の労働者に並外れた快適さと頑丈な実用性を提供します。",
            ko: "국내 제철소에서 회수되었습니다."
        },
        inventory: 1,
        sizes: ["32", "34"],
        stripeLink: ""
    },
    {
        id: "o-002",
        name: {
            en: "DEPARTMENT STORE EXCLUSIVE: Heavy Tee",
            ja: "デパートメント限定: ヘビーボディTシャツ",
            ko: "백화점 한정: 헤비 바디 티셔츠"
        },
        category: "Top",
        price: 9000,
        image: "assets/images/original_tee_1776445159816.png",
        description: {
            en: "A heavyweight charcoal t-shirt tailored for absolute longevity. Features an intricate industrial emblem on the back.",
            ja: "絶対的な長寿命のために仕立てられた、厚手のチャコールTシャツ。背中には複雑な工業的エンブレムが特徴です。",
            ko: "절대적인 수명을 위해 맞춤 제작된 두꺼운 숯분말색 티셔츠입니다."
        },
        inventory: 50,
        sizes: ["S", "M", "L", "XL"],
        stripeLink: ""
    },
    {
        id: "o-003",
        name: {
            en: "MILITARY: Canvas Field Cap",
            ja: "MILITARY: キャンバスフィールドキャップ",
            ko: "MILITARY: 캔버스 필드 캡"
        },
        category: "Cap",
        price: 6500,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80",
        description: {
            en: "A heavy canvas cap modeled after 1940s field gear. Perfect for blocking out the glaring metropolitan sun.",
            ja: "1940年代の野戦用装備をモデルにした厚手のキャンバスキャップ。強烈な都会の陽射しを遮るのに最適です。",
            ko: "1940년대 야전 장비를 모델로 한 두꺼운 캔버스 캡입니다."
        },
        inventory: 12,
        sizes: ["ONE SIZE"],
        stripeLink: ""
    },
    {
        id: "o-004",
        name: {
            en: "ARCHIVE: Combat Boots",
            ja: "ARCHIVE: コンバットブーツ",
            ko: "ARCHIVE: 컴뱃 부츠"
        },
        category: "Shoes",
        price: 42000,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80",
        description: {
            en: "Standard issue leather combat boots. Built with a solid Goodyear welt to endure any terrain. Age naturally emphasizes the deep black leather.",
            ja: "標準支給のレザーコンバットブーツ。頑丈なグッドイヤーウェルト製法で、どんな地形にも耐えられます。",
            ko: "표준 지급 가죽 전투화입니다."
        },
        inventory: 5,
        sizes: ["US 8", "US 9", "US 10"],
        stripeLink: ""
    },
    {
        id: "o-005",
        name: {
            en: "SILVER: ID Bracelet",
            ja: "SILVER: IDブレスレット",
            ko: "SILVER: ID 팔찌"
        },
        category: "Accessory",
        price: 15000,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80",
        description: {
            en: "A sterling silver identification bracelet. Minimalist, heavy, and timeless. Inspired by mid-century soldier tags.",
            ja: "スターリングシルバー製のIDブレスレット。ミニマルで重厚感があり、時代を超越した美しさ。",
            ko: "스털링 실버 신분증 팔찌입니다."
        },
        inventory: 3,
        sizes: ["ONE SIZE"],
        stripeLink: ""
    }
];

// Helper to format currency
const formatPrice = (price) => {
    return "¥" + price.toLocaleString('ja-JP');
};
