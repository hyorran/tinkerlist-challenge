<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string;
	export let position: 'left' | 'right' = 'left';
	export let text: string;
	export let style: string = '';
</script>

<div class="flex items-center space-x-2" class:right={position === 'right'}>
	{#if position === 'left'}
		<Icon icon={icon} style={style}/>
		<span>{text}</span>
	{:else}
		<span>{text}</span>
		<Icon icon={icon}/>
	{/if}
</div>

<style lang="postcss">
	:global(.right) {
		flex-direction: row-reverse;
	}
</style>
