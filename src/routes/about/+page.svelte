<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ShieldCheck, Zap, Coins, Users, Search, Heart, TrendingUp, Globe } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Tentang Kami - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-16">
	<!-- Hero Section -->
	<div class="mb-16 text-center">
		<h1 class="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">Apa itu IMA?</h1>
		<p class="mx-auto max-w-4xl text-xl leading-relaxed text-muted-foreground">
			International Madani Association (IMA) merupakan organisasi mahasiswa dan diaspora muslim asal
			Indonesia yang sedang belajar/bertugas di berbagai negara, salah satunya Taiwan.
		</p>
		<div
			class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary"
		>
			<ShieldCheck class="h-5 w-5" />
			Diresmikan pada 8 Februari 2026 oleh KDEI Taipei
		</div>
	</div>

	<div class="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
		<div class="space-y-6">
			<h2 class="text-3xl font-bold">Misi Kami</h2>
			<p class="text-lg leading-relaxed text-muted-foreground">
				Salah satu program IMA adalah membantu badan usaha seperti warung makan/restoran, supplier
				daging, hotel dan tempat wisata untuk mendapatkan lisensi halal melalui <strong
					>HALAL IMA</strong
				>.
			</p>
			<div class="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
				{#each [{ icon: Search, text: 'Audit Transparan' }, { icon: Zap, text: 'Proses Cepat' }, { icon: Users, text: 'Auditor Berpengalaman' }, { icon: Coins, text: 'Biaya Terjangkau' }] as feature (feature.text)}
					<div class="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
						<feature.icon class="h-5 w-5 text-primary" />
						<span class="font-medium">{feature.text}</span>
					</div>
				{/each}
			</div>
		</div>
		<div
			class="flex items-center justify-center rounded-3xl border border-primary/10 bg-primary/5 p-8"
		>
			<div class="space-y-4 text-center">
				<div class="text-6xl font-bold text-primary">KDEI</div>
				<p class="text-xl font-medium">Tercatat Resmi</p>
				<p class="text-muted-foreground">
					Lisensi Halal IMA diakui dan tercatat di Kantor Dagang dan Ekonomi Indonesia (KDEI)
					Taipei.
				</p>
			</div>
		</div>
	</div>

	<!-- Benefits Section -->
	<div class="mb-24">
		<h2 class="mb-12 text-center text-3xl font-bold">Manfaat Lisensi Halal</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each [{ icon: Heart, title: 'Kepercayaan', desc: 'Meningkatkan kepercayaan konsumen terhadap produk Anda.' }, { icon: TrendingUp, title: 'Nilai Jual', desc: 'Menambah nilai jual dan daya saing produk di pasar.' }, { icon: Globe, title: 'Jangkauan', desc: 'Memperluas jangkauan pemasaran ke komunitas muslim.' }, { icon: ShieldCheck, title: 'Keberkahan', desc: 'Menambah keberkahan rezeki dari penjualan produk.' }] as benefit (benefit.title)}
				<Card.Root class="transition-shadow hover:shadow-md">
					<Card.Header>
						<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
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
