import { getMTeamTorrentDownloadLink, searchMTeamTorrents } from ':apis/mTeam';
import { Minute, SEARCH_KEYWORD } from ':utils/constants';
import { createDownloadDirectory, downloadFile } from ':utils/download';
import { getFreeTorrents, searchTorrents } from ':utils/misc';
import { isEndTimeGreaterThanTwoDays } from ':utils/time';

async function run() {
  await createDownloadDirectory();

  const torrents = await (SEARCH_KEYWORD ? searchTorrents() : getFreeTorrents());

  for (const torrent of torrents) {
    console.log('download torrent:', torrent.id, torrent.name);
    const torrentDownloadUrl = await getMTeamTorrentDownloadLink(torrent.id);
    const fileName = `${torrent.id}.torrent`;
    const { downloadStatus } = await downloadFile(torrentDownloadUrl, fileName);
    console.log('status:', downloadStatus);
  }
}

(async () => {
  await run();

  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      run();
    }, Minute * 5);
  }
})();
