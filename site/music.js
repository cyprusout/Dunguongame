/*

    LOAD SONG
    let LakeShoreDrive = await Music.loadSong("46MX86XQqYCZRvwPpeq4Gi");

    SONG CONTROLS
    LakeShoreDrive.play();
    LakeShoreDrive.pause();
    LakeShoreDrive.resume();
    LakeShoreDrive.restart();
    LakeShoreDrive.destroy();
    LakeShoreDrive.seek(10); // Skip to 10 Seconds.

    PLAYLIST 
    await Music.loadPlayList('7phO9PAhj7bU6TwcHPrr7s');
    await Music.playNext():

    SONG META DATA
    await Music.getSongData() // Gets Song data of current Song
    Example Return Value: 
    {
        name: 'Lake Shore Drive', 
        artist: 'Aliotta Haynes Jeremiah', 
        thumbnail: 'https://i.scdn.co/image/ab67616d0000b273bfd869b5a775481785ce55ad'
    }

*/

(async function (global) {
  let Music = {};
  global.Music = Music;

  let promise = new Promise((res, rej) => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      res(IFrameAPI);
    };
  });

  Music.songs = {};
  let element = document.querySelector("music");
  let activeSong;

  Music.loadSong = async function (SONG_ID = "46MX86XQqYCZRvwPpeq4Gi") {
    let IFrameAPI = await promise;
    const options = {
      uri: `spotify:track:${SONG_ID}`, // Replace with your track URI
    };

    return new Promise((res, rej) => {
      const callback = (EmbedController) => {
        Music.songs[SONG_ID] = EmbedController;
        Music.currentSong = EmbedController;
        EmbedController.iframeElement.style.height = "3px";
        EmbedController.iframeElement.style.width = "3px";
        EmbedController.iframeElement.style.opacity = "1";
        element = EmbedController.iframeElement;
        res(EmbedController);
      };
      IFrameAPI.createController(element, options, callback);
    });
  };

  let ix = 0;
  Music.playList = ["46MX86XQqYCZRvwPpeq4Gi", "0ct6r3EGTcMLPtrXHDvVjc"];

  Music.playNext = async function () {
    let song = await Music.loadSong(Music.playList[ix]);
    ix = (ix + 1) % Music.playList.length;
    song.play();
  };

  Music.loadPlayList = async function (playlistId) {
    // Spotify Web API endpoint for playlist tracks
    let req = await fetch("https://msouthwick.com/command.spotify");
    let text = await req.text();
    Music.spotifyToken = text;
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    // You need a valid OAuth token for Spotify Web API
    const token = Music.spotifyToken; // Set this elsewhere after authenticating

    if (!token)
      throw new Error("Spotify OAuth token not set in Music.spotifyToken");

    let trackIds = [];
    let url = endpoint;
    while (url) {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch playlist tracks");
      const data = await res.json();
      trackIds.push(...data.items.map((item) => item.track.id));
      url = data.next; // for pagination
    }
    Music.playList = trackIds;
    return trackIds;
  };

  Music.getSongData = function (song_id = Music.currentSong.options.uri) {
    return fetch(
      `https://api.spotify.com/v1/tracks/${song_id.replace(
        "spotify:track:",
        ""
      )}`,
      {
        headers: {
          Authorization: `Bearer ${Music.spotifyToken}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch song data");
        return res.json();
      })
      .then((data) => ({
        name: data.name,
        artist: data.artists.map((a) => a.name).join(", "),
        thumbnail: data.album.images[0]?.url,
      }));
  };
})(this);
