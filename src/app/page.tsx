import Hero from "@/components/sections/Hero";
import Link from "next/link";
import Image from "next/image";
import projects from "@/data/projects.json";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Featured Projects */}
      <section id="featured-projects" className="container mx-auto px-5 py-24 reveal reveal-on-load">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Dự Án Tiêu Biểu</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-slate-500">Tuyển chọn những dự án có vị trí đắc địa và tiềm năng sinh lời cao nhất.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-accent hover:-translate-y-3"
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <span className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 text-xs font-bold rounded-sm uppercase">
                  {project.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.description}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                  <span className="text-slate-400">📍 {project.location}</span>
                  <span className="text-accent font-bold">{project.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-slate-50 py-24 reveal">
        <div className="container mx-auto px-5 lg:flex items-center gap-16">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/images/consultant.jpg')" }}
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-accent text-3xl font-bold mb-6">Tại Sao Chọn VN Luxury Realty?</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>Với hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản phân khúc hạng sang tại Việt Nam, chúng tôi tự hào mang đến cho khách hàng những giải pháp đầu tư tối ưu.</p>
              <p>Đội ngũ chuyên gia của chúng tôi cam kết đồng hành cùng quý khách từ bước tìm hiểu thông tin cho đến khi nhận bàn giao nhà.</p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Tư vấn chuyên sâu 24/7
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Rổ hàng độc quyền suất nội bộ
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">✔</span> Pháp lý minh bạch, rõ ràng
                </li>
              </ul>
              <Link href="/about" className="inline-block mt-8 bg-primary text-white py-3 px-8 rounded-sm hover:bg-secondary transition-colors font-semibold">
                TÌM HIỂU THÊM VỀ CHÚNG TÔI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
        <a href="https://zalo.me/0123456789" className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          Z
        </a>
        <a href="tel:0123456789" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          📞
        </a>
      </div>
    </div>
  );
}
