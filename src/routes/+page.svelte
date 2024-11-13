<script lang="ts">
  import { calculateTimings, mergeData } from './calculateTimings';
  import Table from '$lib/Table/Table.svelte';
  import episodes from './episodes.json'
  import timings from './timings.json'


  const mergedData = mergeData(episodes, timings);
  const result = calculateTimings(mergedData)

  console.warn('result', result)

  let columns = [
    { label: "Title", accessor: "title" },
    { label: "Est. Duration", accessor: "estimated_duration" },
    { label: "Front Time", accessor: "front_time" },
    { label: "End Time", accessor: "end_time" },
    { label: "Back Time", accessor: "back_time" }
  ];

</script>

<Table {columns} data={result.episode.parts}>
</Table>
