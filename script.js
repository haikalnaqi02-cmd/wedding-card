const weddingDate = new Date("2026-06-20T10:30:00+08:00");
const rsvpDeadline = new Date("2026-06-10T23:59:59+08:00");
const whatsappNumber = "60123456789";

const body = document.body;
const audio = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");
const petalsContainer = document.querySelector(".petals");
const slidesContainer = document.getElementById("slides");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpStatus = document.getElementById("rsvpStatus");
const waLink = document.getElementById("waLink");
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");
const wishTemplate = document.getElementById("wishTemplate");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const videoModal = document.getElementById("videoModal");
const videoTrigger = document.getElementById("videoTrigger");
const videoClose = document.getElementById("videoClose");
const preweddingVideo = document.getElementById("preweddingVideo");
const themeButtons = document.querySelectorAll(".theme-btn");
const rsvpDeadlineNote = document.getElementById("rsvpDeadlineNote");
const addAkadBtn = document.getElementById("addAkad");
const addResepsiBtn = document.getElementById("addResepsi");
const downloadICS = document.getElementById("downloadICS");
const intro = document.getElementById("intro");
const openInvite = document.getElementById("openInvite");

const galleryImages = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1491833485966-73f7d1a98c0c?auto=format&fit=crop&w=1600&q=80"
];

const events = {
  akad: {
    title: "Akad Nikah Sakinah & Pasangan",
    start: "2026-06-20T10:30:00+08:00",
    end: "2026-06-20T11:30:00+08:00",
    location: "Kuala Lumpur",
    description: "Akad nikah dan doa restu."
  },
  resepsi: {
    title: "Resepsi Sakinah & Pasangan",
    start: "2026-06-20T12:00:00+08:00",
    end: "2026-06-20T16:00:00+08:00",
    location: "Kuala Lumpur",
    description: "Jamuan resepsi dan sesi bergambar."
  }
};

let slideIndex = 0;

function init() {
  body.classList.add("loaded");
  applySavedTheme();
  createPetals(24);
  buildSlides();
  updateCountdown();
  updateRsvpCountdown();
  setInterval(updateCountdown, 1000);
  setInterval(updateRsvpCountdown, 1000);
  setupReveal();
  setupParallax();
  setupSlider();
  setupRSVP();
  setupWishes();
  setupMusic();
  setupConfetti();
  setupLightbox();
  setupVideoModal();
  setupThemeSwitcher();
  setupCalendarButtons();
  setupIntroDoor();
}

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    setCountdownValues("days", "hours", "minutes", "seconds", 0, 0, 0, 0);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setCountdownValues("days", "hours", "minutes", "seconds", days, hours, minutes, seconds);
}

function updateRsvpCountdown() {
  const now = new Date();
  const diff = rsvpDeadline - now;

  if (diff <= 0) {
    setCountdownValues("rsvpDays", "rsvpHours", "rsvpMinutes", "rsvpSeconds", 0, 0, 0, 0);
    rsvpDeadlineNote.textContent = "RSVP sudah ditutup.";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setCountdownValues("rsvpDays", "rsvpHours", "rsvpMinutes", "rsvpSeconds", days, hours, minutes, seconds);
  rsvpDeadlineNote.textContent = `Tutup pada ${formatDate(rsvpDeadline)}.`;
}

function setCountdownValues(dayId, hourId, minuteId, secondId, days, hours, minutes, seconds) {
  document.getElementById(dayId).textContent = String(days).padStart(2, "0");
  document.getElementById(hourId).textContent = String(hours).padStart(2, "0");
  document.getElementById(minuteId).textContent = String(minutes).padStart(2, "0");
  document.getElementById(secondId).textContent = String(seconds).padStart(2, "0");
}

function formatDate(date) {
  return date.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function createPetals(count) {
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 12}s`;
    petal.style.animationDelay = `${Math.random() * 5}s`;
    petal.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
    petal.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
    petalsContainer.appendChild(petal);
  }
}

function setupReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function setupParallax() {
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el) => {
      el.style.transform = `translateY(${scrollY * 0.2}px)`;
    });
  });
}

function buildSlides() {
  galleryImages.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url('${src}')`;
    slide.dataset.image = src;
    if (index === 0) slide.classList.add("active");
    slidesContainer.appendChild(slide);
  });
}

function setupSlider() {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const slides = () => document.querySelectorAll(".slide");

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    slides().forEach((slide, i) => {
      slide.classList.toggle("active", i === slideIndex);
    });
  }

  prev.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + galleryImages.length) % galleryImages.length;
    updateSlider();
  });

  next.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % galleryImages.length;
    updateSlider();
  });

  setInterval(() => {
    slideIndex = (slideIndex + 1) % galleryImages.length;
    updateSlider();
  }, 5000);
}

function setupRSVP() {
  waLink.addEventListener("click", (event) => {
    event.preventDefault();
    const url = buildWhatsAppUrl();
    window.open(url, "_blank");
  });

  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    rsvpStatus.textContent = "Terima kasih! RSVP anda diterima.";
    const url = buildWhatsAppUrl();
    window.open(url, "_blank");
    rsvpForm.reset();
  });
}

function buildWhatsAppUrl() {
  const name = rsvpForm.elements.name.value || "";
  const phone = rsvpForm.elements.phone.value || "";
  const attendance = rsvpForm.elements.attendance.value || "";
  const message = rsvpForm.elements.message.value || "";

  const text = `RSVP Kad Kahwin%nNama: ${name}%nTelefon: ${phone}%nKehadiran: ${attendance}%nUcapan: ${message}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function setupWishes() {
  const saved = JSON.parse(localStorage.getItem("wedding_wishes") || "[]");
  saved.forEach(addWishItem);

  wishTemplate.addEventListener("change", () => {
    if (!wishForm.elements.wishMessage.value.trim()) {
      wishForm.elements.wishMessage.value = wishTemplate.value;
    }
  });

  wishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = wishForm.elements.wishName.value.trim();
    const message = wishForm.elements.wishMessage.value.trim();
    if (!name || !message) return;

    const newWish = { name, message };
    addWishItem(newWish);

    const updated = [newWish, ...saved];
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));
    saved.unshift(newWish);

    wishForm.reset();
  });
}

function addWishItem({ name, message }) {
  const item = document.createElement("div");
  item.className = "wish-item";
  item.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
  wishList.prepend(item);
}

function setupMusic() {
  let isMuted = false;
  audio.volume = 0.6;

  const attemptPlay = () => {
    audio.play().catch(() => {
      audio.muted = true;
      isMuted = true;
      musicToggle.textContent = "Play Music";
    });
  };

  attemptPlay();

  document.addEventListener(
    "click",
    () => {
      if (audio.paused) {
        audio.muted = false;
        audio.play();
      }
    },
    { once: true }
  );

  musicToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    musicToggle.textContent = isMuted ? "Play Music" : "Mute";
  });
}

function setupConfetti() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startConfetti();
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(document.getElementById("closing"));
}

function startConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }).map(() => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    speed: 1 + Math.random() * 3,
    size: 4 + Math.random() * 6,
    color: Math.random() > 0.5 ? "#caa46f" : "#f7d9d9"
  }));

  let frame = 0;
  const animate = () => {
    frame++;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += Math.sin(p.y * 0.02);
      if (p.y > confettiCanvas.height) {
        p.y = -20;
      }
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    if (frame < 300) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  };

  animate();
}

function setupLightbox() {
  slidesContainer.addEventListener("click", (event) => {
    const slide = event.target.closest(".slide");
    if (!slide) return;
    lightboxImage.src = slide.dataset.image;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

function setupVideoModal() {
  videoTrigger.addEventListener("click", () => {
    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
  });

  videoClose.addEventListener("click", closeVideoModal);
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) closeVideoModal();
  });
}

function closeVideoModal() {
  videoModal.classList.remove("active");
  videoModal.setAttribute("aria-hidden", "true");
  preweddingVideo.pause();
}

function setupThemeSwitcher() {
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      body.setAttribute("data-theme", theme);
      localStorage.setItem("wedding_theme", theme);
      themeButtons.forEach((b) => b.classList.toggle("active", b === btn));
    });
  });
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("wedding_theme") || "garden";
  body.setAttribute("data-theme", savedTheme);
  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === savedTheme);
  });
}

function setupCalendarButtons() {
  addAkadBtn.addEventListener("click", () => {
    window.open(buildGoogleCalendarUrl(events.akad), "_blank");
  });

  addResepsiBtn.addEventListener("click", () => {
    window.open(buildGoogleCalendarUrl(events.resepsi), "_blank");
  });

  downloadICS.addEventListener("click", () => {
    const ics = buildICS([events.akad, events.resepsi]);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    downloadICS.href = url;
    downloadICS.download = "undangan-wedding.ics";
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

function setupIntroDoor() {
  if (!intro || !openInvite) return;
  body.classList.add("intro-active");

  const open = () => {
    intro.classList.add("open");
    setTimeout(() => {
      intro.classList.add("hidden");
      body.classList.remove("intro-active");
      document.getElementById("top").scrollIntoView({ behavior: "smooth" });
    }, 1100);
  };

  openInvite.addEventListener("click", open);
}

function buildGoogleCalendarUrl(event) {
  const start = toGCalDate(event.start);
  const end = toGCalDate(event.end);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  const text = encodeURIComponent(event.title);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
}

function toGCalDate(dateString) {
  return new Date(dateString).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildICS(list) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Card//EN"
  ];

  list.forEach((event) => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${Date.now()}-${Math.random().toString(36).slice(2)}@wedding`);
    lines.push(`DTSTAMP:${toIcsDate(new Date())}`);
    lines.push(`DTSTART:${toIcsDate(new Date(event.start))}`);
    lines.push(`DTEND:${toIcsDate(new Date(event.end))}`);
    lines.push(`SUMMARY:${event.title}`);
    lines.push(`DESCRIPTION:${event.description}`);
    lines.push(`LOCATION:${event.location}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\n");
}

function toIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", init);

