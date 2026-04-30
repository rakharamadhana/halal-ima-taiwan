<script lang="ts">
	import './layout.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import { LogIn, LogOut, LayoutDashboard, Menu, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo/halal-ima-transparent.png';
	import { tr } from '$lib/i18n.svelte';

	// Initialize Vercel Analytics
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children, data } = $props();
	let mobileMenuOpen = $state(false);

	const toggleMenu = () => (mobileMenuOpen = !mobileMenuOpen);
	const closeMenu = () => (mobileMenuOpen = false);
</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background font-sans">
	<header
		class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
	>
		<div class="container mx-auto flex h-16 items-center px-4 overflow-hidden">
			<div class="flex w-full items-center justify-between">
				<div class="flex items-center space-x-6">
					<a href="/" class="flex items-center space-x-2" onclick={closeMenu}>
						<img src={logo} alt="Halal IMA Logo" class="h-8 w-8" />
						<span class="text-sm font-bold sm:text-lg">Halal IMA Taiwan</span>
					</a>
					<nav class="hidden items-center space-x-6 text-sm font-medium lg:flex">
						<a href="/about" class="text-foreground/60 transition-colors hover:text-foreground/80">
							{tr('Tentang Kami', 'About Us')}
						</a>
						<a
							href="/halal-awareness"
							class="text-foreground/60 transition-colors hover:text-foreground/80"
						>
							{tr('Informasi Halal', 'Halal Info')}
						</a>
						<a
							href="/procedures"
							class="text-foreground/60 transition-colors hover:text-foreground/80"
						>
							{tr('Prosedur', 'Procedure')}
						</a>
						<a
							href="/certifications"
							class="text-foreground/60 transition-colors hover:text-foreground/80"
						>
							{tr('Sertifikasi', 'Certificates')}
						</a>
						<a
							href="/contact"
							class="text-foreground/60 transition-colors hover:text-foreground/80"
						>
							{tr('Hubungi Kami', 'Contact Us')}
						</a>
					</nav>
				</div>

				<div class="flex items-center gap-2 sm:gap-4">
					<div class="hidden items-center gap-4 sm:flex">
						<LanguageToggle />
						<ThemeToggle />
					</div>

					<div class="hidden items-center gap-4 md:flex">
						{#if data.user}
							<a
								href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
								class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
							>
								<LayoutDashboard class="h-4 w-4" />
								<span class="hidden lg:inline"
									>{data.user.role === 'admin'
										? tr('Panel Admin', 'Admin Panel')
										: 'Dashboard'}</span
								>
							</a>
							<form action="/logout" method="POST" use:enhance>
								<Button variant="ghost" size="sm" type="submit" class="gap-2 text-xs font-bold">
									<LogOut class="h-4 w-4" />
									<span class="hidden lg:inline">{tr('Keluar', 'Logout')}</span>
								</Button>
							</form>
						{:else}
							<a
								href="/login"
								class="flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
							>
								<LogIn class="h-4 w-4" />
								{tr('Masuk', 'Login')}
							</a>
						{/if}
					</div>

					<Button
						variant="ghost"
						size="icon"
						class="lg:hidden"
						onclick={toggleMenu}
						aria-label="Toggle Menu"
					>
						{#if mobileMenuOpen}
							<X class="h-6 w-6" />
						{:else}
							<Menu class="h-6 w-6" />
						{/if}
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Mobile Menu Overlay -->
	{#if mobileMenuOpen}
		<div
			class="fixed inset-0 top-16 z-50 overflow-y-auto bg-background lg:hidden"
		>
				<nav class="flex flex-col space-y-6 p-6 text-lg font-medium pb-20">
					<a href="/about" class="border-b pb-3 hover:text-primary" onclick={closeMenu}>
						{tr('Tentang Kami', 'About Us')}
					</a>
					<a href="/halal-awareness" class="border-b pb-3 hover:text-primary" onclick={closeMenu}>
						{tr('Informasi Halal', 'Halal Info')}
					</a>
					<a href="/procedures" class="border-b pb-3 hover:text-primary" onclick={closeMenu}>
						{tr('Prosedur', 'Procedure')}
					</a>
					<a href="/certifications" class="border-b pb-3 hover:text-primary" onclick={closeMenu}>
						{tr('Sertifikasi', 'Certificates')}
					</a>
					<a href="/contact" class="border-b pb-3 hover:text-primary" onclick={closeMenu}>
						{tr('Hubungi Kami', 'Contact Us')}
					</a>
					<div class="pt-6 text-sm tracking-wider text-muted-foreground uppercase">
						{tr('Akun', 'Account')}
					</div>
					{#if data.user}
						<a
							href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
							class="flex items-center gap-3 rounded-lg bg-primary/10 p-4 text-primary"
							onclick={closeMenu}
						>
							<LayoutDashboard class="h-5 w-5" />
							{data.user.role === 'admin' ? tr('Panel Admin', 'Admin Panel') : 'Dashboard'}
						</a>
						<form action="/logout" method="POST" use:enhance class="w-full">
							<button
								type="submit"
								class="flex w-full items-center gap-3 rounded-lg p-4 text-destructive"
								onclick={closeMenu}
							>
								<LogOut class="h-5 w-5" />
								{tr('Keluar', 'Logout')}
							</button>
						</form>
					{:else}
						<a
							href="/login"
							class="flex items-center gap-3 rounded-lg bg-primary p-4 text-primary-foreground"
							onclick={closeMenu}
						>
							<LogIn class="h-5 w-5" />
							{tr('Masuk', 'Login')}
						</a>
					{/if}
					<div class="flex items-center justify-between border-t pt-6 text-base font-normal">
						<span>{tr('Bahasa', 'Language')}</span>
						<LanguageToggle />
					</div>
					<div class="flex items-center justify-between border-t pt-6 text-base font-normal">
						<span>{tr('Tema', 'Theme')}</span>
						<ThemeToggle />
					</div>
				</nav>
			</div>
		{/if}

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t py-6 md:py-8">
		<div
			class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row"
		>
			<div class="flex flex-col gap-2">
				<p class="text-sm leading-loose text-muted-foreground md:text-left">
					&copy; 2026 Halal IMA Taiwan.
					{tr(
						'Menjamin standar kepatuhan Halal tertinggi.',
						'Ensuring the highest halal compliance standards.'
					)}
				</p>
			</div>
		</div>
	</footer>
</div>
