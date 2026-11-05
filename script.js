
gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// LOADER
window.addEventListener("load", () => {
  const loader = document.querySelector("#loader");

  gsap.to(loader, {
    opacity: 0,
    duration: 0.7,
    delay: 0.5,
    onComplete: () => loader.remove()
  });

  // HERO INTRO
  if (!reduceMotion) {
    gsap.from(".hero-eyebrow", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.7
    });

    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.8,
      ease: "power4.out"
    });

    gsap.from(".hero-description, .hero-actions", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      stagger: 0.2
    });
  }
});

// MOBILE NAVIGATION
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ENGINE SOUND
const engineAudio = document.querySelector("#engineAudio");
const soundButton = document.querySelector("#soundButton");
const soundLabel = document.querySelector("#soundLabel");
const replayEngine = document.querySelector("#replayEngine");

async function startEngine() {
  try {
    engineAudio.pause();
    engineAudio.currentTime = 0;
    await engineAudio.play();

    soundLabel.textContent = "ENGINE STARTED";

    engineAudio.onended = () => {
      soundLabel.textContent = "START ENGINE";
    };
  } catch (error) {
    console.error("Engine audio could not play:", error);
    soundLabel.textContent = "AUDIO UNAVAILABLE";
  }
}

soundButton.addEventListener("click", startEngine);
replayEngine.addEventListener("click", startEngine);

// HORIZONTAL SCROLL
const horizontalSection = document.querySelector(".horizontal-section");
const horizontalTrack = document.querySelector(".horizontal-track");
const progressBar = document.querySelector(".horizontal-progress span");

if (!reduceMotion && window.innerWidth > 650) {
  const getScrollDistance = () =>
    horizontalTrack.scrollWidth - window.innerWidth;

  gsap.to(horizontalTrack, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: horizontalSection,
      start: "top top",
      end: () => "+=" + getScrollDistance(),
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: self => {
        progressBar.style.width = `${self.progress * 100}%`;
      }
    }
  });
}

// SECTION REVEALS
if (!reduceMotion) {
  gsap.utils.toArray(".intro-heading, .intro-copy, .specs-heading").forEach(element => {
    gsap.from(element, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        once: true
      }
    });
  });

  gsap.from(".intro-image-wrap", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
      trigger: ".intro-image-wrap",
      start: "top 85%",
      once: true
    }
  });

  gsap.from(".spec-card", {
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".spec-grid",
      start: "top 85%",
      once: true
    }
  });

  gsap.from(".drive-content > *", {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".drive-section",
      start: "top 65%",
      once: true
    }
  });

  gsap.from(".final-content > *", {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".final-section",
      start: "top 70%",
      once: true
    }
  });
}

// REFRESH AFTER IMAGES LOAD
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// Smooth anchor navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});