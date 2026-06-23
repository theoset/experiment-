// ── Handled · Shared localStorage store ──────────────────────────────────────

const PRICING = {
  'House Cleaning':     { type:'options', label:'House size',    options:{'Single Room':120,'1 Bedroom':180,'2 Bedroom':250,'3 Bedroom':350,'4 Bedroom+':450} },
  'Gardening':          { type:'options', label:'Garden size',   options:{'Small (townhouse/front)':120,'Medium (standard residential)':220,'Large (large property)':350,'Extra Large (plot/estate)':500} },
  'Moving Assistance':  { type:'options', label:'Move type',     options:{'Single Item':150,'Room Move':300,'Small House':600,'Large House':1000} },
  'Handyman':           { type:'options', label:'Job type',      options:{'Simple Fix':120,'Furniture Assembly':180,'TV Mounting':250,'General Repairs (per hr)':150} },
  'Plumbing':           { type:'options', label:'Job type',      options:{'Leaking Tap':150,'Blocked Drain':220,'Toilet Repair':250,'Pipe Repair':350} },
  'Delivery':           { type:'options', label:'Package size',  options:{'Small Package':50,'Medium Package':80,'Large Package':120,'Heavy Item':220}, noTransport:true },
  'Miscellaneous':      { type:'misc',    minPrice:150 },
};
const TFEE = { inside:30, outside:50 };

const store = {
  getUsers:    ()  => { try { return JSON.parse(localStorage.getItem('hd_users')||'{}'); } catch{ return {}; } },
  saveUsers:   (u) => localStorage.setItem('hd_users', JSON.stringify(u)),
  getRequests: ()  => { try { return JSON.parse(localStorage.getItem('hd_requests')||'[]'); } catch{ return []; } },
  saveRequests:(r) => localStorage.setItem('hd_requests', JSON.stringify(r)),
  addNotif:    (title,msg) => {
    const n = JSON.parse(localStorage.getItem('hd_notifs')||'[]');
    n.unshift({ title, msg, time: new Date().toLocaleTimeString() });
    localStorage.setItem('hd_notifs', JSON.stringify(n.slice(0,50)));
  },
};

// ── Toast ──────────────────────────────────────────────────────────────────────
function toast(text, icon='✓') {
  let c = document.getElementById('toast-container');
  if (!c) { c = document.createElement('div'); c.id = 'toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = 'hd-toast';
  t.innerHTML = `<span>${icon}</span> ${text}`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── Navbar active link ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.hd-nav-link, .hd-mob-link').forEach(el => {
    const href = el.getAttribute('href') || '';
    if (href === page || (page === 'index.html' && href === 'index.html') || (page === '' && href === 'index.html')) {
      el.classList.add('active');
    }
  });
  // Hamburger
  const hb = document.getElementById('hd-hamburger');
  const mm = document.getElementById('hd-mobile-menu');
  if (hb && mm) hb.addEventListener('click', () => mm.classList.toggle('open'));
});
