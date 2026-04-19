<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { 
    ClipboardList, 
    FileText, 
    SearchCheck, 
    FileSpreadsheet, 
    CreditCard, 
    MapPin, 
    Award,
    Utensils,
    Store,
    Beef,
    Hotel,
    Palmtree,
    MessageCircle
  } from "lucide-svelte";

  const steps = [
    {
      id: 1,
      title: "Pendaftaran",
      desc: "Pemilik usaha menghubungi CP Halal IMA untuk melakukan pendaftaran.",
      icon: MessageCircle
    },
    {
      id: 2,
      title: "Mengisi dokumen pendaftaran",
      desc: "Mengisi formulir dan dokumen persyaratan yang diperlukan.",
      icon: FileText
    },
    {
      id: 3,
      title: "Pemeriksaan dokumen",
      desc: "Dokumen yang telah diisi akan diperiksa lebih lanjut oleh tim Halal IMA.",
      icon: SearchCheck
    },
    {
      id: 4,
      title: "Penerbitan Invoice",
      desc: "Setelah dokumen disetujui, Tim Halal IMA akan menerbitkan invoice.",
      icon: FileSpreadsheet
    },
    {
      id: 5,
      title: "Pembayaran",
      desc: "Melakukan pembayaran sesuai dengan invoice yang diterbitkan.",
      icon: CreditCard
    },
    {
      id: 6,
      title: "Pemeriksaan Lapangan",
      desc: "Audit, inspeksi, dan validasi dokumen, produk, serta alur produksi di lokasi usaha.",
      icon: MapPin
    },
    {
      id: 7,
      title: "Penerbitan Lisensi",
      desc: "Lisensi halal diterbitkan dan dikirim langsung ke alamat pemilik usaha.",
      icon: Award
    }
  ];

  const scope = [
    { title: "Warung Makan", icon: Utensils },
    { title: "Restoran", icon: Store },
    { title: "Supplier Daging", icon: Beef },
    { title: "Hotel", icon: Hotel },
    { title: "Tempat Wisata", icon: Palmtree }
  ];
</script>

<svelte:head>
  <title>Prosedur Sertifikasi - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto px-4 py-16 max-w-5xl">
  <!-- Header -->
  <div class="text-center mb-20">
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Alur Lisensi Halal IMA</h1>
    <p class="text-xl text-muted-foreground">Proses transparan dan efisien untuk mendapatkan sertifikasi Halal Anda di Taiwan.</p>
  </div>

  <!-- Timeline -->
  <div class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent sm:before:mx-auto sm:before:translate-x-0 pb-24">
    {#each steps as step, i}
      <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
        <!-- Icon/Number -->
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background shadow flex-order-1 md:absolute md:left-1/2 md:-ml-5">
          <span class="text-sm font-bold text-primary">{step.id}</span>
        </div>
        <!-- Card -->
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 p-4 rounded-xl border bg-card/50 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center gap-3 mb-2">
            <step.icon class="h-5 w-5 text-primary" />
            <h3 class="font-bold text-lg">{step.title}</h3>
          </div>
          <p class="text-muted-foreground">{step.desc}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Ruang Lingkup Section -->
  <div class="mb-24 pt-12">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">Ruang Lingkup</h2>
      <p class="text-muted-foreground">Lisensi Halal IMA mencakup berbagai jenis usaha di seluruh Taiwan.</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      {#each scope as item}
        <div class="flex flex-col items-center justify-center p-6 rounded-2xl border bg-card hover:bg-primary/5 transition-colors text-center group">
          <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <item.icon class="h-6 w-6 text-primary" />
          </div>
          <span class="font-semibold">{item.title}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Pricing Card -->
  <Card.Root class="relative overflow-hidden border-primary/20 bg-primary/5">
    <div class="absolute top-0 right-0 p-4">
      <span class="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Promo Terbatas</span>
    </div>
    <Card.Header class="text-center pt-10">
      <Card.Title class="text-2xl">Tarif Layanan</Card.Title>
      <Card.Description>Harga spesial untuk 10 pelanggan pertama</Card.Description>
    </Card.Header>
    <Card.Content class="text-center">
      <div class="mb-6">
        <span class="text-5xl font-extrabold text-primary">NTD 5.000</span>
        <span class="text-muted-foreground">/ tahun</span>
      </div>
      <p class="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
        Promo berlaku untuk seluruh Taiwan. (Di luar wilayah Taipei dan New Taipei akan dikenakan biaya transportasi tambahan).
      </p>
      <Button href="/contact" size="lg" class="w-full sm:w-auto font-bold px-12">
        Daftar Sekarang
      </Button>
    </Card.Content>
  </Card.Root>

</div>
