<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, ShieldCheck, Mail, Calendar } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { tr } from '$lib/i18n.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{tr('Detail User - Halal IMA Taiwan', 'User Detail - Halal IMA Taiwan')}</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-6">
		<Button variant="ghost" size="sm" onclick={() => goto('/admin')}>
			<ArrowLeft class="h-4 w-4 mr-2" /> {tr('Kembali ke Admin Panel', 'Back to Admin Panel')}
		</Button>
	</div>

	<div class="mb-8">
		<h1 class="text-3xl font-bold tracking-tight">{tr('Detail User', 'User Detail')}</h1>
		<p class="text-muted-foreground">ID: {data.profile.id}</p>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- User Information -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Informasi User', 'User Information')}</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Nama Perusahaan', 'Company Name')}</p>
					<p class="text-lg font-semibold">{data.profile.company_name || tr('Personal Account', 'Personal Account')}</p>
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Email', 'Email')}</p>
					<p class="text-lg flex items-center gap-2">
						<Mail class="h-4 w-4" /> {data.profile.email || tr('Tidak ada email', 'No email')}
					</p>
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Role', 'Role')}</p>
					<p class="text-lg font-semibold capitalize">{data.profile.role}</p>
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Status Verifikasi', 'Verification Status')}</p>
					{#if data.profile.is_verified}
						<p class="text-lg font-semibold text-green-600 flex items-center gap-2">
							<ShieldCheck class="h-5 w-5" /> {tr('Terverifikasi', 'Verified')}
						</p>
					{:else}
						<p class="text-lg font-semibold text-amber-600">{tr('Belum Diverifikasi', 'Not Verified')}</p>
					{/if}
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Tanggal Daftar', 'Registration Date')}</p>
					<p class="text-lg flex items-center gap-2">
						<Calendar class="h-4 w-4" /> {new Date(data.profile.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}
					</p>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Additional Information -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Informasi Tambahan', 'Additional Information')}</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('User ID', 'User ID')}</p>
					<p class="text-lg font-mono">{data.profile.id}</p>
				</div>
				{#if data.profile.updated_at}
					<div>
						<p class="text-sm font-medium text-muted-foreground">{tr('Terakhir Diperbarui', 'Last Updated')}</p>
						<p class="text-lg">{new Date(data.profile.updated_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Actions -->
	<Card.Root class="mt-6">
		<Card.Header>
			<Card.Title>{tr('Aksi', 'Actions')}</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex gap-2">
				{#if !data.profile.is_verified}
					<Button class="bg-green-600 hover:bg-green-700">{tr('Verifikasi Akun', 'Verify Account')}</Button>
				{/if}
				<Button variant="outline">{tr('Edit Profil', 'Edit Profile')}</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
