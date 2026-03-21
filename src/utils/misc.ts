import { MTeamTorrent, searchMTeamTorrents } from ':apis/mTeam';
import { MTeamAPIToken, SEARCH_KEYWORD } from './constants';
import { isEndTimeGreaterThanTwoDays, isWithinLastThreeDays } from './time';

export function getMTeamAPIToken() {
  if (!MTeamAPIToken) {
    throw new Error('M-Team API token is not set');
  }

  return MTeamAPIToken;
}

export async function getFreeTorrents() {
  const torrents = await searchMTeamTorrents(1, 50);

  return torrents.filter(
    (torrent) =>
      torrent.status.toppingLevel === '1' &&
      torrent.status.discount !== 'FREE' &&
      isEndTimeGreaterThanTwoDays(torrent.status.toppingEndTime),
  );
}

export async function searchTorrents() {
  const torrents = await searchMTeamTorrents(1, 50, SEARCH_KEYWORD);

  return torrents.filter((torrent) => isWithinLastThreeDays(torrent.createdDate));
}
