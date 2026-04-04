// ==========================================
// 1. ระบบ Scroll ไปยังส่วนต่างๆ (Smooth Scrolling)
// ==========================================
function scrollToHome() { window.scrollTo({ top: 0, behavior: "smooth" }); }
function scrollToProject() { document.querySelector(".project").scrollIntoView({ behavior: "smooth" }); }
function scrollToSkills() { document.querySelector(".skills").scrollIntoView({ behavior: "smooth" }); }
function scrollToCertificates() { document.querySelector(".certificates").scrollIntoView({ behavior: "smooth" }); }
function scrollToActivities() { document.querySelector(".activities").scrollIntoView({ behavior: "smooth" }); }
function scrollToInternship() { document.querySelector(".internship").scrollIntoView({ behavior: "smooth" }); }
function scrollToFooter() { document.getElementById("footer").scrollIntoView({ behavior: "smooth" }); }

// ==========================================
// 2. ระบบ Mobile Menu (เมนูมือถือ)
// ==========================================
const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("menu-mobile");

// เปิด-ปิดเมนู
toggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ปิดเมนูอัตโนมัติเมื่อกดเลือกหัวข้อ
const mobileButtons = mobileMenu.querySelectorAll("button");
mobileButtons.forEach(button => {
  button.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// ==========================================
// 3. ระบบ Slider (Certificates)
// ==========================================
let certIndex = 0;
const certSlider = document.getElementById("certificateSlider");

function updateCertSlider() {
  if (!certSlider || certSlider.children.length === 0) return;
  const slideWidth = certSlider.children[0].getBoundingClientRect().width;
  certSlider.style.transform = `translateX(-${certIndex * slideWidth}px)`;
}

function nextCert() {
  if (!certSlider) return;
  certIndex = (certIndex + 1) % certSlider.children.length;
  updateCertSlider();
  resetAutoPlay('cert'); // รีเซ็ตเวลาอัตโนมัติเมื่อกดเอง
}

function prevCert() {
  if (!certSlider) return;
  const total = certSlider.children.length;
  certIndex = (certIndex - 1 + total) % total;
  updateCertSlider();
  resetAutoPlay('cert');
}

// ==========================================
// 4. ระบบ Slider (Internship)
// ==========================================
let internIndex = 0;
const internSlider = document.getElementById("internshipSlider");

function updateInternSlider() {
  if (!internSlider || internSlider.children.length === 0) return;
  const slideWidth = internSlider.children[0].getBoundingClientRect().width;
  internSlider.style.transform = `translateX(-${internIndex * slideWidth}px)`;
}

function nextIntern() {
  if (!internSlider) return;
  internIndex = (internIndex + 1) % internSlider.children.length;
  updateInternSlider();
  resetAutoPlay('intern');
}

function prevIntern() {
  if (!internSlider) return;
  const total = internSlider.children.length;
  internIndex = (internIndex - 1 + total) % total;
  updateInternSlider();
  resetAutoPlay('intern');
}

// ==========================================
// 5. ระบบ Auto-play (เลื่อนอัตโนมัติ)
// ==========================================
let certAutoPlay = setInterval(nextCert, 5000);
let internAutoPlay = setInterval(nextIntern, 5000);

function resetAutoPlay(sliderType) {
  if (sliderType === 'cert') {
    clearInterval(certAutoPlay);
    certAutoPlay = setInterval(nextCert, 5000);
  } else if (sliderType === 'intern') {
    clearInterval(internAutoPlay);
    internAutoPlay = setInterval(nextIntern, 5000);
  }
}

// อัปเดตขนาดสไลเดอร์เมื่อโหลดหน้าจอ หรือหมุนจอมือถือ (Responsive)
window.addEventListener("load", () => {
  updateCertSlider();
  updateInternSlider();
});
window.addEventListener("resize", () => {
  updateCertSlider();
  updateInternSlider();
});

// ==========================================
// 6. 🚀 อัปเกรด UX มือถือ: ระบบ Swipe (ใช้นิ้วปัดเพื่อเลื่อน)
// ==========================================
let touchstartX = 0;
let touchendX = 0;
const SWIPE_THRESHOLD = 50; // ระยะปัดขั้นต่ำ (พิกเซล)

function handleSwipeGesture(sliderElement, nextFunc, prevFunc) {
  if (!sliderElement) return;

  // เมื่อนิ้วเริ่มแตะจอ
  sliderElement.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX;
  }, { passive: true });

  // เมื่อนิ้วปล่อยจากจอ
  sliderElement.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture(nextFunc, prevFunc);
  }, { passive: true });
}

function handleGesture(nextFunc, prevFunc) {
  // ปัดไปทางซ้าย (เลื่อนภาพต่อไป)
  if (touchstartX - touchendX > SWIPE_THRESHOLD) {
    nextFunc();
  }
  // ปัดไปทางขวา (เลื่อนภาพก่อนหน้า)
  if (touchendX - touchstartX > SWIPE_THRESHOLD) {
    prevFunc();
  }
}

// เปิดใช้งานระบบปัดหน้าจอให้กับสไลเดอร์ทั้ง 2 ตัว
handleSwipeGesture(document.getElementById('certificateSlider').parentElement, nextCert, prevCert);
handleSwipeGesture(document.getElementById('internshipSlider').parentElement, nextIntern, prevIntern);