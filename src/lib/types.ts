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
  estimated_duration: number;
  front_time: number | null;
  end_time: number | null;
  back_time: number | null;
  items: Item[];
}

interface Episode {
  id: string;
  status: string;
  title: string;
  on_air_time: number;
  off_air_time: number;
  parts: Part[];
}

interface EpisodeData {
  episode: Episode;
  part: Part[];
  item: Record<string, Item>;
}

interface TimingsData {
  episode: {
    on_air_time: number;
    off_air_time: number;
  };
  part: Record<string, Part>;
  item: Record<string, Item>;
}

interface MergedData {
  episode: Episode;
}
