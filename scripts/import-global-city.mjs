/**
 * Migration Script: Import The Global City Project to Sanity
 * 
 * This script uses the Sanity API to create/update "The Global City" project
 * with comprehensive content blocks for a premium presentation.
 * 
 * Usage: node scripts/import-global-city.mjs
 */

import { createClient } from '@sanity/client';

// Environment variables should be available from .env.local via Next.js
const client = createClient({
  projectId: 'yp0h39ps',
  dataset: 'production',
  token: process.env.SANITY_TOKEN || 'skMhqqP0r4KiH1XPy9MEg4UjYaLDQyhPkYXavKStTGb3mZDM41UWfk5SYY8VgDHOIMKjnBSAbvBS95Xm1NHBqdKyJfNkCTmM974MEwQO2uZU6Jmska0xVty94bOzICfqZlHDknjH6enIND4QTeV2Pjs0L86PAjY1br2LROHGgUDSvwiCmn7S',
  apiVersion: '2024-01-01',
  useCdn: false,
});

/**
 * The Global City Project Data
 * Based on typical premium real estate project structure
 */
const globalCityData = {
  _type: 'project',
  _id: 'project-global-city', // Update existing document
  language: 'vn',
  title: 'The Global City',
  slug: {
    _type: 'slug',
    current: 'the-global-city',
  },
  category: 'Khu đô thị',
  location: 'Quận 2, TP. Hồ Chí Minh',
  developer: 'Masterise Homes',
  price: 'Từ 2.5 tỷ - 15 tỷ',
  status: 'selling',
  overview: 'The Global City là khu đô thị đẳng cấp quốc tế tại Quận 2, TP.HCM với quy mô 117.4ha, mang đến không gian sống hiện đại và đầy đủ tiện ích cho cư dân. Dự án được phát triển bởi Masterise Homes, hứa hẹn trở thành trung tâm mới của Đông Nam Á.',
  
  content: [
    {
      _type: 'hero',
      _key: 'hero-section',
      heading: 'The Global City',
      category: 'Master Planned',
      location: 'Do Xuan Hop, An Phu, District 2, HCMC',
      backgroundImage: '/assets/images/global_city_overview.png'
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
        {
          _key: 'gallery-1',
          url: '/assets/images/global_city_masterplan.jpg',
          alt: 'The Global City - Tổng quan dự án',
        },
        {
          _key: 'gallery-2',
          url: '/assets/images/global_city_soho.jpg',
          alt: 'The Global City - Khu SOHO hiện đại',
        },
        {
          _key: 'gallery-3',
          url: '/assets/images/global_city_park.jpg',
          alt: 'The Global City - Công viên trung tâm',
        },
        {
          _key: 'gallery-4',
          url: '/assets/images/global_city_fountain.jpg',
          alt: 'The Global City - Khu vực đài phun nước',
        },
        {
          _key: 'gallery-5',
          url: '/assets/images/project1.jpg',
          alt: 'The Global City - Tiện ích cao cấp',
        },
        {
          _key: 'gallery-6',
          url: '/assets/images/project2.jpg',
          alt: 'The Global City - Không gian sống xanh',
        },
      ]
    },
    {
      _type: 'infoGrid',
      _key: 'overview-specs',
      title: 'Thông tin tổng quan',
      items: [
        {
          _key: 'overview-1',
          title: 'Quy mô & Pháp lý',
          content: [
            'Tổng diện tích: 117.4 ha',
            'Số lượng căn hộ: ~18,000 căn',
            'Mật độ xây dựng: 35%',
            'Pháp lý: Sổ hồng lâu dài',
          ]
        },
        {
          _key: 'overview-2',
          title: 'Tiến độ & Bàn giao',
          content: [
            'Khởi công: Q2/2020',
            'Bàn giao dự kiến: Q4/2024 - Q4/2028',
            'Tình trạng: Đang mở bán',
            'Cam kết bàn giao: Hoàn thiện cao cấp',
          ]
        },
        {
          _key: 'overview-3',
          title: 'Loại hình sản phẩm',
          content: [
            'Căn hộ Studio: 28-35m²',
            'Căn hộ 1-2 phòng ngủ: 45-75m²',
            'Căn hộ 3-4 phòng ngủ: 85-150m²',
            'Penthouse & Sky Villa: 150-400m²',
          ]
        },
        {
          _key: 'overview-4',
          title: 'Chủ đầu tư',
          content: [
            'Masterise Homes',
            'Uy tín 15+ năm phát triển BĐS',
            'Danh mục dự án cao cấp',
            'Đối tác quốc tế uy tín',
          ]
        }
      ]
    },
    {
      _type: 'featureList',
      _key: 'amenities',
      title: 'Tiện ích nội khu đẳng cấp',
      subtitle: 'Hơn 100 tiện ích 5 sao mang đến trải nghiệm sống toàn diện',
      features: [
        {
          _key: 'amenity-1',
          icon: '🏊',
          title: 'Hồ bơi vô cực',
          description: 'Hệ thống hồ bơi cao cấp với tầm nhìn panorama, khu vực bơi cho trẻ em và jacuzzi'
        },
        {
          _key: 'amenity-2',
          icon: '🏋️',
          title: 'Gym & Yoga Studio',
          description: 'Phòng gym trang bị hiện đại Technogym, khu vực yoga ngoài trời và studio múa'
        },
        {
          _key: 'amenity-3',
          icon: '🌳',
          title: 'Công viên trung tâm 36ha',
          description: 'Không gian xanh rộng lớn với hồ điều hòa, đường chạy bộ và khu vui chơi trẻ em'
        },
        {
          _key: 'amenity-4',
          icon: '🏫',
          title: 'Hệ thống giáo dục',
          description: 'Trường mầm non, tiểu học & THPT quốc tế chuẩn Cambridge ngay trong khu đô thị'
        },
        {
          _key: 'amenity-5',
          icon: '🛍️',
          title: 'Trung tâm thương mại',
          description: 'Vincom Mega Mall với 300+ thương hiệu cao cấp, rạp chiếu phim và khu ẩm thực'
        },
        {
          _key: 'amenity-6',
          icon: '🏥',
          title: 'Y tế quốc tế',
          description: 'Bệnh viện đa khoa đạt chuẩn JCI với đội ngũ bác sĩ chuyên môn cao'
        },
        {
          _key: 'amenity-7',
          icon: '☕',
          title: 'Khu phố thương mại',
          description: 'Shophouse, cafe, nhà hàng đa dạng phục vụ cư dân 24/7'
        },
        {
          _key: 'amenity-8',
          icon: '🎾',
          title: 'Thể thao & giải trí',
          description: 'Sân tennis, bóng rổ, cầu lông, BBQ, kids club và game zone'
        }
      ]
    },
    {
      _type: 'locationMap',
      _key: 'location',
      title: 'Vị trí đắc địa - Kết nối toàn diện',
      description: 'Tọa lạc tại trung tâm Quận 2, The Global City kết nối thuận tiện với các khu vực trọng điểm của TP.HCM thông qua hệ thống giao thông hiện đại.',
      address: 'Đường An Phú, Quận 2, TP. Hồ Chí Minh',
      coordinates: {
        lat: 10.8004,
        lng: 106.7473,
      },
      nearbyPlaces: [
        {
          _key: 'nearby-1',
          name: 'Sân bay Tân Sơn Nhất',
          distance: '15 phút',
          icon: '✈️'
        },
        {
          _key: 'nearby-2',
          name: 'Trung tâm Quận 1',
          distance: '10 phút',
          icon: '🏙️'
        },
        {
          _key: 'nearby-3',
          name: 'Khu Thảo Điền',
          distance: '5 phút',
          icon: '🌆'
        },
        {
          _key: 'nearby-4',
          name: 'Metro số 1 (Bến Thành - Suối Tiên)',
          distance: '3 phút',
          icon: '🚇'
        },
        {
          _key: 'nearby-5',
          name: 'Vincity Quận 9',
          distance: '8 phút',
          icon: '🏘️'
        },
        {
          _key: 'nearby-6',
          name: 'Cầu Thủ Thiêm',
          distance: '2 phút',
          icon: '🌉'
        }
      ]
    },
    {
      _type: 'infoTable',
      _key: 'payment-policy',
      title: 'Chính sách thanh toán linh hoạt',
      description: 'Đa dạng phương thức thanh toán phù hợp với nhu cầu khách hàng',
      rows: [
        {
          _key: 'payment-1',
          label: 'Đặt cọc giữ chỗ',
          value: '50.000.000 VNĐ'
        },
        {
          _key: 'payment-2',
          label: 'Ký HĐMB (30 ngày)',
          value: '30% giá trị căn hộ (trừ tiền đặt cọc)'
        },
        {
          _key: 'payment-3',
          label: 'Trong quá trình xây dựng',
          value: '40% theo tiến độ thi công (chia 4-6 đợt)'
        },
        {
          _key: 'payment-4',
          label: 'Khi nhận nhà',
          value: '30% còn lại (hoặc vay ngân hàng 70%)'
        }
      ]
    },
    {
      _type: 'infoTable',
      _key: 'preferential',
      title: 'Ưu đãi đặc biệt',
      rows: [
        {
          _key: 'promo-1',
          label: 'Chiết khấu thanh toán sớm',
          value: 'Lên đến 5% cho khách hàng thanh toán 95% trước bàn giao'
        },
        {
          _key: 'promo-2',
          label: 'Hỗ trợ lãi suất 0%',
          value: '18 tháng (dành cho căn hộ từ 2PN trở lên)'
        },
        {
          _key: 'promo-3',
          label: 'Voucher nội thất',
          value: '100 triệu cho gói hoàn thiện nội thất cao cấp'
        },
        {
          _key: 'promo-4',
          label: 'Cam kết mua lại',
          value: 'Chủ đầu tư cam kết mua lại 110% sau 2 năm'
        }
      ]
    },
    {
      _type: 'mortgageCalculator',
      _key: 'calculator',
      title: 'Tính toán khoản vay mua nhà',
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
      content: 'Chương trình ưu đãi có giới hạn. Liên hệ ngay để được tư vấn và đặt chỗ.',
      buttonText: 'Đăng ký ngay',
      backgroundImage: '/assets/images/global_city_pool.png'
    },
    {
      _type: 'inlineRegisterForm',
      _key: 'register',
      title: 'Đăng ký nhận tư vấn miễn phí',
      description: 'Để lại thông tin, đội ngũ chuyên viên sẽ liên hệ tư vấn chi tiết trong vòng 24h'
    }
  ]
};

/**
 * Main migration function
 */
async function migrateGlobalCity() {
  try {
    console.log('🚀 Starting migration: The Global City...');
    console.log('📝 Project ID:', globalCityData._id);
    
    // Create or replace the document
    const result = await client.createOrReplace(globalCityData);
    
    console.log('✅ Migration successful!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 View in Studio: https://www.sanity.io/manage');
    console.log('🌐 View on site: http://localhost:3001/vn/projects/the-global-city');
    
    return result;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration
migrateGlobalCity()
  .then(() => {
    console.log('\n✨ All done! The Global City has been added to Sanity.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration error:', error);
    process.exit(1);
  });
