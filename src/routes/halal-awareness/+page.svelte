<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import {
		BadgeCheck,
		BookOpenCheck,
		ChartNoAxesCombined,
		HeartHandshake,
		MessageSquareQuote,
		ShieldCheck,
		Sparkles,
		UsersRound
	} from 'lucide-svelte';

	const halalReasons = [
		{
			title: 'Aman untuk konsumen muslim',
			desc: 'Halal membantu konsumen merasa tenang karena bahan, proses, penyimpanan, dan penyajian diperiksa dengan standar yang jelas.'
		},
		{
			title: 'Membangun kepercayaan usaha',
			desc: 'Label dan lisensi halal memberi sinyal bahwa bisnis serius menjaga transparansi, kebersihan, dan tanggung jawab kepada pelanggan.'
		},
		{
			title: 'Membuka pasar baru',
			desc: 'Komunitas muslim, wisatawan, pelajar, dan pekerja migran di Taiwan lebih mudah memilih usaha yang status halalnya terverifikasi.'
		}
	];

	const awarenessPoints = [
		'Memisahkan bahan halal dan non-halal sejak pembelian, penyimpanan, hingga proses produksi.',
		'Menghindari kontaminasi silang dari alat masak, ruang simpan, minyak, bumbu, atau bahan tambahan.',
		'Mendokumentasikan pemasok, komposisi bahan, dan alur kerja agar proses audit berjalan lebih mudah.',
		'Melatih staf agar memahami praktik dasar halal di dapur, restoran, hotel, dan area layanan.'
	];

	const populationFacts = [
		{
			value: '23,4 juta',
			label:
				'Perkiraan total populasi Taiwan pada 2024 menurut data statistik nasional yang dirangkum Trading Economics.'
		},
		{
			value: '250-300 ribu',
			label:
				'Estimasi jumlah muslim di Taiwan, karena agama tidak dicatat dalam statistik kependudukan resmi.'
		},
		{
			value: '1,0-1,3%',
			label:
				'Perkiraan porsi muslim dari total populasi Taiwan, didorong oleh komunitas lokal dan pekerja migran.'
		}
	];

	const testimonials = [
		{
			name: 'Pemilik Restoran Indonesia di Taipei',
			quote:
				'Setelah proses halal dijelaskan dengan sederhana, kami jadi lebih paham cara menjaga bahan dan alat agar pelanggan muslim merasa aman.'
		},
		{
			name: 'Pelaku Usaha Kuliner di Taoyuan',
			quote:
				'Lisensi halal membantu pelanggan baru lebih percaya. Banyak yang bertanya status halal sebelum datang bersama teman atau keluarga.'
		},
		{
			name: 'Komunitas Muslim Taiwan',
			quote:
				'Kami terbantu ketika tempat makan punya informasi halal yang jelas, karena pilihan menjadi lebih mudah dan tidak menebak-nebak.'
		}
	];
</script>

<svelte:head>
	<title>Informasi Halal & Awareness - Halal IMA Taiwan</title>
	<meta
		name="description"
		content="Informasi halal, alasan pentingnya lisensi halal, testimoni, sambutan ketua IMA, dan data populasi muslim di Taiwan."
	/>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-16">
	<section class="mb-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
		<div class="space-y-6">
			<div
				class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
			>
				<BookOpenCheck class="h-4 w-4" />
				Informasi Halal
			</div>
			<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl">
				Halal bukan sekadar label, tapi komitmen menjaga kepercayaan.
			</h1>
			<p class="max-w-3xl text-lg leading-relaxed text-muted-foreground">
				Halal IMA Taiwan hadir untuk membantu pelaku usaha memahami, menyiapkan, dan menjaga standar
				halal secara praktis di lingkungan bisnis Taiwan.
			</p>
			<div class="flex flex-col gap-3 sm:flex-row">
				<Button href="/procedures" size="lg" class="font-bold">Ajukan Lisensi Halal</Button>
				<Button href="/contact" variant="outline" size="lg" class="font-bold"
					>Konsultasi Dulu</Button
				>
			</div>
		</div>

		<Card.Root class="border-primary/20 bg-primary/5">
			<Card.Header>
				<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
					<ShieldCheck class="h-6 w-6 text-primary" />
				</div>
				<Card.Title class="text-2xl">Apa yang dimaksud halal?</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4 text-muted-foreground">
				<p>
					Halal berarti sesuatu yang diperbolehkan menurut syariat Islam. Dalam konteks usaha, halal
					mencakup bahan, proses produksi, alat, penyimpanan, distribusi, hingga cara penyajian.
				</p>
				<p>
					Karena itu, lisensi halal bukan hanya pemeriksaan akhir, melainkan sistem yang membantu
					bisnis menjaga konsistensi dari hulu ke hilir.
				</p>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="mb-20">
		<div class="mb-10 max-w-3xl">
			<h2 class="mb-4 text-3xl font-bold">Kenapa Harus Halal?</h2>
			<p class="text-muted-foreground">
				Untuk usaha di Taiwan, halal awareness membuat layanan lebih inklusif, terpercaya, dan siap
				melayani kebutuhan komunitas muslim yang terus aktif.
			</p>
		</div>
		<div class="grid gap-5 md:grid-cols-3">
			{#each halalReasons as reason (reason.title)}
				<Card.Root>
					<Card.Header>
						<div class="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
							<BadgeCheck class="h-5 w-5 text-primary" />
						</div>
						<Card.Title class="text-xl">{reason.title}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-muted-foreground">{reason.desc}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<section class="mb-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
		<div>
			<h2 class="mb-4 text-3xl font-bold">Halal Awareness untuk Pelaku Usaha</h2>
			<p class="text-muted-foreground">
				Kesadaran halal dimulai dari kebiasaan operasional harian. Tim Halal IMA membantu bisnis
				menerjemahkan prinsip halal menjadi langkah kerja yang bisa dijalankan staf.
			</p>
		</div>
		<div class="grid gap-4">
			{#each awarenessPoints as point (point)}
				<div class="flex gap-4 rounded-xl border bg-card p-4">
					<Sparkles class="mt-1 h-5 w-5 shrink-0 text-primary" />
					<p class="text-muted-foreground">{point}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-20 rounded-3xl border bg-card p-6 md:p-10">
		<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<div class="mb-3 flex items-center gap-2 font-semibold text-primary">
					<ChartNoAxesCombined class="h-5 w-5" />
					Data Populasi Muslim di Taiwan
				</div>
				<h2 class="text-3xl font-bold">Pasar muslim di Taiwan nyata dan perlu dilayani.</h2>
			</div>
			<p class="max-w-md text-sm text-muted-foreground">
				Catatan: Taiwan tidak mencatat agama dalam statistik kependudukan resmi, sehingga angka
				muslim ditampilkan sebagai estimasi.
			</p>
		</div>
		<div class="grid gap-5 md:grid-cols-3">
			{#each populationFacts as fact (fact.value)}
				<div class="rounded-2xl bg-primary/5 p-5">
					<div class="mb-2 text-3xl font-extrabold text-primary">{fact.value}</div>
					<p class="text-sm leading-relaxed text-muted-foreground">{fact.label}</p>
				</div>
			{/each}
		</div>
		<p class="mt-6 text-xs leading-relaxed text-muted-foreground">
			Sumber ringkas: National Immigration Agency Taiwan menerbitkan statistik warga asing menurut
			kewarganegaraan; Pew Research Center menyoroti keragaman agama Taiwan; estimasi komunitas
			muslim umumnya menggabungkan data migrasi, komunitas lokal, dan rujukan akademik.
		</p>
	</section>

	<section class="mb-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<Card.Root class="border-primary/20 bg-primary/5">
			<Card.Header>
				<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
					<HeartHandshake class="h-6 w-6 text-primary" />
				</div>
				<Card.Title class="text-2xl">Kata Sambutan Ketua IMA</Card.Title>
				<Card.Description>Ogi, Ketua International Madani Association Taiwan</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4 text-muted-foreground">
				<p>
					Assalamu'alaikum warahmatullahi wabarakatuh. Melalui Halal IMA Taiwan, kami mengajak
					seluruh pelaku usaha untuk menjadikan halal awareness sebagai bagian dari pelayanan yang
					jujur, bersih, dan bertanggung jawab.
				</p>
				<p>
					Kebutuhan halal bukan hanya milik konsumen muslim, tetapi juga menjadi nilai tambah bagi
					bisnis yang ingin dipercaya lebih luas. Semoga ikhtiar ini mempererat hubungan pelaku
					usaha, komunitas muslim, dan masyarakat Taiwan.
				</p>
			</Card.Content>
		</Card.Root>

		<div class="space-y-5">
			<div class="flex items-center gap-2 font-semibold text-primary">
				<UsersRound class="h-5 w-5" />
				Ajakan Kolaborasi
			</div>
			<h2 class="text-3xl font-bold">Mari jadikan Taiwan lebih ramah halal.</h2>
			<p class="text-muted-foreground">
				Halal IMA membuka ruang konsultasi bagi warung makan, restoran, supplier daging, hotel,
				tempat wisata, dan bisnis lain yang ingin mulai menata sistem halal secara bertahap.
			</p>
			<Button href="/contact" size="lg" class="font-bold">Hubungi Tim Halal IMA</Button>
		</div>
	</section>

	<section>
		<div class="mb-10 text-center">
			<div class="mb-3 flex items-center justify-center gap-2 font-semibold text-primary">
				<MessageSquareQuote class="h-5 w-5" />
				Testimoni
			</div>
			<h2 class="text-3xl font-bold">Cerita dari pelaku usaha dan komunitas</h2>
		</div>
		<div class="grid gap-5 md:grid-cols-3">
			{#each testimonials as testimonial (testimonial.name)}
				<Card.Root>
					<Card.Content class="pt-6">
						<p class="mb-6 text-muted-foreground">"{testimonial.quote}"</p>
						<div class="font-semibold">{testimonial.name}</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
</div>
