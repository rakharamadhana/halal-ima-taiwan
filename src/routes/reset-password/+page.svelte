<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { tr } from '$lib/i18n.svelte';
	import { KeyRound, Loader2 } from 'lucide-svelte';

	let { data, form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>{tr('Buat Kata Sandi Baru', 'Create New Password')} - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-24">
	<Card.Root class="w-full max-w-md border-primary/10 shadow-lg">
		<Card.Header class="space-y-1 text-center">
			<div class="mb-4 flex justify-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
					<KeyRound class="h-6 w-6 text-primary" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">
				{tr('Buat Kata Sandi Baru', 'Create New Password')}
			</Card.Title>
			<Card.Description>
				{tr(
					'Gunakan kata sandi baru untuk akun Halal IMA Taiwan Anda.',
					'Use a new password for your Halal IMA Taiwan account.'
				)}
			</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if !data.canReset}
				<Alert.Root variant="destructive" class="mb-4">
					<Alert.Title>{tr('Tautan Tidak Valid', 'Invalid Link')}</Alert.Title>
					<Alert.Description>{data.message}</Alert.Description>
				</Alert.Root>
				<Button href="/forgot-password" class="w-full font-bold">
					{tr('Minta Tautan Baru', 'Request a New Link')}
				</Button>
			{:else}
				{#if form?.message}
					<Alert.Root variant="destructive" class="mb-4">
						<Alert.Title>{tr('Gagal Reset', 'Reset Failed')}</Alert.Title>
						<Alert.Description>{form.message}</Alert.Description>
					</Alert.Root>
				{/if}

				<form
					method="POST"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							await update();
							loading = false;
						};
					}}
					class="space-y-4"
				>
					<div class="space-y-2">
						<Label for="password">{tr('Kata Sandi Baru', 'New Password')}</Label>
						<Input id="password" name="password" type="password" minlength={8} required />
					</div>

					<div class="space-y-2">
						<Label for="confirmPassword">
							{tr('Konfirmasi Kata Sandi Baru', 'Confirm New Password')}
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							minlength={8}
							required
						/>
					</div>

					<Button type="submit" class="w-full font-bold" disabled={loading}>
						{#if loading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							{tr('Menyimpan...', 'Saving...')}
						{:else}
							{tr('Simpan Kata Sandi Baru', 'Save New Password')}
						{/if}
					</Button>
				</form>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
