
const COURSES = [
  { id:1, title:"How To Become An Expert Web Developer", tag:"Web Developer", team:"Tanah Air Team", rating:5, students:2078, old:640, price:735, duration:"6-12", category:"CSS", level:"Beginner", language:"English", priceType:"Paid", features:["Certificate"], img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:2, title:"Mastering Java Programming", tag:"Java", team:"Tanah Air Team", rating:4, students:1980, old:720, price:850, duration:"13+", category:"Java", level:"Intermediate", language:"English", priceType:"Paid", features:["Quizzes"], img:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { id:3, title:"Building Apps with Flutter", tag:"Flutter", team:"Tanah Air Team", rating:5, students:2234, old:750, price:900, duration:"3-6", category:"Flutter", level:"Intermediate", language:"English", priceType:"Paid", features:["Assignments"], img:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:4, title:"Intro to Golang", tag:"Golang", team:"Tanah Air Team", rating:3, students:1750, old:500, price:400, duration:"1-3", category:"Golang", level:"Beginner", language:"Espanol", priceType:"Free", features:["Certificate"], img:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:5, title:"Advanced CSS Animations", tag:"CSS", team:"Tanah Air Team", rating:4, students:1899, old:600, price:560, duration:"6-12", category:"CSS", level:"Expert", language:"Melayu", priceType:"Paid", features:["Quizzes"], img:"https://images.unsplash.com/photo-1522205408450-add114ad53fe?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:6, title:"Professional Java Developer", tag:"Java", team:"Tanah Air Team", rating:5, students:2300, old:1100, price:980, duration:"13+", category:"Java", level:"Expert", language:"English", priceType:"Paid", features:["Certificate"], img:"https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:7, title:"React JS From Scratch", tag:"React", team:"Tanah Air Team", rating:4, students:1780, old:680, price:599, duration:"6-12", category:"React", level:"Beginner", language:"Bahasa", priceType:"Paid", features:["Assignments"], img:"https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:8, title:"Python for Beginners", tag:"Python", team:"Tanah Air Team", rating:5, students:3100, old:500, price:420, duration:"3-6", category:"Python", level:"Beginner", language:"English", priceType:"Paid", features:["Certificate"], img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:9, title:"NodeJS Fundamentals", tag:"NodeJS", team:"Tanah Air Team", rating:3, students:890, old:620, price:499, duration:"6-12", category:"NodeJS", level:"Intermediate", language:"English", priceType:"Paid", features:["Quizzes"], img:"https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:10, title:"HTML5 Essentials", tag:"HTML", team:"Tanah Air Team", rating:4, students:1600, old:350, price:299, duration:"1-3", category:"HTML", level:"Beginner", language:"Espanol", priceType:"Paid", features:["Assignments"], img:"https://images.unsplash.com/photo-1522205408450-add114ad53fe?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:11, title:"UI/UX Design Masterclass", tag:"UI/UX", team:"Tanah Air Team", rating:5, students:2120, old:890, price:799, duration:"13+", category:"UI/UX", level:"Expert", language:"English", priceType:"Paid", features:["Certificate"], img:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1200&auto=format&fit=crop&dpr=1" },
  { id:12, title:"SQL Database Management", tag:"SQL", team:"Tanah Air Team", rating:4, students:1400, old:450, price:390, duration:"6-12", category:"SQL", level:"Intermediate", language:"English", priceType:"Paid", features:["Quizzes"], img:"https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80" }
];

let state = {
  filters: {
    rating: new Set(),
    duration: new Set(),
    category: new Set(),
    level: new Set(),
    language: new Set(),
    priceType: new Set(),
    feature: new Set()
  },
  sortByPopular: false,
  currentPage: 1,
  perPage: 6
};

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function applyFiltersAndRender() {
  let filtered = COURSES.filter(course => {
    for (const [key, set] of Object.entries(state.filters)) {
      if (set.size === 0) continue;
      if (key === 'rating') {

        let ok = false;
        for (let r of set) { if (course.rating >= Number(r)) { ok = true; break; } }
        if (!ok) return false;
      } else if (key === 'feature') {

        let ok = false;
        for (let f of set) { if (course.features.includes(f)) { ok = true; break; } }
        if (!ok) return false;
      } else if (key === 'priceType') {
        if (!set.has(course.priceType)) return false;
      } else {

        if (!set.has(course[key])) return false;
      }
    }
    return true;
  });


  if (state.sortByPopular) {
    filtered.sort((a,b) => b.students - a.students);
  } else {

    filtered.sort((a,b) => a.id - b.id);
  }


  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / state.perPage));
  if (state.currentPage > totalPages) state.currentPage = totalPages;

  const start = (state.currentPage - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);


  const grid = $('#cardsGrid');
  grid.innerHTML = '';
  pageItems.forEach(c => {
    const stars = '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating);
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition';
    card.innerHTML = `
      <img src="${c.img}" alt="${escapeHtml(c.title)}" class="h-40 w-full object-cover">
      <div class="p-5">
        <span class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium inline-block">${c.tag}</span>
        <h3 class="text-lg font-semibold mt-3 text-gray-800">${escapeHtml(c.title)}</h3>
        <p class="text-pink-500 text-sm font-semibold mt-1">${escapeHtml(c.team)}</p>
        <div class="flex items-center gap-2 text-yellow-400 text-sm mt-1">${stars} <span class="text-gray-500 text-xs">(${c.students})</span></div>
        <div class="flex items-center gap-2 mt-3">
          <span class="line-through text-gray-400 text-sm">$${c.old}</span>
          <span class="text-lg font-bold text-gray-800">$${c.price}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  renderPagination(totalPages);
}


function renderPagination(totalPages) {
  const pagination = $('#pagination');
  pagination.innerHTML = '';
  for (let i=1;i<=totalPages;i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = `w-8 h-8 rounded-full ${i===state.currentPage ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white'}`;
    btn.addEventListener('click', () => {
      state.currentPage = i;
      applyFiltersAndRender();
      scrollToTopGrid();
    });
    pagination.appendChild(btn);
  }


}


function bindFilters() {

  $$('.section-toggle').forEach(btn => {
    const body = btn.parentElement.querySelector('.section-body');

    if (body) body.classList.add('hidden');
    btn.addEventListener('click', () => {
      if (!body) return;
      body.classList.toggle('hidden');
      const chev = btn.querySelector('.chev') || btn.querySelector('span:last-child');
      if (chev) chev.textContent = body.classList.contains('hidden') ? '⌄' : '⌃';
    });
  });


  $$('.filter-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const key = chk.dataset.filter;
      const val = chk.value;
      const set = state.filters[key];
      if (chk.checked) set.add(val);
      else set.delete(val);

      state.currentPage = 1;
      applyFiltersAndRender();
    });
  });


  $('#prevBtn').addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      applyFiltersAndRender();
      scrollToTopGrid();
    }
  });
  $('#nextBtn').addEventListener('click', () => {
    const filteredCount = COURSES.filter(c => {
      for (const [k,set] of Object.entries(state.filters)) {
        if (set.size===0) continue;
        if (k==='rating') {
          let ok=false; for (let r of set) if (c.rating >= Number(r)) { ok=true; break; } if(!ok) return false;
        } else if (k==='feature') {
          let ok=false; for (let f of set) if (c.features.includes(f)) { ok=true; break; } if(!ok) return false;
        } else if (k==='priceType') {
          if (!set.has(c.priceType)) return false;
        } else {
          if (!set.has(c[k])) return false;
        }
      }
      return true;
    }).length;
    const totalPages = Math.max(1, Math.ceil(filteredCount / state.perPage));
    if (state.currentPage < totalPages) {
      state.currentPage++;
      applyFiltersAndRender();
      scrollToTopGrid();
    }
  });


  $('#sortBtn').addEventListener('click', () => {
    state.sortByPopular = !state.sortByPopular;
    $('#sortBtn').textContent = state.sortByPopular ? 'Default order' : 'Most Popular';
    state.currentPage = 1;
    applyFiltersAndRender();
  });


  $('#mobileFilterOpen')?.addEventListener('click', () => {
    $('#sidebar').classList.toggle('fixed');
    $('#sidebar').classList.toggle('left-0');
    $('#sidebar').classList.toggle('top-0');
    $('#sidebar').classList.toggle('z-50');
    $('#sidebar').classList.toggle('w-full');
    $('#sidebar').classList.toggle('h-screen');
    $('#sidebar').classList.toggle('bg-white');

    if ($('#sidebar').classList.contains('fixed')) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  });

  $('#mobileFilterClose')?.addEventListener('click', () => {
    $('#sidebar').classList.remove('fixed','left-0','top-0','z-50','w-full','h-screen');
    document.body.classList.remove('overflow-hidden');
  });


  window.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
      const num = Number(e.key);
      const totalPages = Math.ceil(COURSES.length / state.perPage);
      if (num <= totalPages) {
        state.currentPage = num;
        applyFiltersAndRender();
      }
    }
  });
}


function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
function scrollToTopGrid() {
  const el = document.getElementById('cardsGrid');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', () => {
  bindFilters();
  applyFiltersAndRender();
});