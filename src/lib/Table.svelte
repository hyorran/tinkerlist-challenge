<script lang="ts">
  import type { Part, Column, Item } from '$lib/Table.types';

  export let processedData: Part[];
  export let columns: Column<Part | Item>[];

  let expandedParts: Set<string> = new Set();

  function togglePart(id: string) {
    if (expandedParts.has(id)) {
      expandedParts.delete(id);
    } else {
      expandedParts.add(id);
    }
    expandedParts = new Set(expandedParts);
  }
</script>

<table class="w-full border-collapse">
	<thead>
	<tr class="bg-gray-200">
		{#each columns as column}
			<th class="py-2 px-4 border text-left">{column.label}</th>
		{/each}
		<th class="py-2 px-4 border text-left">Actions</th>
	</tr>
	</thead>

	<tbody>
	{#each processedData as part (part.id)}
		<tr class="bg-white border-b">
			{#each columns as column}
				<td class="py-2 px-4">
					{#if column.render}
						{column.render(part)}
					{:else}
						{part[column.accessor]}
					{/if}
				</td>
			{/each}
			<td class="py-2 px-4">
				<button
					class="text-blue-500 hover:underline"
					on:click={() => togglePart(part.id)}
				>
					{#if expandedParts.has(part.id)}
						Collapse
					{:else}
						Expand
					{/if}
				</button>
			</td>
		</tr>

		{#if expandedParts.has(part.id)}
			{#each part.items as item (item.id)}
				<tr class="bg-gray-100 border-b">
					{#each columns as column}
						<td class="pl-8 py-2 px-4">
							{#if column.render}
								{column.render(item)}
							{:else}
								{item[column.accessor]}
							{/if}
						</td>
					{/each}
					<td class="py-2 px-4">--</td>
				</tr>
			{/each}
		{/if}
	{/each}
	</tbody>
</table>
