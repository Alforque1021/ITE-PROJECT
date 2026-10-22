// Feature 1: Dark/light mode
const body = document.body, themeBtn = document.getElementById('themeBtn');
function setTheme(dark){ body.classList.toggle('dark', dark); themeBtn.textContent = dark ? 'Light mode' : 'Dark mode'; try{localStorage.setItem('dark', dark);}catch(e){} }
let saved = false; try{ saved = localStorage.getItem('dark') === 'true'; }catch(e){}
setTheme(saved);
themeBtn.addEventListener('click', () => setTheme(!body.classList.contains('dark')));

// Feature 2: Show/Hide synopsis
document.querySelectorAll('.toggle-syn').forEach(btn => {
  btn.addEventListener('click', () => {
    const syn = btn.closest('.card-body, .story-head').querySelector('.syn');
    syn.hidden = !syn.hidden;
    btn.textContent = syn.hidden ? 'Show synopsis' : 'Hide synopsis';
  });
});

// Feature 3: Like button
document.querySelectorAll('.like').forEach(btn => {
  btn.addEventListener('click', () => {
    const count = btn.querySelector('span'), liked = btn.classList.toggle('liked');
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
    btn.setAttribute('aria-pressed', liked);
  });
});

// Feature 4: Genre filter
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active')); chip.classList.add('active');
  const f = chip.dataset.filter;
  document.querySelectorAll('.card').forEach(card => { card.style.display = (f === 'all' || card.dataset.genre === f) ? '' : 'none'; });
}));

// Feature 5: Reading progress bar
const bar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
});
