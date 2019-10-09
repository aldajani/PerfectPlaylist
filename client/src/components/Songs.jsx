/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { songs, playlist, info } = this.props;
    let playlistName = playlist;
    let songValues;
    if (!playlistName) {
      playlistName = 'Playlist';
    }
    if (songs.length > 0) {
      songValues = songs.map((song) => (
        <div
          key={song.name}
          id={`${song.name} by ${song.artist}`}
          onClick={info}
          className="song-entry"
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress}
        >
          {song.name}
          &nbsp;by&nbsp;
          {song.artist}
        </div>
      ));
    } else {
      songValues = (
        <div>
          <b>
            No Songs in&nbsp;
            {playlistName}
          </b>
        </div>
      );
    }
    return (
      <div className="songs-container">
        {songValues}
      </div>
    );
  }
}

Songs.propTypes = {
  songs: PropTypes.array,
  playlist: PropTypes.string,
  info: PropTypes.func.isRequired,
};

Songs.defaultProps = {
  songs: [],
  playlist: 'Playlist',
};

export default Songs;
