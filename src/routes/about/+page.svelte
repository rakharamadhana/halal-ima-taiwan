<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { tr } from '$lib/i18n.svelte';
	import { ShieldCheck, Zap, Coins, Users, Search, Heart, TrendingUp, Globe } from 'lucide-svelte';
</script>

<svelte:head>
	<title>{tr('Tentang Kami', 'About Us')} - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-16">
	<!-- Hero Section -->
	<div class="mb-16 text-center">
		<h1 class="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
			{tr('Apa itu IMA?', 'What is IMA?')}
		</h1>
		<p class="mx-auto max-w-4xl text-xl leading-relaxed text-muted-foreground">
			{tr(
				'International Madani Association (IMA) merupakan organisasi mahasiswa dan diaspora muslim asal Indonesia yang sedang belajar/bertugas di berbagai negara, salah satunya Taiwan.',
				'International Madani Association (IMA) is an organization of Indonesian Muslim students and diaspora communities studying or working in various countries, including Taiwan.'
			)}
		</p>
		<div
			class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary"
		>
			<ShieldCheck class="h-5 w-5" />
			{tr(
				'Diresmikan pada 8 Februari 2026 oleh KDEI Taipei',
				'Inaugurated on February 8, 2026 by KDEI Taipei'
			)}
		</div>
	</div>

	<div class="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
		<div class="space-y-6">
			<h2 class="text-3xl font-bold">{tr('Misi Kami', 'Our Mission')}</h2>
			<p class="text-lg leading-relaxed text-muted-foreground">
				{tr(
					'Salah satu program IMA adalah membantu badan usaha seperti warung makan/restoran, supplier daging, hotel dan tempat wisata untuk mendapatkan lisensi halal melalui',
					'One of IMA programs helps businesses such as food stalls/restaurants, meat suppliers, hotels, and tourist attractions obtain halal licenses through'
				)}
				<strong> HALAL IMA</strong>.
			</p>
			<div class="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
				{#each [{ icon: Search, text: tr('Audit Transparan', 'Transparent Audit') }, { icon: Zap, text: tr('Proses Cepat', 'Fast Process') }, { icon: Users, text: tr('Auditor Berpengalaman', 'Experienced Auditors') }, { icon: Coins, text: tr('Biaya Terjangkau', 'Affordable Cost') }] as feature (feature.text)}
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
				<p class="text-xl font-medium">{tr('Tercatat Resmi', 'Officially Registered')}</p>
				<p class="text-muted-foreground">
					{tr(
						'IMA Taiwan telah diakui dan tercatat di Kantor Dagang dan Ekonomi Indonesia (KDEI) Taipei.',
						'IMA Taiwan has been recognized and registered with the Indonesian Economic and Trade Office (KDEI) Taipei.'
					)}
				</p>
			</div>
		</div>
	</div>

	<!-- Benefits Section -->
	<div class="mb-24">
		<h2 class="mb-12 text-center text-3xl font-bold">
			{tr('Manfaat Lisensi Halal', 'Benefits of a Halal License')}
		</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each [{ icon: Heart, title: tr('Kepercayaan', 'Trust'), desc: tr('Meningkatkan kepercayaan konsumen terhadap produk Anda.', 'Increase customer confidence in your products.') }, { icon: TrendingUp, title: tr('Nilai Jual', 'Market Value'), desc: tr('Menambah nilai jual dan daya saing produk di pasar.', 'Increase market value and product competitiveness.') }, { icon: Globe, title: tr('Jangkauan', 'Reach'), desc: tr('Memperluas jangkauan pemasaran ke komunitas muslim.', 'Expand marketing reach to Muslim communities.') }, { icon: ShieldCheck, title: tr('Keberkahan', 'Blessing'), desc: tr('Menambah keberkahan rezeki dari penjualan produk.', 'Bring more blessing to income from product sales.') }] as benefit (benefit.title)}
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
