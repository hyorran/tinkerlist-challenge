interface Item {
  id: string;
  title: string;
  estimated_duration: number;
  front_time: number | null;
  end_time: number | null;
  back_time: number | null;
}

interface Part {
  id: string;
  title: string;
  items: Item[];
  estimated_duration: number;
  front_time: number | null;
  end_time: number | null;
  back_time: number | null;
}

interface Episode {
  id: string;
  status: string;
  title: string;
  parts: Part[];
}

interface TimingData {
  episode: {
    on_air_time: number;
    off_air_time: number;
  };
  part: {
    [key: string]: {
      estimated_duration: number;
      front_time: number | null;
      end_time: number | null;
      back_time: number | null;
    };
  };
  item: {
    [key: string]: {
      estimated_duration: number;
      front_time: number | null;
      end_time: number | null;
      back_time: number | null;
    };
  };
}

export function calculateTimings(episodeData: Episode, timingData: TimingData): Episode {
  const { on_air_time, off_air_time } = timingData.episode;

  let currentFrontTime = on_air_time;
  episodeData.parts.forEach((part) => {
    const partTiming = timingData.part[part.id];

    part.front_time = currentFrontTime;
    part.end_time = currentFrontTime + partTiming.estimated_duration;

    let currentBackTime = off_air_time - partTiming.estimated_duration;

    part.items.forEach((item) => {
      const itemTiming = timingData.item[item.id];

      item.front_time = part.front_time;
      item.end_time = part.front_time + itemTiming.estimated_duration;

      item.back_time = currentBackTime;

      currentBackTime = item.front_time - itemTiming.estimated_duration;

      part.front_time = item.front_time;
    });

    currentFrontTime = part.end_time;
  });

  return episodeData;
}

export function mergeData({ episode, part, item }): Episode {
  const mergedParts: Part[] = episode.parts.map((partId: string) => {
    const partDetails = part[partId];
    const partItems = partDetails.items.map((itemId: string) => {
      const itemDetails = item[itemId];
      return {
        id: itemDetails.id,
        title: itemDetails.title
      };
    });

    return {
      id: partDetails.id,
      title: partDetails.title,
      items: partItems,
      estimated_duration: null,
      front_time: null,
      end_time: null,
      back_time: null
    };
  });

  return {
    id: episode.id,
    status: episode.status,
    title: episode.title,
    parts: mergedParts
  };
}
