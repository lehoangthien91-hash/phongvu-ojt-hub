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

  if (!apiKey) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY trên Vercel' });
  }

  const SYSTEM_INSTRUCTION = `
Bạn là AI Coach - Chuyên gia Đào tạo Bán hàng & Kỹ thuật thuộc Phòng Đào Tạo Phong Vũ (phongvu.vn).
Nhiệm vụ: Trả lời súc tích, chuẩn xác chuyên môn theo tài liệu OJT Phong Vũ, phân tích cấu hình tương thích PC/Laptop, giải thích văn hóa dịch vụ và ghi nhớ ngữ cảnh hội thoại.
Quy chuẩn PC cốt lõi:
- Socket CPU: AMD AM4 (Ryzen 1000-5000 như 5600) -> Main A320, B450, B550.
- AMD Socket AM5 (Ryzen 7000-9000 như 7500F, 7600) -> Main B650, X670, B850.
- Intel LGA1700 (Gen 12-14) -> Main H610, B760, Z790.
- Card NVIDIA cắm vừa mọi bo mạch có khe PCIe x16 (cả Intel và AMD), chỉ cần chú ý công suất Nguồn PSU và kích thước Case.
`;

  try {
    const contents = (messages || []).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    contents.unshift({
      role: 'user',
      parts: [{ text: `[HƯỚNG DẪN HỆ THỐNG]: ${SYSTEM_INSTRUCTION}` }]
    });

    // Danh sách model dự phòng ưu tiên (nếu model đầu quá tải sẽ tự động đổi sang model kế tiếp)
    const CANDIDATE_MODELS = [
      'gemini-2.5-flash-lite',
      'gemini-2.5-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.8-flash'
    ];

    let lastError = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        });

        const data = await response.json();

        // Nếu model bị quá tải (503 / high demand) hoặc lỗi model, chuyển ngay sang model tiếp theo
        if (data.error) {
          lastError = data.error.message;
          continue;
        }

        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return res.status(200).json({ reply: replyText });
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    return res.status(500).json({ error: lastError || 'Hệ thống AI đang quá tải, vui lòng thử lại sau vài giây.' });
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi máy chủ kết nối Gemini' });
  }
}
