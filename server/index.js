/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Axios = require('axios');
const qs = require('querystring');

require('../database/index.js');
const Playlist = require('../database/models.js');
const keys = require('../keys.js');

const app = express();
const port = process.env.port || 3000;

const { clientId } = keys;
const { clientSecret } = keys;
const encodedData = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/playlists', (req, res) => {
  Playlist.find((err, playlists) => {
    if (err) res.status(500).send(err);
    return res.status(200).send(playlists);
  });
});

app.get('/api/:playlist/songs', (req, res) => {
  const { playlist } = req.params;
  Playlist.find({ name: playlist }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(result);
  });
});

app.post('/api/playlists', (req, res) => {
  const playlist = new Playlist({ name: req.body.name });
  playlist.save((err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.get('/api/playlists/:song', (req, res) => {
  const { song } = req.params;
  const songArr = song.split(' by ');
  const songName = songArr[0];
  const artist = songArr[1];
  const request = {
    grant_type: 'client_credentials',
  };
  Axios.post('https://accounts.spotify.com/api/token', qs.stringify(request), {
    headers: {
      Authorization: `Basic ${encodedData}`,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      const token = response.data.access_token;
      Axios.get(`https://api.spotify.com/v1/search?q=track:${songName}%20artist:${artist}&type=track,album`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((result) => {
          res.status(200).send(result.data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.put('/api/playlists/songs', (req, res) => {
  const { artist, playlist, song } = req.body;
  Playlist.update({ name: playlist }, { $push: { songs: { name: song, artist } } }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
