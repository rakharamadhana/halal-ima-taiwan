<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Alert from '$lib/components/ui/alert';
	import { Loader2, ShieldCheck, Building2, User, Phone, MapPin } from 'lucide-svelte';
	import { tr } from '$lib/i18n.svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>{tr('Pendaftaran Perusahaan', 'Company Registration')} - Halal IMA Taiwan</title>
</svelte:head>

<div class="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16">
	<Card.Root class="w-full max-w-xl border-primary/10 shadow-lg">
		<Card.Header class="space-y-1 text-center">
			<div class="mb-4 flex justify-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
					<ShieldCheck class="h-6 w-6 text-primary" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">
				{tr('Daftar Akun Perusahaan', 'Register a Company Account')}
			</Card.Title>
			<Card.Description>
				{tr(
					'Mulai proses sertifikasi halal Anda bersama IMA Taiwan.',
					'Start your halal certification process with IMA Taiwan.'
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
				{#if form?.message}
					<Alert.Root variant={form.success ? 'default' : 'destructive'} class="mb-4">
						<Alert.Title
							>{form.success ? tr('Berhasil', 'Success') : tr('Gagal', 'Failed')}</Alert.Title
						>
						<Alert.Description>{form.message}</Alert.Description>
					</Alert.Root>
				{/if}

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="company_name">{tr('Nama Perusahaan / Toko', 'Company / Store Name')}</Label>
						<div class="relative">
							<Building2 class="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
							<Input
								id="company_name"
								name="company_name"
								placeholder={tr('Contoh: Warung Madani', 'Example: Madani Restaurant')}
								class="pl-9"
								required
							/>
						</div>
					</div>
					<div class="space-y-2">
						<Label for="pic_name">{tr('Penanggung Jawab (PIC)', 'Person in Charge (PIC)')}</Label>
						<div class="relative">
							<User class="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
							<Input
								id="pic_name"
								name="pic_name"
								placeholder={tr('Nama lengkap', 'Full name')}
								class="pl-9"
								required
							/>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="phone">{tr('Nomor Telepon / LINE', 'Phone Number / LINE')}</Label>
						<div class="relative">
							<Phone class="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
							<Input id="phone" name="phone" placeholder="09xx-xxx-xxx" class="pl-9" required />
						</div>
					</div>
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="email@perusahaan.com"
							required
						/>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="address">{tr('Alamat Bisnis di Taiwan', 'Business Address in Taiwan')}</Label>
					<div class="relative">
						<MapPin class="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input
							id="address"
							name="address"
							placeholder={tr('Alamat lengkap usaha', 'Complete business address')}
							class="pl-9"
							required
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="password">{tr('Kata Sandi', 'Password')}</Label>
						<Input id="password" name="password" type="password" required />
					</div>
					<div class="space-y-2">
						<Label for="confirmPassword">{tr('Konfirmasi Kata Sandi', 'Confirm Password')}</Label>
						<Input id="confirmPassword" name="confirmPassword" type="password" required />
					</div>
				</div>

				<Button type="submit" class="w-full font-bold" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{tr('Memproses...', 'Processing...')}
					{:else}
						{tr('Daftar Sekarang', 'Register Now')}
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-center border-t py-4">
			<p class="text-sm text-muted-foreground">
				{tr('Sudah punya akun?', 'Already have an account?')}
				<a href="/login" class="font-bold text-primary hover:underline"
					>{tr('Masuk di sini', 'Login here')}</a
				>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
