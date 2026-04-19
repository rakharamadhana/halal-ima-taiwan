<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import { Loader2, LockKeyhole } from 'lucide-svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Masuk - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-24">
	<Card.Root class="w-full max-w-md border-primary/10 shadow-lg">
		<Card.Header class="space-y-1 text-center">
			<div class="mb-4 flex justify-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
					<LockKeyhole class="h-6 w-6 text-primary" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">Selamat Datang Kembali</Card.Title>
			<Card.Description>Masuk ke akun Anda untuk mengelola sertifikasi.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						update();
					};
				}}
				class="space-y-4"
			>
				{#if form?.message}
					<Alert.Root variant="destructive" class="mb-4">
						<Alert.Title>Gagal Masuk</Alert.Title>
						<Alert.Description>{form.message}</Alert.Description>
					</Alert.Root>
				{/if}

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="email@perusahaan.com" required />
				</div>

				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<Label for="password">Kata Sandi</Label>
						<a href="/forgot-password" class="text-xs text-primary hover:underline">Lupa sandi?</a>
					</div>
					<Input id="password" name="password" type="password" required />
				</div>

				<Button type="submit" class="w-full font-bold" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Memproses...
					{:else}
						Masuk
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4 border-t py-6">
			<p class="w-full text-center text-sm text-muted-foreground">
				Belum punya akun? <br class="sm:hidden" />
				<a href="/register" class="font-bold text-primary hover:underline">Daftar Akun Perusahaan</a
				>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
