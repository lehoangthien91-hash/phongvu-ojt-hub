import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Send, 
  Download, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  AlertTriangle, 
  Layers, 
  Monitor, 
  Cpu, 
  Smile, 
  Store, 
  ShoppingBag, 
  Gift, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Award, 
  Search,
  Calendar,
  CreditCard,
  Laptop
} from 'lucide-react';

// BẢNG CHECKLIST FINAL CHUẨN HOÁ TỪ FILE TEMPLATE CHECKLIST VER 2 (FINAL)
const FINAL_CHECKLIST = [
  // A. Tiêu chuẩn cửa hàng
  {
    id: 'A1',
    category: 'A',
    categoryName: 'A. Tiêu chuẩn cửa hàng',
    title: 'Tự kiểm tra và tuân thủ tiêu chuẩn mặt tiền cửa hàng',
    observable: '• Standee/cờ vỉa hè đặt vuông góc mặt tiền, cờ thẳng hàng không che lối đi.\n• Bảng hiệu/hộp đèn nguyên vẹn, sáng đủ đèn; vách kính và cửa ra vào sạch sẽ, không bám bụi/dấu tay hay vết keo cũ.\n• Băng rôn căng phẳng không chùng/nhăn, đúng nội dung CTKM mới nhất do MKT ban hành.',
    failIndicator: 'Bảng hiệu tắt/chập chờn đèn; vách kính dơ/vết keo cũ; standee/cờ ngả nghiêng, rách mép, bạc màu; băng rôn chùng nhăn; lối đi bị cản trở.',
    passed: false,
    note: ''
  },
  {
    id: 'A2',
    category: 'A',
    categoryName: 'A. Tiêu chuẩn cửa hàng',
    title: 'Tự kiểm tra và tuân thủ tiêu chuẩn bên trong cửa hàng',
    observable: '• Xếp đúng layout ngành hàng; tuân thủ thứ tự ưu tiên: nhìn từ trái sang phải giá từ thấp đến cao, kích thước từ nhỏ đến lớn, màu sáng bên trái - tối bên phải.\n• Vị trí Bảng giá: 100% sản phẩm có bảng giá mica đặt chuẩn vị trí (Bên phải sản phẩm trên bàn/kệ; đầu móc treo; giữa sản phẩm kệ chữ A), thông tin giá & CTKM chính xác.\n• Bàn tư vấn: Mặt bàn sạch không vết vân tay/vết keo; tờ rơi CTKM mới nhất; ghế luôn được xếp gọn ngay ngắn sau khi khách rời đi.',
    failIndicator: 'Sắp xếp lộn xộn lệch layout; thiếu bảng giá hoặc bảng giá lệch sai sản phẩm; bàn tư vấn có ly nước thừa chưa dọn, ghế xô lệch lộn xộn.',
    passed: false,
    note: ''
  },

  // B. Tiêu chuẩn phục vụ khách hàng trong bán hàng
  {
    id: 'B1',
    category: 'B',
    categoryName: 'B. Tiêu chuẩn phục vụ khách hàng',
    title: 'Diện mạo, Tác phong chuẩn mực',
    observable: 'Mặc đúng đồng phục quy định, áo quần phẳng phiu, sơ vin gọn gàng, đeo bảng tên bên ngực trái (dễ nhìn), mang giày màu tối bít mũi; đầu tóc gọn gàng, nữ cột tóc/búi cao và trang điểm nhẹ nhàng.',
    failIndicator: 'Đồng phục nhăn nheo, áo bỏ ngoài quần (SHR5); không đeo bảng tên (SHR6); đi dép hoặc giày sáng màu (SHR2); nữ xõa tóc (SHR11), nam tóc chạm cổ áo/che mắt (SHR12).',
    passed: false,
    note: ''
  },
  {
    id: 'B2',
    category: 'B',
    categoryName: 'B. Tiêu chuẩn phục vụ khách hàng',
    title: 'Thực hiện đúng 4 điểm chạm khi Chào đón',
    observable: '1. Đứng thẳng, hướng mắt về phía khách.\n2. Đặt bàn tay lên ngực trái (vị trí trái tim thể hiện sự trân trọng).\n3. Cúi người khoảng 15° với nụ cười thân thiện.\n4. Nói to rõ câu chào chuẩn: "Dạ Phong Vũ xin chào!". Chủ động mở cửa đón khách khi rảnh.',
    failIndicator: 'Không chào khách (SHR23); không mở cửa khi rảnh rỗi (SHR26, SHR39); chào sai tư thế không đặt tay lên ngực (SHR41); không cúi chào (SHR38); nét mặt cau có (SHR34, SHR36).',
    passed: false,
    note: ''
  },
  {
    id: 'B3',
    category: 'B',
    categoryName: 'B. Tiêu chuẩn phục vụ khách hàng',
    title: 'Tư thế, Tác phong & Ngôn ngữ hình thể khi phục vụ',
    observable: '• Tư thế: Luôn đứng thẳng hoặc ngồi thẳng lưng, ánh mắt tập trung, nét mặt niềm nở, kiên nhẫn lắng nghe khách.\n• Chỉ dẫn: Hướng dẫn vị trí quầy kệ, sản phẩm hoặc mời khách ngồi bằng CẢ BÀN TAY (lòng bàn tay ngửa nhẹ).\n• Giao nhận: Luôn đưa/nhận tài liệu, sản phẩm trải nghiệm, tờ rơi, hóa đơn hoặc thiết bị bằng CẢ HAI TAY.',
    failIndicator: 'Cho tay túi quần (SHR10); khoanh tay; đứng xiêu vẹo dựa kệ tủ vách (SHR14); dùng 1 ngón tay để chỉ trỏ; giao nhận đồ bằng 1 tay hoặc kẹp 2 ngón (SHR17, SHR20).',
    passed: false,
    note: ''
  },
  {
    id: 'B4',
    category: 'B',
    categoryName: 'B. Tiêu chuẩn phục vụ khách hàng',
    title: 'Chuẩn mực giao tiếp, Xưng hô & Xử lý tình huống',
    observable: '• Xưng hô lịch sự, đúng thứ bậc/độ tuổi/giới tính (Anh/Chị/Cô/Chú - Em).\n• Giữ âm lượng vừa phải, tốc độ nói nhẹ nhàng, luôn có kính ngữ dạ/vâng và cảm ơn.\n• Lắng nghe tích cực, không cắt ngang; nắm chắc chính sách để giải đáp chuẩn xác.',
    failIndicator: 'Nói trống không, nói tục; tranh cãi, phủ nhận, ngắt lời hoặc đổ lỗi cho khách hàng; nói lí nhí hoặc to tiếng gay gắt.',
    passed: false,
    note: ''
  },

  // C. Thực hiện 6 bước bán hàng
  {
    id: 'C1',
    category: 'C',
    categoryName: 'C. Thực hiện 6 bước bán hàng',
    title: 'Bước 1: Chủ động chào đón và tạo thiện cảm với khách hàng',
    observable: 'Duy trì khoảng cách tiếp cận 1–1.5m, nụ cười thân thiện; mở lời chào tự nhiên theo chuẩn mực: "Dạ Phong Vũ xin chào!"; tạo không khí cởi mở, không tạo áp lực bám sát.',
    failIndicator: 'Đứng nhìn từ xa thờ ơ; chào lí nhí; đứng chắn đường hoặc đứng sau lưng khách thì thầm làm khách giật mình.',
    passed: false,
    note: ''
  },
  {
    id: 'C2',
    category: 'C',
    categoryName: 'C. Thực hiện 6 bước bán hàng',
    title: 'Bước 2: Khai thác đầy đủ nhu cầu, mục đích sử dụng và ngân sách',
    observable: '• Dùng câu hỏi mở để tìm hiểu mục đích sử dụng, công việc và phần mềm ưu tiên.\n• Hỏi rõ mức ngân sách dự kiến và các mong muốn đặc thù (mỏng nhẹ, pin trâu, màn chuẩn màu...).\n• Tóm tắt và xác nhận lại toàn bộ nhu cầu trước khi giới thiệu sản phẩm.',
    failIndicator: 'Khách vừa hỏi xem máy đã dẫn ngay vào chiếc đắt nhất mà không hỏi nhu cầu; không hỏi ngân sách làm lệch phân khúc tư vấn.',
    passed: false,
    note: ''
  },
  {
    id: 'C3',
    category: 'C',
    categoryName: 'C. Thực hiện 6 bước bán hàng',
    title: 'Bước 3: Đề xuất tối thiểu 3 phương án phù hợp để so sánh',
    observable: 'Đưa ra đúng 3 phương án rõ ràng để khách cân nhắc:\n1. Phương án Chuẩn: Đúng tầm giá và vừa khít nhu cầu.\n2. Phương án Tiết kiệm: Giá thấp hơn một chút, đủ dùng cho tác vụ cơ bản.\n3. Phương án Nâng cấp: Giá nhỉnh hơn 10–15%, cấu hình đón đầu 3–4 năm tới.',
    failIndicator: 'Chỉ ép khách xem 1 lựa chọn duy nhất; hoặc dẫn đi xem quá 4 máy làm khách bị rối loạn thông tin.',
    passed: false,
    note: ''
  },
  {
    id: 'C4',
    category: 'C',
    categoryName: 'C. Thực hiện 6 bước bán hàng',
    title: 'Bước 4: Trình bày Lợi ích (FABE) thay vì Thông số thuần túy',
    observable: '• Trình bày thông số đi kèm lợi ích thực tế: Thay vì chỉ đọc "RAM 16GB", giải thích "Với 16GB RAM này chị mở 30 tab trình duyệt cùng lúc file Excel nặng cũng không bị giật lag".\n• Sau khi trình bày, có dẫn chứng (Evidence) hoặc mời khách chạm, gõ phím, trải nghiệm tính năng trực tiếp trên máy demo.',
    failIndicator: 'Đứng đọc thuộc lòng thông số kỹ thuật trên tem bảng giá (GHz, MB, PCIe) mà không dịch ra lợi ích công việc; không mời khách tương tác thử máy.',
    passed: false,
    note: ''
  },
  {
    id: 'C5',
    category: 'C',
    categoryName: 'C. Thực hiện 6 bước bán hàng',
    title: 'Bước 5: Thực hiện chốt bán và hướng dẫn bước tiếp theo phù hợp',
    observable: '• Tóm tắt phương án khách ưng ý nhất.\n• Áp dụng kỹ thuật chốt bán linh hoạt (Chốt giả định: "Dạ để em lấy máy nguyên seal ra kiểm tra giúp mình nhé?"; Chốt lựa chọn: "Anh chị thanh toán tiền mặt hay quét mã VNPay ạ?"; Chốt chia nhỏ...).',
    failIndicator: 'Đứng chờ khách tự nói mua; khách đã đồng ý nhưng vẫn thao thao bất tuyệt giới thiệu máy khác làm hỏng quyết định mua.',
    passed: false,
    note: ''
  },
  {
    id: 'C6',
    category: 'C',
    categoryName: 'C. Thực hiện 6 bước bán hàng',
    title: 'Bước 6: Thông báo đúng chính sách bảo hành và chăm sóc sau bán',
    observable: '• Thông báo rõ thời hạn bảo hành chính hãng.\n• Nêu rõ chính sách đổi trả trong những ngày đầu nếu phát sinh lỗi phần cứng.\n• Hướng dẫn và mời khách hàng quét Zalo OA Phong Vũ để nhận hỗ trợ kỹ thuật và ưu đãi sau bán hàng.',
    failIndicator: 'Chỉ trả lời chung chung "bảo hành theo hãng"; không nắm rõ quy định đổi mới; quên mời khách quét Zalo OA.',
    passed: false,
    note: ''
  },

  // D. Kiến thức & Tư vấn Laptop
  {
    id: 'D1',
    category: 'D',
    categoryName: 'D. Kiến thức & Tư vấn Laptop',
    title: 'Đọc hiểu bảng thông số & Phân nhóm sản phẩm Laptop',
    observable: '• Trình bày được ý nghĩa hậu tố CPU (U/V: tiết kiệm điện, mỏng nhẹ; H/HX: hiệu năng cao đồ họa game).\n• Trình bày được Laptop có nâng cấp thêm RAM/SSD được hay không.\n• Trình bày được ưu điểm của Card đồ họa rời (VRAM độc lập, render nhanh) so với Card onboard.\n• Phân loại chuẩn xác dòng máy theo hãng (Asus Vivobook vs ROG/TUF; Lenovo Ideapad/ThinkBook vs Legion; Acer Aspire/Swift vs Nitro/Predator; HP Omnibook vs Victus; Dell Inspiron/XPS vs Alienware).',
    failIndicator: 'Không phân biệt được chip U và chip H; không biết máy khách xem là RAM hàn chết hay có khe cắm rời; nhầm lẫn phân khúc sản phẩm các hãng.',
    passed: false,
    note: ''
  },
  {
    id: 'D2',
    category: 'D',
    categoryName: 'D. Kiến thức & Tư vấn Laptop',
    title: 'So sánh và giải thích sự khác biệt giữa Laptop Gaming / Văn phòng / AI',
    observable: '• Văn phòng: Mỏng nhẹ, pin trâu 6–8h, CPU tiết kiệm điện (đuôi U/V), màn hình 16:10 chống mỏi mắt.\n• Gaming: CPU hiệu năng cao (đuôi H/HX), card đồ họa rời RTX, tản nhiệt 2 quạt lớn, màn hình tần số quét cao 144Hz+.\n• Laptop AI: Có nhân NPU phần cứng (>= 40 TOPS) xử lý tác vụ AI cục bộ (Copilot, lọc ồn, xử lý ảnh studio) tiết kiệm pin tối đa.',
    failIndicator: 'Tư vấn laptop văn phòng mỏng nhẹ cho khách cày game AAA đồ họa nặng; hoặc tư vấn máy gaming dày nặng 2.5kg cho khách nữ văn phòng cần di chuyển nhiều.',
    passed: false,
    note: ''
  },
  {
    id: 'D3',
    category: 'D',
    categoryName: 'D. Kiến thức & Tư vấn Laptop',
    title: 'Tư vấn hoàn chỉnh cho khách mua Laptop Văn phòng',
    observable: '• Khai thác sâu: Học ngành gì / làm công việc gì? Có hay mang máy di chuyển nhiều không?\n• Đề xuất cấu hình chuẩn: Core 3/5 hoặc Ryzen 3/5, RAM tối thiểu 16GB, SSD 512GB (kế toán ưu tiên 1TB), màn hình 16:10 chống chói.\n• Tư vấn kèm phụ kiện (chuột, balo, túi chống sốc) và phần mềm Microsoft 365 bản quyền.',
    failIndicator: 'Đề xuất máy RAM 8GB hàn chết cho người làm kế toán/dữ liệu nhiều; quên tư vấn phần mềm Office bản quyền và phụ kiện đi kèm.',
    passed: false,
    note: ''
  },
  {
    id: 'D4',
    category: 'D',
    categoryName: 'D. Kiến thức & Tư vấn Laptop',
    title: 'Tư vấn hoàn chỉnh cho khách mua Laptop Gaming / Đồ họa',
    observable: '• Khai thác sâu: Tựa game hay chơi (LOL, Valorant hay Wukong/AAA)? Phần mềm thiết kế (Photoshop 2D hay Premiere/AutoCAD/3D)?\n• Đề xuất cấu hình chuẩn: CPU đuôi H/HX, GPU rời NVIDIA RTX 3050/4050+ (lưu ý TGP cao), màn hình 144Hz+ (đồ họa cần 100% sRGB).\n• Dặn khách cắm nguồn sạc khi chơi game/render; tư vấn kèm chuột gaming, tai nghe, đế tản nhiệt.',
    failIndicator: 'Bán card onboard cho khách chơi game nặng; bán màn hình màu lệch (45% NTSC) cho dân thiết kế in ấn; quên nhắc khách cắm sạc khi dùng tải nặng.',
    passed: false,
    note: ''
  },

  // E. Kiến thức & tư vấn PC
  {
    id: 'E1',
    category: 'E',
    categoryName: 'E. Kiến thức & Tư vấn PC',
    title: 'Nhận biết đúng 8 linh kiện PC & Giải thích công dụng',
    observable: '• Chỉ đúng vị trí 8 thành phần chính trên máy thực tế: CPU, Mainboard, RAM, SSD/HDD, GPU (Card màn hình), PSU (Nguồn), Vỏ Case, Tản nhiệt.\n• Giải thích đúng và trực quan công dụng từng món: CPU (đầu não), Mainboard (khung xương kết nối), RAM (bàn làm việc tạm thời), SSD (tủ lưu trữ tốc độ cao), GPU (vẽ hình ảnh đồ họa), PSU (trái tim bơm điện).',
    failIndicator: 'Chỉ nhầm vị trí bo mạch chủ với nguồn; không chỉ được vị trí khe cắm RAM hoặc khe cắm M.2 SSD; giải thích sai chức năng linh kiện.',
    passed: false,
    note: ''
  },
  {
    id: 'E2',
    category: 'E',
    categoryName: 'E. Kiến thức & Tư vấn PC',
    title: 'Phân biệt khách hàng mục tiêu của PC Đồng bộ vs PC Lắp ráp (DIY)',
    observable: '• PC Đồng bộ: Bán cho Doanh nghiệp, cơ quan, người lớn tuổi, văn phòng cần độ ổn định tuyệt đối, đồng bộ thẩm mỹ, hãng bảo hành tận nơi nguyên bộ.\n• PC Lắp ráp (DIY): Bán cho Gamer, Designer, Streamer cần tối ưu sức mạnh trên từng đồng chi phí, tùy biến đèn LED RGB, dễ nâng cấp từng linh kiện sau này.',
    failIndicator: 'Tư vấn máy DIY cồng kềnh cho công ty văn phòng cần sự đơn giản bảo hành nguyên thùng; hoặc ép game thủ mua PC đồng bộ khó thay thế linh kiện nâng cấp.',
    passed: false,
    note: ''
  },
  {
    id: 'E3',
    category: 'E',
    categoryName: 'E. Kiến thức & Tư vấn PC',
    title: 'Đảm bảo tính tương thích tuyệt đối khi build cấu hình PC',
    observable: 'Tuân thủ các nguyên tắc vàng khi phối linh kiện:\n1. Socket CPU khớp Chipset Mainboard (Intel: Main H/B đuôi 60, 70; AMD: Main A/B đuôi 50, X).\n2. RAM đúng chuẩn Main hỗ trợ (DDR4 cắm Main DDR4, DDR5 cắm Main DDR5), ưu tiên Dual Channel (2x8GB thay vì 1x16GB).\n3. Công suất PSU chuẩn 80 Plus, dư tải an toàn 15–20% so với tổng CPU + GPU.\n4. Đủ 100% linh kiện bắt buộc: CPU, RAM, GPU/iGPU, Mainboard, SSD, PSU, Case, Tản nhiệt.',
    failIndicator: 'Chọn CPU Intel cắm Main AMD; chọn RAM DDR5 cắm Main DDR4; chọn nguồn công suất đuối không đủ cấp điện cho card đồ họa; thiếu ổ cứng SSD cài Win.',
    passed: false,
    note: ''
  },
  {
    id: 'E4',
    category: 'E',
    categoryName: 'E. Kiến thức & Tư vấn PC',
    title: 'Đề xuất cấu hình PC phù hợp nhu cầu & phân bổ ngân sách',
    observable: '• Bộ Gaming (15–35tr): Dồn 50% ngân sách vào GPU, 20% cho CPU, còn lại chia Main, RAM, SSD, Nguồn.\n• Bộ Đồ họa (25–50tr+): Dồn ngân sách cho CPU nhiều nhân luồng + RAM tối thiểu 32GB + SSD tốc độ cao + Card đồ họa VRAM lớn.\n• Bộ Văn phòng (8–15tr): 50% ngân sách cho CPU có iGPU mạnh, 20% RAM, 15% SSD, nguồn chuẩn bền bỉ.\n• Khi khách yêu cầu hạ giá: Giảm bớt vỏ case, tản nhiệt thường; TUYỆT ĐỐI KHÔNG HẠ NGUỒN XUỐNG NGUỒN KÉM CHẤT LƯỢNG.',
    failIndicator: 'Cắt giảm chi phí bằng cách đổi sang nguồn "cỏ" noname nguy cơ cháy chập; cấu hình văn phòng gắn card đồ họa đắt tiền gây lãng phí ngân sách.',
    passed: false,
    note: ''
  },
  {
    id: 'E5',
    category: 'E',
    categoryName: 'E. Kiến thức & Tư vấn PC',
    title: 'Tư vấn hệ sinh thái đi kèm trọn gói (Màn hình, Gear, Bản quyền)',
    observable: '• Màn hình: Tương xứng cấu hình (Gaming đi màn 144Hz–180Hz; Đồ họa đi màn chuẩn màu 100% sRGB; Văn phòng màn 75Hz–100Hz bảo vệ mắt).\n• Combo Gear: Bàn phím, chuột, tai nghe/loa, lót chuột, dây mạng LAN hoặc Card Wi-Fi (nếu main chưa có Wi-Fi).\n• Phần mềm: Tư vấn Windows 11 và Microsoft 365 bản quyền chính hãng.',
    failIndicator: 'Chỉ báo giá mỗi thùng máy CPU rồi dừng; không hỏi khách có màn hình và phím chuột chưa; máy không có Wi-Fi nhưng không nhắc khách mua thêm dây mạng.',
    passed: false,
    note: ''
  },

  // G. CTKM
  {
    id: 'G1',
    category: 'G',
    categoryName: 'G. Chương trình Khuyến mãi',
    title: 'Phổ biến đúng chương trình khuyến mãi đang diễn ra',
    observable: '• Thuộc thời gian áp dụng, điều kiện áp dụng, danh mục hàng hóa và quà tặng (nếu có).\n• Chủ động tính ra số tiền thực tế khách tiết kiệm được sau khi trừ khuyến mãi/voucher ngân hàng (VNPay, ShopeePay...).',
    failIndicator: 'Không nhớ CTKM trong tháng; báo sai mức giảm giá hoặc quà tặng; khách thanh toán xong mới biết có chương trình ưu đãi được áp dụng.',
    passed: false,
    note: ''
  }
];

// NỘI DUNG TÓM TẮT BÀI GIẢNG 5 NGÀY ONBOARDING
const LESSON_SUMMARIES = {
  day1: {
    day: 'Ngày 1',
    title: 'Hội Nhập Văn Hóa & Tiêu Chuẩn Cửa Hàng',
    icon: Store,
    points: [
      {
        heading: 'Lịch sử & Vị thế Phong Vũ',
        content: 'Thành lập năm 1997 tại TP.HCM (khai trương cửa hàng đầu tiên), năm 2000 thành lập TTBH, năm 2007 thành lập Công ty máy tính Phong Vũ, năm 2018 Teko đầu tư mở rộng chuỗi >30 CH toàn quốc. Mục tiêu: Nhà bán lẻ đa kênh (Omni-channel) hàng đầu Việt Nam về thiết bị công nghệ.'
      },
      {
        heading: '4 Giá trị cốt lõi',
        content: '1. Khách hàng là số 1 (Customer first) • 2. Chính trực (Làm đúng với lương tâm) • 3. Quan tâm (Quan tâm và tin tưởng lẫn nhau) • 4. Đồng đội (Chung tay cùng tiến bước).'
      },
      {
        heading: 'Tiêu chuẩn cửa hàng (HR_QĐ.01)',
        content: 'Mặt tiền: Standee/cờ vuông góc không chắn lối; Băng rôn căng phẳng không nhăn, cập nhật mới nhất từ MKT. Bên trong: Quy tắc trái sang phải (giá tăng dần, kích thước nhỏ đến lớn, màu sáng sang tối). Bảng giá mica đặt BÊN PHẢI sản phẩm (cạnh phải máy và mica thẳng hàng). Góc mở laptop 110-120° (dưới tầm mắt), cách mép bàn 10-15cm. Màn hình không trưng bày tầng sát sàn.'
      },
      {
        heading: 'Nguyên tắc vàng Golden Rule & Mã lỗi SHR',
        content: 'Nghi thức chào: Đứng thẳng, mắt hướng khách, tay đặt ngực trái vị trí tim, cúi chào 15°, nói "Dạ Phong Vũ xin chào!". Ngôn ngữ hình thể: Chỉ đường bằng CẢ BÀN TAY, giao nhận đồ bằng CẢ HAI TAY. Tránh mã lỗi SHR: SHR10 (tay túi quần), SHR14 (đứng xiêu vẹo), SHR17/SHR20 (đưa đồ 1 tay), SHR23/SHR38 (không chào/cúi chào), SHR26/39 (không mở cửa), SHR27/28/30 (không mời nước/mời ngồi), SHR33/45 (không hỗ trợ mang đồ nặng ra xe).'
      }
    ]
  },
  day2: {
    day: 'Ngày 2',
    title: 'Kỹ Năng 6 Bước Bán Hàng & Mô Hình Giao Tiếp',
    icon: ShoppingBag,
    points: [
      {
        heading: 'Quy trình 6 bước bán hàng',
        content: '1. Chuẩn bị (Bản thân, kiến thức sản phẩm, thị trường) -> 2. Tiếp cận khách hàng (Ngôn ngữ cơ thể 55%, giọng điệu 38%, từ ngữ 7%) -> 3. Khai thác nhu cầu (Đặt câu hỏi mở, ngân sách, trải nghiệm) -> 4. Giới thiệu sản phẩm (Mô hình FABE) -> 5. Xử lý phản bác (Công thức LAST) -> 6. Chốt đơn & CSKH sau bán.'
      },
      {
        heading: 'Mô hình trình bày sản phẩm FABE',
        content: '• F (Feature - Tính năng): Thông số kỹ thuật • A (Advantage - Ưu điểm): Điểm vượt trội • B (Benefit - Lợi ích): Mang lại giá trị gì cho khách • E (Evidence - Bằng chứng): Cho khách sờ, thử, xem thực tế.'
      },
      {
        heading: 'Công thức xử lý phản bác LAST',
        content: '• L (Listen): Lắng nghe chân thành, không ngắt lời • A (Apologize/Acknowledge): Đồng cảm • S (Solve): Đưa giải pháp ("chiến giá" với chuỗi lớn, nêu ưu thế ủy quyền chính hãng/bảo hành 1 đổi 1 tận nơi so với cửa hàng nhỏ lẻ, giải thích trợ giá sàn TMĐT) • T (Thanks): Cảm ơn khách hàng.'
      },
      {
        heading: 'Kỹ thuật chốt đơn & Chăm sóc sau bán',
        content: 'Nhận diện tín hiệu mua (gật gù, hỏi bảo hành, hỏi quà). Kỹ thuật: Chốt giả định ("Em lấy máy nguyên seal kiểm tra cho mình nhé?"), Chốt cảm xúc, Chốt chia nhỏ ("Mỗi ngày chưa tới 30.000đ"), Chốt khan hiếm. Sau khi chốt: Mời khách quét Zalo OA, mời tải App Phong Vũ, xin SĐT để chăm sóc.'
      }
    ]
  },
  day3: {
    day: 'Ngày 3',
    title: 'Kiến Thức Nền Tảng & Kỹ Năng Tư Vấn Laptop',
    icon: Laptop,
    points: [
      {
        heading: '6 Thông số phần cứng cốt lõi',
        content: '• CPU: Bộ não xử lý (Intel Core i3/i5/i7/i9 hoặc Core Ultra 5/7/9; AMD Ryzen 3/5/7/9). Hậu tố U/V: mỏng nhẹ tiết kiệm pin; H/HS/HX: hiệu năng cao đồ họa game.\n• RAM: Bộ nhớ đa nhiệm tạm thời (DDR4/DDR5/LPDDR hàn chết, Bus MHz, độ trễ CL).\n• Ổ cứng: SSD M.2 NVMe tốc độ cao 1500–7000+ MB/s.\n• GPU: Card Onboard (Iris Xe, Radeon) vs Card rời (NVIDIA RTX 3050/4050/4060...).\n• Màn hình: Tấm nền (TN giá rẻ, IPS màu chuẩn góc rộng, OLED tương phản vô hạn); Tần số quét (60Hz văn phòng, 120-144Hz+ gaming/eSports); Tỉ lệ 16:10 hiển thị nhiều dòng.\n• Cổng kết nối: USB-A, USB-C (Thunderbolt), HDMI, LAN RJ-45, Jack 3.5mm.'
      },
      {
        heading: 'Tư vấn theo chân dung khách hàng',
        content: '• Văn phòng/HSSV (14–22tr): CPU đuôi U/V, RAM 16GB, SSD 512GB, màn 16:10 chống chói, pin trâu, tư vấn kèm Office 365 + Balo.\n• Gaming (18–35tr+): CPU đuôi H/HX, GPU RTX 3050/4050+, màn 144Hz, tản nhiệt 2 quạt, dặn khách cắm sạc khi chơi.\n• Đồ họa (25–40tr+): CPU đa nhân, GPU RTX Studio, màn hình chuẩn màu 100% sRGB hoặc DCI-P3 2K OLED.\n• AI Laptop (Copilot+ PC): Có NPU >= 40 TOPS xử lý tính năng thông minh offline, pin 12-18h.'
      },
      {
        heading: 'Dải sản phẩm các hãng tại Phong Vũ',
        content: '• ASUS: Vivobook/Zenbook (Văn phòng) | TUF/ROG (Gaming)\n• LENOVO: IdeaPad/ThinkBook (Văn phòng) | Legion (Gaming)\n• ACER: Aspire/Swift (Văn phòng) | Nitro/Predator (Gaming)\n• HP: Omnibook 3/5/7 (Văn phòng) | Victus (Gaming)\n• DELL: Inspiron/Vostro/XPS (Văn phòng) | G-Series/Alienware (Gaming)'
      }
    ]
  },
  day4: {
    day: 'Ngày 4',
    title: 'Kiến Thức Nền Tảng & Xây Dựng Cấu Hình PC',
    icon: Cpu,
    points: [
      {
        heading: '8 Linh kiện cấu tạo máy tính',
        content: '1. CPU (Bộ não) • 2. RAM (Bàn làm việc đa nhiệm) • 3. VGA/Card đồ họa (Xử lý hình ảnh) • 4. Bo mạch chủ/Mainboard (Khung xương kết nối) • 5. Ổ lưu trữ SSD/HDD • 6. Nguồn Power Supply (Trái tim bơm điện) • 7. Thùng máy/Case (Bộ giáp bảo vệ) • 8. Tản nhiệt khí/nước.'
      },
      {
        heading: 'Nguyên tắc tương thích phần cứng (Tránh Bottleneck)',
        content: '• CPU & Main: Đúng Socket và chipset (Intel: Main H, B, Z đuôi 60, 70; AMD: Main A, B đuôi 50, X). Chip K/Ryzen 9 đi Main Z/X; Chip non-K đi Main B/H.\n• RAM: Đúng chuẩn DDR4 hay DDR5; Luôn chạy DUAL CHANNEL (2 thanh, ví dụ 2x8GB thay vì 1x16GB) để tăng gấp đôi băng thông.\n• VGA: Không cắm CPU yếu kéo card khủng gây nghẽn cổ chai.\n• Nguồn (PSU): Chuẩn 80 PLUS (Bronze, Silver, Gold...), luôn tính dư tối thiểu 15-20% công suất tổng.'
      },
      {
        heading: 'Tỷ lệ phân bổ ngân sách PC',
        content: '• Dàn PC Văn phòng (8–15tr): CPU chiếm 50% (chọn chip có iGPU mạnh), RAM 20% (16GB Dual Channel), SSD 15% (NVMe).\n• Dàn PC Gaming (15–35tr): GPU chiếm 50% ngân sách, CPU 20% (i5/R5 đủ gánh), RAM 10%, SSD 10%, Nguồn 10%.\n• Dàn PC Đồ họa/Dựng phim (25–50tr+): CPU nhiều nhân luồng (25%), GPU VRAM lớn (20%), RAM 32GB+ (15%), SSD 30%, Nguồn 10%.'
      },
      {
        heading: 'PC Đồng bộ vs PC Lắp ráp (DIY)',
        content: '• Đồng bộ: Bán cho Doanh nghiệp, người thích ổn định, hãng bảo hành tận nhà.\n• Lắp ráp (DIY): Bán cho Gamer/Designer muốn tối ưu hiệu năng/giá thành và tùy biến nâng cấp.'
      }
    ]
  },
  day5: {
    day: 'Ngày 5',
    title: 'Quy Trình Quản Lý Tiền Mặt & Các Hình Thức Thanh Toán',
    icon: CreditCard,
    points: [
      {
        heading: '7 Bước quy trình quản lý tiền mặt',
        content: 'Bước 1: Chuẩn bị (Nhận 500k tiền lẻ, test máy POS/PC, in CTKM) -> Bước 2: Thu tiền -> Bước 3: Lập phiếu thu (In 2 liên ký nhận) -> Bước 4: Kết ca & bàn giao -> Bước 5: Cất tiền & niêm phong két sắt (dưới CCTV) -> Bước 6: Nộp ngân hàng -> Bước 7: Lưu hồ sơ chứng từ.'
      },
      {
        heading: 'Thao tác thu tiền mặt & Bỏ thùng Dropbox',
        content: 'Đếm tiền -> Đối chiếu bill -> Hoàn tiền thừa bằng 2 tay -> Bỏ tiền và bill vào túi Zip -> Ghi tên, MSNV -> Bỏ túi zip vào thùng DROPBOX (tại showroom không có thu ngân riêng) dưới sự giám sát của camera an ninh CCTV.'
      },
      {
        heading: 'Các hình thức thanh toán tại Phong Vũ',
        content: '1. Tiền mặt • 2. Chuyển khoản • 3. Thẻ ngân hàng (Cà thẻ qua POS/MPOS) • 4. Trả góp 0% qua thẻ tín dụng (kỳ hạn 3, 6 tháng qua MPOS, VNPAY-POS, Payoo; đơn tối thiểu 3tr) • 5. Trả góp qua công ty tài chính có lãi (HD Saison, Mirae Asset, Home Credit, Aeon) • 6. Quét mã QR (VNPAY-QR, Momo, ShopeePay) • 7. Phiếu mua hàng PMH • 8. Thu COD (giao hàng thu tiền) • 9. Công nợ khách hàng doanh nghiệp.'
      },
      {
        heading: 'Chế tài xử lý vi phạm tiền bạc',
        content: 'Chiếm dụng tiền/mang tiền ra khỏi showroom: Sa thải ngay lập tức. Thất thoát tiền: bồi thường 100%. Không in đơn kiêm phiếu thu: phạt 50% thưởng CIS/Golden rule hoặc sa thải nếu trục lợi.'
      }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'bot' | 'lessons'
  const [checklist, setChecklist] = useState(FINAL_CHECKLIST);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('day1');

  const [candidateInfo, setCandidateInfo] = useState({
    name: 'Nguyễn Văn A',
    store: 'Showroom Phong Vũ - 264 Nguyễn Thị Minh Khai, Q.3',
    evaluator: 'Trần Minh Coach / Store Manager',
    round: 'Lần 2'
  });

  // Chatbot State
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào bạn! Tôi là **Phong Vũ OJT Coach & AI Assistant**.\n\nTôi đã được nạp toàn bộ kiến thức giáo trình 5 ngày đào tạo và bộ tiêu chuẩn checklist cuối GĐ2 của Phong Vũ. Bạn có thể hỏi tôi bất kỳ điều gì, ví dụ:\n• *"Hôm nay tôi đã học những gì?"*\n• *"5 điểm đỏ khi build PC là gì?"*\n• *"Quy định đặt bảng giá mica và góc mở laptop?"*\n• *"Các mã lỗi Golden Rule SHR thường gặp?"*\n• *"Cách xử lý khi khách phản bác chê giá cao?"*'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isBotLoading, setIsBotLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotLoading]);

  // Tính toán tiến độ đánh giá
  const stats = useMemo(() => {
    const total = checklist.length;
    const passed = checklist.filter(item => item.passed).length;
    const percentage = Math.round((passed / total) * 100);
    // Ngưỡng đạt chuẩn 80% (20 mục * 80% = 16 mục)
    const isQualified = passed >= Math.ceil(total * 0.8);
    const passThreshold = Math.ceil(total * 0.8);
    return { total, passed, percentage, isQualified, passThreshold };
  }, [checklist]);

  // Lọc checklist
  const filteredChecklist = useMemo(() => {
    return checklist.filter(item => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.observable.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.failIndicator.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [checklist, selectedCategory, searchQuery]);

  // Chuyển đổi trạng thái Đạt / Chưa đạt
  const togglePass = (id) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, passed: !item.passed };
      }
      return item;
    }));
  };

  // Cập nhật ghi chú
  const handleNoteChange = (id, note) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, note };
      }
      return item;
    }));
  };

  // Reset checklist
  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ kết quả đánh giá về Chưa Đạt?')) {
      setChecklist(FINAL_CHECKLIST);
    }
  };

  // Xuất báo cáo đánh giá dạng Text/Summary
  const handleExportSummary = () => {
    let summaryText = `BÁO CÁO ĐÁNH GIÁ NĂNG LỰC OJT - GIAI ĐOẠN 2 (PHONG VŨ)\n`;
    summaryText += `Họ tên NVBH: ${candidateInfo.name}\n`;
    summaryText += `Showroom: ${candidateInfo.store}\n`;
    summaryText += `Người đánh giá: ${candidateInfo.evaluator} (${candidateInfo.round})\n`;
    summaryText += `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}\n`;
    summaryText += `Kết quả: ${stats.passed}/${stats.total} mục đạt (${stats.percentage}%) - ${stats.isQualified ? 'ĐẠT TIÊU CHUẨN (>= 80%)' : 'CHƯA ĐẠT TIÊU CHUẨN'}\n\n`;
    summaryText += `--- CHI TIẾT TỪNG TIÊU CHÍ (TEMPLATE FINAL VER 2) ---\n`;

    checklist.forEach((item, index) => {
      summaryText += `${index + 1}. [${item.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}] ${item.categoryName} - ${item.title}\n`;
      if (item.note) {
        summaryText += `   * Minh chứng/Ghi chú: ${item.note}\n`;
      }
    });

    const element = document.createElement("a");
    const file = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `OJT_PhongVu_${candidateInfo.name.replace(/\s+/g, '_')}_${candidateInfo.round}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Gọi Gemini API để hỏi đáp bài giảng
  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputQuestion;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsBotLoading(true);

    const systemPrompt = `Bạn là Trợ lý Đào tạo OJT & Coach AI cao cấp của hệ thống Phong Vũ (Phong Vũ Computer).
Bạn sở hữu toàn bộ kho tri thức đào tạo Onboarding 5 ngày của Phong Vũ:

1. NGÀY 1 - HỘI NHẬP & TIÊU CHUẨN CỬA HÀNG:
- Lịch sử: 1997 khai trương CH đầu tiên tại TP.HCM, 2000 TTBH, 2007 thành lập Công ty Phong Vũ, 2018 Teko đầu tư mở rộng chuỗi >30 CH toàn quốc. Tầm nhìn: Nhà bán lẻ đa kênh (Omni-channel) hàng đầu VN.
- 4 Giá trị cốt lõi: 1. Khách hàng là số 1; 2. Chính trực; 3. Quan tâm; 4. Đồng đội.
- Ý nghĩa Logo Phong Vũ: Hình vuông (Vững chắc, ổn định), Hình tròn (Ấm áp, chia sẻ), Hình tam giác (Tham vọng, thành tựu, vị thế độc đáo).
- Quy định tiêu chuẩn cửa hàng (HR_QĐ.01): Mặt tiền (Standee/cờ vỉa hè đặt vuông góc, cờ thẳng hàng không che lối đi, băng rôn căng phẳng không nhăn, cập nhật CTKM mới nhất từ MKT không dán đè CTKM cũ). Bên trong (Logic: từ ngoài vào trong, trái sang phải: giá tăng dần, kích thước nhỏ đến lớn, màu sáng sang tối).
- Bảng giá mica: Đặt BÊN PHẢI sản phẩm trên bàn/kệ (cạnh phải máy và mica thẳng hàng); móc treo ở đầu móc; kệ chữ A ở chính giữa. Bàn trải nghiệm dùng mica nằm, sản phẩm ngang tầm mắt dùng mica đứng. Giá khớp 100% hệ thống POS.
- Laptop trưng bày: Cách mép bàn 10-15cm, cạnh thẳng hàng; góc mở màn hình 110-120° (dưới tầm mắt) hoặc 90-110° (ngang tầm mắt); bọc nilon bảo vệ tách riêng màn hình và phím; máy demo luôn bật live demo. Màn hình không trưng bày tầng sát sàn.
- Quy tắc vàng Golden Rule & Mã lỗi SHR: 4 điểm chạm chào đón (Đứng thẳng, tay đặt ngực trái vị trí tim, cúi chào 15°, nói "Dạ Phong Vũ xin chào!"). Chỉ đường bằng CẢ BÀN TAY, đưa nhận đồ bằng CẢ HAI TAY. Các mã lỗi SHR: SHR10 (tay túi quần), SHR14 (đứng dựa vách), SHR17/SHR20 (giao nhận đồ/bill 1 tay), SHR23/38 (không chào/cúi chào), SHR26/39 (không mở cửa đón khách khi rảnh), SHR27/28/30 (không mời nước, không mời ngồi để khách đứng khi ghế trống), SHR33/45 (không giúp bê đồ nặng cồng kềnh ra xe), SHR48/49/50 (không cảm ơn, không cúi chào tiễn khách).

2. NGÀY 2 - 6 BƯỚC BÁN HÀNG:
- Quy trình: 1. Chuẩn bị -> 2. Tiếp cận khách hàng -> 3. Khai thác nhu cầu -> 4. Giới thiệu sản phẩm -> 5. Xử lý phản bác -> 6. Chốt đơn & CSKH.
- Giao tiếp tiếp cận: Ngôn ngữ cơ thể (55%), Giọng nói ngữ điệu (38%), Ngôn từ (7%).
- Khai thác nhu cầu: Sử dụng câu hỏi Mở, câu hỏi Lựa chọn, câu hỏi Đóng để tìm hiểu mục đích, ngân sách, trải nghiệm.
- Giới thiệu sản phẩm FABE: Feature (Tính năng thông số) -> Advantage (Ưu điểm) -> Benefit (Lợi ích thực tế cho khách) -> Evidence (Bằng chứng / Mời khách chạm thử).
- Xử lý phản bác LAST: Listen (Lắng nghe) -> Apologize/Acknowledge (Đồng cảm) -> Solve (Giải pháp: nếu so chuỗi lớn thì "chiến giá", nếu so cửa hàng nhỏ lẻ thì nhấn mạnh bảo hành ủy quyền chính hãng 1 đổi 1 tận nơi Phong Vũ, nếu so sàn TMĐT thì giải thích trợ giá sàn/Double-day và lợi ích mua tại shop được hỗ trợ trực tiếp) -> Thanks (Cảm ơn).
- Kỹ thuật chốt: Chốt giả định ("Em lấy máy mới nguyên seal kiểm tra cho mình nhé?"), Chốt cảm xúc, Chốt chia nhỏ ("Mỗi ngày chỉ chưa tới 30.000đ"), Chốt khan hiếm. Sau khi chốt: Mời quét Zalo OA, mời tải App Phong Vũ, xin SĐT chăm sóc.

3. NGÀY 3 - KIẾN THỨC NỀN TẢNG & TƯ VẤN LAPTOP:
- Cấu hình: CPU (U/V mỏng nhẹ tiết kiệm pin, H/HX hiệu năng cao), RAM (DDR4/DDR5/LPDDR hàn chết, dung lượng, Bus, độ trễ CL), Ổ cứng (SSD M.2 NVMe), GPU (Card Onboard Iris Xe/Radeon vs Card rời RTX 3050/4050/4060...), Màn hình (TN, IPS góc rộng màu chuẩn, OLED tương phản vô hạn, tần số quét 60Hz/120Hz/144Hz+).
- Phân khúc khách hàng:
  + Văn phòng/HSSV (14-22tr): Chip U/V, RAM 16GB, SSD 512GB, màn 16:10 chống chói, pin trâu, tư vấn kèm Office 365 bản quyền + Balo.
  + Gaming (18-35tr+): Chip H/HX, Card rời RTX, màn 144Hz+, tản nhiệt 2 quạt, dặn khách cắm sạc khi chơi.
  + Đồ họa (25-40tr+): CPU đa nhân, Card RTX Studio, màn hình bắt buộc chuẩn màu 100% sRGB hoặc DCI-P3 2K OLED.
  + AI Laptop (Copilot+ PC): Có NPU >= 40 TOPS xử lý tính năng thông minh offline, pin 12-18h.
- Dải sản phẩm: ASUS (Vivobook/Zenbook vs TUF/ROG), Lenovo (IdeaPad/ThinkBook vs Legion), Acer (Aspire/Swift vs Nitro/Predator), HP (Omnibook vs Victus), Dell (Inspiron/Vostro/XPS vs Alienware/G-Series).

4. NGÀY 4 - KIẾN THỨC NỀN TẢNG & XÂY DỰNG CẤU HÌNH PC:
- 8 Linh kiện: CPU, RAM, VGA, Mainboard, Storage (SSD/HDD), Power PSU, Case, Tản nhiệt.
- 5 Điểm đỏ tương thích:
  1. Socket CPU khớp Chipset Bo mạch chủ (Intel Gen 12/13/14 socket 1700 main H/B/Z; AMD socket AM5 main B650/X870...).
  2. Chuẩn RAM (DDR4 hay DDR5) khớp Mainboard; Luôn ưu tiên chạy DUAL CHANNEL (2 thanh, ví dụ 2x8GB thay vì 1x16GB) để nhân đôi băng thông.
  3. Nguồn (PSU) chuẩn 80 PLUS (Bronze, Silver, Gold...), tính công suất thực dư tải 15-20% so với tổng CPU + GPU.
  4. Kích thước thùng máy (Case) vừa chiều dài VGA và chiều cao tản nhiệt/két nước.
  5. Đủ 100% linh kiện bắt buộc có SSD NVMe cài hệ điều hành.
- Phân bổ ngân sách PC: Gaming dồn 50% vào GPU, 20% CPU; Đồ họa dồn CPU nhiều nhân + RAM 32GB-64GB + SSD đọc ghi nhanh; Văn phòng dồn 50% CPU có iGPU mạnh + RAM 16GB. Khi giảm giá: TUYỆT ĐỐI KHÔNG HẠ NGUỒN XUỐNG NGUỒN KÉM CHẤT LƯỢNG.
- Phân biệt: PC Đồng bộ (bán cho Doanh nghiệp, ổn định, bảo hành tận nhà trọn bộ) vs PC Lắp ráp DIY (bán cho Gamer/Designer, tối ưu hiệu năng/chi phí, dễ nâng cấp).

5. NGÀY 5 - QUY TRÌNH QUẢN LÝ TIỀN MẶT & HÌNH THỨC THANH TOÁN:
- 7 Bước quản lý tiền mặt: Chuẩn bị (nhận 500k tiền lẻ, kiểm tra POS) -> Thu tiền -> Lập phiếu thu (2 liên ký nhận) -> Kết ca bàn giao -> Cất tiền & niêm phong két sắt (dưới CCTV) -> Nộp ngân hàng -> Lưu hồ sơ.
- Thao tác Dropbox: Đếm tiền -> Đối chiếu bill -> Hoàn tiền thừa 2 tay -> Bỏ tiền và bill vào túi Zip -> Ghi tên, MSNV -> Bỏ túi zip vào thùng DROPBOX dưới camera an ninh.
- Các hình thức thanh toán: Tiền mặt, Chuyển khoản, Thẻ qua POS/MPOS, Trả góp 0% thẻ tín dụng (đơn tối thiểu 3tr, kỳ hạn 3/6 tháng), Trả góp công ty tài chính có lãi (HD Saison, Mirae Asset, Home Credit, Aeon), Quét mã QR (VNPay, Momo, ShopeePay), Phiếu mua hàng (PMH), Thu COD, Công nợ doanh nghiệp.
- Chế tài: Chiếm dụng/gian lận tiền sa thải ngay lập tức và bồi thường 100%. Không in đơn kiêm phiếu thu phạt 50% thưởng CIS/Golden rule.

Khi người dùng hỏi "Hôm nay tôi đã học những gì?" hoặc hỏi về một ngày cụ thể, hãy yêu cầu làm rõ họ muốn xem Ngày mấy (từ Ngày 1 đến Ngày 5) hoặc tóm tắt tổng thể một cách súc tích, mạch lạc, đúng chuẩn mực đào tạo của Phong Vũ.`;

    const apiKey = ""; // Canvas tự động cung cấp ở runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi bạn, hiện tại tôi chưa phản hồi được. Vui lòng thử lại sau giây lát!';
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: '⚠️ Không thể kết nối với máy chủ AI. Bạn hãy kiểm tra lại kết nối mạng hoặc thử lại câu hỏi nhé!' 
      }]);
    } finally {
      setIsBotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* HEADER PHONG VŨ */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-blue-900 font-extrabold px-3 py-1.5 rounded-lg tracking-wider text-lg shadow-sm flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 animate-pulse"></span>
                PHONG VU
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold leading-tight flex items-center gap-2">
                  OJT Coach & Knowledge Hub
                  <span className="text-xs bg-sky-400/30 text-sky-200 border border-sky-300/30 px-2 py-0.5 rounded-full font-medium">Checklist Final Ver 2</span>
                </h1>
                <p className="text-xs text-sky-100 hidden sm:block">Đồng hành phát triển năng lực tư vấn & chuẩn hóa tiêu chuẩn dịch vụ Phong Vũ</p>
              </div>
            </div>

            {/* TAB CHUYỂN ĐỔI CHỨC NĂNG */}
            <div className="flex items-center gap-1.5 bg-blue-950/40 p-1 rounded-xl border border-blue-400/20">
              <button
                onClick={() => setActiveTab('checklist')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'checklist'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Checklist OJT ({stats.passed}/{stats.total})</span>
              </button>

              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'lessons'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="w-4 h-4 text-sky-300" />
                <span>Ôn Tập Bài Học (5 Ngày)</span>
              </button>

              <button
                onClick={() => setActiveTab('bot')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'bot'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Coach AI</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BODY CHÍNH */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* TAB 1: CHECKLIST ĐÁNH GIÁ OJT FINAL */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            
            {/* THÔNG TIN NHÂN VIÊN & TIẾN ĐỘ TỔNG QUAN */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                {/* Thông tin nhân viên */}
                <div className="space-y-2 lg:border-r lg:border-slate-200 lg:pr-6">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm tracking-wide uppercase">
                    <User className="w-4 h-4 text-sky-600" />
                    Hồ sơ NVBH Thử việc
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Họ tên NVBH:</span>
                      <input 
                        type="text" 
                        value={candidateInfo.name}
                        onChange={(e) => setCandidateInfo({...candidateInfo, name: e.target.value})}
                        className="font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1 w-full focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 block">Lần theo dõi:</span>
                      <select 
                        value={candidateInfo.round}
                        onChange={(e) => setCandidateInfo({...candidateInfo, round: e.target.value})}
                        className="font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1 w-full focus:outline-none focus:border-sky-500"
                      >
                        <option value="Lần 1">Lần 1</option>
                        <option value="Lần 2">Lần 2</option>
                        <option value="Lần 3">Lần 3 (Cuối GĐ2)</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Cửa hàng:</span>
                      <input 
                        type="text" 
                        value={candidateInfo.store}
                        onChange={(e) => setCandidateInfo({...candidateInfo, store: e.target.value})}
                        className="text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 w-full text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Thanh tiến độ */}
                <div className="lg:col-span-2 flex flex-col justify-center space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-medium">Tiến độ đánh giá Cuối GĐ2 (Ngưỡng đạt: ≥ 80%)</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                          {stats.passed} <span className="text-sm font-normal text-slate-400">/ {stats.total} mục đạt</span>
                        </span>
                        <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                          stats.percentage >= 80 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {stats.percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Kết quả đánh giá:</span>
                      <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-3 py-1 rounded-full ${
                        stats.isQualified
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}>
                        {stats.isQualified ? (
                          <>
                            <Award className="w-4 h-4" /> ĐẠT TIÊU CHUẨN (≥ 80%)
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-amber-500" /> Cần đạt tối thiểu {stats.passThreshold}/{stats.total} mục
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        stats.percentage >= 80 ? 'bg-emerald-500' : 'bg-gradient-to-r from-sky-500 to-blue-600'
                      }`}
                      style={{ width: `${stats.percentage}%` }}
                    />
                    {/* Vạch mốc 80% */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10" 
                      style={{ left: '80%' }}
                      title="Ngưỡng đạt tối thiểu 80%"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>0%</span>
                    <span className="text-rose-500 font-semibold">Mục tiêu đạt chuẩn (≥ 80% - {stats.passThreshold} mục)</span>
                    <span>100%</span>
                  </div>
                </div>

              </div>

              {/* ACTION BAR: RESET & EXPORT */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 italic">
                  💡 Hướng dẫn Coach/SM: Tại mỗi lần đánh giá, tick Đạt / Chưa đạt cho từng mục và ghi minh chứng thực tế nếu có.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Đặt lại
                  </button>
                  <button
                    onClick={handleExportSummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Xuất Báo Cáo Đánh Giá (.txt)
                  </button>
                </div>
              </div>
            </div>

            {/* BỘ LỌC VÀ TÌM KIẾM CHECKLIST */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'ALL', label: `Tất cả (${checklist.length})` },
                  { id: 'A', label: 'A. Cửa hàng (2)' },
                  { id: 'B', label: 'B. Golden Rule (4)' },
                  { id: 'C', label: 'C. 6 Bước Bán (6)' },
                  { id: 'D', label: 'D. Laptop (4)' },
                  { id: 'E', label: 'E. PC Chuyên sâu (5)' },
                  { id: 'G', label: 'G. CTKM (1)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === tab.id
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Ô tìm kiếm */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm tiêu chí, hành vi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 shadow-sm"
                />
              </div>
            </div>

            {/* DANH SÁCH CHECKLIST ITEM */}
            <div className="space-y-3">
              {filteredChecklist.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-slate-400 border border-slate-200">
                  Không tìm thấy tiêu chí nào phù hợp với bộ lọc hiện tại.
                </div>
              ) : (
                filteredChecklist.map((item) => (
                  <div 
                    key={item.id}
                    className={`bg-white rounded-xl p-4 sm:p-5 border transition-all ${
                      item.passed 
                        ? 'border-emerald-300 bg-emerald-50/20 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      {/* Cột Nội dung tiêu chí & Hành vi quan sát */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${
                            item.category === 'A' ? 'bg-blue-100 text-blue-800' :
                            item.category === 'B' ? 'bg-amber-100 text-amber-800' :
                            item.category === 'C' ? 'bg-purple-100 text-purple-800' :
                            item.category === 'D' ? 'bg-indigo-100 text-indigo-800' :
                            item.category === 'E' ? 'bg-cyan-100 text-cyan-900 font-bold' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {item.id} • {item.categoryName}
                          </span>
                          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                            {item.title}
                          </h3>
                        </div>

                        {/* Hành vi ĐẠT */}
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                          <div className="font-semibold text-emerald-700 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Biểu hiện / Tiêu chí quan sát cụ thể (ĐẠT):
                          </div>
                          <div className="leading-relaxed pl-5 text-slate-600 whitespace-pre-line">{item.observable}</div>
                        </div>

                        {/* Dấu hiệu KHÔNG ĐẠT */}
                        <div className="bg-rose-50/40 p-2.5 rounded-lg border border-rose-100 text-xs text-rose-900 space-y-1">
                          <div className="font-semibold text-rose-700 flex items-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            Dấu hiệu nhận biết KHÔNG ĐẠT (Tick Chưa đạt):
                          </div>
                          <p className="leading-relaxed pl-5 text-rose-800">{item.failIndicator}</p>
                        </div>

                        {/* Ô Ghi chú / Minh chứng thực tế */}
                        <div className="pt-1">
                          <input 
                            type="text" 
                            placeholder="Ghi chú / Minh chứng thực tế quan sát được..."
                            value={item.note}
                            onChange={(e) => handleNoteChange(item.id, e.target.value)}
                            className="w-full text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      {/* Cột Nút Toggle Trạng Thái Đạt/Chưa Đạt */}
                      <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 md:min-w-[120px]">
                        <button
                          onClick={() => togglePass(item.id)}
                          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                            item.passed
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300'
                          }`}
                        >
                          {item.passed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-white" />
                              <span>ĐÃ ĐẠT</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-slate-400" />
                              <span>CHƯA ĐẠT</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400 block text-center">
                          {item.passed ? 'Bấm để hủy đạt' : 'Bấm khi đã đạt'}
                        </span>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ÔN TẬP BÀI GIẢNG 5 NGÀY (HÔM NAY TÔI ĐÃ HỌC NHỮNG GÌ?) */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            
            {/* Header bài học & Tabs ngày */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-sky-600" />
                    Hệ Thống Bài Giảng Đào Tạo 5 Ngày Onboarding
                  </h2>
                  <p className="text-xs text-slate-500">Giúp nhân viên trả lời câu hỏi: <strong className="text-blue-900">"Hôm nay tôi đã học những gì?"</strong></p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('bot');
                    handleSendMessage(`Hôm nay tôi vừa học xong ${LESSON_SUMMARIES[selectedDay].day}: ${LESSON_SUMMARIES[selectedDay].title}. Hãy tóm tắt lại các ý chính và đặt cho tôi 2 câu hỏi tình huống thực tế để kiểm tra kiến thức nhé!`);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-blue-900 bg-sky-100 hover:bg-sky-200 rounded-xl transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Hỏi Bot AI về ngày này</span>
                </button>
              </div>

              {/* 5 nút chọn ngày */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {Object.entries(LESSON_SUMMARIES).map(([key, item]) => {
                  const IconComp = item.icon;
                  const isActive = selectedDay === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDay(key)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isActive
                          ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-200 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${
                          isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.day}
                        </span>
                        <IconComp className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-2">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chi tiết nội dung ngày đang chọn */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">{LESSON_SUMMARIES[selectedDay].day}</span>
                  <h3 className="text-lg font-bold text-slate-800">{LESSON_SUMMARIES[selectedDay].title}</h3>
                </div>
                <div className="text-xs text-slate-400">
                  Phòng Đào Tạo Phong Vũ
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LESSON_SUMMARIES[selectedDay].points.map((pt, idx) => (
                  <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2">
                    <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {pt.heading}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line pl-7">
                      {pt.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: TRỢ LÝ HỎI ĐÁP BÀI GIẢNG AI (KNOWLEDGE BOT) */}
        {activeTab === 'bot' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[750px] overflow-hidden">
            
            {/* Bot Header */}
            <div className="bg-gradient-to-r from-blue-900 to-sky-800 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base flex items-center gap-2">
                    Phong Vũ OJT Coach AI
                    <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-medium">Online</span>
                  </h2>
                  <p className="text-xs text-sky-200">Trợ lý hỏi đáp quy định showroom, mã lỗi SHR và kỹ thuật PC/Laptop</p>
                </div>
              </div>
              <div className="text-xs text-sky-200 hidden sm:block">
                Hỗ trợ đào tạo thực chiến 24/7
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 overflow-x-auto scrollbar-none shrink-0 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" /> Gợi ý nhanh:
              </span>
              {[
                'Hôm nay tôi đã học những gì ở Ngày 1?',
                'Tóm tắt nội dung Ngày 2: 6 bước bán hàng & FABE?',
                '5 điểm đỏ kiểm tra tương thích PC là gì?',
                'Quy định góc mở laptop và vị trí đặt bảng giá mica?',
                'Các mã lỗi Golden Rule nghiêm trọng (SHR)?',
                'Quy trình thu tiền mặt bỏ thùng Dropbox Ngày 5?'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 text-xs bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 rounded-full whitespace-nowrap shadow-2xs transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-900 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}>
                    {msg.sender === 'bot' ? (
                      <div className="space-y-2 whitespace-pre-line">
                        {msg.text}
                      </div>
                    ) : (
                      <div>{msg.text}</div>
                    )}
                  </div>
                </div>
              ))}

              {isBotLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                    Phong Vũ Coach đang tra cứu bài giảng và soạn phản hồi...
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input 
                  type="text"
                  placeholder="Gõ 'Hôm nay tôi đã học những gì' hoặc hỏi về PC, Laptop, mã lỗi SHR, quy trình tiền mặt..."
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  disabled={isBotLoading}
                  className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isBotLoading || !inputQuestion.trim()}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Gửi</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Phong Vũ Computer • Phòng Đào Tạo & Phát Triển Năng Lực Bán Lẻ • OJT Framework 2026
      </footer>
    </div>
  );
}