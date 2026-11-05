export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST' });
  }

  const { messages } = req.body;
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  // Lấy câu hỏi mới nhất của người dùng
  const userMessages = (messages || []).filter(m => m.sender === 'user');
  const latestQuery = userMessages.length > 0 ? userMessages[userMessages.length - 1].text : '';

  // BỘ PHẢN HỒI THÔNG MINH DỰ PHÒNG (KHI GOOGLE API BỊ NGHẼN TẢI)
  const getFallbackReply = (query) => {
    const q = (query || '').toLowerCase();

    // 1. Tóm tắt nội dung các ngày
    if (q.includes("ngày 1") || (q.includes("tóm tắt") && q.includes("1"))) {
      return "📚 TÓM TẮT BÀI HỌC NGÀY 1: HỘI NHẬP & TIÊU CHUẨN CỬA HÀNG\n\n" +
        "1. Lịch sử & Giá trị cốt lõi: Phong Vũ thành lập năm 1997, thuộc hệ sinh thái Teko/VNLife. 4 giá trị cốt lõi: Khách hàng là số 1 - Chính trực - Quan tâm - Đồng đội.\n" +
        "2. Nghi thức chào đón 4 điểm chạm (Golden Rule): Đứng thẳng, tay đặt ngực trái (vị trí trái tim), cúi 15 độ, nói rõ câu chào: 'Dạ Phong Vũ xin chào!'.\n" +
        "3. Tiêu chuẩn mặt tiền (HR_QĐ.01): Cờ/Standee vuông góc không cản lối đi; băng rôn phẳng phiu đúng CTKM; vách kính sáng sạch, xe khách có phủ bạt che mưa/nắng.\n" +
        "4. Tiêu chuẩn bên trong: Layout theo giá - kích thước - màu; 100% sản phẩm có bảng giá mica đặt bên phải; bàn tư vấn sạch sẽ.\n" +
        "5. Mã lỗi SHR cần tránh: SHR1 (sai đồng phục), SHR8 (tụ tập cười đùa), SHR17 (đưa đồ bằng 1 tay).";
    }

    if (q.includes("ngày 2") || (q.includes("tóm tắt") && q.includes("2"))) {
      return "📚 TÓM TẮT BÀI HỌC NGÀY 2: KỸ NĂNG & 6 BƯỚC BÁN HÀNG\n\n" +
        "1. Quy trình 6 bước: Chuẩn bị -> Tiếp cận tạo thiện cảm -> Khai thác nhu cầu -> Giới thiệu FABE -> Xử lý phản bác LAST -> Chốt đơn & CSKH.\n" +
        "2. Nguyên tắc giao tiếp 55-38-7: 55% phi ngôn ngữ (ngôn ngữ cơ thể, ánh mắt), 38% ngữ điệu giọng nói, 7% từ ngữ.\n" +
        "3. Khai thác nhu cầu (SPIN): Hỏi mục đích dùng cụ thể, mức ngân sách, người dùng chính và kinh nghiệm dùng máy cũ.\n" +
        "4. Giới thiệu FABE: Feature (Tính năng) -> Advantage (Ưu điểm) -> Benefit (Lợi ích thực tế cho khách) -> Evidence (Minh chứng/Trải nghiệm thử).\n" +
        "5. Xử lý từ chối LAST: Listen (Lắng nghe) -> Apologize (Đồng cảm) -> Solve (Đưa giải pháp) -> Thanks (Cảm ơn).\n" +
        "6. Kỹ thuật chốt: Chốt giả định ('Em lấy máy mới nguyên seal cho mình nhé?'), Chốt lựa chọn thanh toán, Chốt khan hiếm ưu đãi.";
    }

    if (q.includes("ngày 3") || (q.includes("tóm tắt") && q.includes("3"))) {
      return "📚 TÓM TẮT BÀI HỌC NGÀY 3: KIẾN THỨC NỀN TẢNG & TƯ VẤN LAPTOP\n\n" +
        "• Phân loại: Văn phòng (đuôi U/V tiết kiệm điện, mỏng nhẹ, pin 6-8h) vs Gaming (đuôi H/HX bung hiệu năng, GPU RTX, màn hình 144Hz+) vs AI PC (NPU >= 40 TOPS).\n" +
        "• RAM: Tối thiểu 16GB để không giật lag. Lưu ý phân biệt RAM hàn chết (onboard) không thể nâng cấp.\n" +
        "• Ổ cứng: Chuẩn M.2 NVMe PCIe cho tốc độ mở máy thần tốc.\n" +
        "• Tư vấn kèm: Chuột, balo chống sốc, phần mềm Microsoft 365 chính hãng.";
    }

    if (q.includes("ngày 4") || (q.includes("tóm tắt") && q.includes("4"))) {
      return "📚 TÓM TẮT BÀI HỌC NGÀY 4: CẤU TẠO PC & 5 ĐIỂM ĐỎ TƯƠNG THÍCH\n\n" +
        "1. Socket CPU khớp Chipset Mainboard (Intel: LGA1700/LGA1851; AMD: AM4/AM5).\n" +
        "2. RAM đúng chuẩn bo mạch hỗ trợ (DDR4 vs DDR5).\n" +
        "3. Cắm RAM theo cặp (2 thanh) để bật Dual Channel nhân đôi băng thông.\n" +
        "4. Nguồn (PSU) chuẩn 80 Plus, dư tải an toàn 15-20%.\n" +
        "5. Kích thước linh kiện lắp vừa Case (chiều dài VGA, chiều cao quạt tản nhiệt).\n" +
        "• Phân bổ tiền: Bộ Gaming dồn 40-50% cho GPU; Bộ Đồ họa dồn cho CPU nhiều nhân thực + RAM 32GB+.";
    }

    if (q.includes("ngày 5") || (q.includes("tóm tắt") && q.includes("5"))) {
      return "📚 TÓM TẮT BÀI HỌC NGÀY 5: QUẢN LÝ TIỀN MẶT & THANH TOÁN\n\n" +
        "• Quy trình 7 bước thu ngân: Chuẩn bị tiền lẻ -> Thu tiền -> Lập phiếu thu 2 liên -> Kết ca -> Niêm phong két -> Nộp ngân hàng -> Lưu hồ sơ.\n" +
        "• Quy tắc túi Zip & Dropbox: Bỏ tiền + hóa đơn vào túi zip, ghi tên MSNV, thả vào Dropbox dưới camera CCTV.\n" +
        "• Thanh toán: Tiền mặt, POS ngân hàng, VNPay-QR, Trả góp thẻ tín dụng 0%, Trả góp qua cty tài chính (Home Credit/HD Saison).\n" +
        "• Nghiêm cấm: Mang tiền ra khỏi showroom (sa thải ngay lập tức), không in phiếu thu phạt 50% thưởng.";
    }

    // 2. Kỹ thuật phần cứng
    if ((q.includes("5600") || q.includes("am4")) && (q.includes("b650") || q.includes("am5"))) {
      return "❌ KHÔNG TƯƠNG THÍCH: AMD Ryzen 5 5600 chạy Socket AM4 (RAM DDR4), trong khi Main Asus B650 chạy Socket AM5 (RAM DDR5) nên không thể cắm vừa.\n\n👉 Hướng xử lý: Đổi Main xuống B550 (ví dụ Asus B550M-K) hoặc đổi CPU lên Ryzen 5 7500F/7600 để dùng chung với Main B650.";
    }

    if (q.includes("nvidia") && q.includes("main")) {
      return "💡 Card đồ họa NVIDIA (GeForce RTX/GTX) sử dụng khe cắm PCIe x16 tiêu chuẩn nên tương thích với TẤT CẢ các dòng Mainboard hiện nay của cả Intel và AMD. Bạn chỉ cần chú ý: (1) Công suất nguồn PSU đủ chuẩn 80 Plus và (2) Thùng case đủ rộng để nhét vừa chiều dài card.";
    }

    if (q.includes("chào") || q.includes("golden")) {
      return "👋 Nghi thức chào 4 điểm chạm chuẩn Phong Vũ: (1) Đứng thẳng hướng mắt về khách; (2) Đặt bàn tay lên ngực trái vị trí trái tim; (3) Cúi nhẹ 15 độ với nụ cười thân thiện; (4) Nói rõ: 'Dạ Phong Vũ xin chào!'.";
    }

    return "Dạ, về câu hỏi của bạn:\nBạn lưu ý luôn bám sát chuẩn phục vụ Golden Rule và 5 Điểm đỏ kỹ thuật khi tư vấn phần cứng nhé. Bạn có thể chọn xem nhanh nội dung ôn tập chi tiết trong tab 'Ôn Bài Học' phía trên!";
  };

  try {
    const contents = (messages || []).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    contents.unshift({
      role: 'user',
      parts: [{ text: `[HƯỚNG DẪN HỆ THỐNG]: Bạn là AI Coach Đào tạo của Phong Vũ (phongvu.vn). Trả lời ngắn gọn, chuẩn xác nghiệp vụ, ghi nhớ ngữ cảnh hội thoại.` }]
    });

    // Danh sách model ưu tiên từ nhẹ đến phổ thông
    const CANDIDATE_MODELS = [
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash',
      'gemini-1.5-flash-8b',
      'gemini-1.5-flash',
      'gemini-2.5-flash'
    ];

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        });

        const data = await response.json();

        // Nếu model không bị quá tải và trả về nội dung
        if (!data.error && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
        }
      } catch (e) {
        // Nếu lỗi mạng của model này, tiếp tục thử model tiếp theo
      }
    }

    // Nếu toàn bộ máy chủ Google đều bị quá tải, kích hoạt ngay bộ câu trả lời OJT nội bộ
    return res.status(200).json({ reply: getFallbackReply(latestQuery) });

  } catch (err) {
    // Trả về câu trả lời nội bộ nếu gặp lỗi hệ thống bất kỳ
    return res.status(200).json({ reply: getFallbackReply(latestQuery) });
  }
}
