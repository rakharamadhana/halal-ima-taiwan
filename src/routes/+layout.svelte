<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { LogIn, LogOut, LayoutDashboard, Menu, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo/halal-ima-transparent.png';

	let { children, data } = $props();
	let mobileMenuOpen = $state(false);

	const toggleMenu = () => (mobileMenuOpen = !mobileMenuOpen);
	const closeMenu = () => (mobileMenuOpen = false);
</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background font-sans">
	<header
		class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto flex h-16 items-center px-4">
			<div class="flex w-full items-center justify-between">
				<div class="flex items-center space-x-6">
					<a href="/" class="flex items-center space-x-2" onclick={closeMenu}>
						<img src={logo} alt="Halal IMA Logo" class="h-8 w-8" />
						<span class="text-sm font-bold sm:text-lg">Halal IMA Taiwan</span>
					</a>
					<nav class="hidden items-center space-x-6 text-sm font-medium lg:flex">
						<a href="/about" class="text-foreground/60 transition-colors hover:text-foreground/80">
							Tentang Kami
						</a>
						<a
							href="/procedures"
							class="text-foreground/60 transition-colors hover:text-foreground/80"
						>
							Prosedur
						</a>
						<a
							href="/certifications"
							class="text-foreground/60 transition-colors hover:text-foreground/80"
						>
							Sertifikasi
						</a>
						<a href="/contact" class="text-foreground/60 transition-colors hover:text-foreground/80">
							Hubungi Kami
						</a>
					</nav>
				</div>

				<div class="flex items-center gap-2 sm:gap-4">
					<div class="hidden items-center gap-4 sm:flex">
						<ThemeToggle />
					</div>

					<div class="hidden items-center gap-4 md:flex">
						{#if data.user}
							<a
								href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
								class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
							>
								<LayoutDashboard class="h-4 w-4" />
								<span class="hidden lg:inline">{data.user.role === 'admin' ? 'Panel Admin' : 'Dashboard'}</span>
							</a>
							<form action="/logout" method="POST" use:enhance>
								<Button variant="ghost" size="sm" type="submit" class="gap-2 text-xs font-bold">
									<LogOut class="h-4 w-4" />
									<span class="hidden lg:inline">Keluar</span>
								</Button>
							</form>
						{:else}
							<a
								href="/login"
								class="flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
							>
								<LogIn class="h-4 w-4" />
								Masuk
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

		<!-- Mobile Menu Overlay -->
		{#if mobileMenuOpen}
			<div
				class="fixed inset-0 top-16 z-50 animate-in fade-in slide-in-from-top-4 bg-background lg:hidden"
			>
				<nav class="flex flex-col space-y-4 p-6 text-lg font-medium">
					<a href="/about" class="border-b pb-2 hover:text-primary" onclick={closeMenu}>
						Tentang Kami
					</a>
					<a href="/procedures" class="border-b pb-2 hover:text-primary" onclick={closeMenu}>
						Prosedur
					</a>
					<a href="/certifications" class="border-b pb-2 hover:text-primary" onclick={closeMenu}>
						Sertifikasi
					</a>
					<a href="/contact" class="border-b pb-2 hover:text-primary" onclick={closeMenu}>
						Hubungi Kami
					</a>
					<div class="pt-4 text-sm text-muted-foreground uppercase tracking-wider">Akun</div>
					{#if data.user}
						<a
							href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
							class="flex items-center gap-3 rounded-lg bg-primary/10 p-3 text-primary"
							onclick={closeMenu}
						>
							<LayoutDashboard class="h-5 w-5" />
							{data.user.role === 'admin' ? 'Panel Admin' : 'Dashboard'}
						</a>
						<form action="/logout" method="POST" use:enhance class="w-full">
							<button
								type="submit"
								class="flex w-full items-center gap-3 rounded-lg p-3 text-destructive"
								onclick={closeMenu}
							>
								<LogOut class="h-5 w-5" />
								Keluar
							</button>
						</form>
					{:else}
						<a
							href="/login"
							class="flex items-center gap-3 rounded-lg bg-primary p-3 text-primary-foreground"
							onclick={closeMenu}
						>
							<LogIn class="h-5 w-5" />
							Masuk
						</a>
					{/if}
					<div class="flex items-center justify-between pt-6 border-t font-normal text-base">
						<span>Tema</span>
						<ThemeToggle />
					</div>
				</nav>
			</div>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t py-6 md:py-8">
		<div
			class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row"
		>
			<div class="flex flex-col gap-2">
				<p class="text-sm leading-loose text-muted-foreground md:text-left">
					&copy; 2026 Halal IMA Taiwan. Menjamin standar kepatuhan Halal tertinggi.
				</p>
				<p class="text-xs text-muted-foreground">
					LINE: @fathurrahman_alhady | Kerjasama dengan Halal Formosa
				</p>
			</div>
		</div>
	</footer>
</div>
