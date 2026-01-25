'use client';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-primary">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-40 transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/60 to-transparent" />
      
      <div className="container relative z-10 px-5 reveal active">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-widest mb-6 leading-tight">
          Khám Phá Không Gian <br /> <span className="text-accent">Sống Thượng Lưu</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary mb-10 tracking-wide font-light">
          Chào mừng bạn đến với VN Luxury Realty - Nơi quy tụ những dự án bất động sản đẳng cấp nhất Việt Nam từ các chủ đầu tư uy tín.
        </p>
        <button 
          onClick={() => {
            const projectsSection = document.getElementById('featured-projects');
            projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="inline-block bg-accent hover:bg-accent-hover text-primary py-4 px-10 rounded-sm font-bold text-lg transition-all transform hover:-translate-y-1 shadow-2xl cursor-pointer"
        >
          XEM DỰ ÁN NỔI BẬT
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
}
