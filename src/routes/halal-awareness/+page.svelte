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
	import { tr } from '$lib/i18n.svelte';

	const halalReasons = $derived([
		{
			title: tr('Aman untuk konsumen muslim', 'Safe for Muslim Consumers'),
			desc: tr(
				'Halal membantu konsumen merasa tenang karena bahan, proses, penyimpanan, dan penyajian diperiksa dengan standar yang jelas.',
				'Halal helps consumers feel confident because ingredients, processes, storage, and serving are checked against clear standards.'
			)
		},
		{
			title: tr('Membangun kepercayaan usaha', 'Build Business Trust'),
			desc: tr(
				'Label dan lisensi halal memberi sinyal bahwa bisnis serius menjaga transparansi, kebersihan, dan tanggung jawab kepada pelanggan.',
				'A halal label and license signal that a business takes transparency, cleanliness, and customer responsibility seriously.'
			)
		},
		{
			title: tr('Membuka pasar baru', 'Open New Markets'),
			desc: tr(
				'Komunitas muslim, wisatawan, pelajar, dan pekerja migran di Taiwan lebih mudah memilih usaha yang status halalnya terverifikasi.',
				'Muslim communities, tourists, students, and migrant workers in Taiwan can more easily choose businesses with verified halal status.'
			)
		}
	]);

	const awarenessPoints = $derived([
		tr(
			'Memisahkan bahan halal dan non-halal sejak pembelian, penyimpanan, hingga proses produksi.',
			'Separate halal and non-halal ingredients from purchasing, storage, and production.'
		),
		tr(
			'Menghindari kontaminasi silang dari alat masak, ruang simpan, minyak, bumbu, atau bahan tambahan.',
			'Prevent cross-contamination from cookware, storage areas, oil, seasoning, or additives.'
		),
		tr(
			'Mendokumentasikan pemasok, komposisi bahan, dan alur kerja agar proses audit berjalan lebih mudah.',
			'Document suppliers, ingredient composition, and workflows so audits run more smoothly.'
		),
		tr(
			'Melatih staf agar memahami praktik dasar halal di dapur, restoran, hotel, dan area layanan.',
			'Train staff to understand basic halal practices in kitchens, restaurants, hotels, and service areas.'
		)
	]);

	const populationFacts = $derived([
		{
			value: tr('23,4 juta', '23.4 million'),
			label: tr(
				'Perkiraan total populasi Taiwan pada 2024 menurut data statistik nasional yang dirangkum Trading Economics.',
				'Estimated total population of Taiwan in 2024 according to national statistics summarized by Trading Economics.'
			)
		},
		{
			value: tr('250-300 ribu', '250-300 thousand'),
			label: tr(
				'Estimasi jumlah muslim di Taiwan, karena agama tidak dicatat dalam statistik kependudukan resmi.',
				'Estimated Muslim population in Taiwan, since religion is not recorded in official population statistics.'
			)
		},
		{
			value: '1,0-1,3%',
			label: tr(
				'Perkiraan porsi muslim dari total populasi Taiwan, didorong oleh komunitas lokal dan pekerja migran.',
				'Estimated Muslim share of Taiwan total population, driven by local communities and migrant workers.'
			)
		}
	]);

	const testimonials = $derived([
		{
			name: tr('Pemilik Restoran Indonesia di Taipei', 'Indonesian Restaurant Owner in Taipei'),
			quote: tr(
				'Setelah proses halal dijelaskan dengan sederhana, kami jadi lebih paham cara menjaga bahan dan alat agar pelanggan muslim merasa aman.',
				'After the halal process was explained clearly, we better understood how to manage ingredients and tools so Muslim customers feel safe.'
			)
		},
		{
			name: tr('Pelaku Usaha Kuliner di Taoyuan', 'Culinary Business Owner in Taoyuan'),
			quote: tr(
				'Lisensi halal membantu pelanggan baru lebih percaya. Banyak yang bertanya status halal sebelum datang bersama teman atau keluarga.',
				'A halal license helps new customers trust us more. Many ask about halal status before coming with friends or family.'
			)
		},
		{
			name: tr('Komunitas Muslim Taiwan', 'Muslim Community in Taiwan'),
			quote: tr(
				'Kami terbantu ketika tempat makan punya informasi halal yang jelas, karena pilihan menjadi lebih mudah dan tidak menebak-nebak.',
				'Clear halal information at dining places helps us choose more easily without guessing.'
			)
		}
	]);
</script>

<svelte:head>
	<title
		>{tr('Informasi Halal & Awareness', 'Halal Information & Awareness')} - Halal IMA Taiwan</title
	>
	<meta
		name="description"
		content={tr(
			'Informasi halal, alasan pentingnya lisensi halal, testimoni, sambutan ketua IMA, dan data populasi muslim di Taiwan.',
			'Halal information, reasons halal licensing matters, testimonials, a message from the IMA Chair, and Muslim population data in Taiwan.'
		)}
	/>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-16">
	<section class="mb-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
		<div class="space-y-6">
			<div
				class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
			>
				<BookOpenCheck class="h-4 w-4" />
				{tr('Informasi Halal', 'Halal Information')}
			</div>
			<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl">
				{tr(
					'Halal bukan sekadar label, tapi komitmen menjaga kepercayaan.',
					'Halal is not just a label, but a commitment to maintaining trust.'
				)}
			</h1>
			<p class="max-w-3xl text-lg leading-relaxed text-muted-foreground">
				{tr(
					'Halal IMA Taiwan hadir untuk membantu pelaku usaha memahami, menyiapkan, dan menjaga standar halal secara praktis di lingkungan bisnis Taiwan.',
					'Halal IMA Taiwan helps business owners understand, prepare, and maintain halal standards practically within Taiwan business environment.'
				)}
			</p>
			<div class="flex flex-col gap-3 sm:flex-row">
				<Button href="/procedures" size="lg" class="font-bold">
					{tr('Ajukan Lisensi Halal', 'Apply for a Halal License')}
				</Button>
				<Button href="/contact" variant="outline" size="lg" class="font-bold"
					>{tr('Konsultasi Dulu', 'Consult First')}</Button
				>
			</div>
		</div>

		<Card.Root class="border-primary/20 bg-primary/5">
			<Card.Header>
				<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
					<ShieldCheck class="h-6 w-6 text-primary" />
				</div>
				<Card.Title class="text-2xl"
					>{tr('Apa yang dimaksud halal?', 'What does halal mean?')}</Card.Title
				>
			</Card.Header>
			<Card.Content class="space-y-4 text-muted-foreground">
				<p>
					{tr(
						'Halal berarti sesuatu yang diperbolehkan menurut syariat Islam. Dalam konteks usaha, halal mencakup bahan, proses produksi, alat, penyimpanan, distribusi, hingga cara penyajian.',
						'Halal means something permitted under Islamic law. In business, halal covers ingredients, production processes, tools, storage, distribution, and serving methods.'
					)}
				</p>
				<p>
					{tr(
						'Karena itu, lisensi halal bukan hanya pemeriksaan akhir, melainkan sistem yang membantu bisnis menjaga konsistensi dari hulu ke hilir.',
						'That is why a halal license is not just a final check, but a system that helps businesses maintain consistency from end to end.'
					)}
				</p>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="mb-20">
		<div class="mb-10 max-w-3xl">
			<h2 class="mb-4 text-3xl font-bold">{tr('Kenapa Harus Halal?', 'Why Halal?')}</h2>
			<p class="text-muted-foreground">
				{tr(
					'Untuk usaha di Taiwan, halal awareness membuat layanan lebih inklusif, terpercaya, dan siap melayani kebutuhan komunitas muslim yang terus aktif.',
					'For businesses in Taiwan, halal awareness makes services more inclusive, trusted, and ready to serve the needs of active Muslim communities.'
				)}
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
			<h2 class="mb-4 text-3xl font-bold">
				{tr('Halal Awareness untuk Pelaku Usaha', 'Halal Awareness for Business Owners')}
			</h2>
			<p class="text-muted-foreground">
				{tr(
					'Kesadaran halal dimulai dari kebiasaan operasional harian. Tim Halal IMA membantu bisnis menerjemahkan prinsip halal menjadi langkah kerja yang bisa dijalankan staf.',
					'Halal awareness starts with daily operational habits. The Halal IMA team helps businesses translate halal principles into practical staff workflows.'
				)}
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
					{tr('Data Populasi Muslim di Taiwan', 'Muslim Population Data in Taiwan')}
				</div>
				<h2 class="text-3xl font-bold">
					{tr(
						'Pasar muslim di Taiwan nyata dan perlu dilayani.',
						'The Muslim market in Taiwan is real and worth serving.'
					)}
				</h2>
			</div>
			<p class="max-w-md text-sm text-muted-foreground">
				{tr(
					'Catatan: Taiwan tidak mencatat agama dalam statistik kependudukan resmi, sehingga angka muslim ditampilkan sebagai estimasi.',
					'Note: Taiwan does not record religion in official population statistics, so Muslim figures are shown as estimates.'
				)}
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
			{tr(
				'Sumber ringkas: National Immigration Agency Taiwan menerbitkan statistik warga asing menurut kewarganegaraan; Pew Research Center menyoroti keragaman agama Taiwan; estimasi komunitas muslim umumnya menggabungkan data migrasi, komunitas lokal, dan rujukan akademik.',
				'Brief sources: Taiwan National Immigration Agency publishes foreign resident statistics by nationality; Pew Research Center highlights Taiwan religious diversity; Muslim community estimates generally combine migration data, local communities, and academic references.'
			)}
		</p>
	</section>

	<section class="mb-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<Card.Root class="border-primary/20 bg-primary/5">
			<Card.Header>
				<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
					<HeartHandshake class="h-6 w-6 text-primary" />
				</div>
				<Card.Title class="text-2xl"
					>{tr('Kata Sambutan Ketua IMA', 'Message from the IMA Chair')}</Card.Title
				>
				<Card.Description
					>{tr(
						'Ogi, Ketua International Madani Association Taiwan',
						'Ogi, Chair of International Madani Association Taiwan'
					)}</Card.Description
				>
			</Card.Header>
			<Card.Content class="space-y-4 text-muted-foreground">
				<p>
					{tr(
						"Assalamu'alaikum warahmatullahi wabarakatuh. Melalui Halal IMA Taiwan, kami mengajak seluruh pelaku usaha untuk menjadikan halal awareness sebagai bagian dari pelayanan yang jujur, bersih, dan bertanggung jawab.",
						"Assalamu'alaikum warahmatullahi wabarakatuh. Through Halal IMA Taiwan, we invite all business owners to make halal awareness part of honest, clean, and responsible service."
					)}
				</p>
				<p>
					{tr(
						'Kebutuhan halal bukan hanya milik konsumen muslim, tetapi juga menjadi nilai tambah bagi bisnis yang ingin dipercaya lebih luas. Semoga ikhtiar ini mempererat hubungan pelaku usaha, komunitas muslim, dan masyarakat Taiwan.',
						'Halal needs are not only for Muslim consumers; they also add value for businesses that want wider trust. May this effort strengthen ties between business owners, Muslim communities, and Taiwanese society.'
					)}
				</p>
			</Card.Content>
		</Card.Root>

		<div class="space-y-5">
			<div class="flex items-center gap-2 font-semibold text-primary">
				<UsersRound class="h-5 w-5" />
				{tr('Ajakan Kolaborasi', 'Collaboration Invitation')}
			</div>
			<h2 class="text-3xl font-bold">
				{tr('Mari jadikan Taiwan lebih ramah halal.', 'Let us make Taiwan more halal-friendly.')}
			</h2>
			<p class="text-muted-foreground">
				{tr(
					'Halal IMA membuka ruang konsultasi bagi warung makan, restoran, supplier daging, hotel, tempat wisata, dan bisnis lain yang ingin mulai menata sistem halal secara bertahap.',
					'Halal IMA offers consultation for food stalls, restaurants, meat suppliers, hotels, tourist attractions, and other businesses that want to gradually build halal systems.'
				)}
			</p>
			<Button href="/contact" size="lg" class="font-bold">
				{tr('Hubungi Tim Halal IMA', 'Contact the Halal IMA Team')}
			</Button>
		</div>
	</section>

	<section>
		<div class="mb-10 text-center">
			<div class="mb-3 flex items-center justify-center gap-2 font-semibold text-primary">
				<MessageSquareQuote class="h-5 w-5" />
				{tr('Testimoni', 'Testimonials')}
			</div>
			<h2 class="text-3xl font-bold">
				{tr(
					'Cerita dari pelaku usaha dan komunitas',
					'Stories from business owners and the community'
				)}
			</h2>
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
