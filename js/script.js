 const buttons = document.querySelectorAll(".accordion-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const allContents = document.querySelectorAll(".accordion-content");
      const allIcons = document.querySelectorAll(".accordion-btn svg");
      const content = btn.nextElementSibling;
      const icon = btn.querySelector("svg");

      allContents.forEach((el) => {
        if (el !== content) el.classList.add("hidden");
      });
      allIcons.forEach((ic) => ic.classList.remove("rotate-180"));

      content.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });
  });
  const blogs = [
    {
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      title: "How To Experience Powerful Education Free Of Charge",
      date: "3 May 2021",
      read: "5 min read",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna dolor quis enim, convallis vitae maecenas. Orci erat enim adipiscing mattis elit nunc, sed facilisis."
    },
    {
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title: "Top 10 UI/UX Design Tips for Beginners",
      date: "12 June 2021",
      read: "8 min read",
      desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
    },
    {
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Learn Web Development Fast With Modern Tools",
      date: "20 July 2021",
      read: "7 min read",
      desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi."
    },
    {
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
      title: "Why JavaScript is the Future of the Web",
      date: "5 August 2021",
      read: "6 min read",
      desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem."
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "How to Build a Responsive Website with Tailwind CSS",
      date: "14 September 2021",
      read: "9 min read",
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti."
    },
    {
      img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      title: "The Secrets of Creative Design Thinking",
      date: "2 October 2021",
      read: "4 min read",
      desc: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil."
    }
  ];

  const blogsPerPage = 2;
  let currentPage = 1;

  const blogContainer = document.getElementById("blogContainer");
  const pagination = document.getElementById("pagination");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");

  function renderBlogs() {
    blogContainer.innerHTML = "";
    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const pageBlogs = blogs.slice(start, end);

    pageBlogs.forEach(blog => {
      const blogCard = `
        <div class="grid md:grid-cols-2 gap-8 items-center bg-white rounded-xl shadow hover:shadow-lg transition p-6">
          <img src="${blog.img}" alt="${blog.title}" class="w-full h-64 object-cover rounded-lg" />
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">${blog.title}</h3>
            <div class="flex items-center text-gray-500 text-sm mb-4">
              <span>${blog.date}</span>
              <span class="mx-2">•</span>
              <span>${blog.read}</span>
            </div>
            <p class="text-gray-600 mb-6">${blog.desc}</p>
            <button class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium">
              Read More
            </button>
          </div>
        </div>
      `;
      blogContainer.insertAdjacentHTML("beforeend", blogCard);
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `px-3 py-2 rounded-lg ${i === currentPage ? "bg-pink-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`;
      btn.addEventListener("click", () => {
        currentPage = i;
        renderBlogs();
      });
      pagination.appendChild(btn);
    }
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
  }

  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderBlogs();
    }
  });

  nextPage.addEventListener("click", () => {
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderBlogs();
    }
  });

  renderBlogs();
    const grid = document.getElementById("grid-container");
        for (let i = 2; i <= 12; i++) {
          const card = document.createElement("div");
          card.className = "bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition";
          card.innerHTML = `
            <img src="https://picsum.photos/300/200?random=${i}" class="w-full h-48 object-cover" alt="Course" />
            <div class="p-5">
              <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium">Web Developer</span>
              <h3 class="text-lg font-bold mt-3 mb-2">How To Become An Expert Web Developer</h3>
              <p class="text-pink-500 text-sm mb-2">Tanah Air Team</p>
              <div class="flex items-center text-yellow-400 text-sm mb-2">★★★★★ <span class="text-gray-500 ml-2">(2078)</span></div>
              <div class="flex items-center gap-2">
                <span class="text-gray-400 line-through">$640</span>
                <span class="text-xl font-bold text-gray-900">$${300 + Math.floor(Math.random() * 500)}</span>
              </div>
            </div>`;
          grid.appendChild(card);
        }
         const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active", "text-pink-500", "border-pink-500"));
        tab.classList.add("active", "text-pink-500", "border-pink-500");
      });
    });
    