export function mergeData(episodeData, timingsData) {
  return {
    episode: {
      ...episodeData.episode,
      on_air_time: timingsData.episode.on_air_time,
      off_air_time: timingsData.episode.off_air_time,
      parts: episodeData.episode.parts.map((partId) => {
        const part = {
          ...episodeData.part[partId],
          ...timingsData.part[partId]
        };

        part.items = part.items.map((itemId) => {
          return {
            ...episodeData.item[itemId],
            ...timingsData.item[itemId]
          };
        });

        return part;
      })
    }
  };
}

export function msToTimeString(milliseconds, startTime = '00:00') {
  const [startHours, startMinutes] = startTime.split(':').map(Number);

  const totalMilliseconds = startHours * 3600000 + startMinutes * 60000 + milliseconds;

  const totalHours = Math.floor(totalMilliseconds / 3600000) % 24;
  const totalMinutes = Math.floor((totalMilliseconds % 3600000) / 60000);

  const formattedHours = totalHours.toString().padStart(2, '0');
  const formattedMinutes = totalMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function epochToHumanReadable(epoch) {
  const date = new Date(epoch);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function calculateTimings(episodeData) {
  const result = JSON.parse(JSON.stringify(episodeData));

  const onAirTime = result.episode.on_air_time;
  const offAirTime = result.episode.off_air_time;

  let previousEndTime = onAirTime;
  let previousBackTime = offAirTime;
  let previousEstimatedDuration = onAirTime - offAirTime;

  result.episode.parts.forEach((part) => {
    part.front_time = previousEndTime + previousBackTime;
    part.end_time = (part.front_time || 0) + part.estimated_duration;
    part.back_time = previousBackTime - previousEstimatedDuration;
    previousBackTime = part.back_time;
    previousEstimatedDuration = part.estimated_duration;

    let previousItemEndTime = part.front_time;
    let previousItemBackTime = part.back_time;
    let previousItemEstimatedDuration = part.estimated_duration;

    part.items.forEach((item) => {
      item.front_time = previousItemEndTime;
      item.end_time = (item.front_time || 0) + item.estimated_duration;
      item.back_time = previousItemBackTime - previousItemEstimatedDuration;
      previousItemBackTime = item.back_time;
      previousItemEstimatedDuration = item.estimated_duration;
      previousItemEndTime = item.end_time;
    });

    previousEndTime = part.end_time;
  });

  return result;
}

export function subtractTimeStrings(time1, time2) {
  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTimeString = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const seconds1 = timeToSeconds(time1);
  const seconds2 = timeToSeconds(time2);

  const diffInSeconds = seconds1 - seconds2;

  const absDiff = Math.abs(diffInSeconds);

  return secondsToTimeString(absDiff);
}
