<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import { Loader2, LockKeyhole } from 'lucide-svelte';
	import { tr } from '$lib/i18n.svelte';

	let { data, form } = $props();
	let loading = $state(false);
	let isLocalhost = $derived(typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));
</script>

<svelte:head>
	<title>{tr('Masuk', 'Login')} - Halal IMA Taiwan</title>
	{#if !isLocalhost}
		<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
	{/if}
</svelte:head>

<div class="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-24">
	<Card.Root class="w-full max-w-md border-primary/10 shadow-lg">
		<Card.Header class="space-y-1 text-center">
			<div class="mb-4 flex justify-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
					<LockKeyhole class="h-6 w-6 text-primary" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">
				{tr('Selamat Datang Kembali', 'Welcome Back')}
			</Card.Title>
			<Card.Description>
				{tr(
					'Masuk ke akun Anda untuk mengelola sertifikasi.',
					'Log in to your account to manage certifications.'
				)}
			</Card.Description>
		</Card.Header>
		<Card.Content>
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
				{#if data.resetSuccess}
					<Alert.Root
						class="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
					>
						<Alert.Title>{tr('Kata Sandi Berhasil Diubah', 'Password Updated')}</Alert.Title>
						<Alert.Description>
							{tr(
								'Silakan masuk menggunakan kata sandi baru Anda.',
								'Please log in using your new password.'
							)}
						</Alert.Description>
					</Alert.Root>
				{/if}

				{#if form?.message}
					<Alert.Root variant="destructive" class="mb-4">
						<Alert.Title>{tr('Gagal Masuk', 'Login Failed')}</Alert.Title>
						<Alert.Description>{form.message}</Alert.Description>
					</Alert.Root>
				{/if}

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="email@perusahaan.com" required />
				</div>

				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<Label for="password">{tr('Kata Sandi', 'Password')}</Label>
						<a href="/forgot-password" class="text-xs text-primary hover:underline">
							{tr('Lupa sandi?', 'Forgot password?')}
						</a>
					</div>
					<Input id="password" name="password" type="password" required />
				</div>

				{#if !isLocalhost}
				<div class="space-y-2">
					<Label for="h-captcha-response">{tr('Verifikasi', 'Verification')}</Label>
					<div class="h-captcha" data-sitekey="b354642a-566c-45e8-8cb0-adee20f65ca4"></div>
				</div>
				{/if}

				<Button type="submit" class="w-full font-bold" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{tr('Memproses...', 'Processing...')}
					{:else}
						{tr('Masuk', 'Login')}
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4 border-t py-6">
			<p class="w-full text-center text-sm text-muted-foreground">
				{tr('Belum punya akun?', 'Do not have an account yet?')} <br class="sm:hidden" />
				<a href="/register" class="font-bold text-primary hover:underline"
					>{tr('Daftar Akun Perusahaan', 'Register a Company Account')}</a
				>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
