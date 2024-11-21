<script lang="ts">
	import Icon from '@iconify/svelte';

	export let onClick: () => void = () => {};
	export let icon: string;
	export let label: string = '';
	export let styleClass: string = '';
	export let position: 'left' | 'right' = 'left';
</script>

<button
	on:click={onClick}
	class="flex items-center justify-center space-x-2 px-4 py-2 "
	class:right={position === 'right'}
	aria-label={label || 'icon button'}
>
	{#if position === 'left'}
		<Icon icon={icon} style={styleClass}/>
		<span>{label}</span>
	{:else}
		<span>{label}</span>
		<Icon icon={icon} style={styleClass}/>
	{/if}
</button>

<style>
</style>
