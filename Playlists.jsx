/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { playlists, select } = this.props;
    let playlistValues;
    if (playlists.length > 0) {
      playlistValues = playlists.map((playlist, i) => (
        <div
          key={i}
          className="playlist-entry"
          onClick={select}
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress}
        >
          {playlist.name}
        </div>
      ));
    } else {
      playlistValues = <div><b>No Playlists</b></div>;
    }
    return (
      <div className="playlists-container">
        { playlistValues }
      </div>
    );
  }
}

Playlists.propTypes = {
  playlists: PropTypes.array,
  select: PropTypes.func.isRequired,
};

Playlists.defaultProps = {
  playlists: [],
};

export default Playlists;
