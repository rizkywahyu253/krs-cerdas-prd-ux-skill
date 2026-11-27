# KRS Cerdas — PRD Only + UX Skill

Prototype pemrograman KRS untuk mahasiswa aktif Universitas Muhammadiyah Malang. Repo ini berisi PRD, aplikasi web, UX Skill yang bisa dipakai sebagai panduan kerja, dan `agent.md` untuk konteks agen pengembang.

## Latar belakang dan bukti
Worksheet UX Detective mengidentifikasi bentrok jadwal, penjurusan yang tidak jelas, jadwal yang perlu diurutkan manual, jam “ke-X” yang sulit dipahami, serta keterbatasan metode pembayaran. Ruang lingkup prototype ini berfokus pada pemilihan kelas dan pencegahan bentrok. Design Challenge terpilih adalah memberi indikator visual bentrok ketika mahasiswa memilih kelas. Tiga wawancara mahasiswa mendukung adanya masalah bentrok yang terlambat disadari, kebutuhan label penjurusan, dan proses pindah kelas yang manual. Temuan ini bersifat kualitatif dari sampel kecil.

## PRD
### Problem statement
Mahasiswa aktif UMM membutuhkan sistem pemilihan kelas yang mendeteksi dan menandai jadwal berbenturan secara langsung karena bentrok sering diketahui di akhir proses ketika kuota alternatif dapat habis dan pemeriksaan jadwal masih manual.

### Sasaran
- Menampilkan bentrok sebelum pengguna memilih kelas.
- Membantu pengguna mengenali penjurusan dan waktu kelas tanpa berpindah ke sumber lain.
- Memperlihatkan pilihan kelas yang masih tersedia dan ringkasan jadwal mingguan.

### Pengguna utama
Mahasiswa aktif UMM yang sedang menyusun KRS, termasuk pengguna ponsel di masa pemilihan kelas dengan kuota terbatas.

### Kebutuhan produk / acceptance criteria
1. Bandingkan hari dan rentang waktu kelas kandidat dengan seluruh kelas terpilih.
2. Tandai kelas bentrok dengan indikator visual, teks alasan, dan kode/nama kelas yang menjadi penyebab; tombol kelas tersebut tidak dapat dipilih.
3. Tampilkan label penjurusan, waktu aktual, lokasi, pengajar, dan kuota contoh di daftar kelas.
4. Perbarui total SKS dan ringkasan jadwal saat kelas ditambahkan/dihapus.
5. Sarankan kelas valid pada mata kuliah yang sama ketika tersedia.
6. Pastikan alur inti bekerja pada tampilan ponsel.

### Prioritas
Must: indikator bentrok real-time (UX-01), alternatif kelas yang tersedia (UX-04). Should: penanda penjurusan (UX-02), waktu aktual (UX-03), jadwal terurut (UX-05). Could: alur pengajuan pindah kelas (UX-06), yang bergantung pada kebijakan kampus.

### Bukan cakupan MVP
Integrasi My UMM, login, data akademik atau kuota real-time, pembayaran, persetujuan KRS, dan pengajuan pindah kelas. Prototype memakai data contoh; jangan menganggapnya sebagai data kelas aktual.

### Metrik/usulan validasi
Usulan target: pengguna mengenali konflik dalam ≤3 detik tanpa catatan manual. Ini target pengujian, bukan hasil yang sudah diukur. Uji pemilihan kelas, pencarian alternatif, serta pemahaman jadwal di ponsel.

## UX Skill
Panduan rinci untuk alur, interaksi, aksesibilitas, evidence, dan checklist review ada di [`ux-skill/SKILL.md`](ux-skill/SKILL.md).

## Menjalankan web
```bash
cd apps/web
npm install
npm run dev
```

Build produksi: `npm run build`. Deploy disiapkan melalui GitHub Pages Actions setelah repository di-push dan Pages diatur ke GitHub Actions.

## Struktur
- `apps/web`: prototype pemilihan kelas berbasis Vite.
- `ux-skill/SKILL.md`: panduan UX domain untuk project.
- `agent.md`: konteks dan batasan untuk coding agent.
- `CHANGELOG.md`: riwayat perubahan.
- `.github/workflows/deploy.yml`: workflow deployment GitHub Pages.
