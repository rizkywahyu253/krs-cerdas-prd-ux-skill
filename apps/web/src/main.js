import './style.css';

const courseData = [
  { id: 'IF301-A', name: 'Interaksi Manusia dan Komputer', track: 'RPL', day: 'Senin', start: 8, end: 10, room: 'GKB IV · 3.4', lecturer: 'Dwi Cahyono, S.Kom., M.Sc.', seats: 8, tint: 'mint' },
  { id: 'IF301-B', name: 'Interaksi Manusia dan Komputer', track: 'RPL', day: 'Selasa', start: 8, end: 10, room: 'GKB IV · 3.4', lecturer: 'Dwi Cahyono, S.Kom., M.Sc.', seats: 4, tint: 'blue' },
  { id: 'IF302-A', name: 'Rekayasa Kebutuhan Perangkat Lunak', track: 'RPL', day: 'Senin', start: 9, end: 11, room: 'GKB IV · 2.1', lecturer: 'Nur Hayatin, S.ST., M.Kom.', seats: 3, tint: 'rose' },
  { id: 'IF303-A', name: 'Pemrograman Web Lanjut', track: 'RPL', day: 'Selasa', start: 10, end: 12, room: 'Lab Informatika · 1', lecturer: 'Eko Budi Cahyono, S.Kom., M.Kom.', seats: 5, tint: 'violet' },
  { id: 'IF304-A', name: 'Kecerdasan Buatan', track: 'Data Science', day: 'Rabu', start: 8, end: 10, room: 'GKB III · 4.2', lecturer: 'Ismi Kurniawan, S.Pd., M.Kom.', seats: 12, tint: 'amber' },
  { id: 'IF305-A', name: 'Analisis dan Desain Sistem', track: 'RPL', day: 'Senin', start: 13, end: 15, room: 'GKB IV · 3.2', lecturer: 'Rizky Tri Yunanto, S.Kom., M.Kom.', seats: 6, tint: 'teal' },
  { id: 'IF306-A', name: 'Basis Data Terdistribusi', track: 'Data Science', day: 'Kamis', start: 8, end: 10, room: 'GKB III · 2.3', lecturer: 'Siti Mukaromah, S.Kom., M.Kom.', seats: 2, tint: 'amber' },
];
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const labels = ['Beranda', 'Informasi KRS', 'Pilih kelas', 'Tinjau jadwal', 'Hasil simulasi'];
const hashToScreen = { '#beranda': 0, '#informasi': 1, '#pilih-kelas': 2, '#tinjau-jadwal': 3, '#hasil': 4 };
const screenToHash = ['#beranda', '#informasi', '#pilih-kelas', '#tinjau-jadwal', '#hasil'];
const state = { screen: hashToScreen[location.hash] ?? 0, selected: new Set(), track: 'Semua', query: '', toast: '' };

const selectedCourses = () => [...state.selected].map(id => courseData.find(course => course.id === id)).filter(Boolean);
const overlaps = (a, b) => a.id !== b.id && a.day === b.day && a.start < b.end && b.start < a.end;
const conflictsFor = course => selectedCourses().filter(selected => overlaps(selected, course));
const clock = hour => `${String(hour).padStart(2, '0')}.00`;
const weeklyHours = () => selectedCourses().reduce((sum, course) => sum + course.end - course.start, 0);

function navButton(index, icon) {
  const active = state.screen === index;
  return `<button class="nav-item ${active ? 'active' : ''}" data-screen="${index}" aria-label="${labels[index]}" ${active ? 'aria-current="page"' : ''}><span class="nav-icon">${icon}</span><span>${labels[index]}</span>${active ? '<span class="nav-dot"></span>' : ''}</button>`;
}

function header() {
  return `<header class="topbar"><div class="crumb">Akademik <span>/</span> <b>${labels[state.screen]}</b></div><div class="top-actions"><span class="term">SEMESTER GANJIL 2026/2027</span><div class="avatar">M</div></div></header>`;
}

function progress() {
  return `<div class="progress" aria-label="Progres pemrograman KRS">${labels.slice(1).map((label, i) => {
    const current = state.screen === i + 1;
    const passed = state.screen > i + 1;
    return `${i ? '<i class="progress-line"></i>' : ''}<div class="progress-step ${current ? 'current' : ''} ${passed ? 'done' : ''}"><span>${passed ? '✓' : i + 1}</span><b>${label}</b></div>`;
  }).join('')}</div>`;
}

function screenHome() {
  return `<div class="eyebrow">PORTAL AKADEMIK · 2026/2027</div><h1>Selamat datang,<br><span>Mahasiswa UMM.</span></h1><p class="lead">Rencanakan mata kuliah semester ini dengan lebih tenang. Jadwal bentrok ditandai sebelum kelas dipilih.</p>
    <div class="home-grid"><section class="welcome-card"><div class="welcome-top"><div><div class="section-kicker">PEMROGRAMAN KRS</div><h2>Semester ganjil<br>2026/2027</h2></div><div class="term-icon">▦</div></div><p>Periode pemilihan kelas berlangsung sampai <b>29 November 2026</b>.</p><button class="primary" data-goto="1">Mulai susun KRS <span>→</span></button><div class="welcome-note">◷ &nbsp; Sekitar 5 menit untuk menyelesaikan simulasi</div></section>
    <aside class="home-side"><div class="side-card"><div class="side-card-head"><b>Persiapan KRS</b><span class="complete-tag">2 dari 3</span></div><div class="check-row"><span>✓</span><div><b>Semester aktif</b><small>Ganjil 2026/2027</small></div></div><div class="check-row"><span>✓</span><div><b>Batas SKS</b><small>Maksimal 24 SKS</small></div></div><div class="check-row pending"><span>3</span><div><b>Pilih kelas</b><small>Belum dimulai</small></div></div></div><div class="hint-card"><span>✳</span><p><b>Tips memilih kelas</b><br>Perhatikan hari, jam kuliah, dan penjurusan sebelum menambahkan kelas.</p></div></aside></div>
    <div class="home-footer"><div><b>Sudah tahu mata kuliah yang akan diambil?</b><span>Anda dapat meninjau panduan KRS sebelum mulai memilih.</span></div><button class="text-button" data-goto="1">Lihat informasi KRS <span>→</span></button></div>`;
}

function screenInfo() {
  return `${progress()}<div class="page-title"><div><div class="eyebrow">LANGKAH 1 DARI 4</div><h1>Informasi KRS</h1><p class="lead">Pastikan ketentuan semester sebelum memilih kelas.</p></div><span class="step-badge">01 / 04</span></div>
    <div class="info-grid"><section class="info-card"><div class="section-kicker">SEMESTER BERJALAN</div><h2>Ganjil 2026/2027</h2><div class="info-rule"></div><div class="info-pair"><span>Periode pemrograman</span><b>23–29 November 2026</b></div><div class="info-pair"><span>Batas pengambilan</span><b>24 SKS</b></div><div class="info-pair"><span>Jumlah mata kuliah</span><b>Sesuai rencana studi</b></div></section>
    <section class="guide-card"><div class="guide-icon">✳</div><h2>Panduan singkat</h2><ol><li>Pilih kelas dengan penjurusan yang sesuai.</li><li>Periksa waktu aktual dan kuota tersisa.</li><li>Kelas yang bertabrakan akan ditandai otomatis.</li><li>Tinjau kembali jadwal sebelum menyelesaikan simulasi.</li></ol></section></div>
    <div class="notice"><span>ⓘ</span><div><b>Informasi prototype</b><p>Semester, periode, dan kuota pada halaman ini adalah data contoh untuk simulasi.</p></div></div>
    <div class="step-actions"><button class="secondary" data-goto="0">← Kembali</button><button class="primary" data-goto="2">Pilih mata kuliah <span>→</span></button></div>`;
}

function courseCard(course) {
  const clashes = conflictsFor(course);
  const chosen = state.selected.has(course.id);
  const blocked = clashes.length > 0;
  return `<article class="course-card ${chosen ? 'chosen' : ''} ${blocked ? 'blocked' : ''}"><div class="course-accent ${course.tint}"></div><div class="course-content"><div class="course-title-row"><div><div class="course-code">${course.id} <span>·</span> 3 SKS</div><h3>${course.name}</h3></div><span class="track-tag">${course.track}</span></div><div class="meta-row"><span>◷ &nbsp;${course.day}, ${clock(course.start)}–${clock(course.end)}</span><span>⌖ &nbsp;${course.room}</span></div><div class="meta-row lower"><span>♙ &nbsp;${course.lecturer}</span><span class="seat ${course.seats <= 3 ? 'low' : ''}"><i></i>${course.seats} kursi tersisa</span></div>${blocked ? `<div id="conflict-${course.id}" class="conflict-note" role="status"><span>!</span> Bentrok dengan <b>${clashes.map(item => item.id).join(', ')}</b> yang sudah dipilih.</div>` : ''}</div><button class="select-btn ${chosen ? 'added' : ''}" data-select="${course.id}" ${blocked ? 'disabled aria-describedby="conflict-${course.id}"' : ''}>${chosen ? '✓ Dipilih' : blocked ? 'Bentrok' : '+ Pilih'}</button></article>`;
}

function screenSelect() {
  const visible = courseData.filter(course => (state.track === 'Semua' || course.track === state.track) && `${course.name} ${course.id} ${course.track}`.toLowerCase().includes(state.query.toLowerCase()));
  const picks = selectedCourses();
  const creditCount = picks.length * 3;
  return `${progress()}<div class="page-title"><div><div class="eyebrow">LANGKAH 2 DARI 4</div><h1>Pilih kelas</h1><p class="lead">Jadwal yang bertabrakan akan terdeteksi saat kamu memilih.</p></div><span class="step-badge">${creditCount} / 24 SKS</span></div>
    <div class="select-layout"><section class="course-panel"><div class="panel-heading"><div><h2>Mata kuliah tersedia</h2><p>${visible.length} pilihan kelas · 3 SKS per mata kuliah</p></div><span class="sample-tag">DATA CONTOH</span></div><label class="search"><span>⌕</span><input id="course-search" placeholder="Cari nama atau kode mata kuliah" value="${state.query}"/><button type="button" class="clear-search" aria-label="Hapus pencarian" data-clear-search>×</button></label><div class="filters">${['Semua', 'RPL', 'Data Science'].map(track => `<button class="filter ${state.track === track ? 'selected' : ''}" data-track="${track}">${track}</button>`).join('')}</div><div class="result-count">DAFTAR KELAS <b>${visible.length}</b></div><div class="course-list">${visible.map(courseCard).join('') || '<div class="empty">Tidak ditemukan kelas. Coba kata kunci lain.</div>'}</div></section>
    <aside class="selection-summary"><div class="section-kicker">RINGKASAN PILIHAN</div><h2>Jadwal pilihan</h2><div class="summary-total"><span>Jumlah kelas</span><b>${picks.length}<small> kelas</small></b><span>Total SKS</span><b>${creditCount}<small> SKS</small></b></div>${picks.length ? `<div class="selected-list">${picks.map(course => `<div class="selected-item ${course.tint}"><div><b>${course.name}</b><small>${course.id} · ${course.day}, ${clock(course.start)}–${clock(course.end)}</small></div><button data-remove="${course.id}" aria-label="Hapus ${course.name}">×</button></div>`).join('')}</div><div class="safe-status"><span>✓</span><div><b>Belum ada jadwal bentrok</b><small>Pilihan diperiksa otomatis</small></div></div>` : '<div class="empty-summary"><span>▦</span><b>Belum ada kelas dipilih</b><p>Kelas yang kamu pilih akan muncul di sini.</p></div>'}<button class="primary full" data-goto="3" ${picks.length ? '' : 'disabled'}>Tinjau jadwal <span>→</span></button></aside></div>
    <div class="step-actions"><button class="secondary" data-goto="1">← Kembali</button><span class="helper-text">${picks.length ? 'Kelas sudah dipilih. Tinjau jadwal untuk melanjutkan.' : 'Pilih setidaknya satu kelas untuk melanjutkan.'}</span></div>`;
}

function screenReview() {
  const picks = selectedCourses().sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day) || a.start - b.start);
  const creditCount = picks.length * 3;
  return `${progress()}<div class="page-title"><div><div class="eyebrow">LANGKAH 3 DARI 4</div><h1>Tinjau jadwal</h1><p class="lead">Periksa pilihan kelas dan waktu kuliah sebelum menyelesaikan simulasi.</p></div><span class="step-badge">${creditCount} SKS</span></div>
    <div class="review-layout"><section class="week-card"><div class="week-head"><div><h2>Jadwal mingguan</h2><p>Semester ganjil 2026/2027</p></div><span class="safe-pill">✓ Tidak bentrok</span></div><div class="week-grid">${days.map(day => { const list = picks.filter(course => course.day === day); return `<div class="week-day"><b>${day}</b>${list.length ? list.map(course => `<div class="week-course ${course.tint}"><strong>${clock(course.start)}–${clock(course.end)}</strong><span>${course.name}</span><small>${course.id}</small></div>`).join('') : '<div class="no-class">Belum ada kelas</div>'}</div>`; }).join('')}</div></section>
    <aside class="review-card"><div class="section-kicker">RINGKASAN KRS</div><h2>${picks.length} kelas dipilih</h2><p class="review-note">Semua waktu sudah dibandingkan. Tidak ditemukan jadwal yang bertabrakan.</p><div class="info-rule"></div><div class="info-pair"><span>Total beban studi</span><b>${creditCount} SKS</b></div><div class="info-pair"><span>Perkiraan pertemuan</span><b>${weeklyHours()} jam / minggu</b></div><div class="info-pair"><span>Status pemeriksaan</span><b class="success-text">✓ Aman</b></div><button class="primary full" data-goto="4">Selesaikan simulasi <span>→</span></button><button class="text-button full-text" data-goto="2">← Ubah pilihan kelas</button></aside></div>
    <div class="notice"><span>ⓘ</span><div><b>Simulasi, bukan pengajuan resmi</b><p>Menekan tombol selanjutnya tidak mengirim atau mengubah KRS di sistem kampus.</p></div></div>`;
}

function screenResult() {
  const picks = selectedCourses();
  const creditCount = picks.length * 3;
  return `<div class="result-screen"><div class="success-mark">✓</div><div class="eyebrow">SIMULASI SELESAI</div><h1>Jadwalmu sudah<br><span>siap ditinjau.</span></h1><p class="lead">Kamu berhasil menyusun pilihan kelas tanpa jadwal yang bertabrakan.</p><div class="result-card"><div><span>MATA KULIAH</span><b>${picks.length} kelas</b></div><div><span>TOTAL BEBAN</span><b>${creditCount} SKS</b></div><div><span>STATUS</span><b class="success-text">✓ Tidak bentrok</b></div></div><div class="result-disclaimer">Ini hanya hasil simulasi dengan data contoh. KRS resmi tetap perlu diproses melalui portal kampus.</div><button class="primary" data-goto="0">Kembali ke beranda <span>→</span></button><button class="text-button" data-goto="3">Lihat ringkasan jadwal</button></div>`;
}

const screens = [screenHome, screenInfo, screenSelect, screenReview, screenResult];

function go(index) {
  if (index < 0 || index >= screens.length) return;
  if (index === 3 && selectedCourses().length === 0) {
    state.toast = 'Pilih minimal satu kelas sebelum meninjau jadwal.';
    render();
    return;
  }
  if (index === 4 && selectedCourses().length === 0) {
    state.toast = 'Tambahkan kelas terlebih dahulu untuk menyelesaikan simulasi.';
    render();
    return;
  }
  state.screen = index;
  history.replaceState(null, '', screenToHash[index]);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  const body = screens[state.screen]();
  document.querySelector('#root').innerHTML = `<div class="app-shell"><aside class="sidebar"><div class="brand"><span class="brand-mark">u</span><div><b>myUMM</b><small>academic portal</small></div></div><div class="side-label">MENU AKADEMIK</div><nav>${navButton(0, '⌂')}${navButton(1, 'ⓘ')}${navButton(2, '▦')}${navButton(3, '◷')}${navButton(4, '✓')}</nav><div class="sidebar-bottom"><div class="help-card"><div class="help-icon">✳</div><b>Butuh bantuan?</b><p>Hubungi layanan akademik untuk pertanyaan seputar KRS.</p><button class="help-link" data-action="help">Pusat bantuan <span>↗</span></button></div><div class="profile"><div class="avatar profile-avatar">M</div><div><b>Mahasiswa UMM</b><small>Semester 5</small></div></div></div></aside><main class="main">${header()}<section class="content ${state.screen === 4 ? 'result-content' : ''}">${body}<footer class="footnote">ⓘ &nbsp;Prototype interaktif · seluruh data kelas merupakan contoh</footer></section></main>${state.toast ? `<div class="toast" role="status">${state.toast}</div>` : ''}</div>`;
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => go(Number(button.dataset.screen))));
  document.querySelectorAll('[data-goto]').forEach(button => button.addEventListener('click', () => go(Number(button.dataset.goto))));
  document.querySelectorAll('[data-track]').forEach(button => button.addEventListener('click', () => { state.track = button.dataset.track; render(); }));
  document.querySelectorAll('[data-select]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.select;
    const course = courseData.find(item => item.id === id);
    if (!course) return;
    if (state.selected.has(id)) state.selected.delete(id);
    else if (conflictsFor(course).length === 0) state.selected.add(id);
    render();
  }));
  document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { state.selected.delete(button.dataset.remove); render(); }));
  const search = document.querySelector('#course-search');
  if (search) search.addEventListener('input', event => { state.query = event.target.value; const point = event.target.selectionStart; render(); const next = document.querySelector('#course-search'); next.focus(); next.setSelectionRange(point, point); });
  document.querySelector('[data-clear-search]')?.addEventListener('click', () => { state.query = ''; render(); });
  document.querySelector('[data-action="help"]')?.addEventListener('click', () => { state.toast = 'Pusat bantuan belum terhubung pada prototype.'; render(); setTimeout(() => { state.toast = ''; render(); }, 2500); });
}

window.addEventListener('hashchange', () => { if (hashToScreen[location.hash] !== undefined && hashToScreen[location.hash] !== state.screen) { state.screen = hashToScreen[location.hash]; render(); } });
render();
