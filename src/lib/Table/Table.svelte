<script>
  import { writable } from 'svelte/store';
  import { epochToHumanReadable, msToTimeString } from '$lib/utils';

  export let columns = [];
  export let data = [];

  const formattableColumns = ['back_time', 'end_time', 'front_time'];

  const expandedRows = writable(new Set());

  function toggleRow(index) {
    expandedRows.update((current) => {
      const newSet = new Set(current);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }
</script>

<table class="min-w-full divide-y divide-gray-200">
	<thead class="bg-gray-50">
	<tr>
		{#each columns as { label }}
			<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</th>
		{/each}
	</tr>
	</thead>
	<tbody class="bg-white divide-y divide-gray-200">
	{#each data as row, index}
		{#if row.items}
			<tr on:click={() => toggleRow(index)} class="cursor-pointer bg-gray-100">
				{#each columns as { accessor }}
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
						{#if formattableColumns.find((value) => value === accessor)}
							{epochToHumanReadable(row[accessor])}
						{:else if accessor === 'estimated_duration'}
							{msToTimeString(row[accessor])}
						{:else}
							{row[accessor]}
						{/if}
					</td>
				{/each}
			</tr>

			{#if $expandedRows.has(index)}
				{#each row.items as item}
					<tr>
						{#each columns as { accessor }}
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{#if formattableColumns.find((value) => value === accessor)}
									{epochToHumanReadable(item[accessor])}
								{:else if accessor === 'estimated_duration'}
									{msToTimeString(item[accessor])}
								{:else}
									{item[accessor]}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		{/if}
	{/each}
	</tbody>
</table>

<style>
    table { @apply w-full; }
</style>
