/* ===== CẤU HÌNH (đổi ngách/thương hiệu tại đây) ===== */
const CONFIG={brand:"GócLàmViệc",niche:"Thiết bị góc làm việc tại nhà",ga4Id:"" /* điền Measurement ID của bạn */,
 cats:{chuot:"Chuột & bàn phím",tai:"Tai nghe",den:"Đèn & phụ kiện bàn"}};
/* ===== DỮ LIỆU MẪU (minh họa) – tách khỏi liên kết affiliate ===== */
const PRODUCTS=[
{id:"sp-1",name:"Chuột không dây mẫu A",cat:"chuot",brand:"Thương hiệu A",price:350000,e:"🖱️",desc:"Mẫu minh họa cho nhóm chuột văn phòng.",pros:["Gọn nhẹ (mẫu)"],cons:["Dữ liệu minh họa"],fit:"Người làm văn phòng"},
{id:"sp-2",name:"Bàn phím cơ mẫu B",cat:"chuot",brand:"Thương hiệu B",price:990000,e:"⌨️",desc:"Mẫu minh họa cho nhóm bàn phím.",pros:["Cấu trúc dữ liệu đầy đủ"],cons:["Chưa có thông số thật"],fit:"Người gõ nhiều"},
{id:"sp-3",name:"Tai nghe chụp tai mẫu C",cat:"tai",brand:"Thương hiệu A",price:1450000,e:"🎧",desc:"Mẫu minh họa cho nhóm tai nghe.",pros:["Ví dụ ưu điểm"],cons:["Ví dụ nhược điểm"],fit:"Họp trực tuyến"},
{id:"sp-4",name:"Tai nghe nhét tai mẫu D",cat:"tai",brand:"Thương hiệu C",price:620000,e:"🎵",desc:"Mẫu minh họa cho nhóm tai nghe nhỏ gọn.",pros:["Ví dụ ưu điểm"],cons:["Ví dụ nhược điểm"],fit:"Di chuyển nhiều"},
{id:"sp-5",name:"Đèn bàn LED mẫu E",cat:"den",brand:"Thương hiệu B",price:450000,e:"💡",desc:"Mẫu minh họa cho nhóm đèn bàn.",pros:["Ví dụ ưu điểm"],cons:["Ví dụ nhược điểm"],fit:"Làm việc buổi tối"},
{id:"sp-6",name:"Giá đỡ laptop mẫu F",cat:"den",brand:"Thương hiệu C",price:280000,e:"💻",desc:"Mẫu minh họa cho nhóm phụ kiện.",pros:["Ví dụ ưu điểm"],cons:["Ví dụ nhược điểm"],fit:"Dùng laptop lâu"}];
/* Liên kết affiliate: CHỦ WEBSITE tự điền sau khi được đối tác chấp thuận. Không tạo link giả. */
const LINKS={/* "sp-1":{merchant:"Shopee",network:"Shopee Affiliate",url:"https://…",active:true} */};
const ALLOWED=["shopee.vn","lazada.vn","tiki.vn","shop.tiktok.com","go.isclix.com","adpia.vn"];
const ARTICLES=[
{id:"dg-1",t:"review",title:"Đánh giá mẫu: chuột không dây văn phòng",sec:["Giới thiệu","Tiêu chí đánh giá","Thiết kế & chất lượng","Tính năng","Ưu/nhược điểm","So sánh lựa chọn khác","Ai nên mua","Kết luận"]},
{id:"dg-2",t:"review",title:"Đánh giá mẫu: tai nghe cho họp trực tuyến",sec:["Giới thiệu","Tiêu chí đánh giá","Thiết kế & chất lượng","Tính năng","Ưu/nhược điểm","So sánh lựa chọn khác","Ai nên mua","Kết luận"]},
{id:"hd-1",t:"guide",title:"Hướng dẫn mẫu: bố trí góc làm việc đỡ mỏi cổ vai",sec:["Vấn đề thường gặp","Các bước thực hiện","Công cụ liên quan (nếu thật sự cần)","Nguồn tham khảo"]}];
