<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { tr } from '$lib/i18n.svelte';

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
	let fetchError = $state('');

	async function fetchCertificates() {
		isLoading = true;
		fetchError = '';
		try {
			const { data, error } = await supabase
				.from('certificates')
				.select('*')
				.order('id', { ascending: false });

			if (error) throw error;
			certificates = data || [];
		} catch (err) {
			console.error('Error fetching certificates:', err);
			certificates = [];
			fetchError = tr(
				'Database sertifikat belum bisa dimuat. Silakan coba lagi nanti.',
				'The certificate database could not be loaded. Please try again later.'
			);
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
	<title>{tr('Sertifikasi yang Diterbitkan', 'Issued Certificates')} - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<div class="mb-10 text-center md:text-left">
		<h1 class="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
			{tr('Sertifikasi yang Diterbitkan', 'Issued Certificates')}
		</h1>
		<p class="max-w-3xl text-xl text-muted-foreground">
			{tr(
				'Cari database resmi kami untuk memverifikasi status Halal perusahaan dan produk di Taiwan.',
				'Search our official database to verify the halal status of companies and products in Taiwan.'
			)}
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
				placeholder={tr(
					'Cari berdasarkan nama perusahaan atau nomor sertifikat...',
					'Search by company name or certificate number...'
				)}
				class="pl-9"
				bind:value={searchQuery}
			/>
		</div>
	</div>

	<div class="rounded-md border bg-card">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[250px]">{tr('Nama Perusahaan', 'Company Name')}</Table.Head>
					<Table.Head>{tr('No. Sertifikat', 'Certificate No.')}</Table.Head>
					<Table.Head>{tr('Tanggal Terbit', 'Issue Date')}</Table.Head>
					<Table.Head>{tr('Tanggal Kadaluarsa', 'Expiry Date')}</Table.Head>
					<Table.Head class="text-right">Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if isLoading}
					<Table.Row>
						<Table.Cell colspan={5} class="py-12 text-center text-muted-foreground"
							>{tr('Memuat database...', 'Loading database...')}</Table.Cell
						>
					</Table.Row>
				{:else if fetchError}
					<Table.Row>
						<Table.Cell colspan={5} class="py-12 text-center text-muted-foreground">
							{fetchError}
						</Table.Cell>
					</Table.Row>
				{:else if filteredCertificates.length === 0}
					<Table.Row>
						<Table.Cell colspan={5} class="py-12 text-center text-muted-foreground">
							{#if searchQuery}
								{tr('Tidak ada sertifikat yang ditemukan untuk', 'No certificates found for')} "{searchQuery}".
							{:else}
								{tr(
									'Belum ada sertifikat yang diterbitkan.',
									'No certificates have been issued yet.'
								)}
							{/if}
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
