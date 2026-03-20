const loader = document.getElementById("loader");
const welcomePopup = document.getElementById("welcomePopup");
const popupNameInput = document.getElementById("popupNameInput");
const startExperienceBtn = document.getElementById("startExperienceBtn");

const typingText = document.getElementById("typingText");
const visitorName = document.getElementById("visitorName");
const generateBtn = document.getElementById("generateBtn");
const personalGreeting = document.getElementById("personalGreeting");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const whatsappBtn = document.getElementById("whatsappBtn");
const randomBtn = document.getElementById("randomBtn");
const saveImageBtn = document.getElementById("saveImageBtn");
const audioBtn = document.getElementById("audioBtn");
const takbirAudio = document.getElementById("takbirAudio");
const autoplayHint = document.getElementById("autoplayHint");
const royalName = document.getElementById("royalName");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownStatus = document.getElementById("countdownStatus");

const typingWords = [
  "كل عام وأنتم بخير ✨",
  "تقبل الله طاعاتكم 🤍",
  "عيد سعيد عليكم 🌙",
  "فرحة، صحة، وهناء 🎉"
];

const greetings = [
  "عيدك مبارك، تقبل الله منك، وجعل أيامك كلها فرحًا وطمأنينة.",
  "كل عام وأنت بخير، ربي يعيده عليك بالصحة والرزق والسعادة.",
  "عيد فطر سعيد، جعله الله عيد خير وبركة وفرحة لك ولأهلك.",
  "أسأل الله أن يملأ قلبك نورًا وسرورًا في هذا العيد المبارك.",
  "تقبل الله طاعاتك، وألبسك في العيد فرحة لا تزول.",
  "عيد سعيد عليك، يا رب تكون أيامك القادمة أجمل مما تتمنى.",
  "ربي يجعل هذا العيد بداية خير وسكينة ونجاح وفرح لك."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let audioPlaying = false;
let autoplayBlocked = false;
let currentVisitorName = "ضيفنا الكريم";

/* Loader then popup */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
    welcomePopup.classList.add("show");
    launchConfettiBurst();
    tryAutoPlay();
  }, 1700);
});

/* Typing */
function runTyping() {
  const currentWord = typingWords[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(runTyping, 1200);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      charIndex = 0;
    }
  }

  setTimeout(runTyping, isDeleting ? 40 : 85);
}
runTyping();

/* Greeting */
function createGreeting(name) {
  const value = name.trim();
  const randomText = greetings[Math.floor(Math.random() * greetings.length)];

  if (value) {
    currentVisitorName = value;
    royalName.textContent = value;
    visitorName.value = value;
    popupNameInput.value = value;
    personalGreeting.textContent = `${value}، ${randomText}`;
  } else {
    currentVisitorName = "ضيفنا الكريم";
    royalName.textContent = "ضيفنا الكريم";
    personalGreeting.textContent = "عيد سعيد عليكم جميعًا، تقبل الله منا ومنكم صالح الأعمال.";
  }
}

generateBtn.addEventListener("click", () => {
  createGreeting(visitorName.value);
  launchConfettiBurst();
});

randomBtn.addEventListener("click", () => {
  const randomText = greetings[Math.floor(Math.random() * greetings.length)];
  personalGreeting.textContent = `${currentVisitorName}، ${randomText}`;
  launchConfettiBurst();
});

/* Popup start */
startExperienceBtn.addEventListener("click", async () => {
  createGreeting(popupNameInput.value);
  welcomePopup.classList.remove("show");
  await playTakbir();
  launchConfettiBurst();
});

/* Buttons */
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(personalGreeting.textContent);
    flashBtn(copyBtn, "تم النسخ ✅", "نسخ التهنئة");
  } catch {
    flashBtn(copyBtn, "تعذر النسخ", "نسخ التهنئة");
  }
});

shareBtn.addEventListener("click", async () => {
  const data = {
    title: "عيد فطر سعيد",
    text: personalGreeting.textContent,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(data);
      flashBtn(shareBtn, "تمت المشاركة ✅", "مشاركة");
    } else {
      await navigator.clipboard.writeText(`${personalGreeting.textContent}\n${window.location.href}`);
      flashBtn(shareBtn, "تم نسخ الرابط ✅", "مشاركة");
    }
  } catch {
    flashBtn(shareBtn, "لم تتم المشاركة", "مشاركة");
  }
});

whatsappBtn.addEventListener("click", () => {
  const msg = encodeURIComponent(`${personalGreeting.textContent}\n${window.location.href}`);
  window.open(`https://wa.me/?text=${msg}`, "_blank");
});

function flashBtn(button, temp, original) {
  button.textContent = temp;
  setTimeout(() => {
    button.textContent = original;
  }, 1700);
}

/* Save as PNG */
saveImageBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, "#07111f");
  gradient.addColorStop(0.5, "#0b1d31");
  gradient.addColorStop(1, "#122945");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* soft glow */
  ctx.beginPath();
  ctx.fillStyle = "rgba(255, 209, 102, 0.16)";
  ctx.arc(980, 120, 140, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.arc(180, 520, 120, 0, Math.PI * 2);
  ctx.fill();

  /* moon */
  ctx.beginPath();
  ctx.fillStyle = "#ffe8a3";
  ctx.arc(180, 120, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#0b1d31";
  ctx.arc(205, 110, 55, 0, Math.PI * 2);
  ctx.fill();

  /* card */
  roundRect(ctx, 120, 140, 960, 350, 28, "rgba(255,255,255,0.08)", "rgba(255,255,255,0.15)");

  ctx.direction = "rtl";
  ctx.textAlign = "center";

  ctx.fillStyle = "#ffd166";
  ctx.font = "bold 28px Tahoma";
  ctx.fillText("🌙 عيد الفطر المبارك", 600, 200);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 54px Tahoma";
  ctx.fillText("عيدكم مبارك", 600, 270);

  ctx.fillStyle = "#ffd166";
  ctx.font = "bold 34px Tahoma";
  ctx.fillText(currentVisitorName, 600, 325);

  wrapText(
    ctx,
    personalGreeting.textContent,
    600,
    390,
    760,
    48,
    "28px Tahoma",
    "#f8fbff"
  );

  ctx.fillStyle = "#ffd166";
  ctx.font = "bold 24px Tahoma";
  ctx.fillText("By Anis Zidane", 600, 455);

  const link = document.createElement("a");
  link.download = "eid-greeting-by-anis-zidane.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  flashBtn(saveImageBtn, "تم الحفظ ✅", "حفظ PNG");
});

function roundRect(ctx, x, y, width, height, radius, fillColor, strokeColor) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line);

  lines.forEach((ln, index) => {
    ctx.fillText(ln.trim(), x, y + index * lineHeight);
  });
}

/* Audio */
async function playTakbir() {
  try {
    takbirAudio.volume = 0.7;
    await takbirAudio.play();
    audioPlaying = true;
    autoplayBlocked = false;
    autoplayHint.classList.add("hidden");
    audioBtn.textContent = "إيقاف التكبيرات";
  } catch {
    autoplayBlocked = true;
    audioPlaying = false;
    autoplayHint.classList.remove("hidden");
    audioBtn.textContent = "تشغيل التكبيرات";
  }
}

function stopTakbir() {
  takbirAudio.pause();
  takbirAudio.currentTime = 0;
  audioPlaying = false;
  audioBtn.textContent = "تشغيل التكبيرات";
}

function tryAutoPlay() {
  playTakbir();
}

audioBtn.addEventListener("click", async () => {
  if (audioPlaying) {
    stopTakbir();
  } else {
    await playTakbir();
  }
});

/* fallback first interaction */
function unlockAudioOnce() {
  if (autoplayBlocked && !audioPlaying) {
    playTakbir();
  }
}
document.addEventListener("click", unlockAudioOnce, { once: true });
document.addEventListener("touchstart", unlockAudioOnce, { once: true });

/* Countdown */
const eidDate = new Date("2026-03-20T07:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = eidDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    countdownStatus.textContent = "🎉 العيد بدأ! عيدكم مبارك وتقبل الله منكم.";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

  countdownStatus.textContent = "باقي وقت بسيط على بداية العيد أو موعد صلاة العيد.";
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Copy greeting cards */
document.querySelectorAll(".card-copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.text);
      const old = btn.textContent;
      btn.textContent = "تم النسخ ✅";
      setTimeout(() => {
        btn.textContent = old;
      }, 1500);
    } catch {
      btn.textContent = "تعذر النسخ";
      setTimeout(() => {
        btn.textContent = "نسخ";
      }, 1500);
    }
  });
});

/* FX Canvas */
const fxCanvas = document.getElementById("fxCanvas");
const ctx = fxCanvas.getContext("2d");
let particles = [];
let confetti = [];

function resizeCanvas() {
  fxCanvas.width = window.innerWidth;
  fxCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * fxCanvas.width,
      y: Math.random() * fxCanvas.height,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    });
  }
}
createStars();

function launchConfettiBurst() {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * fxCanvas.width,
      y: -20,
      size: Math.random() * 7 + 3,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 8 - 4,
      color: ["#ffd166", "#ffffff", "#ffefb0", "#d4af37"][Math.floor(Math.random() * 4)]
    });
  }
}

function drawFX() {
  ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

  for (const p of particles) {
    p.alpha += p.speed;
    if (p.alpha >= 1 || p.alpha <= 0.15) {
      p.speed *= -1;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,245,200,${p.alpha})`;
    ctx.fill();
  }

  confetti.forEach((p, index) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    if (p.y > fxCanvas.height + 20) {
      confetti.splice(index, 1);
    }
  });

  requestAnimationFrame(drawFX);
}
drawFX();