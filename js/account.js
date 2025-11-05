// js/tabs.js

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const grid = document.getElementById("grid-container");

  // 3 ta asosiy web dasturlashga oid rasm
  const webImages = [
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  ];

  // 12 ta card yasovchi funksiya
  function renderCards(category) {
    grid.innerHTML = "";
    for (let i = 1; i <= 12; i++) {
      const randomImage = webImages[i % webImages.length]; // 3ta rasm navbat bilan chiqadi
      const price = 350 + Math.floor(Math.random() * 400);
      const tag =
        category === "courses"
          ? "Web Development"
          : category === "wishlist"
          ? "JavaScript"
          : "Certificate";

      const title =
        category === "certificate"
          ? "Full Stack Developer Certificate"
          : "How To Become An Expert Web Developer";

      const card = document.createElement("div");
      card.className =
        "bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition";
      card.innerHTML = `
        <img src="${randomImage}" class="w-full h-48 object-cover" alt="Course" />
        <div class="p-5">
          <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium">${tag}</span>
          <h3 class="text-lg font-bold mt-3 mb-2">${title}</h3>
          <p class="text-pink-500 text-sm mb-2">Tanah Air Team</p>
          <div class="flex items-center text-yellow-400 text-sm mb-2">
            ★★★★★ <span class="text-gray-500 ml-2">(2078)</span>
          </div>
          ${
            category === "certificate"
              ? `<div class="text-green-600 font-semibold text-lg">Completed ✅</div>`
              : `<div class="flex items-center gap-2">
                  <span class="text-gray-400 line-through">$640</span>
                  <span class="text-xl font-bold text-gray-900">$${price}</span>
                </div>`
          }
        </div>
      `;
      grid.appendChild(card);
    }
  }

  // Boshlang‘ich yuklanishda — My Courses
  renderCards("courses");

  // Tab bosilganda almashtirish
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) =>
        t.classList.remove("text-pink-500", "border-b-2", "border-pink-500")
      );
      tab.classList.add("text-pink-500", "border-b-2", "border-pink-500");

      if (tab.id === "tab-courses") renderCards("courses");
      if (tab.id === "tab-wishlist") renderCards("wishlist");
      if (tab.id === "tab-certificate") renderCards("certificate");
    });
  });
});
