<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, FileText, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { tr } from '$lib/i18n.svelte';

	let { data, form } = $props();

	let status = $derived(data.request.status);
	let adminNotes = $derived(data.request.admin_notes || '');
	let submitting = $state(false);
</script>

<svelte:head>
	<title>{tr('Detail Sertifikasi - Halal IMA Taiwan', 'Certification Detail - Halal IMA Taiwan')}</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-6">
		<Button variant="ghost" size="sm" onclick={() => goto('/admin')}>
			<ArrowLeft class="h-4 w-4 mr-2" /> {tr('Kembali ke Admin Panel', 'Back to Admin Panel')}
		</Button>
	</div>

	<div class="mb-8">
		<h1 class="text-3xl font-bold tracking-tight">{tr('Detail Permintaan Sertifikasi', 'Certification Request Detail')}</h1>
		<p class="text-muted-foreground">ID: #{data.request.id}</p>
	</div>

	{#if form?.success}
		<div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
			{tr('Status berhasil diperbarui!', 'Status successfully updated!')}
		</div>
	{/if}

	{#if form?.error}
		<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
			{tr('Error:', 'Error:')} {form.error}
		</div>
	{/if}

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Company Information -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Informasi Perusahaan', 'Company Information')}</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Nama Perusahaan', 'Company Name')}</p>
					<p class="text-lg font-semibold">{data.request.company_name}</p>
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Email Kontak', 'Contact Email')}</p>
					<p class="text-lg">{data.request.contact_email}</p>
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Scope yang Diminta', 'Requested Scope')}</p>
					<p class="text-lg font-semibold">{data.request.requested_scope}</p>
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Status Saat Ini', 'Current Status')}</p>
					{#if status === 'submitted'}
						<span class="inline-flex items-center gap-2 text-lg font-medium text-amber-600">
							<AlertCircle class="h-5 w-5" /> Submitted
						</span>
					{:else if status === 'under_review'}
						<span class="inline-flex items-center gap-2 text-lg font-medium text-blue-600">
							<FileText class="h-5 w-5" /> Under Review
						</span>
					{:else if status === 'approved'}
						<span class="inline-flex items-center gap-2 text-lg font-medium text-green-600">
							<CheckCircle2 class="h-5 w-5" /> Approved
						</span>
					{:else if status === 'rejected'}
						<span class="inline-flex items-center gap-2 text-lg font-medium text-red-600">
							<XCircle class="h-5 w-5" /> Rejected
						</span>
					{:else if status === 'issued'}
						<span class="inline-flex items-center gap-2 text-lg font-medium text-green-600">
							<CheckCircle2 class="h-5 w-5" /> Issued
						</span>
					{/if}
				</div>
				<div>
					<p class="text-sm font-medium text-muted-foreground">{tr('Tanggal Pengajuan', 'Submission Date')}</p>
					<p class="text-lg">{new Date(data.request.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Products -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Produk', 'Products')}</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if data.request.products && data.request.products.length > 0}
					<ul class="space-y-2">
						{#each data.request.products as product, i (i)}
							<li class="p-3 bg-secondary/50 rounded-lg">
								<p class="font-medium">{product.name || 'Unnamed Product'}</p>
								{#if product.description}
									<p class="text-sm text-muted-foreground">{product.description}</p>
								{/if}
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-muted-foreground">{tr('Tidak ada produk terdaftar', 'No products registered')}</p>
				{/if}
			</Card.Content>
		</Card.Root>

		<!-- Ingredients -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Bahan Baku', 'Ingredients')}</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if data.request.ingredients && data.request.ingredients.length > 0}
					<ul class="space-y-2">
						{#each data.request.ingredients as ingredient, i (i)}
							<li class="p-3 bg-secondary/50 rounded-lg">
								<p class="font-medium">{ingredient.name || 'Unnamed Ingredient'}</p>
								{#if ingredient.source}
									<p class="text-sm text-muted-foreground">{tr('Sumber:', 'Source:')} {ingredient.source}</p>
								{/if}
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-muted-foreground">{tr('Tidak ada bahan baku terdaftar', 'No ingredients registered')}</p>
				{/if}
			</Card.Content>
		</Card.Root>

		<!-- Halal Control Plan -->
		<Card.Root>
			<Card.Header>
				<Card.Title>{tr('Rencana Kontrol Halal', 'Halal Control Plan')}</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if data.request.halal_control_plan && Object.keys(data.request.halal_control_plan).length > 0}
					<div class="space-y-3">
						{#each Object.entries(data.request.halal_control_plan) as [key, value], i (i)}
							<div class="p-3 bg-secondary/50 rounded-lg">
								<p class="font-medium capitalize">{key.replace(/_/g, ' ')}</p>
								<p class="text-sm text-muted-foreground">{value}</p>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-muted-foreground">{tr('Tidak ada rencana kontrol halal terdaftar', 'No halal control plan registered')}</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Admin Actions -->
	<Card.Root class="mt-6">
		<Card.Header>
			<Card.Title>{tr('Aksi Admin', 'Admin Actions')}</Card.Title>
			<Card.Description>{tr('Update status dan tambahkan catatan admin', 'Update status and add admin notes')}</Card.Description>
		</Card.Header>
		<Card.Content>
			<form 
				method="POST" 
				action="?/updateStatus" 
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				<input type="hidden" name="id" value={data.request.id} />
				
				<div class="space-y-4">
					<div>
						<label for="status" class="block text-sm font-medium mb-2">{tr('Status Baru', 'New Status')}</label>
						<select id="status" name="status" class="w-full p-2 border rounded-md" required>
							<option value="submitted" selected={status === 'submitted'}>Submitted</option>
							<option value="under_review" selected={status === 'under_review'}>Under Review</option>
							<option value="approved" selected={status === 'approved'}>Approved</option>
							<option value="rejected" selected={status === 'rejected'}>Rejected</option>
							<option value="issued" selected={status === 'issued'}>Issued</option>
						</select>
					</div>
					
					<div>
						<label for="adminNotes" class="block text-sm font-medium mb-2">{tr('Catatan Admin', 'Admin Notes')}</label>
						<textarea 
							id="adminNotes"
							name="adminNotes" 
							class="w-full p-2 border rounded-md" 
							rows="4"
							placeholder={tr('Tambahkan catatan untuk permintaan ini...', 'Add notes for this request...')}
						>{adminNotes}</textarea>
					</div>

					{#if adminNotes}
						<div class="p-3 bg-amber-50 border border-amber-200 rounded-lg">
							<p class="text-sm font-medium text-amber-800">{tr('Catatan Saat Ini:', 'Current Notes:')}</p>
							<p class="text-sm text-amber-700">{adminNotes}</p>
						</div>
					{/if}

					<div class="flex gap-2">
						<Button type="submit" class="bg-green-600 hover:bg-green-700" disabled={submitting}>
							{#if submitting}
								<Loader2 class="h-4 w-4 animate-spin mr-2" />
							{/if}
							{tr('Update Status', 'Update Status')}
						</Button>
					</div>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
