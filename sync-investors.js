require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-24',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const investorsData = [
  {
    name: "Masterise Homes",
    slug: { _type: "slug", current: "masterise-homes" },
    vision: "To bring world-class excellence to Vietnam's real estate market through strategic partnerships and global standards.",
    mission: "To deliver the finest housing solutions and elevate the living standards of our residents with unconditional commitment.",
    awards: ["Best Luxury Developer", "Outstanding Architecture 2023", "Sustainable Excellence"],
    achievements: [
      { year: "2020", title: "Global Expansion", description: "Established strategic partnerships with Marriott International." },
      { year: "2021", title: "Master Landmark", description: "Launched the largest branded residence project in Southeast Asia." },
      { year: "2023", title: "The Global City", description: "Commenced the development of the new international downtown of HCMC." }
    ],
    language: "en"
  },
  {
    name: "Vinhomes",
    slug: { _type: "slug", current: "vinhomes" },
    vision: "To create superior urban living environments that integrate luxury, convenience, and community spirit.",
    mission: "To establish a new standard of living for Vietnamese people, focusing on service quality and lifestyle infrastructure.",
    awards: ["Vietnam's Most Valuable Brand", "Best Township Development", "Customer Choice Award"],
    achievements: [
      { year: "2018", title: "Landmark 81", description: "Inaugurated the tallest building in Vietnam and a top-tier global skyscraper." },
      { year: "2019", title: "Ocean Park", description: "Launched the first artificial salt-water lake and beach urban area." },
      { year: "2022", title: "Smart City", description: "Leading the digital transformation in urban management." }
    ],
    language: "en"
  },
  {
    name: "CapitaLand",
    slug: { _type: "slug", current: "capitaland" },
    vision: "To be a leading global real estate developer, contributing to the development of world-class living and working spaces.",
    mission: "To enrich lives and build communities through high-quality development and sustainable practices.",
    awards: ["Global Real Estate Sustainability Benchmark", "Best International Developer", "Innovation in Design"],
    achievements: [
      { year: "2006", title: "Vietnam Entry", description: "One of the first major international developers to enter the Vietnamese market." },
      { year: "2015", title: "d'Edge Thao Dien", description: "Defining new luxury standards with iconic infinity pool architecture." },
      { year: "2023", title: "De La Sol", description: "Transforming the cultural landscape with music-inspired residential spaces." }
    ],
    language: "en"
  },
  {
    name: "Sun Group",
    slug: { _type: "slug", current: "sun-group" },
    vision: "To beautify the land and create timeless works that elevate Vietnam's position on the world map.",
    mission: "To focus on the 'Quality - Class - Distinction' triad in every project, from hospitality to ultra-luxury real estate.",
    awards: ["World's Leading Developer", "Best Resort Architecture", "Innovation in Leisure"],
    achievements: [
      { year: "2013", title: "InterContinental Danang", description: "Voted the World's Leading Luxury Resort multiple times." },
      { year: "2016", title: "Sun World", description: "Revolutionizing the entertainment and hospitality sectors in Vietnam." },
      { year: "2021", title: "Sun Premier Village", description: "Setting a new benchmark for oceanfront luxury living." }
    ],
    language: "en"
  }
];

// Generate Vietnamese and Korean versions
const vnData = investorsData.map(inv => ({
  ...inv,
  language: "vn",
  vision: inv.name === "Masterise Homes" ? "Mang đẳng cấp quốc tế đến thị trường BĐS Việt Nam thông qua các đối tác chiến lược và tiêu chuẩn toàn cầu." :
          inv.name === "Vinhomes" ? "Kiến tạo môi trường sống đô thị vượt trội, tích hợp sự sang trọng, tiện nghi và tinh thần cộng đồng." :
          inv.name === "CapitaLand" ? "Trở thành nhà phát triển BĐS hàng đầu thế giới, góp phần xây dựng không gian sống và làm việc đẳng cấp." :
          "Làm đẹp những vùng đất và tạo nên những công trình vượt thời gian, nâng cao vị thế của Việt Nam trên bản đồ thế giới.",
  mission: inv.name === "Masterise Homes" ? "Mang đến những giải pháp nhà ở tinh tế nhất và nâng tầm tiêu chuẩn sống của cư dân với sự cam kết tuyệt đối." :
           inv.name === "Vinhomes" ? "Thiết lập tiêu chuẩn sống mới cho người Việt, tập trung vào chất lượng dịch vụ và hạ tầng phong cách sống." :
           inv.name === "CapitaLand" ? "Làm phong phú cuộc sống và xây dựng cộng đồng thông qua các dự án chất lượng cao và phát triển bền vững." :
           "Tập trung vào bộ ba 'Chất lượng - Đẳng cấp - Khác biệt' trong mọi dự án, từ nghỉ dưỡng đến BĐS siêu sang.",
  awards: inv.name === "Masterise Homes" ? ["Nhà phát triển hạng sang tốt nhất", "Kiến trúc tiêu biểu 2023", "Phát triển bền vững"] :
          inv.name === "Vinhomes" ? ["Thương hiệu giá trị nhất Việt Nam", "Dự án đô thị tốt nhất", "Giải thưởng khách hàng bình chọn"] :
          inv.name === "CapitaLand" ? ["Điểm chuẩn bền vững BĐS toàn cầu", "Nhà phát triển quốc tế tốt nhất", "Đột phá trong thiết kế"] :
          ["Nhà phát triển hàng đầu thế giới", "Kiến trúc nghỉ dưỡng tốt nhất", "Đột phá trong giải trí"],
  achievements: inv.name === "Masterise Homes" ? [
    { year: "2020", title: "Mở rộng toàn cầu", description: "Thiết lập đối tác chiến lược với Marriott International." },
    { year: "2021", title: "Dấu ấn biểu tượng", description: "Ra mắt dự án căn hộ hàng hiệu lớn nhất Đông Nam Á." },
    { year: "2023", title: "The Global City", description: "Bắt đầu phát triển trung tâm quốc tế mới của TP.HCM." }
  ] : inv.name === "Vinhomes" ? [
    { year: "2018", title: "Landmark 81", description: "Khánh thành tòa nhà cao nhất Việt Nam và thuộc top thế giới." },
    { year: "2019", title: "Ocean Park", description: "Ra mắt đại đô thị biển hồ nước mặn nhân tạo đầu tiên." },
    { year: "2022", title: "Thành phố thông minh", description: "Dẫn đầu chuyển đổi số trong quản lý đô thị." }
  ] : inv.name === "CapitaLand" ? [
    { year: "2006", title: "Gia nhập Việt Nam", description: "Một trong những nhà phát triển quốc tế đầu tiên vào VN." },
    { year: "2015", title: "d'Edge Thảo Điền", description: "Định nghĩa tiêu chuẩn xa hoa với hồ bơi vô cực biểu tượng." },
    { year: "2023", title: "De La Sol", description: "Biến đổi không gian sống với cảm hứng âm nhạc." }
  ] : [
    { year: "2013", title: "InterContinental Danang", description: "Được bình chọn là Khu nghỉ dưỡng sang trọng hàng đầu thế giới." },
    { year: "2016", title: "Sun World", description: "Cách mạng hóa ngành giải trí và nghỉ dưỡng tại Việt Nam." },
    { year: "2021", title: "Sun Premier Village", description: "Thiết lập chuẩn mực mới cho sống sang ven biển." }
  ]
}));

const koData = investorsData.map(inv => ({
  ...inv,
  language: "ko",
  vision: inv.name === "Masterise Homes" ? "전략적 파트너십과 글로벌 표준을 통해 베트남 부동산 시장에 세계 정상급 우수성을 제공합니다." :
          inv.name === "Vinhomes" ? "럭셔리, 편의성, 공동체 정신을 통합한 우수한 도시 생활 환경을 창조합니다." :
          inv.name === "CapitaLand" ? "세계적인 수준의 생활 및 업무 공간 개발에 기여하는 선도적인 글로벌 부동산 개발업체가 되겠습니다." :
          "국토를 아름답게 가꾸고 세계 지도에서 베트남의 위상을 높이는 시대를 초월한 작품을 만듭니다.",
  mission: inv.name === "Masterise Homes" ? "최고의 주거 솔루션을 제공하고 무조건적인 헌신으로 거주자의 생활 수준을 높입니다." :
           inv.name === "Vinhomes" ? "서비스 품질과 라이프스타일 인프라에 중점을 두어 베트남 사람들을 위한 새로운 생활 표준을 수립합니다." :
           inv.name === "CapitaLand" ? "고품질 개발과 지속 가능한 관행을 통해 삶을 풍요롭게 하고 공동체를 구축합니다." :
           "환대 산업에서 초호화 부동산에 이르기까지 모든 프로젝트에서 '품질 - 품격 - 차별성'에 집중합니다.",
  awards: inv.name === "Masterise Homes" ? ["최고의 럭셔리 개발사", "2023 우수 건축상", "지속 가능성 우수상"] :
          inv.name === "Vinhomes" ? ["베트남에서 가장 가치 있는 브랜드", "최고의 신도시 개발", "고객의 선택상"] :
          inv.name === "CapitaLand" ? ["글로벌 부동산 지속가능성 벤치마크", "최고의 국제 개발사", "디자인 혁신상"] :
          ["세계 최고의 개발사", "최고의 리조트 건축", "레저 부문 혁신상"],
  achievements: inv.name === "Masterise Homes" ? [
    { year: "2020", title: "글로벌 확장", description: "메리어트 인터내셔널과 전략적 파트너십 구축." },
    { year: "2021", title: "마스터 랜드마크", description: "동남아시아 최대 규모의 브랜드 레지던스 프로젝트 출시." },
    { year: "2023", title: "The Global City", description: "호치민시의 새로운 국제 도심 개발 시작." }
  ] : inv.name === "Vinhomes" ? [
    { year: "2018", title: "Landmark 81", description: "베트남 최고층 빌딩이자 세계적인 마천루 준공." },
    { year: "2019", title: "Ocean Park", description: "최초의 인공 해수 호수 및 해변 도시 조성." },
    { year: "2022", title: "Smart City", description: "도시 관리의 디지털 전환 선도." }
  ] : inv.name === "CapitaLand" ? [
    { year: "2006", title: "베트남 진출", description: "베트남 시장에 진출한 최초의 주요 국제 개발사 중 하나." },
    { year: "2015", title: "d'Edge Thao Dien", description: "상징적인 인피니티 풀 건축으로 새로운 럭셔리 기준 정의." },
    { year: "2023", title: "De La Sol", description: "음악에서 영감을 받은 주거 공간으로 문화 경관 변모." }
  ] : [
    { year: "2013", title: "InterContinental Danang", description: "세계 최고의 럭셔리 리조트로 여러 차례 선정." },
    { year: "2016", title: "Sun World", description: "베트남의 엔터테인먼트 및 환대 산업 혁신." },
    { year: "2021", title: "Sun Premier Village", description: "해안가 럭셔리 생활의 새로운 벤치마크 설정." }
  ]
}));

const allData = [...investorsData, ...vnData, ...koData];

async function syncInvestors() {
  console.log('Starting multi-language investor sync...');
  
  for (const data of allData) {
    try {
      const existing = await client.fetch(
        `*[_type == "investor" && slug.current == $slug && language == $language][0]`,
        { slug: data.slug.current, language: data.language }
      );

      if (existing) {
        console.log(`Updating ${data.name} (${data.language})...`);
        await client.patch(existing._id).set(data).commit();
      } else {
        console.log(`Creating ${data.name} (${data.language})...`);
        await client.create({
          _type: 'investor',
          ...data
        });
      }
    } catch (error) {
      console.error(`Error syncing ${data.name} (${data.language}):`, error.message);
    }
  }
  
  console.log('Sync complete!');
}

syncInvestors();
