
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const darkToggle = document.getElementById('darkToggle');
const backTop = document.getElementById('backTop');
const navbar = document.getElementById('navbar');


dropdownBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('hidden');
});


document.addEventListener('click', (e) => {
  if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
    }
  }
});


menuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


darkToggle?.addEventListener('click', () => {
  const html = document.documentElement;
  html.classList.toggle('dark');

  if (html.classList.contains('dark')) localStorage.setItem('theme','dark');
  else localStorage.removeItem('theme');
});


(function applySavedTheme(){
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
  } catch(e){}
})();


window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  if (sc > 80) {
    navbar.classList.add('shadow-2xl');
  } else {
    navbar.classList.remove('shadow-2xl');
  }

  if (sc > 250) {
    backTop.classList.remove('hidden');
  } else {
    backTop.classList.add('hidden');
  }
});


backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dropdownMenu?.classList.add('hidden');
    mobileMenu?.classList.add('hidden');
  }
});
const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.course-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      tabs.forEach(t => t.classList.remove('active-tab', 'bg-gradient-to-r', 'from-pink-600', 'to-purple-600', 'text-white', 'shadow-lg'));
      tab.classList.add('active-tab', 'bg-gradient-to-r', 'from-pink-600', 'to-purple-600', 'text-white', 'shadow-lg');

      const category = tab.dataset.category;
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  const counters = document.querySelectorAll('.counter');
  const speed = 2000;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 150 );
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.7 });

  observer.observe(document.querySelector('.counter'));
  