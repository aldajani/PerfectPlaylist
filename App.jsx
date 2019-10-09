/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React from 'react';
import Axios from 'axios';

import InputPlaylist from './InputPlaylist.jsx';
import Playlists from './Playlists.jsx';
import InputSongs from './InputSongs.jsx';
import Songs from './Songs.jsx';
import Modal from './Modal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      songs: [],
      playlistSelected: false,
      currentPlaylist: null,
      currentSong: null,
      show: false,
      images: [],
    };

    this.updatePlaylists = this.updatePlaylists.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.updateSongs = this.updateSongs.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.updatePlaylists();
  }

  showModal(e) {
    this.setState({
      show: true,
      currentSong: e.target.id,
    }, () => {
      const { currentSong } = this.state;
      Axios.get(`/api/playlists/${currentSong}`)
        .then((response) => {
          console.log(response.data.tracks.items);
          this.setState({
            images: response.data.tracks.items,
          });
        })
        .catch((err) => console.log(err));
    });
  }

  hideModal() {
    this.setState({
      show: false,
      currentSong: null,
    });
  }

  selectPlaylist(e) {
    this.setState({
      playlistSelected: true,
      currentPlaylist: e.target.innerHTML,
    }, () => this.updateSongs());
  }

  updatePlaylists() {
    Axios.get('/api/playlists')
      .then((response) => {
        this.setState({
          playlists: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  updateSongs() {
    const { currentPlaylist } = this.state;
    Axios.get(`/api/${currentPlaylist}/songs`)
      .then((response) => {
        this.setState({
          songs: response.data[0].songs,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      playlists, playlistSelected, currentPlaylist, songs, show, currentSong, images,
    } = this.state;
    return (
      <div className="app-container">
        <Modal
          show={show}
          handleClose={this.hideModal}
          song={currentSong}
          albums={images}
        />
        <div className="input-playlist-container">
          <InputPlaylist update={this.updatePlaylists} />
        </div>
        <br />
        {playlistSelected ? (
          <div className="playlist-info-container">
            <div className="current-playlist">
              <b>
                Current Playlist:&nbsp;
              </b>
              {currentPlaylist}
            </div>
            <br />
            <div className="input-song-container">
              <InputSongs
                update={this.updateSongs}
                playlist={currentPlaylist}
              />
            </div>
          </div>
        ) : null}
        <br />
        <div className="info-container-titles">
          <div className="playlists-title">Playlists</div>
          <div className="songs-title">Songs</div>
        </div>
        <div className="info-container">
          <Playlists
            playlists={playlists}
            select={this.selectPlaylist}
          />
          <Songs
            playlist={currentPlaylist}
            songs={songs}
            info={this.showModal}
          />
        </div>
      </div>
    );
  }
}

export default App;
