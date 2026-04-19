# Halal IMA Taiwan

Platfom Sertifikasi Halal Resmi untuk wilayah Taiwan, dikelola oleh **International Madani Association (IMA)**.

Situs ini menyediakan sistem verifikasi database sertifikat halal secara publik dan memfasilitasi pendaftaran sertifikasi bagi pelaku usaha (Warung, Restoran, Supplier Daging, Hotel, Tempat Wisata) di Taiwan.

## Fitur Utama

- **Database Sertifikat**: Cari dan verifikasi status halal perusahaan secara real-time.
- **Prosedur Transparan**: Panduan langkah demi langkah untuk mendapatkan sertifikasi.
- **Tentang IMA**: Informasi sejarah dan legalitas IMA di bawah KDEI Taipei.
- **Dukungan Multi-Tema**: Mendukung mode Terang (Light) dan Gelap (Dark).

## Teknologi

- **Framework**: SvelteKit (Svelte 5)
- **Styling**: Tailwind CSS v4
- **Komponen**: Shadcn-Svelte
- **Database/Auth**: Supabase

## Persiapan Mandiri (Setup)

1. **Instalasi Dependensi**:

   ```sh
   npm install
   ```

2. **Konfigurasi Lingkungan**:
   Salin berkas `.env.example` menjadi `.env` dan isi dengan kredensial Supabase Anda.

   ```sh
   cp .env.example .env
   ```

3. **Menjalankan Dev Server**:
   ```sh
   npm run dev
   ```

## Variabel Lingkungan (.env)

| Kunci                    | Deskripsi                     |
| :----------------------- | :---------------------------- |
| `VITE_SUPABASE_URL`      | URL proyek Supabase Anda      |
| `VITE_SUPABASE_ANON_KEY` | Anon/Public key dari Supabase |

---

&copy; 2026 Halal IMA Taiwan. Berkolaborasi dengan Halal Formosa.
