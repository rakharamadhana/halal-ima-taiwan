<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';

	interface Certificate {
		id: number;
		company_name: string;
		cert_no: string;
		issue_date: string;
		expiry_date: string;
		status: string;
	}

	let certificates = $state<Certificate[]>([]);
	let searchQuery = $state('');
	let isLoading = $state(true);

	// Mock data for initial view or if no Supabase is configured
	const mockData: Certificate[] = [
		{
			id: 1,
			company_name: 'Taiwan Halal Food Co.',
			cert_no: 'HIT-2026-001',
			issue_date: '2026-01-15',
			expiry_date: '2027-01-14',
			status: 'Aktif'
		},
		{
			id: 2,
			company_name: 'Formosa Restaurant',
			cert_no: 'HIT-2025-089',
			issue_date: '2025-11-20',
			expiry_date: '2026-11-19',
			status: 'Aktif'
		},
		{
			id: 3,
			company_name: 'Taipei Bakeries Ltd.',
			cert_no: 'HIT-2024-042',
			issue_date: '2024-05-10',
			expiry_date: '2025-05-09',
			status: 'Berakhir'
		}
	];

	async function fetchCertificates() {
		isLoading = true;
		try {
			if (
				!import.meta.env.VITE_SUPABASE_URL ||
				import.meta.env.VITE_SUPABASE_URL === 'your-supabase-url'
			) {
				certificates = mockData;
				return;
			}

			const { data, error } = await supabase
				.from('certificates')
				.select('*')
				.order('id', { ascending: false });

			if (error) throw error;
			certificates = data || [];
		} catch (err) {
			console.error('Error fetching certificates:', err);
			// Fallback to mock data for demonstration
			certificates = mockData;
		} finally {
			isLoading = false;
		}
	}

	let filteredCertificates = $derived(
		certificates.filter(
			(cert) =>
				cert.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				cert.cert_no.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	onMount(() => {
		fetchCertificates();
	});
</script>

<svelte:head>
	<title>Sertifikasi yang Diterbitkan - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<div class="mb-10 text-center md:text-left">
		<h1 class="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
			Sertifikasi yang Diterbitkan
		</h1>
		<p class="max-w-3xl text-xl text-muted-foreground">
			Cari database resmi kami untuk memverifikasi status Halal perusahaan dan produk di Taiwan.
		</p>
	</div>

	<div class="mb-6 flex items-center">
		<div class="relative w-full max-w-md">
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
				class="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground"
				><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
			>
			<Input
				type="search"
				placeholder="Cari berdasarkan nama perusahaan atau nomor sertifikat..."
				class="pl-9"
				bind:value={searchQuery}
			/>
		</div>
	</div>

	<div class="rounded-md border bg-card">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[250px]">Nama Perusahaan</Table.Head>
					<Table.Head>No. Sertifikat</Table.Head>
					<Table.Head>Tanggal Terbit</Table.Head>
					<Table.Head>Tanggal Kadaluarsa</Table.Head>
					<Table.Head class="text-right">Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if isLoading}
					<Table.Row>
						<Table.Cell colspan={5} class="py-12 text-center text-muted-foreground"
							>Memuat database...</Table.Cell
						>
					</Table.Row>
				{:else if filteredCertificates.length === 0}
					<Table.Row>
						<Table.Cell colspan={5} class="py-12 text-center text-muted-foreground">
							Tidak ada sertifikat yang ditemukan untuk "{searchQuery}".
						</Table.Cell>
					</Table.Row>
				{:else}
					{#each filteredCertificates as cert (cert.id)}
						<Table.Row>
							<Table.Cell class="font-medium">{cert.company_name}</Table.Cell>
							<Table.Cell class="font-mono text-sm">{cert.cert_no}</Table.Cell>
							<Table.Cell>{cert.issue_date}</Table.Cell>
							<Table.Cell>{cert.expiry_date}</Table.Cell>
							<Table.Cell class="text-right">
								<span
									class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${['aktif', 'active'].includes(cert.status.toLowerCase()) ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
								>
									{cert.status}
								</span>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</div>
