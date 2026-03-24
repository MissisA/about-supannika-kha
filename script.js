let internIndex = 0;

function scrollToHome() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToProject() {
  document.querySelector(".project").scrollIntoView({ behavior: "smooth" });
}

function scrollToSkills() {
  // แก้เป็น selector ที่ถูกต้องของ section skills ที่คุณมี
  document.querySelector(".skills").scrollIntoView({ behavior: "smooth" });
}

function scrollToCertificates() {
  // แก้เป็น selector ที่ถูกต้องของ section certificates ที่คุณมี
  document.querySelector(".certificates").scrollIntoView({ behavior: "smooth" });
}

function scrollToActivities() {
  // แก้เป็น selector ที่ถูกต้องของ section activities ที่คุณมี
  document.querySelector(".activities").scrollIntoView({ behavior: "smooth" });
}

function scrollToInternship() {
  // แก้เป็น selector ที่ถูกต้องของ section internship ที่คุณมี
  document.querySelector(".internship").scrollIntoView({ behavior: "smooth" });
}

function scrollToFooter() {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
}

let certIndex = 0;
const slider = document.getElementById("certificateSlider");

  function updateCertSlider() {
    const slide = slider.children[0];
    const slideWidth = slide.getBoundingClientRect().width;
    const offset = certIndex * slideWidth;
    slider.style.transform = `translateX(-${offset}px)`;
  }

  function nextCert() {
    const total = slider.children.length;
    certIndex = (certIndex + 1) % total;
    updateCertSlider();
  }

  function prevCert() {
    const total = slider.children.length;
    certIndex = (certIndex - 1 + total) % total;
    updateCertSlider();
  }

  function showInternSlide(index) {
    const slider = document.getElementById("internshipSlider");
    const slides = slider.children;
    
    // วนลูปกลับไปสไลด์แรกหรือสไลด์สุดท้าย
    if (index >= slides.length) internIndex = 0;
    if (index < 0) internIndex = slides.length - 1;
    
    // เลื่อนสไลด์
    slider.style.transform = `translateX(-${internIndex * 100}%)`;
  }

  function nextIntern() {
    internIndex++;
    showInternSlide(internIndex);
  }

  function prevIntern() {
    internIndex--;
    showInternSlide(internIndex);
  }

  // เรียกเมื่อโหลดหน้าเสร็จ
  window.addEventListener("load", updateCertSlider);

  // เรียกเมื่อเปลี่ยนขนาดจอ
  window.addEventListener("resize", updateCertSlider);

const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("menu-mobile");

toggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const mobileButtons = mobileMenu.querySelectorAll("button");
mobileButtons.forEach(button => {
  button.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});


// ===================================================================
// ส่วนที่เพิ่มใหม่: ระบบเลื่อนอัตโนมัติ (Auto-play) สำหรับ Slider ทั้ง 2 ตัว
// นำโค้ดนี้มาวางต่อท้ายไฟล์เดิมได้เลยครับ
// ===================================================================

// 1. ตั้งเวลาให้ฟังก์ชันเลื่อนไปข้างหน้าทำงานอัตโนมัติทุกๆ 5 วินาที (5000 ms)
let certAutoPlay = setInterval(nextCert, 5000);
let internAutoPlay = setInterval(nextIntern, 5000);

// 2. ระบบรีเซ็ตเวลาเมื่อผู้ใช้กดปุ่มเอง (เพื่อไม่ให้ภาพเลื่อนหนีทันทีที่เพิ่งกด)
const sliderButtons = document.querySelectorAll('button');

sliderButtons.forEach(button => {
  const onclickAttr = button.getAttribute('onclick');
  
  // ถ้าระบุว่าเป็นปุ่มของหน้า Certificate
  if (onclickAttr === 'nextCert()' || onclickAttr === 'prevCert()') {
    button.addEventListener('click', () => {
      clearInterval(certAutoPlay); // หยุดเวลาเดิม
      certAutoPlay = setInterval(nextCert, 5000); // เริ่มนับเวลา 5 วินาทีใหม่
    });
  }
  
  // ถ้าระบุว่าเป็นปุ่มของหน้า Internship
  if (onclickAttr === 'nextIntern()' || onclickAttr === 'prevIntern()') {
    button.addEventListener('click', () => {
      clearInterval(internAutoPlay); // หยุดเวลาเดิม
      internAutoPlay = setInterval(nextIntern, 5000); // เริ่มนับเวลา 5 วินาทีใหม่
    });
  }
});