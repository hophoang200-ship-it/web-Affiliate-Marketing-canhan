const $=s=>document.querySelector(s),app=$("#app");
const money=n=>n.toLocaleString("vi-VN")+"₫";
const clicks={},views={};let cmp=[],S={q:"",cat:"",brand:"",max:"",sort:"name"};
const DISC='<div class="note">Công bố: website có thể nhận hoa hồng khi bạn mua qua liên kết trên trang này, giá bạn trả thường không đổi. <a href="#cong-bo">Chi tiết</a></div>';
const NAV=[["home","Trang chủ"],["san-pham","Sản phẩm"],["so-sanh","So sánh"],["danh-gia","Đánh giá"],["huong-dan","Hướng dẫn"],["ma-giam-gia","Mã giảm giá"],["gioi-thieu","Giới thiệu"]];
function ga(ev,p){if(CONFIG.ga4Id&&window.gtag)gtag("event",ev,p)}
function buyBtn(p){const l=LINKS[p.id];
 if(!l||!l.active)return '<button disabled title="Chủ website chưa cấu hình liên kết">Chưa có liên kết mua</button>';
 try{const h=new URL(l.url).hostname;if(!ALLOWED.some(d=>h===d||h.endsWith("."+d)))throw 0}catch(e){return '<button disabled>Liên kết không hợp lệ</button>'}
 return `<a class="btn" href="${l.url}" target="_blank" rel="sponsored noopener nofollow" data-go="${p.id}">Xem giá tại ${l.merchant}</a>`}
function card(p){return `<div class="card"><div class="ph">${p.e}</div><span class="tag">${CONFIG.cats[p.cat]}</span>
<h3 style="margin:6px 0"><a href="#${p.id}">${p.name}</a></h3><div class="mu">${p.brand} · ${money(p.price)} <i>(giá minh họa)</i></div>
<div class="row"><a class="btn" href="#${p.id}">Chi tiết</a><button class="g" data-cmp="${p.id}">${cmp.includes(p.id)?"✓ Đã chọn":"+ So sánh"}</button></div></div>`}
function seo(t,d){document.title=t+" – "+CONFIG.brand;$('meta[name=description]').content=d||"";
 let c=$('link[rel=canonical]');if(!c){c=document.createElement("link");c.rel="canonical";document.head.appendChild(c)}c.href=location.href.split("#")[0]}
const V={
home(){seo("Trang chủ","Đánh giá, so sánh thiết bị làm việc tại nhà");
 return `<section class="hero"><h1>${CONFIG.niche}</h1><p class="mu">Đánh giá, so sánh và hướng dẫn chọn thiết bị cho góc làm việc tại nhà.</p></section>${DISC}
 <h2>Danh mục</h2><div class="row">${Object.entries(CONFIG.cats).map(([k,v])=>`<a class="btn" href="#san-pham" data-setcat="${k}">${v}</a>`).join("")}</div>
 <h2>Sản phẩm đề xuất (mẫu)</h2><div class="grid">${PRODUCTS.slice(0,3).map(card).join("")}</div>
 <h2>Bài viết mới</h2><div class="grid">${ARTICLES.map(a=>`<div class="card"><span class="tag">${a.t=="review"?"Đánh giá":"Hướng dẫn"}</span><h3><a href="#${a.id}">${a.title}</a></h3></div>`).join("")}</div>`},
"san-pham"(){seo("Sản phẩm","Danh sách sản phẩm");
 let l=PRODUCTS.filter(p=>(!S.cat||p.cat==S.cat)&&(!S.brand||p.brand==S.brand)&&(!S.max||p.price<=+S.max)&&p.name.toLowerCase().includes(S.q.toLowerCase()));
 l.sort((a,b)=>S.sort=="name"?a.name.localeCompare(b.name,"vi"):S.sort=="pa"?a.price-b.price:b.price-a.price);
 const brands=[...new Set(PRODUCTS.map(p=>p.brand))];
 return `<h1>Sản phẩm</h1>${DISC}<div class="row">
 <select data-f="cat"><option value="">Mọi danh mục</option>${Object.entries(CONFIG.cats).map(([k,v])=>`<option value="${k}" ${S.cat==k?"selected":""}>${v}</option>`).join("")}</select>
 <select data-f="brand"><option value="">Mọi thương hiệu</option>${brands.map(b=>`<option ${S.brand==b?"selected":""}>${b}</option>`).join("")}</select>
 <select data-f="max"><option value="">Mọi mức giá</option>${[500000,1000000,2000000].map(v=>`<option value="${v}" ${S.max==v?"selected":""}>Đến ${money(v)}</option>`).join("")}</select>
 <select data-f="sort"><option value="name">Tên A–Z</option><option value="pa" ${S.sort=="pa"?"selected":""}>Giá tăng</option><option value="pd" ${S.sort=="pd"?"selected":""}>Giá giảm</option></select></div>
 ${l.length?`<div class="grid">${l.map(card).join("")}</div>`:'<p class="mu">Không tìm thấy sản phẩm phù hợp.</p>'}`},
"so-sanh"(){seo("So sánh","So sánh sản phẩm");const l=cmp.map(id=>PRODUCTS.find(p=>p.id==id));
 if(l.length<2)return `<h1>So sánh</h1><p>Chọn ít nhất 2 sản phẩm (tối đa 3) bằng nút “+ So sánh” ở trang <a href="#san-pham">Sản phẩm</a>. Đã chọn: ${l.length}.</p>`;
 const r=(k,f)=>`<tr><th>${k}</th>${l.map(p=>`<td>${f(p)}</td>`).join("")}</tr>`;
 return `<h1>So sánh</h1>${DISC}<div class="sc"><table><tr><th></th>${l.map(p=>`<th>${p.name}</th>`).join("")}</tr>
 ${r("Thương hiệu",p=>p.brand)}${r("Giá (minh họa)",p=>money(p.price))}${r("Ưu điểm",p=>p.pros.join(", "))}${r("Nhược điểm",p=>p.cons.join(", "))}${r("Phù hợp",p=>p.fit)}${r("Mua",buyBtn)}</table></div>
 <p><button class="g" data-clr>Xóa lựa chọn</button></p>`},
"danh-gia"(){seo("Đánh giá","Bài đánh giá");return `<h1>Đánh giá</h1><div class="grid">${ARTICLES.filter(a=>a.t=="review").map(a=>`<div class="card"><h3><a href="#${a.id}">${a.title}</a></h3></div>`).join("")}</div>`},
"huong-dan"(){seo("Hướng dẫn","Bài hướng dẫn");return `<h1>Hướng dẫn</h1><div class="grid">${ARTICLES.filter(a=>a.t=="guide").map(a=>`<div class="card"><h3><a href="#${a.id}">${a.title}</a></h3></div>`).join("")}</div>`},
"ma-giam-gia"(){seo("Mã giảm giá","Mã giảm giá đã xác minh");
 return `<h1>Mã giảm giá</h1><div class="note">Chưa có mã nào được xác minh. Mã giảm giá được quản lý <b>thủ công</b> bởi chủ website; website không tự tạo mã và không khẳng định mã còn hiệu lực khi chưa kiểm tra.</div>
 <p class="mu">Mỗi mã sẽ gồm: chương trình, nhà bán hàng, ưu đãi, điều kiện, thời hạn, trạng thái (còn hiệu lực / hết hạn / chưa xác minh), nút sao chép mã và nút đến ưu đãi.</p>`},
"gioi-thieu"(){seo("Giới thiệu","Về website");
 return `<h1>Giới thiệu</h1><p>Website hướng dẫn chọn ${CONFIG.niche.toLowerCase()} cho người đi làm và học tập tại nhà. Thông tin đơn vị quản lý: <i>chưa được cung cấp</i>.</p>
 <h2>Vì sao chọn ngách này (đánh giá sơ bộ, chưa có số liệu xác minh)</h2>
 <div class="sc"><table><tr><th>Ngách</th><th>Nhu cầu</th><th>Cạnh tranh</th><th>Phù hợp người mới</th></tr>
 <tr><td><b>Thiết bị góc làm việc tại nhà</b> (chọn)</td><td>Ổn định</td><td>Vừa</td><td>Cao: dễ viết so sánh và hướng dẫn</td></tr>
 <tr><td>Đồ gia dụng thông minh nhỏ</td><td>Cao</td><td>Cao</td><td>Trung bình</td></tr>
 <tr><td>Dụng cụ chăm sóc thú cưng</td><td>Tăng dần</td><td>Thấp–vừa</td><td>Trung bình</td></tr></table></div>
 <p class="mu">Cần kiểm chứng bằng công cụ từ khóa và điều kiện từng chương trình affiliate trước khi quyết định.</p>
 <h2>Công nghệ</h2><p>Bản này là <b>frontend tĩnh</b> (Phương án A rút gọn): rẻ, dễ host, nhưng chưa có backend, đăng nhập quản trị, redirect <code>/go/</code> hay lưu thống kê. Khi cần các tính năng đó nên thêm Node.js/Express + CSDL, hoặc dùng WordPress nếu bạn ưu tiên quản trị không cần lập trình.</p>
 <h2>Nguyên tắc biên tập</h2><p>Không tuyên bố đã dùng thử sản phẩm khi chưa có bằng chứng; luôn công bố affiliate.</p>`},
"lien-he"(){seo("Liên hệ","Liên hệ");
 return `<h1>Liên hệ</h1><div class="note">Chưa có máy chủ tiếp nhận biểu mẫu: dữ liệu chỉ được kiểm tra, <b>chưa được gửi đi</b>. Có thể tích hợp Formspree/Netlify Forms hoặc backend sau.</div>
 <form id="cf" novalidate style="display:grid;gap:10px;max-width:480px"><input name="n" placeholder="Họ tên"><input name="e" type="email" placeholder="Email"><input name="s" placeholder="Chủ đề"><textarea name="m" rows="5" placeholder="Nội dung"></textarea><button>Kiểm tra</button><div id="cs" role="status"></div></form>`},
"cong-bo"(){seo("Công bố affiliate","Công bố affiliate");
 return `<h1>Công bố affiliate</h1><ul><li>Website có thể nhận hoa hồng khi bạn mua qua một số liên kết.</li><li>Hoa hồng thường không làm tăng giá bạn trả, tùy điều kiện từng chương trình.</li><li>Có liên kết affiliate không đồng nghĩa sản phẩm được bảo đảm chất lượng.</li><li>Hãy tự kiểm tra giá, khuyến mãi và chính sách tại nhà bán hàng.</li></ul>`},
"chinh-sach"(){seo("Chính sách","Chính sách");
 return `<h1>Chính sách</h1><div class="note">Bản nháp mẫu, cần điều chỉnh theo hoạt động thực tế và pháp luật hiện hành trước khi dùng thật.</div>
 <h2>Quyền riêng tư</h2><p>Bản này không thu thập dữ liệu cá nhân. Nếu bật Google Analytics 4 (<code>CONFIG.ga4Id</code>) cần bổ sung thông báo cookie và cơ chế đồng ý.</p>
 <h2>Điều khoản & miễn trừ</h2><p>Nội dung mang tính tham khảo; giá và thông tin có thể thay đổi tại nhà bán hàng.</p>`},
404(){seo("Không tìm thấy","");return '<h1>404</h1><p>Không tìm thấy trang. <a href="#home">Về trang chủ</a></p>'}};
function detail(p){views[p.id]=(views[p.id]||0)+1;ga("view_item",{item_id:p.id});seo(p.name,p.desc);
 return `<p class="mu"><a href="#home">Trang chủ</a> › <a href="#san-pham">Sản phẩm</a> › ${p.name}</p><div class="ph" style="height:160px;font-size:64px">${p.e}</div>
 <h1>${p.name}</h1><p class="mu">${p.brand} · ${money(p.price)} <i>(giá minh họa, chưa có thời điểm cập nhật thật)</i></p><div class="note">Dữ liệu minh họa – không phải đánh giá thực tế.</div>
 <p>${p.desc}</p><h3>Ưu điểm</h3><ul>${p.pros.map(x=>`<li>${x}</li>`).join("")}</ul><h3>Nhược điểm</h3><ul>${p.cons.map(x=>`<li>${x}</li>`).join("")}</ul>
 <p><b>Phù hợp:</b> ${p.fit}</p>${DISC}<div class="row">${buyBtn(p)}<button class="g" data-cmp="${p.id}">+ So sánh</button></div>
 <h3>Sản phẩm tương tự</h3><div class="grid">${PRODUCTS.filter(x=>x.cat==p.cat&&x.id!=p.id).map(card).join("")}</div>`}
function article(a){seo(a.title,a.title);return `<p class="mu"><a href="#home">Trang chủ</a> › ${a.title}</p><h1>${a.title}</h1><div class="note">Bài mẫu: chỉ có dàn ý. Cần biên tập viên viết nội dung thật, ghi ngày đăng/cập nhật.</div>
 <h3>Mục lục</h3><ol>${a.sec.map(s=>`<li>${s}</li>`).join("")}</ol>${a.t=="review"?DISC:""}`}
function render(){const k=(location.hash||"#home").slice(1);let h;
 const p=PRODUCTS.find(x=>x.id==k),a=ARTICLES.find(x=>x.id==k);
 h=p?detail(p):a?article(a):V[k]?V[k]():V[404]();
 app.innerHTML=h;ga("page_view",{page_path:k});
 $("#nav").innerHTML=NAV.map(([t,n])=>`<a href="#${t}" class="${t==k?"on":""}">${n}</a>`).join("");scrollTo(0,0);
 const cf=$("#cf");if(cf)cf.onsubmit=e=>{e.preventDefault();const f=new FormData(cf),s=$("#cs"),er=[];
  if(!f.get("n").trim())er.push("Nhập họ tên.");if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.get("e")))er.push("Email không hợp lệ.");
  if(!f.get("s").trim())er.push("Nhập chủ đề.");if(f.get("m").trim().length<10)er.push("Nội dung tối thiểu 10 ký tự.");
  s.innerHTML=er.length?`<span class="err">${er.join(" ")}</span>`:'<span class="ok">Dữ liệu hợp lệ nhưng chưa gửi (chưa có máy chủ tiếp nhận).</span>'}}
document.addEventListener("click",e=>{const t=e.target.closest("[data-cmp],[data-go],[data-clr],[data-setcat]");if(!t)return;
 if(t.dataset.go){clicks[t.dataset.go]=(clicks[t.dataset.go]||0)+1;ga("affiliate_click",{item_id:t.dataset.go})}
 if(t.dataset.cmp){const i=t.dataset.cmp,x=cmp.indexOf(i);if(x>=0)cmp.splice(x,1);else if(cmp.length<3)cmp.push(i);else alert("Tối đa 3 sản phẩm.");render()}
 if(t.dataset.clr!==undefined){cmp=[];render()}
 if(t.dataset.setcat){S.cat=t.dataset.setcat}});
document.addEventListener("change",e=>{const f=e.target.dataset.f;if(f){S[f]=e.target.value;render()}});
$("#q").oninput=e=>{S.q=e.target.value;if(location.hash!="#san-pham")location.hash="san-pham";else render();$("#q").focus()};
$("#th").onclick=()=>{const r=document.documentElement,d=r.dataset.theme=="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);r.dataset.theme=d?"light":"dark"};
$("#top").onclick=()=>scrollTo({top:0,behavior:"smooth"});onscroll=()=>$("#top").style.display=scrollY>400?"block":"none";
$("#brand").textContent=CONFIG.brand;$("#fb").textContent=CONFIG.brand;
addEventListener("hashchange",render);render();
