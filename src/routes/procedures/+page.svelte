<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { tr } from '$lib/i18n.svelte';
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

	const steps = $derived([
		{
			id: 1,
			title: tr('Registrasi Akun Perusahaan', 'Register a Company Account'),
			desc: tr(
				'Daftarkan akun perusahaan terlebih dahulu melalui website ini sebelum memulai pengajuan ketetapan halal.',
				'Register your company account on this website before starting a halal approval request.'
			),
			icon: MessageCircle
		},
		{
			id: 2,
			title: tr('Mengisi dokumen pendaftaran', 'Complete Registration Documents'),
			desc: tr(
				'Isi formulir pengajuan dan upload seluruh dokumen persyaratan langsung di website ini.',
				'Fill in the application form and upload all required documents directly on this website.'
			),
			icon: FileText
		},
		{
			id: 3,
			title: tr('Pemeriksaan dokumen', 'Document Review'),
			desc: tr(
				'Dokumen yang telah diisi akan diperiksa lebih lanjut oleh tim Halal IMA.',
				'Submitted documents will be reviewed further by the Halal IMA team.'
			),
			icon: SearchCheck
		},
		{
			id: 4,
			title: tr('Penerbitan Invoice', 'Invoice Issuance'),
			desc: tr(
				'Setelah dokumen disetujui, Tim Halal IMA akan menerbitkan invoice.',
				'After documents are approved, the Halal IMA team will issue an invoice.'
			),
			icon: FileSpreadsheet
		},
		{
			id: 5,
			title: tr('Pembayaran', 'Payment'),
			desc: tr(
				'Melakukan pembayaran sesuai dengan invoice yang diterbitkan.',
				'Complete payment according to the issued invoice.'
			),
			icon: CreditCard
		},
		{
			id: 6,
			title: tr('Pemeriksaan Lapangan', 'On-site Inspection'),
			desc: tr(
				'Audit, inspeksi, dan validasi dokumen, produk, serta alur produksi di lokasi usaha.',
				'Audit, inspection, and validation of documents, products, and production flow at the business location.'
			),
			icon: MapPin
		},
		{
			id: 7,
			title: tr('Penerbitan Lisensi', 'License Issuance'),
			desc: tr(
				'Lisensi halal diterbitkan dan dikirim langsung ke alamat pemilik usaha.',
				'The halal license is issued and sent directly to the business owner address.'
			),
			icon: Award
		}
	]);

	const scope = $derived([
		{ title: tr('Warung Makan', 'Food Stalls'), icon: Utensils },
		{ title: tr('Restoran', 'Restaurants'), icon: Store },
		{ title: tr('Supplier Daging', 'Meat Suppliers'), icon: Beef },
		{ title: 'Hotel', icon: Hotel },
		{ title: tr('Tempat Wisata', 'Tourist Attractions'), icon: Palmtree }
	]);
</script>

<svelte:head>
	<title>{tr('Prosedur Sertifikasi', 'Certification Procedure')} - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-5xl px-4 py-16">
	<!-- Header -->
	<div class="mb-20 text-center">
		<h1 class="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
			{tr('Alur Lisensi Halal IMA', 'Halal IMA License Flow')}
		</h1>
		<p class="text-xl text-muted-foreground">
			{tr(
				'Proses transparan dan efisien untuk mendapatkan sertifikasi Halal Anda di Taiwan.',
				'A transparent and efficient process to obtain your halal certification in Taiwan.'
			)}
		</p>
		<p class="mt-3 text-sm text-muted-foreground">
			{tr(
				'Semua form pengajuan dan dokumen yang diperlukan diisi serta diunggah melalui website ini. Silakan register sebagai perusahaan, lalu ikuti alur pengajuan ketetapan halal.',
				'All application forms and required documents are completed and uploaded through this website. Please register as a company, then follow the halal approval submission flow.'
			)}
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
			<h2 class="mb-4 text-3xl font-bold">{tr('Ruang Lingkup', 'Scope')}</h2>
			<p class="text-muted-foreground">
				{tr(
					'Lisensi Halal IMA mencakup berbagai jenis usaha di seluruh Taiwan.',
					'Halal IMA licenses cover various business types across Taiwan.'
				)}
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
				>{tr('Promo Terbatas', 'Limited Promo')}</span
			>
		</div>
		<Card.Header class="pt-10 text-center">
			<Card.Title class="text-2xl">{tr('Tarif Layanan', 'Service Fee')}</Card.Title>
			<Card.Description
				>{tr(
					'Harga spesial untuk 10 pelanggan pertama',
					'Special price for the first 10 customers'
				)}</Card.Description
			>
		</Card.Header>
		<Card.Content class="text-center">
			<div class="mb-6">
				<span class="text-5xl font-extrabold text-primary">NTD 5.000</span>
				<span class="text-muted-foreground">{tr('/ tahun', '/ year')}</span>
			</div>
			<p class="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
				{tr(
					'Promo berlaku untuk seluruh Taiwan. (Di luar wilayah Taipei dan New Taipei akan dikenakan biaya transportasi tambahan).',
					'The promo applies across Taiwan. Additional transportation fees apply outside Taipei and New Taipei.'
				)}
			</p>
			<Button href="/contact" size="lg" class="w-full px-12 font-bold sm:w-auto">
				{tr('Daftar Sekarang', 'Register Now')}
			</Button>
		</Card.Content>
	</Card.Root>
</div>
