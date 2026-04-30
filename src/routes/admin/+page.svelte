<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Users, ShieldAlert, CheckCircle2, FileText, Loader2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { tr } from '$lib/i18n.svelte';

	let { data } = $props();

	type Profile = {
		id: string;
		company_name: string | null;
		email: string | null;
		role: 'admin' | 'company';
		is_verified: boolean;
		created_at: string;
	};

	type CertificationRequest = {
		id: number;
		applicant_user_id: string;
		company_name: string;
		contact_email: string;
		requested_scope: string;
		status: string;
		created_at: string;
	};

	let certificationRequests: CertificationRequest[] = $derived(data.certificationRequests);
	let navigatingTo = $state<number | null>(null);
</script>

<svelte:head>
	<title>Admin Panel - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{tr('Panel Admin Halal IMA', 'Halal IMA Admin Panel')}</h1>
			<p class="text-muted-foreground">{tr('Kelola pendaftaran perusahaan dan verifikasi akun.', 'Manage company registration and account verification.')}</p>
		</div>
		<div class="flex gap-2">
			<Button variant="outline" size="sm">{tr('Download Laporan', 'Download Report')}</Button>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">{tr('Total Perusahaan', 'Total Companies')}</Card.Title>
				<Users class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{data.profiles.length}</div>
				<p class="text-xs text-muted-foreground">{tr('Terdaftar di sistem', 'Registered in system')}</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">{tr('Menunggu Verifikasi', 'Pending Verification')}</Card.Title>
				<ShieldAlert class="h-4 w-4 text-amber-500" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold text-amber-600">{data.unverifiedCount}</div>
				<p class="text-xs text-muted-foreground">{tr('Perlu tinjauan admin', 'Needs admin review')}</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">{tr('Sertifikasi Berjalan', 'Ongoing Certifications')}</Card.Title>
				<FileText class="h-4 w-4 text-blue-500" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold text-blue-600">{data.certificationRequests.length}</div>
				<p class="text-xs text-muted-foreground">{tr('Proses sertifikasi aktif', 'Active certification processes')}</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">{tr('Akun Aktif', 'Active Accounts')}</Card.Title>
				<CheckCircle2 class="h-4 w-4 text-green-500" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold text-green-600">
					{data.profiles.filter((p: Profile) => p.is_verified).length}
				</div>
				<p class="text-xs text-muted-foreground">{tr('Sudah diverifikasi', 'Verified')}</p>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Profiles Table -->
	<Card.Root>
		<Card.Header>
			<Card.Title>{tr('Daftar Perusahaan & User', 'Company & User List')}</Card.Title>
			<Card.Description>{tr('Kelola status verifikasi dan informasi akun.', 'Manage verification status and account information.')}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>{tr('Nama Perusahaan / Email', 'Company Name / Email')}</Table.Head>
							<Table.Head>{tr('Role', 'Role')}</Table.Head>
							<Table.Head>{tr('Status', 'Status')}</Table.Head>
							<Table.Head>{tr('Tanggal Daftar', 'Registration Date')}</Table.Head>
							<Table.Head class="text-right">{tr('Aksi', 'Action')}</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.profiles as profile (profile.id)}
							<Table.Row>
								<Table.Cell>
									<div class="flex flex-col min-w-[200px]">
										<span class="font-medium">{profile.company_name || tr('Personal Account', 'Personal Account')}</span>
										<span class="text-xs text-muted-foreground">{profile.email || tr('No email', 'No email')}</span>
									</div>
								</Table.Cell>
								<Table.Cell>
									<span
										class={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${profile.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}
									>
										{profile.role}
									</span>
								</Table.Cell>
								<Table.Cell>
									{#if profile.is_verified}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-green-600 whitespace-nowrap">
											<CheckCircle2 class="h-3 w-3" /> {tr('Terverifikasi', 'Verified')}
										</span>
									{:else}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-amber-600 whitespace-nowrap">
											<ShieldAlert class="h-3 w-3" /> {tr('Pending', 'Pending')}
										</span>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-xs whitespace-nowrap">
									{new Date(profile.created_at).toLocaleDateString('id-ID')}
								</Table.Cell>
								<Table.Cell class="text-right whitespace-nowrap">
									<Button size="xs" variant="outline" onclick={() => goto(`/admin/users/${profile.id}`)}>{tr('Detail', 'Detail')}</Button>
									{#if !profile.is_verified}
										<Button size="xs" class="ml-1 bg-green-600 hover:bg-green-700">{tr('Verify', 'Verify')}</Button>
									{/if}
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Certification Requests Table -->
	<Card.Root class="mt-8">
		<Card.Header>
			<Card.Title>{tr('Permintaan Sertifikasi', 'Certification Requests')}</Card.Title>
			<Card.Description>{tr('Daftar permintaan sertifikasi yang sedang diproses.', 'List of certification requests being processed.')}</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>{tr('Nama Perusahaan', 'Company Name')}</Table.Head>
							<Table.Head>{tr('Email Kontak', 'Contact Email')}</Table.Head>
							<Table.Head>{tr('Scope', 'Scope')}</Table.Head>
							<Table.Head>{tr('Status', 'Status')}</Table.Head>
							<Table.Head>{tr('Tanggal', 'Date')}</Table.Head>
							<Table.Head class="text-right">{tr('Aksi', 'Action')}</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each certificationRequests as request (request.id)}
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">{request.company_name}</div>
								</Table.Cell>
								<Table.Cell>
									<div class="text-sm text-muted-foreground">{request.contact_email}</div>
								</Table.Cell>
								<Table.Cell>
									<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
										{request.requested_scope}
									</span>
								</Table.Cell>
								<Table.Cell>
									{#if request.status === 'submitted'}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-amber-600 whitespace-nowrap">
											<ShieldAlert class="h-3 w-3" /> {tr('Submitted', 'Submitted')}
										</span>
									{:else if request.status === 'under_review'}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-blue-600 whitespace-nowrap">
											<FileText class="h-3 w-3" /> {tr('Under Review', 'Under Review')}
										</span>
									{:else if request.status === 'approved'}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-green-600 whitespace-nowrap">
											<CheckCircle2 class="h-3 w-3" /> {tr('Approved', 'Approved')}
										</span>
									{:else if request.status === 'rejected'}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-red-600 whitespace-nowrap">
											<ShieldAlert class="h-3 w-3" /> {tr('Rejected', 'Rejected')}
										</span>
									{:else}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-gray-600 whitespace-nowrap">
											{request.status}
										</span>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-xs whitespace-nowrap">
									{new Date(request.created_at).toLocaleDateString('id-ID')}
								</Table.Cell>
								<Table.Cell class="text-right whitespace-nowrap">
									<Button 
										size="xs" 
										variant="outline" 
										disabled={navigatingTo === request.id}
										onclick={() => {
											navigatingTo = request.id;
											goto(`/admin/certification/${request.id}`);
										}}
									>
										{#if navigatingTo === request.id}
											<Loader2 class="h-3 w-3 animate-spin" />
										{:else}
											{tr('Detail', 'Detail')}
										{/if}
									</Button>
									{#if request.status === 'submitted'}
										<Button 
											size="xs" 
											class="ml-1 bg-blue-600 hover:bg-blue-700" 
											disabled={navigatingTo === request.id}
											onclick={() => {
												navigatingTo = request.id;
												goto(`/admin/certification/${request.id}`);
											}}
										>
											{#if navigatingTo === request.id}
												<Loader2 class="h-3 w-3 animate-spin" />
											{:else}
												{tr('Review', 'Review')}
											{/if}
										</Button>
									{/if}
								</Table.Cell>
							</Table.Row>
						{/each}
						{#if certificationRequests.length === 0}
							<Table.Row>
								<Table.Cell colspan={6} class="text-center text-muted-foreground py-8">
									{tr('Tidak ada permintaan sertifikasi yang sedang diproses', 'No certification requests being processed')}
								</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Content>
	</Card.Root>
</div>
