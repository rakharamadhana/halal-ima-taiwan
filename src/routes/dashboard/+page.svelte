<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import {
		Building2,
		ShieldCheck,
		Clock,
		AlertCircle,
		FilePlus,
		ArrowRight,
		CheckCircle2,
		LayoutDashboard
	} from 'lucide-svelte';

	let { data } = $props();

	type Certificate = {
		id: string;
		cert_no: string;
		expiry_date: string;
		status: string;
	};
</script>

<svelte:head>
	<title>Dashboard Perusahaan - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Welcome Header -->
	<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">
				{data.user?.role === 'admin' ? 'Panel Admin' : 'Dashboard Perusahaan'}
			</h1>
			<p class="text-muted-foreground">
				Selamat datang, <span class="font-semibold text-foreground"
					>{data.user?.company_name || data.user?.email}</span
				>.
			</p>
		</div>
		<div class="flex gap-2">
			{#if data.user?.role === 'admin'}
				<Button href="/admin" class="gap-2 bg-primary font-bold">
					<LayoutDashboard class="h-4 w-4" /> Kelola Admin
				</Button>
			{:else}
				<Button href="/procedures" variant="outline" size="sm">Pelajari Prosedur</Button>
				<Button size="sm" class="gap-2" href="/dashboard/request">
					<FilePlus class="h-4 w-4" /> Ajukan Sertifikasi Baru
				</Button>
			{/if}
		</div>
	</div>

	<!-- Verification Alert -->
	{#if data.user}
		{#if !data.user.is_verified}
			<div
				class="mb-8 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400"
			>
				<AlertCircle class="mt-0.5 h-6 w-6 shrink-0" />
				<div class="space-y-1">
					<h3 class="text-lg font-bold">Akun Menunggu Verifikasi</h3>
					<p class="text-sm opacity-90">
						Tim Halal IMA sedang meninjau pendaftaran perusahaan Anda. Beberapa fitur mungkin dibatasi
						hingga akun Anda diverifikasi secara resmi. Kami akan segera menghubungi Anda.
					</p>
				</div>
			</div>
		{:else}
			<div
				class="mb-8 flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-6 text-green-800 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400"
			>
				<CheckCircle2 class="mt-0.5 h-6 w-6 shrink-0" />
				<div class="space-y-1">
					<h3 class="text-lg font-bold">Akun Terverifikasi</h3>
					<p class="text-sm opacity-90">
						Selamat! Akun perusahaan Anda telah diverifikasi secara resmi oleh Halal IMA. Anda sekarang
						memiliki akses penuh ke semua fitur dashboard.
					</p>
				</div>
			</div>
		{/if}
	{/if}

	<!-- Quick Stats -->
	<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Status Akun</Card.Title>
				{#if data.user?.is_verified}
					<ShieldCheck class="h-4 w-4 text-green-500" />
				{:else}
					<Clock class="h-4 w-4 text-amber-500" />
				{/if}
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">
					{data.user?.is_verified ? 'Terverifikasi' : 'Menunggu'}
				</div>
				<p class="text-xs text-muted-foreground">Status pendaftaran di Halal IMA</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Sertifikat Aktif</Card.Title>
				<CheckCircle2 class="h-4 w-4 text-primary" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">
					{data.myCertificates.filter((c: Certificate) => c.status === 'Aktif').length}
				</div>
				<p class="text-xs text-muted-foreground">Lisensi yang berlaku saat ini</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Pengajuan</Card.Title>
				<Building2 class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{data.myCertificates.length}</div>
				<p class="text-xs text-muted-foreground">Riwayat sertifikasi Anda</p>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="grid gap-8 lg:grid-cols-3">
		<!-- Active Certificates Table -->
		<Card.Root class="lg:col-span-2">
			<Card.Header>
				<Card.Title>Sertifikat Anda</Card.Title>
				<Card.Description>Daftar sertifikat resmi yang diterbitkan untuk Anda.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="overflow-x-auto">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>No. Sertifikat</Table.Head>
								<Table.Head>Berlaku Hingga</Table.Head>
								<Table.Head>Status</Table.Head>
								<Table.Head class="text-right">Aksi</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#if data.myCertificates.length === 0}
								<Table.Row>
									<Table.Cell colspan={4} class="py-8 text-center text-muted-foreground">
										Belum ada sertifikat yang ditemukan.
									</Table.Cell>
								</Table.Row>
							{:else}
								{#each data.myCertificates as cert (cert.id)}
									<Table.Row>
										<Table.Cell class="whitespace-nowrap font-mono font-medium">{cert.cert_no}</Table.Cell>
										<Table.Cell class="whitespace-nowrap">{cert.expiry_date}</Table.Cell>
										<Table.Cell>
											<span
												class={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cert.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
											>
												{cert.status}
											</span>
										</Table.Cell>
										<Table.Cell class="text-right">
											<Button size="xs" variant="ghost">Lihat</Button>
										</Table.Cell>
									</Table.Row>
								{/each}
							{/if}
						</Table.Body>
					</Table.Root>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Sidebar / Actions -->
		<div class="space-y-6">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">Butuh Bantuan?</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<p class="text-sm text-muted-foreground">
						Jika Anda mengalami kendala atau butuh informasi lebih lanjut mengenai proses
						sertifikasi, hubungi kami.
					</p>
					<Button variant="outline" class="w-full justify-between" href="/contact">
						Hubungi Tim Support <ArrowRight class="h-4 w-4" />
					</Button>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-primary/20 bg-primary/5">
				<Card.Header>
					<Card.Title class="text-lg">Tips Verifikasi</Card.Title>
				</Card.Header>
				<Card.Content>
					<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
						<li>Pastikan dokumen pendaftaran lengkap</li>
						<li>Siapkan foto lokasi usaha yang jelas</li>
						<li>Gunakan bahan baku bersertifikat Halal</li>
						<li>Perbarui profil perusahaan secara berkala</li>
					</ul>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
