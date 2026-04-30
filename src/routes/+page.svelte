<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/logo/halal-ima-transparent.png';
	import halalFormosaLogo from '$lib/assets/partners/halal-formosa.png';
	import { tr } from '$lib/i18n.svelte';
	import {
		BookOpenCheck,
		ChartNoAxesCombined,
		MessageSquareQuote,
		ShieldCheck
	} from 'lucide-svelte';
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
		{tr('Melayani Taiwan & Sekitarnya', 'Serving Taiwan and Beyond')}
	</div>

	<h1
		class="max-w-[55rem] text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
	>
		{tr('Mau Lisensi Halal?', 'Need a Halal License?')} <br />
		<span class="text-primary">{tr('Di Halal IMA aja!', 'Choose Halal IMA!')}</span>
	</h1>

	<p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
		{tr(
			'Membantu badan usaha di Taiwan mendapatkan lisensi Halal yang resmi, terpercaya, dan tercatat di KDEI Taipei.',
			'Helping businesses in Taiwan obtain official, trusted halal licenses registered with KDEI Taipei.'
		)}
	</p>

	<div class="mt-8 flex flex-col gap-4 sm:flex-row">
		<Button href="/procedures" size="lg" class="px-8 text-base font-bold">
			{tr('Lihat Prosedur', 'View Procedure')}
		</Button>
		<Button href="/contact" variant="outline" size="lg" class="px-8 text-base font-bold">
			{tr('Kontak Kami', 'Contact Us')}
		</Button>
	</div>
</section>

<!-- Stats/Scope Section -->
<section class="container mx-auto rounded-3xl bg-primary/5 px-4 py-16">
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold">{tr('Ruang Lingkup Kami', 'Our Scope')}</h2>
		<p class="text-muted-foreground">
			{tr(
				'Melayani berbagai sektor usaha di seluruh wilayah Taiwan',
				'Serving various business sectors across Taiwan'
			)}
		</p>
	</div>
	<div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-5">
		{#each [{ t: tr('Warung Makan', 'Food Stalls'), i: 'Utensils' }, { t: tr('Restoran', 'Restaurants'), i: 'Store' }, { t: tr('Suplier Daging', 'Meat Suppliers'), i: 'Beef' }, { t: 'Hotel', i: 'Hotel' }, { t: tr('Tempat Wisata', 'Tourist Attractions'), i: 'Palmtree' }] as item (item.t)}
			<div class="flex flex-col items-center gap-2">
				<div class="font-bold text-primary">{item.t}</div>
			</div>
		{/each}
	</div>
</section>

<section class="container mx-auto px-4 py-20">
	<div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<div class="space-y-5">
			<div
				class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
			>
				<BookOpenCheck class="h-4 w-4" />
				{tr('Halal Awareness', 'Halal Awareness')}
			</div>
			<h2 class="text-3xl font-bold tracking-tight md:text-4xl">
				{tr(
					'Informasi halal untuk bisnis yang ingin dipercaya.',
					'Halal information for businesses that want to be trusted.'
				)}
			</h2>
			<p class="text-muted-foreground">
				{tr(
					'Pelajari kenapa halal penting, bagaimana menjaga proses usaha tetap aman, data populasi muslim di Taiwan, testimoni, dan ajakan dari Ketua IMA untuk membangun kesadaran halal bersama.',
					'Learn why halal matters, how to keep business processes safe, Muslim population data in Taiwan, testimonials, and an invitation from the IMA Chair to build halal awareness together.'
				)}
			</p>
			<Button href="/halal-awareness" size="lg" class="font-bold">
				{tr('Baca Informasi Halal', 'Read Halal Info')}
			</Button>
		</div>

		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-xl border bg-card p-5 shadow-sm">
				<ShieldCheck class="mb-4 h-8 w-8 text-primary" />
				<h3 class="mb-2 font-bold">{tr('Kenapa Halal', 'Why Halal')}</h3>
				<p class="text-sm text-muted-foreground">
					{tr(
						'Aman, transparan, dan meningkatkan kepercayaan.',
						'Safe, transparent, and trust-building.'
					)}
				</p>
			</div>
			<div class="rounded-xl border bg-card p-5 shadow-sm">
				<ChartNoAxesCombined class="mb-4 h-8 w-8 text-primary" />
				<h3 class="mb-2 font-bold">{tr('Data Taiwan', 'Taiwan Data')}</h3>
				<p class="text-sm text-muted-foreground">
					{tr(
						'Estimasi komunitas muslim dan konteks pasar.',
						'Muslim community estimates and market context.'
					)}
				</p>
			</div>
			<div class="rounded-xl border bg-card p-5 shadow-sm">
				<MessageSquareQuote class="mb-4 h-8 w-8 text-primary" />
				<h3 class="mb-2 font-bold">{tr('Testimoni', 'Testimonials')}</h3>
				<p class="text-sm text-muted-foreground">
					{tr(
						'Cerita dari pelaku usaha dan komunitas.',
						'Stories from business owners and the community.'
					)}
				</p>
			</div>
		</div>
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
			<h3 class="text-xl font-bold">{tr('Terdata KDEI Taipei', 'Registered with KDEI Taipei')}</h3>
			<p class="text-sm text-muted-foreground">
				{tr(
					'IMA Taiwan yang diresmikan dan tercatat secara resmi di Kantor Dagang dan Ekonomi Indonesia (KDEI) Taipei.',
					'IMA Taiwan is officially inaugurated and registered with the Indonesian Economic and Trade Office (KDEI) Taipei.'
				)}
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
			<h3 class="text-xl font-bold">{tr('Harga Spesial', 'Special Price')}</h3>
			<p class="text-muted-foreground">
				{tr(
					'Hanya NTD 5.000/tahun untuk 10 pelanggan pertama di Taiwan.',
					'Only NTD 5,000/year for the first 10 customers in Taiwan.'
				)}
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
			<h3 class="text-xl font-bold">{tr('Kolaborasi Strategis', 'Strategic Collaboration')}</h3>
			<p class="text-muted-foreground">
				{tr(
					'Bekerja sama dengan aplikasi Halal Formosa untuk promosi bisnis Anda.',
					'Collaborating with the Halal Formosa app to promote your business.'
				)}
			</p>
		</div>
	</div>
</section>

<section class="container mx-auto border-t px-4 py-16">
	<div class="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
		<div class="space-y-3">
			<p class="text-sm font-semibold tracking-wider text-primary uppercase">
				{tr('Partner Kami', 'Our Partner')}
			</p>
			<h2 class="text-3xl font-bold">Halal Formosa</h2>
			<p class="max-w-xl text-muted-foreground">
				{tr(
					'Kemitraan dalam katalogisasi halal dan database publik, membantu masyarakat mengecek status produk, membaca bahan, serta mengeksplorasi lokasi ramah muslim di Taiwan.',
					'Partnership in halal cataloging and public database access, helping people check product status, read ingredients, and explore Muslim-friendly places in Taiwan.'
				)}
			</p>
		</div>
		<a
			href="https://halalformosa.com"
			target="_blank"
			rel="noopener noreferrer"
			class="flex w-full items-center justify-center p-6 transition-opacity hover:opacity-80 md:w-auto md:min-w-80"
			aria-label="Halal Formosa"
		>
			<img src={halalFormosaLogo} alt="Halal Formosa Logo" class="h-36 w-auto object-contain" />
		</a>
	</div>
</section>
