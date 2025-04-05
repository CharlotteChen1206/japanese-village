import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collectionGroup, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

const container = document.getElementById("reservation-container");

async function loadReservations() {
  const snapshot = await getDocs(collectionGroup(db, "timeslots"));
  const data = snapshot.docs.map(doc => doc.data());

  if (data.length === 0) {
    container.innerHTML = "<p>No reservations found.</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr><th>Date</th><th>Time</th><th>Guests</th><th>Email</th><th>Created At</th></tr>
    </thead>
    <tbody>
      ${data.map(r => `
        <tr>
          <td>${r.date}</td>
          <td>${r.time}</td>
          <td>${r.guests}</td>
          <td>${r.email || "-"}</td>
          <td>${new Date(r.createdAt).toLocaleString()}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
  container.appendChild(table);
}

loadReservations();