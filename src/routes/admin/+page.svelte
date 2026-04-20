<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Users, ShieldAlert, CheckCircle2 } from 'lucide-svelte';

	let { data } = $props();

	type Profile = {
		id: string;
		company_name: string | null;
		email: string | null;
		role: 'admin' | 'company';
		is_verified: boolean;
		created_at: string;
	};
</script>

<svelte:head>
	<title>Admin Panel - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Panel Admin Halal IMA</h1>
			<p class="text-muted-foreground">Kelola pendaftaran perusahaan dan verifikasi akun.</p>
		</div>
		<div class="flex gap-2">
			<Button variant="outline" size="sm">Download Laporan</Button>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Perusahaan</Card.Title>
				<Users class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{data.profiles.length}</div>
				<p class="text-xs text-muted-foreground">Terdaftar di sistem</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Menunggu Verifikasi</Card.Title>
				<ShieldAlert class="h-4 w-4 text-amber-500" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold text-amber-600">{data.unverifiedCount}</div>
				<p class="text-xs text-muted-foreground">Perlu tinjauan admin</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Akun Aktif</Card.Title>
				<CheckCircle2 class="h-4 w-4 text-green-500" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold text-green-600">
					{data.profiles.filter((p: Profile) => p.is_verified).length}
				</div>
				<p class="text-xs text-muted-foreground">Sudah diverifikasi</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Role Admin</Card.Title>
				<Users class="h-4 w-4 text-primary" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">
					{data.profiles.filter((p: Profile) => p.role === 'admin').length}
				</div>
				<p class="text-xs text-muted-foreground">Pengurus organisasi</p>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Profiles Table -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Daftar Perusahaan & User</Card.Title>
			<Card.Description>Kelola status verifikasi dan informasi akun.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Nama Perusahaan / Email</Table.Head>
							<Table.Head>Role</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head>Tanggal Daftar</Table.Head>
							<Table.Head class="text-right">Aksi</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.profiles as profile (profile.id)}
							<Table.Row>
								<Table.Cell>
									<div class="flex flex-col min-w-[200px]">
										<span class="font-medium">{profile.company_name || 'Personal Account'}</span>
										<span class="text-xs text-muted-foreground">{profile.email || 'No email'}</span>
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
											<CheckCircle2 class="h-3 w-3" /> Terverifikasi
										</span>
									{:else}
										<span class="inline-flex items-center gap-1 text-xs font-medium text-amber-600 whitespace-nowrap">
											<ShieldAlert class="h-3 w-3" /> Pending
										</span>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-xs whitespace-nowrap">
									{new Date(profile.created_at).toLocaleDateString('id-ID')}
								</Table.Cell>
								<Table.Cell class="text-right whitespace-nowrap">
									<Button size="xs" variant="outline">Detail</Button>
									{#if !profile.is_verified}
										<Button size="xs" class="ml-1 bg-green-600 hover:bg-green-700">Verify</Button>
									{/if}
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Content>
	</Card.Root>
</div>
