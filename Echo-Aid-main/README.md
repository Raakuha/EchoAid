EchoAid 🌿
Platform kesehatan mental untuk mahasiswa dan pekerja muda Indonesia.

"Suarakan Isi Hati, Mulai Dari Sini."

EchoAid adalah website kesehatan mental yang dirancang berdasarkan data survei HCI dari Tim LB83 Binus University sebagai bagian dari komitmen terhadap SDG 3 — Kehidupan Sehat dan Sejahtera. Dibangun dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa TypeScript.

Fitur Utama
Halaman	URL	Deskripsi
Beranda	/	Hero section, statistik survei, overview fitur, CTA
Mood Check	/mood/	Pilih 5 level mood, tulis jurnal, lihat grafik 7 hari
Edukasi	/learn/	3 pilar edukasi dengan accordion interaktif
Darurat	/sos/	4 hotline 24 jam, panduan krisis, latihan pernapasan
Tombol SOS Melayang
Tombol darurat berwarna merah selalu tampil di pojok kanan bawah setiap halaman, dapat diklik untuk langsung menuju halaman Darurat.

Dark Mode
Toggle antara mode terang dan gelap. Pilihan tersimpan di localStorage.

Mood Tracker
Pilih mood dari 5 skala (Sangat Buruk → Sangat Baik)
Tulis jurnal harian opsional
Riwayat 7 hari disimpan di localStorage dan ditampilkan sebagai grafik area
Edukasi 3 Pilar
Pahami Kesehatan Mental — Definisi, mitos vs fakta, pentingnya berbicara
Strategi Menghadapi Tekanan — Grounding 5-4-3-2-1, triggers, digital detox
Mencari Bantuan Profesional — Kapan ke psikolog, perbedaan psikolog vs psikiater, opsi gratis BPJS
Halaman Darurat
Hotline 24 jam Indonesia (Into The Light, Yayasan Pulih, Kemenkes, RSJ Soeharto Heerdjan)
Nomor hotline dapat langsung ditekan untuk menelepon (tel: links)
Panduan 3 langkah saat krisis
Animasi pernapasan 4-7-8 interaktif
Teknologi
HTML5 + CSS3 + JavaScript (ES Modules)
Vite          — dev server & bundler
Chart.js      — grafik riwayat mood
Google Fonts  — Inter typeface

Tidak ada TypeScript. Tidak ada React. Tidak ada CSS framework. Semua dibangun dari nol dengan CSS custom properties dan vanilla JS.

Struktur Proyek
artifacts/echoaid-palette/
├── index.html          # Beranda
├── mood/
│   └── index.html      # Mood Tracker
├── learn/
│   └── index.html      # Edukasi
├── sos/
│   └── index.html      # Halaman Darurat
├── src/
│   ├── style.css       # Semua style (design system + halaman)
│   ├── app.js          # Navbar, dark mode, active link (dibagi semua halaman)
│   ├── mood.js         # Logika mood tracker + Chart.js
│   ├── learn.js        # Tab pilar + accordion
│   └── sos.js          # Animasi pernapasan 4-7-8
├── package.json
└── vite.config.js

Design System
Palet Warna
Peran	Nama	Hex
Primary	Healing Sage	#2E8B6F
Secondary	Calm Periwinkle	#5B72E8
Accent	Warm Amber	#F0A030
Danger	—	#dc2626
Semua warna didefinisikan sebagai CSS custom properties (:root untuk light mode, .dark untuk dark mode), sehingga dark mode cukup satu class toggle.

Aksesibilitas (WCAG 2.1 AA)
Skip link di setiap halaman
Semua tombol interaktif memiliki aria-label
Accordion menggunakan aria-expanded
Tabs menggunakan role="tab" dan aria-selected
Hotlines menggunakan role="listitem" dengan deskripsi lengkap
aria-live pada area sukses mood tracker
Menjalankan Secara Lokal
# Install dependensi
pnpm --filter @workspace/echoaid-palette install
# Jalankan dev server
pnpm --filter @workspace/echoaid-palette run dev

Dev server membutuhkan environment variables PORT dan BASE_PATH (diatur otomatis oleh workflow Replit).

Data Survei
Statistik yang ditampilkan berasal dari survei Tim LB83 Binus University:

62% responden sering merasa stres atau cemas, namun bingung mulai dari mana
58.6% tidak memahami fakta-fakta dasar seputar kesehatan mental
10% peningkatan kasus kesehatan mental di Asia Tenggara; 727.000 kematian global akibat krisis mental (2021)
Hotline Darurat Indonesia
Lembaga	Nomor	Layanan
Into The Light Indonesia	119 ext 8	Pencegahan bunuh diri
Yayasan Pulih	(021) 7884-2580	Konseling psikologis
Hotline Kemenkes	1500-454	Sehat Jiwa (gratis)
RSJ Soeharto Heerdjan	(021) 560-1114	IGD Psikiatri 24 jam
Tim
Tim HCI LB83 — Binus University Dibuat untuk tujuan edukasi sebagai bagian dari proyek Human-Computer Interaction (HCI) dengan fokus pada SDG 3: Good Health and Well-Being.
