const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
  name: String,
  songs: [
    {
      name: String,
      artist: String,
    },
  ],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
