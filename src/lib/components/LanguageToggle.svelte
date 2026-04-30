<script lang="ts">
	import { Languages } from 'lucide-svelte';
	import { i18n, initLocale, setLocale, type Locale } from '$lib/i18n.svelte';
	import { onMount } from 'svelte';

	const switchLocale = (locale: Locale) => setLocale(locale);

	onMount(() => {
		initLocale();
	});
</script>

<div
	class="inline-flex items-center rounded-full border bg-background p-1 text-xs font-bold shadow-sm"
	aria-label="Language switcher"
>
	<Languages class="mx-2 h-4 w-4 text-muted-foreground" />
	<button
		type="button"
		class={`rounded-full px-2.5 py-1 transition-colors ${i18n.locale === 'id' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
		aria-pressed={i18n.locale === 'id'}
		onclick={() => switchLocale('id')}
	>
		ID
	</button>
	<button
		type="button"
		class={`rounded-full px-2.5 py-1 transition-colors ${i18n.locale === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
		aria-pressed={i18n.locale === 'en'}
		onclick={() => switchLocale('en')}
	>
		EN
	</button>
</div>
