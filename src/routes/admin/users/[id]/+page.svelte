<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch';
	import { ArrowLeft, Calendar, Loader2, Edit2, X } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { tr } from '$lib/i18n.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let { data, form } = $props();

	let isVerified = $derived(data.profile.is_verified);
	let toggling = $state(false);
	let navigatingBack = $state(false);
	let editingProfile = $state(false);
	let updatingProfile = $state(false);
</script>

<svelte:head>
	<title>{tr('Detail User - Halal IMA Taiwan', 'User Detail - Halal IMA Taiwan')}</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-6">
		<Button 
			variant="ghost" 
			size="sm" 
			disabled={navigatingBack}
			onclick={() => {
				navigatingBack = true;
				goto('/admin');
			}}
		>
			{#if navigatingBack}
				<Loader2 class="h-4 w-4 mr-2 animate-spin" />
			{:else}
				<ArrowLeft class="h-4 w-4 mr-2" />
			{/if}
			{tr('Kembali ke Admin Panel', 'Back to Admin Panel')}
		</Button>
	</div>

	{#if form?.success}
		<div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
			{tr('Status verifikasi berhasil diperbarui!', 'Verification status successfully updated!')}
		</div>
	{/if}

	{#if form?.error}
		<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
			{tr('Error:', 'Error:')} {form.error}
		</div>
	{/if}

	<div class="mb-8">
		<h1 class="text-3xl font-bold tracking-tight">{tr('Detail User', 'User Detail')}</h1>
		<p class="text-muted-foreground">ID: {data.profile.id}</p>
	</div>

	{#if form?.success}
		<div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
			{tr('Profil berhasil diperbarui!', 'Profile successfully updated!')}
		</div>
	{/if}

	{#if form?.error}
		<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
			{tr('Error:', 'Error:')} {form.error}
		</div>
	{/if}

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- User Information -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Informasi User', 'User Information')}</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				{#if editingProfile}
					<form 
						method="POST" 
						action="?/updateProfile" 
						use:enhance={() => {
							updatingProfile = true;
							return async ({ update }) => {
								await update();
								updatingProfile = false;
								editingProfile = false;
							};
						}}
						class="space-y-4"
					>
						<div class="space-y-2">
							<Label for="companyName">{tr('Nama Perusahaan', 'Company Name')}</Label>
							<Input 
								id="companyName" 
								name="companyName" 
								value={data.profile.company_name || ''} 
								placeholder={tr('Nama Perusahaan', 'Company Name')}
							/>
						</div>
						<div class="space-y-2">
							<Label for="email">{tr('Email', 'Email')}</Label>
							<Input 
								id="email" 
								name="email" 
								type="email"
								value={data.profile.email || ''} 
								placeholder="email@example.com"
							/>
						</div>
						<div class="space-y-2">
							<Label for="role">{tr('Role', 'Role')}</Label>
							<select 
								id="role" 
								name="role" 
								class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="company" selected={data.profile.role === 'company'}>Company</option>
								<option value="admin" selected={data.profile.role === 'admin'}>Admin</option>
							</select>
						</div>
						<Button type="submit" class="w-full" disabled={updatingProfile}>
							{#if updatingProfile}
								<Loader2 class="h-4 w-4 mr-2 animate-spin" />
							{/if}
							{tr('Simpan Perubahan', 'Save Changes')}
						</Button>
					</form>
				{:else}
					<div>
						<p class="text-sm font-medium text-muted-foreground">{tr('Nama Perusahaan', 'Company Name')}</p>
						<p class="text-lg font-semibold">{data.profile.company_name || tr('Personal Account', 'Personal Account')}</p>
					</div>
					<div>
						<p class="text-sm font-medium text-muted-foreground">{tr('Email', 'Email')}</p>
						<p class="text-lg font-semibold">{data.profile.email || tr('No email', 'No email')}</p>
					</div>
					<div>
						<p class="text-sm font-medium text-muted-foreground">{tr('Role', 'Role')}</p>
						<p class="text-lg font-semibold">{data.profile.role}</p>
					</div>
				{/if}
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Status Verifikasi', 'Verification Status')}</p>
					<div class="flex items-center gap-3">
						{#if toggling}
							<Loader2 class="h-5 w-5 animate-spin" />
						{:else}
							<form 
								method="POST" 
								action="?/toggleVerification" 
								use:enhance={() => {
									toggling = true;
									return async ({ update }) => {
										await update();
										toggling = false;
									};
								}}
							>
								<input type="hidden" name="isVerified" value={!isVerified} />
								<Switch 
									bind:checked={isVerified} 
									disabled={toggling}
									onchange={() => {
										const form = document.querySelector('form[action="?/toggleVerification"]') as HTMLFormElement;
										form?.requestSubmit();
									}}
								/>
							</form>
						{/if}
						<span class="text-lg font-semibold {isVerified ? 'text-green-600' : 'text-amber-600'}">
							{isVerified ? tr('Terverifikasi', 'Verified') : tr('Belum Diverifikasi', 'Not Verified')}
						</span>
					</div>
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
				{#if editingProfile}
				<Button variant="outline" onclick={() => editingProfile = false}>
					<X class="h-4 w-4 mr-2" />
					{tr('Batal', 'Cancel')}
				</Button>
			{:else}
				<Button variant="outline" onclick={() => editingProfile = true}>
					<Edit2 class="h-4 w-4 mr-2" />
					{tr('Edit Profil', 'Edit Profile')}
				</Button>
			{/if}
			</div>
		</Card.Content>
	</Card.Root>
</div>
