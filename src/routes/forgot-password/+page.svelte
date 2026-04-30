<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { tr } from '$lib/i18n.svelte';
	import { CheckCircle2, KeyRound, Loader2 } from 'lucide-svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>{tr('Lupa Kata Sandi', 'Forgot Password')} - Halal IMA Taiwan</title>
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
				{tr('Reset Kata Sandi', 'Reset Your Password')}
			</Card.Title>
			<Card.Description>
				{tr(
					'Masukkan email akun Anda. Kami akan mengirim tautan untuk membuat kata sandi baru.',
					'Enter your account email. We will send a link to create a new password.'
				)}
			</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if form?.success}
				<Alert.Root
					class="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
				>
					<CheckCircle2 class="h-4 w-4" />
					<Alert.Title>{tr('Email Terkirim', 'Email Sent')}</Alert.Title>
					<Alert.Description>{form.message}</Alert.Description>
				</Alert.Root>
			{:else if form?.message}
				<Alert.Root variant="destructive" class="mb-4">
					<Alert.Title>{tr('Gagal Mengirim Email', 'Failed to Send Email')}</Alert.Title>
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
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="email@perusahaan.com" required />
				</div>

				<Button type="submit" class="w-full font-bold" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{tr('Mengirim...', 'Sending...')}
					{:else}
						{tr('Kirim Tautan Reset', 'Send Reset Link')}
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-center border-t py-4">
			<a href="/login" class="text-sm font-bold text-primary hover:underline">
				{tr('Kembali ke Login', 'Back to Login')}
			</a>
		</Card.Footer>
	</Card.Root>
</div>
