<script lang="ts">
  import type { TableColumn, TableData } from './types';
  import { writable } from 'svelte/store';

  export let columns: TableColumn[] = [];
  export let data: TableData[] = [];

  const expandedRows = writable<Set<number>>(new Set());

  function toggleRow(index: number) {
    expandedRows.update((current) => {
      const newSet = new Set(current);
      if (newSet.has(index)) {
        newSet.delete(index)
	    } else {
        newSet.add(index)
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
		<tr on:click={() => toggleRow(index)} class="cursor-pointer">
			{#each columns as { accessor }}
				<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row[accessor]}</td>
			{/each}
		</tr>
		{#if $expandedRows.has(index)}
			<tr>
				<td colspan={columns.length} class="px-6 py-4">
					<div class="bg-gray-100 p-4 rounded">
						<slot name="expandedContent" {row} />
					</div>
				</td>
			</tr>
		{/if}
	{/each}
	</tbody>
</table>

<style>
    table { @apply w-full; }
</style>
