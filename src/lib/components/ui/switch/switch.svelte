<script lang="ts">
	import { cn } from "$lib/utils.js";

	interface Props {
		checked?: boolean;
		disabled?: boolean;
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;
		className?: string;
		onchange?: (event: { detail: { checked: boolean } }) => void;
	}

	let {
		checked = $bindable(),
		disabled = false,
		ariaLabel = undefined,
		ariaLabelledby = undefined,
		ariaDescribedby = undefined,
		className = "",
		onchange
	}: Props = $props();

	function toggle() {
		if (!disabled) {
			checked = !checked;
			onchange?.({ detail: { checked } });
		}
	}
</script>

<button
	{disabled}
	role="switch"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	aria-checked={checked}
	type="button"
	class={cn(
		"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
		checked ? "bg-primary" : "bg-input",
		className
	)}
	onclick={toggle}
	onkeydown={(e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggle();
		}
	}}
>
	<span
		class={cn(
			"pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
			checked ? "translate-x-5" : "translate-x-0"
		)}
	></span>
</button>
