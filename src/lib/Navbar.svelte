<script>
  import IconText from '$lib/IconText/IconText.svelte';
  import IconButton from '$lib/IconButton/IconButton.svelte';
</script>

<nav class="bg-white border-b-2 flex w-full">
	<div class="w-1/12 flex justify-start items-center border-r-2 w-min">
		<IconButton icon="mingcute:arrow-left-line" onClick={() => console.log('clicked on menu')}  styleClass="w-12 h-12"/>
	</div>
	<div class="w-11/12 flex justify-between w-full">
		<div class="inline-flex gap-10 w-full border-r-2">
			<IconButton icon="solar:arrow-down-outline" label="Live" position="right"/>
			<IconText icon="solar:flag-2-bold" style="color: #09f10d"  text="13:00:00"/>
			<IconText icon="solar:flag-2-bold" style="color: #f20202"  text="13:45:00"/>
			<IconText icon="mdi-light:clock" text="00:45:00"/>
		</div>

		<IconButton icon="carbon:user-avatar-filled-alt" onClick={() => console.log('clicked on menu')}  styleClass="w-12 h-12"/>
	</div>
</nav>

<style>
    nav {
        position: relative;
    }
</style>
