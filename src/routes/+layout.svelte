<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from "mode-watcher";
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  
  let { children } = $props();
</script>

<ModeWatcher />

<div class="min-h-screen bg-background flex flex-col font-sans">
  <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4 flex h-16 items-center">
      <div class="flex items-center space-x-6 w-full">
        <a href="/" class="flex items-center space-x-2">
          <span class="font-bold text-lg sm:inline-block">Halal IMA Taiwan</span>
        </a>
        <nav class="flex items-center space-x-6 text-sm font-medium flex-1">
          <a href="/about" class="transition-colors hover:text-foreground/80 text-foreground/60">
            Tentang Kami
          </a>
          <a href="/procedures" class="transition-colors hover:text-foreground/80 text-foreground/60">
            Prosedur
          </a>
          <a href="/certifications" class="transition-colors hover:text-foreground/80 text-foreground/60">
            Sertifikasi
          </a>
          <a href="/contact" class="transition-colors hover:text-foreground/80 text-foreground/60">
            Hubungi Kami
          </a>
        </nav>
        <div class="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
  
  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="border-t py-6 md:py-8">
    <div class="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
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
