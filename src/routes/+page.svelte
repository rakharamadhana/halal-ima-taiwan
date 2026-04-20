<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/logo/halal-ima-transparent.png';
</script>

<svelte:head>
	<title>Halal IMA Taiwan - Badan Sertifikasi Halal Resmi</title>
	<meta
		name="description"
		content="Memastikan standar kepatuhan Halal tertinggi untuk produk, restoran, dan layanan di seluruh Formosa. Dipercaya secara global, diverifikasi secara lokal."
	/>
</svelte:head>

<section
	class="container mx-auto flex flex-col items-center space-y-8 px-4 py-24 text-center md:py-32"
>
	<img src={logo} alt="Halal IMA Logo" class="mx-auto h-48 w-48 drop-shadow-xl" />

	<div
		class="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
	>
		Melayani Taiwan & Sekitarnya
	</div>

	<h1
		class="max-w-[55rem] text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
	>
		Mau Lisensi Halal? <br />
		<span class="text-primary">Di Halal IMA aja!</span>
	</h1>

	<p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
		Membantu badan usaha di Taiwan mendapatkan lisensi Halal yang resmi, terpercaya, dan tercatat di
		KDEI Taipei.
	</p>

	<div class="mt-8 flex flex-col gap-4 sm:flex-row">
		<Button href="/procedures" size="lg" class="px-8 text-base font-bold">Lihat Prosedur</Button>
		<Button href="/contact" variant="outline" size="lg" class="px-8 text-base font-bold">
			Kontak Kami
		</Button>
	</div>
</section>

<!-- Stats/Scope Section -->
<section class="container mx-auto rounded-3xl bg-primary/5 px-4 py-16">
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold">Ruang Lingkup Kami</h2>
		<p class="text-muted-foreground">Melayani berbagai sektor usaha di seluruh wilayah Taiwan</p>
	</div>
	<div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-5">
		{#each [{ t: 'Warung Makan', i: 'Utensils' }, { t: 'Restoran', i: 'Store' }, { t: 'Suplier Daging', i: 'Beef' }, { t: 'Hotel', i: 'Hotel' }, { t: 'Tempat Wisata', i: 'Palmtree' }] as item (item.t)}
			<div class="flex flex-col items-center gap-2">
				<div class="font-bold text-primary">{item.t}</div>
			</div>
		{/each}
	</div>
</section>

<section class="container mx-auto px-4 py-24">
	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-3">
		<div class="flex flex-col items-center space-y-3 rounded-lg border bg-card p-6 shadow-sm">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg
				>
			</div>
			<h3 class="text-xl font-bold">Terdata KDEI Taipei</h3>
			<p class="text-muted-foreground text-sm">
				IMA Taiwan yang diresmikan dan tercatat secara resmi di Kantor Dagang dan Ekonomi
				Indonesia (KDEI) Taipei.
			</p>
		</div>

		<div class="flex flex-col items-center space-y-3 rounded-lg border bg-card p-6 shadow-sm">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-primary"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
				>
			</div>
			<h3 class="text-xl font-bold">Harga Spesial</h3>
			<p class="text-muted-foreground">
				Hanya NTD 5.000/tahun untuk 10 pelanggan pertama di Taiwan.
			</p>
		</div>

		<div class="flex flex-col items-center space-y-3 rounded-lg border bg-card p-6 shadow-sm">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-primary"
					><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect
						width="20"
						height="14"
						x="2"
						y="6"
						rx="2"
					/></svg
				>
			</div>
			<h3 class="text-xl font-bold">Kolaborasi Strategis</h3>
			<p class="text-muted-foreground">
				Bekerja sama dengan aplikasi Halal Formosa untuk promosi bisnis Anda.
			</p>
		</div>
	</div>
</section>

<!-- Collaboration Section -->
<section class="container mx-auto border-t px-4 py-16">
	<div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 md:flex-row">
		<div class="max-w-md space-y-4">
			<h2 class="text-3xl font-bold">Go Digital dengan Halal Formosa</h2>
			<p class="text-muted-foreground">
				Usaha yang mendapatkan lisensi Halal IMA akan otomatis dipromosikan melalui aplikasi Halal
				Formosa, memudahkan jutaan muslim menemukan bisnis Anda.
			</p>
		</div>
		<div class="flex items-center gap-8 rounded-2xl border bg-card p-8 shadow-inner">
			<div class="text-2xl font-black text-primary italic">HALAL IMA</div>
			<div class="text-2xl font-bold text-muted-foreground">X</div>
			<div class="text-2xl font-black italic">HALAL FORMOSA</div>
		</div>
	</div>
</section>
