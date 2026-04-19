<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import {
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
	} from 'lucide-svelte';

	const steps = [
		{
			id: 1,
			title: 'Pendaftaran',
			desc: 'Pemilik usaha menghubungi CP Halal IMA untuk melakukan pendaftaran.',
			icon: MessageCircle
		},
		{
			id: 2,
			title: 'Mengisi dokumen pendaftaran',
			desc: 'Mengisi formulir dan dokumen persyaratan yang diperlukan.',
			icon: FileText
		},
		{
			id: 3,
			title: 'Pemeriksaan dokumen',
			desc: 'Dokumen yang telah diisi akan diperiksa lebih lanjut oleh tim Halal IMA.',
			icon: SearchCheck
		},
		{
			id: 4,
			title: 'Penerbitan Invoice',
			desc: 'Setelah dokumen disetujui, Tim Halal IMA akan menerbitkan invoice.',
			icon: FileSpreadsheet
		},
		{
			id: 5,
			title: 'Pembayaran',
			desc: 'Melakukan pembayaran sesuai dengan invoice yang diterbitkan.',
			icon: CreditCard
		},
		{
			id: 6,
			title: 'Pemeriksaan Lapangan',
			desc: 'Audit, inspeksi, dan validasi dokumen, produk, serta alur produksi di lokasi usaha.',
			icon: MapPin
		},
		{
			id: 7,
			title: 'Penerbitan Lisensi',
			desc: 'Lisensi halal diterbitkan dan dikirim langsung ke alamat pemilik usaha.',
			icon: Award
		}
	];

	const scope = [
		{ title: 'Warung Makan', icon: Utensils },
		{ title: 'Restoran', icon: Store },
		{ title: 'Supplier Daging', icon: Beef },
		{ title: 'Hotel', icon: Hotel },
		{ title: 'Tempat Wisata', icon: Palmtree }
	];
</script>

<svelte:head>
	<title>Prosedur Sertifikasi - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-5xl px-4 py-16">
	<!-- Header -->
	<div class="mb-20 text-center">
		<h1 class="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">Alur Lisensi Halal IMA</h1>
		<p class="text-xl text-muted-foreground">
			Proses transparan dan efisien untuk mendapatkan sertifikasi Halal Anda di Taiwan.
		</p>
	</div>

	<!-- Timeline -->
	<div
		class="relative space-y-8 pb-24 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent sm:before:mx-auto sm:before:translate-x-0"
	>
		{#each steps as step (step.id)}
			<div
				class="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
			>
				<!-- Icon/Number -->
				<div
					class="flex-order-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background shadow md:absolute md:left-1/2 md:-ml-5"
				>
					<span class="text-sm font-bold text-primary">{step.id}</span>
				</div>
				<!-- Card -->
				<div
					class="ml-auto w-[calc(100%-4rem)] rounded-xl border bg-card/50 p-4 shadow-sm transition-all hover:shadow-md md:ml-0 md:w-[calc(50%-2.5rem)]"
				>
					<div class="mb-2 flex items-center gap-3">
						<step.icon class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-bold">{step.title}</h3>
					</div>
					<p class="text-muted-foreground">{step.desc}</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Ruang Lingkup Section -->
	<div class="mb-24 pt-12">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold">Ruang Lingkup</h2>
			<p class="text-muted-foreground">
				Lisensi Halal IMA mencakup berbagai jenis usaha di seluruh Taiwan.
			</p>
		</div>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
			{#each scope as item (item.title)}
				<div
					class="group flex flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center transition-colors hover:bg-primary/5"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110"
					>
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
			<span
				class="rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground uppercase"
				>Promo Terbatas</span
			>
		</div>
		<Card.Header class="pt-10 text-center">
			<Card.Title class="text-2xl">Tarif Layanan</Card.Title>
			<Card.Description>Harga spesial untuk 10 pelanggan pertama</Card.Description>
		</Card.Header>
		<Card.Content class="text-center">
			<div class="mb-6">
				<span class="text-5xl font-extrabold text-primary">NTD 5.000</span>
				<span class="text-muted-foreground">/ tahun</span>
			</div>
			<p class="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
				Promo berlaku untuk seluruh Taiwan. (Di luar wilayah Taipei dan New Taipei akan dikenakan
				biaya transportasi tambahan).
			</p>
			<Button href="/contact" size="lg" class="w-full px-12 font-bold sm:w-auto">
				Daftar Sekarang
			</Button>
		</Card.Content>
	</Card.Root>
</div>
