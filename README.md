# TebakBaku - Kuis Kata Baku Bahasa Indonesia

**TebakBaku** adalah aplikasi kuis interaktif yang menguji pengetahuan pengguna tentang kata-kata baku dalam Bahasa Indonesia.  
Pengguna akan diberikan kata dan diminta menebak apakah kata tersebut merupakan kata baku atau tidak.

## ✨ Fitur

- **Kuis interaktif** berbasis kata baku dan tidak baku
- **Dua mode tema:** Gelap (dark) dan Terang (light), dengan toggle theme berbasis [next-themes](https://github.com/pacocoursey/next-themes)
- **Sound effect**: Respons suara jika jawaban benar atau salah, dengan opsi untuk mematikan suara
- **Tombol Reset** untuk memulai kuis dari awal
- **Streak**: Hitung jawaban benar berturut-turut, dengan efek confetti setiap kelipatan 5 streak
- **Toast notification** (dengan [sonner](https://sonner.emilkowal.ski/)):
  - Notifikasi saat reset, toggle suara, dan saat menjawab benar/salah
- **Responsive design**: Nyaman digunakan di desktop maupun mobile
- **UI modern**: Tampilan lebih lebar, tombol dan teks besar, mudah dibaca
- **Aksesibilitas**: Navigasi mudah, kontras warna baik
- **Open source**: Kode dapat diakses di [GitHub](https://github.com/ReintB/TebakBaku)

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repositori

```bash
git clone https://github.com/ReintB/TebakBaku.git
cd TebakBaku
```

### 2. Instal Dependensi

```bash
npm install
```

### 3. Jalankan Proyek

```bash
npm run dev
```

### 4. Akses di Browser

Buka browser dan akses:
```
http://localhost:3000
```

## 📦 Sumber Data

Daftar kata baku dan tidak baku dalam proyek ini bersumber dari file JSON buatan @lantip yang dapat diakses di repositori berikut:  
https://github.com/lantip/baku-tidak-baku

Terima kasih kepada @lantip atas kontribusinya!

## 🔗 Tautan Penting

- Demo: [tebakbaku.vercel.app](https://tebakbaku.vercel.app)
- Repo: [github.com/ReintB/TebakBaku](https://github.com/ReintB/TebakBaku)

## 📝 Lisensi

MIT License
