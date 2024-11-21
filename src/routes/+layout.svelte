<script>
	import '../app.css';
	import Navbar from '$lib/Navbar/Navbar.svelte';
	import timings from './timings.json';
	import { epochToHumanReadable, subtractTimeStrings } from '$lib/utils.js';

	const { on_air_time, off_air_time } = timings.episode;

	const startTime = epochToHumanReadable(on_air_time);
	const endTime = epochToHumanReadable(off_air_time);

	const duration = subtractTimeStrings(startTime, endTime);

	export let children;
</script>

<Navbar {startTime} {endTime} {duration} />

<main>
	{@render children()}
</main>
