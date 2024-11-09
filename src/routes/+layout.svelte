<script lang="ts">
    import '../app.css'
    import Navbar from '$lib/Navbar.svelte';

    let {children} = $props()
</script>

<Navbar />

<main>
</main>

{@render children()}
