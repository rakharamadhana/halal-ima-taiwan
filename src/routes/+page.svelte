<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
  <title>Halal IMA Taiwan - Badan Sertifikasi Halal Resmi</title>
  <meta name="description" content="Memastikan standar kepatuhan Halal tertinggi untuk produk, restoran, dan layanan di seluruh Formosa. Dipercaya secara global, diverifikasi secara lokal." />
</svelte:head>

<section class="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center space-y-8">
  <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
    Melayani Taiwan & Sekitarnya
  </div>
  
  <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-[55rem]">
    Mau Lisensi Halal? <br/>
    <span class="text-primary">Di Halal IMA aja!</span>
  </h1>
  
  <p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
    Membantu badan usaha di Taiwan mendapatkan lisensi Halal yang resmi, terpercaya, dan tercatat di KDEI Taipei.
  </p>
  
  <div class="flex flex-col sm:flex-row gap-4 mt-8">
    <Button href="/procedures" size="lg" class="px-8 text-base font-bold">
      Lihat Prosedur
    </Button>
    <Button href="/contact" variant="outline" size="lg" class="px-8 text-base font-bold">
      Kontak Kami
    </Button>
  </div>
</section>

<!-- Stats/Scope Section -->
<section class="container mx-auto px-4 py-16 bg-primary/5 rounded-3xl">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold mb-4">Ruang Lingkup Kami</h2>
    <p class="text-muted-foreground">Melayani berbagai sektor usaha di seluruh wilayah Taiwan</p>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
    {#each [
      { t: "Warung Makan", i: "Utensils" },
      { t: "Restoran", i: "Store" },
      { t: "Suplier Daging", i: "Beef" },
      { t: "Hotel", i: "Hotel" },
      { t: "Tempat Wisata", i: "Palmtree" }
    ] as item}
      <div class="flex flex-col items-center gap-2">
        <div class="text-primary font-bold">{item.t}</div>
      </div>
    {/each}
  </div>
</section>

<section class="container mx-auto px-4 py-24">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
    <div class="flex flex-col items-center space-y-3 p-6 rounded-lg border bg-card shadow-sm">
      <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h3 class="text-xl font-bold">Resmi di KDEI</h3>
      <p class="text-muted-foreground">Lisensi Halal IMA tercatat secara resmi di Kantor Dagang dan Ekonomi Indonesia.</p>
    </div>
    
    <div class="flex flex-col items-center space-y-3 p-6 rounded-lg border bg-card shadow-sm">
      <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <h3 class="text-xl font-bold">Harga Spesial</h3>
      <p class="text-muted-foreground">Hanya NTD 5.000/tahun untuk 10 pelanggan pertama di Taiwan.</p>
    </div>

    <div class="flex flex-col items-center space-y-3 p-6 rounded-lg border bg-card shadow-sm">
      <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
      </div>
      <h3 class="text-xl font-bold">Kolaborasi Strategis</h3>
      <p class="text-muted-foreground">Bekerja sama dengan aplikasi Halal Formosa untuk promosi bisnis Anda.</p>
    </div>
  </div>
</section>

<!-- Collaboration Section -->
<section class="container mx-auto px-4 py-16 border-t">
  <div class="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
    <div class="space-y-4 max-w-md">
      <h2 class="text-3xl font-bold">Go Digital dengan Halal Formosa</h2>
      <p class="text-muted-foreground">
        Usaha yang mendapatkan lisensi Halal IMA akan otomatis dipromosikan melalui aplikasi Halal Formosa, memudahkan jutaan muslim menemukan bisnis Anda.
      </p>
    </div>
    <div class="flex items-center gap-8 bg-card p-8 rounded-2xl border shadow-inner">
      <div class="text-2xl font-black italic text-primary">HALAL IMA</div>
      <div class="text-2xl font-bold text-muted-foreground">X</div>
      <div class="text-2xl font-black italic">HALAL FORMOSA</div>
    </div>
  </div>
</section>
