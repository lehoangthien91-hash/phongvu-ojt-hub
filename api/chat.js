export default async function handler(req, res) {
  // Cho phép trình duyệt gọi không bị chặn CORS
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
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY trên Vercel' });
  }

  const SYSTEM_INSTRUCTION = `
Bạn là AI Coach - Chuyên gia Đào tạo Bán hàng & Kỹ thuật thuộc Phòng Đào Tạo Phong Vũ (phongvu.vn).
Nhiệm vụ: Trả lời ngắn gọn, chuẩn xác kỹ thuật phần cứng PC/Laptop, quy chuẩn phục vụ Golden Rule và văn hóa bán hàng Phong Vũ.
Hãy ghi nhớ ngữ cảnh cuộc trò chuyện phía trước để trả lời các câu hỏi nối tiếp của học viên.
Quy chuẩn PC cốt lõi:
- AMD Socket AM4 (Ryzen 1000-5000 như 5600) -> Đi với Main A320, B450, B550.
- AMD Socket AM5 (Ryzen 7000-9000 như 7500F, 7600) -> Đi với Main A620, B650, X670.
- Intel LGA1700 (Gen 12-14) -> Đi với Main H610, B760, Z790.
- Nhớ câu thần chú: "Bác 67 Ham Zui" (Intel), "Bác 50 Ăn Xài" (AMD).
`;

  try {
    // Chuyển toàn bộ lịch sử tin nhắn sang định dạng của Gemini
    const contents = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    // Chèn system instruction vào đầu
    contents.unshift({
      role: 'user',
      parts: [{ text: `[HƯỚNG DẪN HỆ THỐNG]: ${SYSTEM_INSTRUCTION}` }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI không phản hồi.';
    return res.status(200).json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi máy chủ kết nối Gemini' });
  }
}
