/* =========================================================
   ELEMENT SELECTORS
   ========================================================= */

const pageTurnBtn = document.querySelectorAll(".nextprev-btn");
const pages = document.querySelectorAll(".book-page.page-right");
const contactMeBtn = document.querySelector(".btn.contact-me");
const backProfileBtn = document.querySelector(".back-profile");

/* =========================================================
   PAGE FLIP SOUND
   ========================================================= */

const pageFlipSound = new Audio("sounds/page-flip.mp3");
pageFlipSound.volume = 0.5;

const bundleFlipSound = new Audio("sounds/page-flip-fast.mp3");
bundleFlipSound.volume = 0.4;

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/* =========================================================
   PAGE TURN LOGIC (WITH SOUND)
   ========================================================= */

pageTurnBtn.forEach((el, index) => {
  el.onclick = () => {
    playSound(pageFlipSound);

    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);

    if (pageTurn.classList.contains("turn")) {
      pageTurn.classList.remove("turn");
      setTimeout(() => (pageTurn.style.zIndex = 20 - index), 500);
    } else {
      pageTurn.classList.add("turn");
      setTimeout(() => (pageTurn.style.zIndex = 20 + index), 500);
    }
  };
});

/* =========================================================
   CONTACT ME – BUNDLE FLIP
   ========================================================= */

if (contactMeBtn) {
  contactMeBtn.onclick = () => {
    playSound(bundleFlipSound);

    pages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.add("turn");
        setTimeout(() => (page.style.zIndex = 20 + index), 500);
      }, (index + 1) * 200 + 100);
    });
  };
}

/* =========================================================
   BACK PROFILE – REVERSE BUNDLE FLIP
   ========================================================= */

let pageNumber = 0;
const totalPages = pages.length;

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) pageNumber = totalPages - 1;
}

if (backProfileBtn) {
  backProfileBtn.onclick = () => {
    playSound(bundleFlipSound);

    pages.forEach((_, index) => {
      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove("turn");

        setTimeout(() => {
          reverseIndex();
          pages[pageNumber].style.zIndex = 10 + index;
        }, 500);
      }, (index + 1) * 200 + 100);
    });
  };
}

/* =========================================================
   OPENING ANIMATION (NO SOUND – IMPORTANT)
   ========================================================= */

const coverRight = document.querySelector(".cover.cover-right");
const pageLeft = document.querySelector(".book-page.page-left");

setTimeout(() => coverRight.classList.add("turn"), 2100);
setTimeout(() => (coverRight.style.zIndex = -1), 2800);
setTimeout(() => (pageLeft.style.zIndex = 20), 3200);

pages.forEach((_, index) => {
  setTimeout(() => {
    reverseIndex();
    pages[pageNumber].classList.remove("turn");

    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].style.zIndex = 10 + index;
    }, 500);
  }, (index + 1) * 200 + 2100);
});

/* =========================================================
   DOWNLOAD CV
   ========================================================= */

function downloadCV() {
  const link = document.createElement("a");
  link.href = "assets/Resume.pdf";
  link.download = "Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* =========================================================
   CONTACT FORM
   ========================================================= */

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.sendForm("service_48bhnnn", "template_puazewx", this).then(
      () => {
        alert("✅ Message sent successfully!");
        form.reset();
      },
      () => alert("❌ Failed to send message. Please try again.")
    );
  });
}

/* =========================================================
   ACHIEVEMENTS – READ MORE
   ========================================================= */

const achievementCards = document.querySelectorAll(".achievements-content");

achievementCards.forEach(card => {
  const btn = card.querySelector(".read-more-btn");

  btn.addEventListener("click", () => {
    const isActive = card.classList.contains("active");

    achievementCards.forEach(c => {
      c.classList.remove("active", "hidden");
      c.querySelector(".read-more-btn").innerText = "Read More";
    });

    if (!isActive) {
      card.classList.add("active");
      btn.innerText = "See Less";
      achievementCards.forEach(c => c !== card && c.classList.add("hidden"));
    }
  });
});

/* =========================================================
   PROJECT DATA
   ========================================================= */

const projects = [
  {
    title: "Demplay",
    image: "images/portfolio.png",
    desc: "A video streaming platform integrated with a reward system for audience engagement and content creator monetization.",
    tech: "Tech Used: HTML, CSS, JavaScript, Python, Django, Flask",
    hasLive: true,
    details: {
      problem: "Existing video platforms provide limited transparency and unfair monetization for creators.",
      work: "Designed and developed a full-stack platform with engagement-based rewards and scalable backend architecture."
    }
  },
  {
    title: "Heliosync",
    image: "images/heliosync.png",
    desc: "An autonomous solar tracking system that aligns panels to the sun without sensors or computers.",
    tech: "Tech Used: Mechanical Design, Kinematics, Control Logic, Renewable Energy",
    hasLive: false,
    details: {
      problem: "Conventional solar trackers rely on sensors and controllers, increasing cost and failure points.",
      work: "Designed a purely mechanical sun-tracking mechanism using passive alignment principles."
    }
  }
];

/* =========================================================
   PROJECT LOGIC
   ========================================================= */

let currentProject = 0;
let detailsOpen = false;

const img = document.getElementById("project-image");
const title = document.getElementById("project-title");
const desc = document.getElementById("project-desc");
const tech = document.getElementById("project-tech");
const live = document.getElementById("project-live");

const nextProjectBtn = document.getElementById("next-project-btn");
const detailsBtn = document.getElementById("details-btn");
const detailsPanel = document.getElementById("project-details");
const imageBox = document.getElementById("project-image-box");
const basicInfo = document.getElementById("project-basic");

/* Next project */

if (nextProjectBtn) {
  nextProjectBtn.addEventListener("click", () => {
    if (detailsOpen) return;

    [img, title, desc, tech].forEach(el =>
      el.classList.add("project-transition-out")
    );

    setTimeout(() => {
      currentProject = (currentProject + 1) % projects.length;
      const p = projects[currentProject];

      img.src = p.image;
      title.textContent = p.title;
      desc.textContent = p.desc;
      tech.textContent = p.tech;
      live.style.display = p.hasLive ? "flex" : "none";

      [img, title, desc, tech].forEach(el =>
        el.classList.remove("project-transition-out")
      );
    }, 350);
  });
}

/* Project details */

function updateProjectDetails(index) {
  const p = projects[index];
  document.getElementById("details-title").textContent = `${p.title} – Details`;
  document.getElementById("details-problem").textContent = p.details.problem;
  document.getElementById("details-work").textContent = p.details.work;
}

if (detailsBtn) {
  detailsBtn.addEventListener("click", () => {
    detailsOpen = !detailsOpen;

    if (detailsOpen) {
      imageBox.classList.add("project-hide-image");
      basicInfo.classList.add("project-hide-image");
      updateProjectDetails(currentProject);
      detailsPanel.classList.add("active");
      nextProjectBtn.classList.add("hide-btn");
      nextProjectBtn.style.pointerEvents = "none";
      detailsBtn.textContent = "See Less";
    } else {
      imageBox.classList.remove("project-hide-image");
      basicInfo.classList.remove("project-hide-image");
      detailsPanel.classList.remove("active");
      nextProjectBtn.classList.remove("hide-btn");
      nextProjectBtn.style.pointerEvents = "auto";
      detailsBtn.textContent = "More Details";
    }
  });
}
