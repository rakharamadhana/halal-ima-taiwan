<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { ShieldCheck, Zap, Coins, Users, Search, Heart, TrendingUp, Globe } from "lucide-svelte";
</script>

<svelte:head>
  <title>Tentang Kami - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto px-4 py-16 max-w-6xl">
  <!-- Hero Section -->
  <div class="text-center mb-16">
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Apa itu IMA?</h1>
    <p class="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
      International Madani Association (IMA) merupakan organisasi mahasiswa dan diaspora muslim asal Indonesia yang sedang belajar/bertugas di berbagai negara, salah satunya Taiwan.
    </p>
    <div class="mt-8 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
      <ShieldCheck class="h-5 w-5" />
      Diresmikan pada 8 Februari 2026 oleh KDEI Taipei
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold">Misi Kami</h2>
      <p class="text-lg text-muted-foreground leading-relaxed">
        Salah satu program IMA adalah membantu badan usaha seperti warung makan/restoran, supplier daging, hotel dan tempat wisata untuk mendapatkan lisensi halal melalui <strong>HALAL IMA</strong>.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {#each [
          { icon: Search, text: "Audit Transparan" },
          { icon: Zap, text: "Proses Cepat" },
          { icon: Users, text: "Auditor Berpengalaman" },
          { icon: Coins, text: "Biaya Terjangkau" }
        ] as feature}
          <div class="flex items-center gap-3 bg-card p-3 rounded-lg border shadow-sm">
            <feature.icon class="h-5 w-5 text-primary" />
            <span class="font-medium">{feature.text}</span>
          </div>
        {/each}
      </div>
    </div>
    <div class="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex items-center justify-center">
      <div class="text-center space-y-4">
        <div class="text-6xl font-bold text-primary">KDEI</div>
        <p class="text-xl font-medium">Tercatat Resmi</p>
        <p class="text-muted-foreground">Lisensi Halal IMA diakui dan tercatat di Kantor Dagang dan Ekonomi Indonesia (KDEI) Taipei.</p>
      </div>
    </div>
  </div>

  <!-- Benefits Section -->
  <div class="mb-24">
    <h2 class="text-3xl font-bold text-center mb-12">Manfaat Lisensi Halal</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each [
        { 
          icon: Heart, 
          title: "Kepercayaan", 
          desc: "Meningkatkan kepercayaan konsumen terhadap produk Anda." 
        },
        { 
          icon: TrendingUp, 
          title: "Nilai Jual", 
          desc: "Menambah nilai jual dan daya saing produk di pasar." 
        },
        { 
          icon: Globe, 
          title: "Jangkauan", 
          desc: "Memperluas jangkauan pemasaran ke komunitas muslim." 
        },
        { 
          icon: ShieldCheck, 
          title: "Keberkahan", 
          desc: "Menambah keberkahan rezeki dari penjualan produk." 
        }
      ] as benefit}
        <Card.Root class="hover:shadow-md transition-shadow">
          <Card.Header>
            <div class="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
              <benefit.icon class="h-6 w-6 text-primary" />
            </div>
            <Card.Title>{benefit.title}</Card.Title>
          </Card.Header>
          <Card.Content>
            <p class="text-muted-foreground">{benefit.desc}</p>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  </div>

</div>
