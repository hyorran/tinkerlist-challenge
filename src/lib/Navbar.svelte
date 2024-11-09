<script>
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
</script>

<nav class="bg-white p-4 border-b-2">
	<div class="container mx-auto flex items-center justify-end">

		<button
			aria-label="User menu"
			class="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 focus:outline-none"
			on:click={toggleMenu}
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
			</svg>
		</button>
	</div>

	{#if isMenuOpen}
		<div class="absolute right-4 mt-2 bg-white rounded-lg shadow-lg p-4 border-b-2">
			<a href="/" class="block hover:bg-gray-100 px-4 py-2 rounded-md">Home</a>
		</div>
	{/if}
</nav>

<style>
    nav {
        position: relative;
    }
</style>
