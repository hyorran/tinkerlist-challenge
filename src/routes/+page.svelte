<script lang="ts">
  import Table from '$lib/Table/Table.svelte';
  import type { TableColumn, TableData } from '$lib/Table/types';
  import { calculateTimings, mergeData } from './calculateTimings';
  import { writable } from 'svelte/store';


  const episodeData = {
    "episode": {
      "id": "3d857c52-40c5-fdc0-9961-813690d43b9b",
      "status": "active",
      "title": "Cuez Episode",
      "parts": [
        "14080af8-7712-47be-8802-22a0fb83cf59",
        "cb17be19-85ff-4368-8fa3-cbf281c902d8",
        "a6cbf456-095e-4393-b79b-fd397d464bf3"
      ]
    },
    "part": {
      "14080af8-7712-47be-8802-22a0fb83cf59": {
        "id": "14080af8-7712-47be-8802-22a0fb83cf59",
        "title": "Part 1",
        "items": [
          "872c3197-7c8c-4029-a4ff-f76ba944074b",
          "2159c445-e6ee-4109-9829-f47dc89b9372"
        ]
      },
      "cb17be19-85ff-4368-8fa3-cbf281c902d8": {
        "id": "cb17be19-85ff-4368-8fa3-cbf281c902d8",
        "title": "Part 2",
        "items": [
          "325371fc-cd1d-44d8-9527-d645b14066c4",
          "c7155479-00be-497f-abb8-f6a0f713a000",
          "501e36a2-9a7b-4c12-b43f-89738ddb9644"
        ]
      },
      "a6cbf456-095e-4393-b79b-fd397d464bf3": {
        "id": "a6cbf456-095e-4393-b79b-fd397d464bf3",
        "title": "Part 3",
        "items": [
          "1b165733-a0f1-45a0-a814-4f80a95ec896"
        ]
      }
    },
    "item": {
      "872c3197-7c8c-4029-a4ff-f76ba944074b": {
        "id": "872c3197-7c8c-4029-a4ff-f76ba944074b",
        "title": "Item 1.1",
        "estimated_duration": 300000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "2159c445-e6ee-4109-9829-f47dc89b9372": {
        "id": "2159c445-e6ee-4109-9829-f47dc89b9372",
        "title": "Item 1.2",
        "estimated_duration": 300000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "325371fc-cd1d-44d8-9527-d645b14066c4": {
        "id": "325371fc-cd1d-44d8-9527-d645b14066c4",
        "title": "Item 2.1",
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "c7155479-00be-497f-abb8-f6a0f713a000": {
        "id": "c7155479-00be-497f-abb8-f6a0f713a000",
        "title": "Item 2.2",
        "estimated_duration": 300000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "501e36a2-9a7b-4c12-b43f-89738ddb9644": {
        "id": "501e36a2-9a7b-4c12-b43f-89738ddb9644",
        "title": "Item 2.3",
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "1b165733-a0f1-45a0-a814-4f80a95ec896": {
        "id": "1b165733-a0f1-45a0-a814-4f80a95ec896",
        "title": "Item 3.1",
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      }
    }
  };

  const timingsData = {
    "episode": {
      "on_air_time": 1712235600,
      "off_air_time": 1712238300
    },
    "part": {
      "14080af8-7712-47be-8802-22a0fb83cf59": {
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "cb17be19-85ff-4368-8fa3-cbf281c902d8": {
        "estimated_duration": 1500000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "a6cbf456-095e-4393-b79b-fd397d464bf3": {
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      }
    },
    "item": {
      "872c3197-7c8c-4029-a4ff-f76ba944074b": {
        "estimated_duration": 300000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "2159c445-e6ee-4109-9829-f47dc89b9372": {
        "estimated_duration": 300000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "325371fc-cd1d-44d8-9527-d645b14066c4": {
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "c7155479-00be-497f-abb8-f6a0f713a000": {
        "estimated_duration": 300000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "501e36a2-9a7b-4c12-b43f-89738ddb9644": {
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      },
      "1b165733-a0f1-45a0-a814-4f80a95ec896": {
        "estimated_duration": 600000,
        "front_time": null,
        "end_time": null,
        "back_time": null
      }
    }
  };

  const mergedData = mergeData(episodeData);
  const result = calculateTimings(mergedData, timingsData);

  console.warn(result);

  let columns = [
    { label: "Title", accessor: "title" },
    { label: "Est. Duration", accessor: "estimated_duration" },
    { label: "Front Time", accessor: "front_time" },
    { label: "End Time", accessor: "end_time" },
    { label: "Back Time", accessor: "back_time" }
  ];

</script>

<Table {columns} data={result.parts}>
</Table>
