<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { LogIn, LogOut, LayoutDashboard } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo/halal-ima-transparent.png';

	let { children, data } = $props();
</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background font-sans">
	<header
		class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container mx-auto flex h-16 items-center px-4">
			<div class="flex w-full items-center space-x-6">
				<a href="/" class="flex items-center space-x-2">
					<img src={logo} alt="Halal IMA Logo" class="h-8 w-8" />
					<span class="text-lg font-bold sm:inline-block">Halal IMA Taiwan</span>
				</a>
				<nav class="flex flex-1 items-center space-x-6 text-sm font-medium">
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
				<div class="flex items-center gap-4">
					<ThemeToggle />
					{#if data.user}
						<div class="flex items-center gap-4">
							<a
								href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
								class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
							>
								<LayoutDashboard class="h-4 w-4" />
								{data.user.role === 'admin' ? 'Panel Admin' : 'Dashboard'}
							</a>
							<form action="/logout" method="POST" use:enhance>
								<Button variant="ghost" size="sm" type="submit" class="gap-2 text-xs font-bold">
									<LogOut class="h-4 w-4" />
									Keluar
								</Button>
							</form>
						</div>
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
			</div>
		</div>
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
