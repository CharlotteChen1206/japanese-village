import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDW3QBZkI_TKnBbYMg2_GlEhMXuEsqwd7A",
  authDomain: "japanese-village-1d9a2.firebaseapp.com",
  projectId: "japanese-village-1d9a2",
  storageBucket: "japanese-village-1d9a2.appspot.com",
  messagingSenderId: "473830293848",
  appId: "1:473830293848:web:bad1ebfc6f2c4a11c5652d",
  measurementId: "G-VHW3XXQ3GH"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservation-form");
  const dateInput = form.date;
  const timeSelect = form.time;
  const guestInput = form.guests;
  const emailInput = form.email;
  const nameInput = form.name;
  const timeGrid = document.getElementById("time-grid");

  emailjs.init("juvgyVYGkbUG2B2AH");

  const today = new Date().toISOString().split("T")[0]; // ✅ 先定義 today
  console.log("🚀 App loaded");

  fetchReservedTimes(today).then(reserved => {
    console.log("Reserved:", reserved);
    renderTimeButtons(reserved);
  });
  
  // 初始化 EmailJS
  emailjs.init("juvgyVYGkbUG2B2AH");


  const times = [];
  for (let h = 8; h <= 22; h++) {
    for (let m of [0, 15, 30, 45]) {
      let label = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      let display = new Date(`2020-01-01T${label}:00`).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' });
      times.push({ value: label.replace(":", ""), label: display });
    }
  }

  function renderTimeButtons(reserved = []) {
    timeGrid.innerHTML = "";
    times.forEach(t => {
      const btn = document.createElement("button");
      btn.className = "time-btn";
      btn.textContent = t.label;
      btn.dataset.value = t.value;
      if (reserved.includes(t.value)) {
        btn.disabled = true;
        btn.classList.add("disabled");
      }
      btn.addEventListener("click", () => {
        document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        timeSelect.value = t.value;
      });
      timeGrid.appendChild(btn);
    });
  }

  async function fetchReservedTimes(dateStr) {
    const [y, m, d] = dateStr.split("-");
    const ref = collection(db, "reservations", y, m, d, "timeslots");
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => doc.id);
  }


  dateInput.addEventListener("change", async () => {
    const date = new Date(dateInput.value);
    if (date.getDay() === 1) { // 週一公休
      alert("We are closed on Mondays. Please select another date.");
      dateInput.value = "";
      timeGrid.innerHTML = "";
      return;
    }
    const reserved = await fetchReservedTimes(dateInput.value);
    renderTimeButtons(reserved);
  });

  fetchReservedTimes(today).then(reserved => renderTimeButtons(reserved));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dateStr = dateInput.value;
    const [y, m, d] = dateStr.split("-");
    const timeValue = timeSelect.value;
    const ref = doc(db, "reservations", y, m, d, "timeslots", timeValue);

    const exists = await getDoc(ref);
    if (exists.exists()) {
      alert("This time slot has already been reserved.");
      return;
    }

    const data = {
      guests: guestInput.value,
      email: emailInput.value,
      time: timeValue,
      date: dateStr,
      createdAt: new Date().toISOString()
    };

    await setDoc(ref, data);

// 寄送 email

    // Email 通知
    emailjs.send("service_3rj34j7", "template_dlex4ao", {
      to_name: nameInput.value,
      email: emailInput.value, 
      time: data.time,
      date: data.date,
      guests: data.guests
    }).then(() => {
      alert("🎉 Your reservation was successfully submitted and email has been sent!");
    }).catch(error => {
      console.error("Email send failed:", error);
      alert("❌ Reservation saved, but failed to send email.");
    });

    form.reset();
document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected"));
timeSelect.value = "";
  });
  
});

document.addEventListener("DOMContentLoaded", function () {
  const current = window.location.pathname;
const links = document.querySelectorAll("nav a");

links.forEach(link => {
const href = link.getAttribute("href");
if (current.includes(href)) {
  link.classList.add("active");
}
});
});