export default function Footer() {
  return (
    <footer className="bg-primary text-text-secondary py-16 border-t border-white/10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-accent text-xl font-bold mb-5">VN Luxury Realty</h3>
          <p className="max-w-xs text-sm leading-relaxed">
            Kiến tạo giá trị sống thượng lưu. Chúng tôi mang đến những giải pháp bất động sản đẳng cấp nhất tại Việt Nam.
          </p>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-5">Liên Kết Nhanh</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/projects" className="hover:text-accent transition-colors">Dự án mới</a></li>
            <li><a href="/#news" className="hover:text-accent transition-colors">Tin tức thị trường</a></li>
            <li><a href="/policy" className="hover:text-accent transition-colors">Chính sách bảo mật</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-5">Thông Tin Liên Hệ</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2"><span className="text-accent">📍</span> 123 Lê Lợi, Quận 1, TP.HCM</p>
            <p className="flex items-center gap-2"><span className="text-accent">📞</span> 0123 456 789</p>
            <p className="flex items-center gap-2"><span className="text-accent">📧</span> contact@vnluxury.vn</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 mt-10 pt-5 border-t border-white/5 text-center text-xs">
        <p>&copy; 2026 VN Luxury Realty. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
}
