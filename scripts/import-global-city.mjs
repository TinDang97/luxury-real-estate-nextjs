/**
 * Migration Script: Import The Global City Project to Sanity (Multi-language)
 * 
 * This script uses the Sanity API to create/update "The Global City" project
 * for three languages: Vietnamese, English, and Korean.
 * 
 * Usage: node scripts/import-global-city.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Environment variables should be available from .env.local via Next.js
const client = createClient({
  projectId: 'yp0h39ps',
  dataset: 'production',
  token: process.env.SANITY_TOKEN || 'skMhqqP0r4KiH1XPy9MEg4UjYaLDQyhPkYXavKStTGb3mZDM41UWfk5SYY8VgDHOIMKjnBSAbvBS95Xm1NHBqdKyJfNkCTmM974MEwQO2uZU6Jmska0xVty94bOzICfqZlHDknjH6enIND4QTeV2Pjs0L86PAjY1br2LROHGgUDSvwiCmn7S',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Common Assets
const images = {
  overview: '/assets/images/global_city_overview.png',
  masterplan: '/assets/images/global_city_masterplan.jpg',
  soho: '/assets/images/global_city_soho.jpg',
  park: '/assets/images/global_city_park.jpg',
  fountain: '/assets/images/global_city_fountain.jpg',
  amenity1: '/assets/images/project1.jpg',
  amenity2: '/assets/images/project2.jpg',
  banner: '/assets/images/global_city_pool.png'
};

async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    console.log(`Uploading image: ${imagePath}`);
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return null;
    }
    const buffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(imagePath)
    });
    console.log(`Image uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Image upload failed:', error.message);
    return null;
  }
}

/**
 * 1. VIETNAMESE DATA (VN)
 */
const getGlobalCityVN = (mainImageAsset) => ({
  _type: 'project',
  _id: 'project-global-city', // Keep original ID for VN
  language: 'vn',
  title: 'The Global City',
  slug: { _type: 'slug', current: 'the-global-city' },
  category: 'Khu đô thị',
  location: 'Quận 2, TP. Hồ Chí Minh',
  developer: 'Masterise Homes',
  price: 'Từ 2.5 tỷ - 15 tỷ',
  status: 'selling',
  mainImage: mainImageAsset ? { _type: 'image', asset: { _type: 'reference', _ref: mainImageAsset } } : undefined,
  overview: 'The Global City là khu đô thị đẳng cấp quốc tế tại Quận 2, TP.HCM với quy mô 117.4ha, mang đến không gian sống hiện đại và đầy đủ tiện ích cho cư dân. Dự án được phát triển bởi Masterise Homes, hứa hẹn trở thành trung tâm mới của Đông Nam Á.',
  
  content: [
    {
      _type: 'hero',
      _key: 'hero-section',
      heading: 'The Global City',
      category: 'Khu Đô Thị Kiểu Mẫu',
      location: 'Đỗ Xuân Hợp, An Phú, Quận 2, TP.HCM',
      backgroundImage: images.overview
    },
    {
      _type: 'block',
      _key: 'intro',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Global City là dự án khu đô thị phức hợp đẳng cấp quốc tế do Masterise Homes phát triển, nằm tại vị trí chiến lược ở Quận 2, TP. Hồ Chí Minh. Với tổng diện tích 117.4 ha, dự án hứa hẹn trở thành trung tâm mới của Đông Nam Á với đầy đủ tiện ích hiện đại, không gian sống xanh và hệ thống hạ tầng đồng bộ.',
          marks: [],
        }
      ],
      markDefs: [],
    },
    {
      _type: 'gallery',
      _key: 'project-gallery',
      images: [
        { _key: 'g1', url: images.masterplan, alt: 'Tổng quan dự án' },
        { _key: 'g2', url: images.soho, alt: 'Khu SOHO hiện đại' },
        { _key: 'g3', url: images.park, alt: 'Công viên trung tâm' },
        { _key: 'g4', url: images.fountain, alt: 'Khu vực đài phun nước' },
        { _key: 'g5', url: images.amenity1, alt: 'Tiện ích cao cấp' },
        { _key: 'g6', url: images.amenity2, alt: 'Không gian sống xanh' },
      ]
    },
    {
      _type: 'infoGrid',
      _key: 'overview-specs',
      title: 'Thông tin tổng quan',
      items: [
        {
          _key: 'spec1', title: 'Quy mô & Pháp lý',
          content: ['Tổng diện tích: 117.4 ha', 'Số lượng: ~18,000 căn', 'Mật độ xây dựng: 35%', 'Pháp lý: Sổ hồng lâu dài']
        },
        {
          _key: 'spec2', title: 'Tiến độ & Bàn giao',
          content: ['Khởi công: Q2/2020', 'Bàn giao: Q4/2024 - Q4/2028', 'Tình trạng: Đang mở bán', 'Bàn giao: Hoàn thiện cao cấp']
        },
        {
          _key: 'spec3', title: 'Loại hình sản phẩm',
          content: ['Căn hộ Studio: 28-35m²', 'Căn hộ 1-2PN: 45-75m²', 'Căn hộ 3-4PN: 85-150m²', 'Penthouse: 150-400m²']
        },
        {
          _key: 'spec4', title: 'Chủ đầu tư',
          content: ['Masterise Homes', 'Uy tín 15+ năm', 'Dự án cao cấp', 'Đối tác quốc tế']
        }
      ]
    },
    {
      _type: 'featureList',
      _key: 'amenities',
      title: 'Tiện ích nội khu đẳng cấp',
      subtitle: 'Hơn 100 tiện ích 5 sao mang đến trải nghiệm sống toàn diện',
      features: [
        { _key: 'f1', icon: '🏊', title: 'Hồ bơi vô cực', description: 'Hồ bơi panorama, hồ bơi trẻ em và jacuzzi' },
        { _key: 'f2', icon: '🏋️', title: 'Gym & Yoga', description: 'Phòng gym Technogym, yoga ngoài trời' },
        { _key: 'f3', icon: '🌳', title: 'Công viên 36ha', description: 'Không gian xanh, hồ điều hòa, đường chạy bộ' },
        { _key: 'f4', icon: '🏫', title: 'Trường học quốc tế', description: 'Hệ thống trường chuẩn Cambridge' },
        { _key: 'f5', icon: '🛍️', title: 'TTTM Vincom', description: 'Quy mô 123.000m² lớn nhất TP.HCM' },
        { _key: 'f6', icon: '🏥', title: 'Y tế quốc tế', description: 'Bệnh viện đa khoa quốc tế' },
        { _key: 'f7', icon: '☕', title: 'Phố thương mại', description: 'SOHO sầm uất, ẩm thực đa dạng' },
        { _key: 'f8', icon: '🎾', title: 'Thể thao', description: 'Tennis, bóng rổ, khu vui chơi' }
      ]
    },
    {
      _type: 'locationMap',
      _key: 'location',
      title: 'Vị trí đắc địa',
      description: 'Tọa lạc tại trung tâm An Phú, Quận 2, kết nối thuận tiện.',
      address: 'Đường Đỗ Xuân Hợp, Quận 2, TP.HCM',
      coordinates: { lat: 10.8004, lng: 106.7473 },
      nearbyPlaces: [
        { _key: 'n1', name: 'Sân bay Tân Sơn Nhất', distance: '15 phút', icon: '✈️' },
        { _key: 'n2', name: 'Trung tâm Quận 1', distance: '10 phút', icon: '🏙️' },
        { _key: 'n3', name: 'Khu Thảo Điền', distance: '5 phút', icon: '🌆' },
        { _key: 'n4', name: 'Metro số 1', distance: '3 phút', icon: '🚇' }
      ]
    },
    {
      _type: 'infoTable',
      _key: 'payment-policy',
      title: 'Chính sách thanh toán',
      rows: [
        { _key: 'r1', label: 'Đặt cọc', value: '50.000.000 VNĐ' },
        { _key: 'r2', label: 'Ký HĐMB', value: '30% giá trị' },
        { _key: 'r3', label: 'Xây dựng', value: '40% theo tiến độ' },
        { _key: 'r4', label: 'Bàn giao', value: '30% cuối cùng' }
      ]
    },
    {
      _type: 'mortgageCalculator',
      _key: 'calculator',
      title: 'Tính toán khoản vay',
      defaultPrice: 36000000000,
      priceOptions: [
        { label: "Căn hộ 1PN", value: 5000000000 },
        { label: "Căn hộ 2PN", value: 7500000000 },
        { label: "Căn hộ 3PN", value: 9500000000 },
        { label: "Nhà phố SOHO", value: 36000000000 },
        { label: "Nhà phố SOHO (Lớn)", value: 43000000000 },
        { label: "Nhà phố SOHO (Góc)", value: 80000000000 }
      ]
    },
    {
      _type: 'banner',
      _key: 'cta-banner',
      title: 'Đặt chỗ ngay hôm nay - Nhận ưu đãi đặc biệt',
      content: 'Chương trình ưu đãi có giới hạn liên hệ ngay.',
      buttonText: 'Đăng ký ngay',
      backgroundImage: images.banner
    },
    {
      _type: 'inlineRegisterForm',
      _key: 'register',
      title: 'Đăng ký nhận tư vấn',
      description: 'Chúng tôi sẽ liên hệ trong vòng 24h'
    }
  ]
});

/**
 * 2. ENGLISH DATA (EN)
 */
const getGlobalCityEN = (mainImageAsset) => ({
  _type: 'project',
  _id: 'project-global-city-en',
  language: 'en',
  title: 'The Global City',
  slug: { _type: 'slug', current: 'the-global-city' },
  category: 'Urban Township',
  location: 'District 2, HCMC',
  developer: 'Masterise Homes',
  price: 'From 2.5B - 15B VND',
  status: 'selling',
  mainImage: mainImageAsset ? { _type: 'image', asset: { _type: 'reference', _ref: mainImageAsset } } : undefined,
  overview: 'The Global City is a world-class mixed-use township in District 2, HCMC covering 117.4ha. Developed by Masterise Homes, it promises to become the new downtown of Southeast Asia with modern amenities and green living spaces.',
  
  content: [
    {
      _type: 'hero',
      _key: 'hero-section',
      heading: 'The Global City',
      category: 'Master Planned',
      location: 'Do Xuan Hop, An Phu, District 2, HCMC',
      backgroundImage: images.overview
    },
    {
      _type: 'block',
      _key: 'intro',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Global City is a world-class mixed-use township developed by Masterise Homes, strategically located in District 2, Ho Chi Minh City. With a total area of 117.4 hectares, the project promises to become the new downtown of Southeast Asia, featuring modern amenities, vast green spaces, and synchronized infrastructure.',
          marks: [],
        }
      ],
      markDefs: [],
    },
    {
      _type: 'gallery',
      _key: 'project-gallery',
      images: [
        { _key: 'g1', url: images.masterplan, alt: 'Project Overview' },
        { _key: 'g2', url: images.soho, alt: 'Modern SOHO Area' },
        { _key: 'g3', url: images.park, alt: 'Central Park' },
        { _key: 'g4', url: images.fountain, alt: 'Fountain Square' },
        { _key: 'g5', url: images.amenity1, alt: 'Premium Amenities' },
        { _key: 'g6', url: images.amenity2, alt: 'Green Living Space' },
      ]
    },
    {
      _type: 'infoGrid',
      _key: 'overview-specs',
      title: 'Project Overview',
      items: [
        {
          _key: 'spec1', title: 'Scale & Legal',
          content: ['Total Area: 117.4 ha', 'Total Units: ~18,000', 'Building Density: 35%', 'Legal: Long-term Ownership']
        },
        {
          _key: 'spec2', title: 'Progress & Handover',
          content: ['Start: Q2/2020', 'Handover: Q4/2024 - Q4/2028', 'Status: Selling', 'Handover Condition: Master Finish']
        },
        {
          _key: 'spec3', title: 'Product Types',
          content: ['Studio: 28-35m²', '1-2BR Apt: 45-75m²', '3-4BR Apt: 85-150m²', 'Penthouse: 150-400m²']
        },
        {
          _key: 'spec4', title: 'Developer',
          content: ['Masterise Homes', '15+ Years Experience', 'Luxury Portfolio', 'International Partners']
        }
      ]
    },
    {
      _type: 'featureList',
      _key: 'amenities',
      title: 'World-Class Amenities',
      subtitle: 'Over 100 5-star amenities for a comprehensive living experience',
      features: [
        { _key: 'f1', icon: '🏊', title: 'Infinity Pool', description: 'Panorama pool, kids pool and jacuzzi' },
        { _key: 'f2', icon: '🏋️', title: 'Gym & Yoga', description: 'Technogym equipment, outdoor yoga studio' },
        { _key: 'f3', icon: '🌳', title: '36ha Central Park', description: 'Vast green space, lake, jogging path' },
        { _key: 'f4', icon: '🏫', title: 'International School', description: 'Cambridge standard education system' },
        { _key: 'f5', icon: '🛍️', title: 'Vincom Mega Mall', description: 'Largest mall in HCMC (123,000m²)' },
        { _key: 'f6', icon: '🏥', title: 'International Hospital', description: 'JCI standard general hospital' },
        { _key: 'f7', icon: '☕', title: 'Commercial Street', description: 'Bustling SOHO, diverse dining' },
        { _key: 'f8', icon: '🎾', title: 'Sports Center', description: 'Tennis, basketball, kids zone' }
      ]
    },
    {
      _type: 'locationMap',
      _key: 'location',
      title: 'Prime Location',
      description: 'Located in the heart of An Phu, District 2, with seamless connectivity.',
      address: 'Do Xuan Hop St, District 2, HCMC',
      coordinates: { lat: 10.8004, lng: 106.7473 },
      nearbyPlaces: [
        { _key: 'n1', name: 'Tan Son Nhat Airport', distance: '15 mins', icon: '✈️' },
        { _key: 'n2', name: 'District 1 Center', distance: '10 mins', icon: '🏙️' },
        { _key: 'n3', name: 'Thao Dien Area', distance: '5 mins', icon: '🌆' },
        { _key: 'n4', name: 'Metro Line 1', distance: '3 mins', icon: '🚇' }
      ]
    },
    {
      _type: 'infoTable',
      _key: 'payment-policy',
      title: 'Payment Policy',
      rows: [
        { _key: 'r1', label: 'Deposit', value: '50,000,000 VND' },
        { _key: 'r2', label: 'Sign SPA', value: '30% of value' },
        { _key: 'r3', label: 'Construction', value: '40% (progress based)' },
        { _key: 'r4', label: 'Handover', value: 'Final 30%' }
      ]
    },
    {
      _type: 'mortgageCalculator',
      _key: 'calculator',
      title: 'Mortgage Calculator',
      defaultPrice: 36000000000,
      priceOptions: [
        { label: "1BR Apartment", value: 5000000000 },
        { label: "2BR Apartment", value: 7500000000 },
        { label: "3BR Apartment", value: 9500000000 },
        { label: "SOHO Townhouse", value: 36000000000 },
        { label: "SOHO Townhouse (L)", value: 43000000000 },
        { label: "SOHO Townhouse (C)", value: 80000000000 }
      ]
    },
    {
      _type: 'banner',
      _key: 'cta-banner',
      title: 'Book Now - Special Offers',
      content: 'Limited time promotion. Contact us today.',
      buttonText: 'Register Now',
      backgroundImage: images.banner
    },
    {
      _type: 'inlineRegisterForm',
      _key: 'register',
      title: 'Register for Consultation',
      description: 'Our team will contact you within 24h'
    }
  ]
});

/**
 * 3. KOREAN DATA (KO)
 */
const getGlobalCityKO = (mainImageAsset) => ({
  _type: 'project',
  _id: 'project-global-city-ko',
  language: 'ko',
  title: 'The Global City',
  slug: { _type: 'slug', current: 'the-global-city' },
  category: '신도시',
  location: '2군, 호치민시',
  developer: 'Masterise Homes',
  price: '25억 - 150억 동',
  status: 'selling',
  mainImage: mainImageAsset ? { _type: 'image', asset: { _type: 'reference', _ref: mainImageAsset } } : undefined,
  overview: 'The Global City는 호치민시 2군에 위치한 117.4ha 규모의 세계적인 복합 신도시입니다. Masterise Homes가 개발하여 현대적인 편의 시설과 녹지 공간을 갖춘 동남아시아의 새로운 다운타운이 될 것입니다.',
  
  content: [
    {
      _type: 'hero',
      _key: 'hero-section',
      heading: 'The Global City',
      category: '마스터 플랜',
      location: '호치민시 2군 안푸, 도쑤안홉',
      backgroundImage: images.overview
    },
    {
      _type: 'block',
      _key: 'intro',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The Global City는 Masterise Homes가 개발한 세계적인 수준의 복합 신도시로, 호치민시 2군의 전략적 위치에 자리 잡고 있습니다. 총면적 117.4ha의 이 프로젝트는 현대적인 편의 시설, 광활한 녹지 공간, 동기화된 인프라를 갖춘 동남아시아의 새로운 중심지가 될 것입니다.',
          marks: [],
        }
      ],
      markDefs: [],
    },
    {
      _type: 'gallery',
      _key: 'project-gallery',
      images: [
        { _key: 'g1', url: images.masterplan, alt: '프로젝트 개요' },
        { _key: 'g2', url: images.soho, alt: '현대적인 SOHO 지역' },
        { _key: 'g3', url: images.park, alt: '중앙 공원' },
        { _key: 'g4', url: images.fountain, alt: '분수 광장' },
        { _key: 'g5', url: images.amenity1, alt: '프리미엄 편의 시설' },
        { _key: 'g6', url: images.amenity2, alt: '녹색 생활 공간' },
      ]
    },
    {
      _type: 'infoGrid',
      _key: 'overview-specs',
      title: '프로젝트 개요',
      items: [
        {
          _key: 'spec1', title: '규모 및 법적',
          content: ['총면적: 117.4 ha', '총 세대수: ~18,000', '건폐율: 35%', '법적: 장기 소유권']
        },
        {
          _key: 'spec2', title: '진행 및 양도',
          content: ['착공: 2020년 2분기', '양도: 2024년 4분기 - 2028년', '상태: 분양 중', '양도 조건: 최고급 마감']
        },
        {
          _key: 'spec3', title: '상품 유형',
          content: ['스튜디오: 28-35m²', '1-2룸 아파트: 45-75m²', '3-4룸 아파트: 85-150m²', '펜트하우스: 150-400m²']
        },
        {
          _key: 'spec4', title: '개발사',
          content: ['Masterise Homes', '15년 이상의 경험', '럭셔리 포트폴리오', '국제 파트너']
        }
      ]
    },
    {
      _type: 'featureList',
      _key: 'amenities',
      title: '세계적 수준의 편의 시설',
      subtitle: '완벽한 생활 경험을 위한 100개 이상의 5성급 편의 시설',
      features: [
        { _key: 'f1', icon: '🏊', title: '인피니티 풀', description: '파노라마 수영장, 키즈 풀 및 자쿠지' },
        { _key: 'f2', icon: '🏋️', title: '피트니스 & 요가', description: '테크노짐 장비, 야외 요가 스튜디오' },
        { _key: 'f3', icon: '🌳', title: '36ha 중앙 공원', description: '넓은 녹지, 호수, 조깅 코스' },
        { _key: 'f4', icon: '🏫', title: '국제 학교', description: '캠브리지 표준 교육 시스템' },
        { _key: 'f5', icon: '🛍️', title: '빈컴 메가 몰', description: '호치민시 최대 쇼핑몰 (123,000m²)' },
        { _key: 'f6', icon: '🏥', title: '국제 병원', description: 'JCI 표준 종합 병원' },
        { _key: 'f7', icon: '☕', title: '상업 거리', description: '활기찬 SOHO, 다양한 식당' },
        { _key: 'f8', icon: '🎾', title: '스포츠 센터', description: '테니스, 농구, 키즈 존' }
      ]
    },
    {
      _type: 'locationMap',
      _key: 'location',
      title: '최고의 위치',
      description: '2군 안푸 중심부에 위치하여 연결성이 뛰어납니다.',
      address: '호치민시 2군 도쑤안홉 거리',
      coordinates: { lat: 10.8004, lng: 106.7473 },
      nearbyPlaces: [
        { _key: 'n1', name: '탄손누트 공항', distance: '15분', icon: '✈️' },
        { _key: 'n2', name: '1군 중심가', distance: '10분', icon: '🏙️' },
        { _key: 'n3', name: '타오디엔 구역', distance: '5분', icon: '🌆' },
        { _key: 'n4', name: '지하철 1호선', distance: '3분', icon: '🚇' }
      ]
    },
    {
      _type: 'infoTable',
      _key: 'payment-policy',
      title: '결제 정책',
      rows: [
        { _key: 'r1', label: '보증금', value: '50,000,000 VND' },
        { _key: 'r2', label: '매매계약 체결', value: '가치의 30%' },
        { _key: 'r3', label: '건설 중', value: '40% (진행 기준)' },
        { _key: 'r4', label: '양도 시', value: '최종 30%' }
      ]
    },
    {
      _type: 'mortgageCalculator',
      _key: 'calculator',
      title: '대출 계산기',
      defaultPrice: 36000000000,
      priceOptions: [
        { label: "1베드룸 아파트", value: 5000000000 },
        { label: "2베드룸 아파트", value: 7500000000 },
        { label: "3베드룸 아파트", value: 9500000000 },
        { label: "SOHO 타운하우스", value: 36000000000 },
        { label: "SOHO 타운하우스 (대)", value: 43000000000 },
        { label: "SOHO 타운하우스 (코너)", value: 80000000000 }
      ]
    },
    {
      _type: 'banner',
      _key: 'cta-banner',
      title: '지금 예약하세요 - 특별 우대',
      content: '기간 한정 프로모션. 지금 문의하세요.',
      buttonText: '지금 등록하기',
      backgroundImage: images.banner
    },
    {
      _type: 'inlineRegisterForm',
      _key: 'register',
      title: '상담 신청',
      description: '저희 팀이 24시간 이내에 연락드리겠습니다'
    }
  ]
});

/**
 * Main migration function
 */
async function migrateAllLanguages() {
  try {
    console.log('🚀 Starting Multi-language Migration for The Global City...');
    
    // Upload main image first
    const mainImageAssetId = await uploadImage(images.overview);
    
    // 1. Migrate Vietnamese (VN)
    console.log('🇻🇳 Migrating VN version...');
    await client.createOrReplace(getGlobalCityVN(mainImageAssetId));
    
    // 2. Migrate English (EN)
    console.log('🇺🇸 Migrating EN version...');
    await client.createOrReplace(getGlobalCityEN(mainImageAssetId));
    
    // 3. Migrate Korean (KO)
    console.log('🇰🇷 Migrating KO version...');
    await client.createOrReplace(getGlobalCityKO(mainImageAssetId));
    
    console.log('✅ All translations migrated successfully!');
    console.log('🌐 View VN: http://localhost:3001/vn/projects/the-global-city');
    console.log('🌐 View EN: http://localhost:3001/en/projects/the-global-city');
    console.log('🌐 View KO: http://localhost:3001/ko/projects/the-global-city');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration
migrateAllLanguages()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  });
