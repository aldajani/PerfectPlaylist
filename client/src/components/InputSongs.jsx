/* eslint-disable no-console */
import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class InputSongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: '',
      artist: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { song, artist } = this.state;
    const { playlist, update } = this.props;
    Axios.put('/api/playlists/songs', { song, artist, playlist })
      .then(() => {
        this.setState({
          song: '',
          artist: '',
        });
      })
      .then(() => update())
      .catch((err) => console.log(err));
  }

  render() {
    const { song, artist } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="songs">
          Song Name:&nbsp;
          <input type="text" className="input" name="song" value={song} onChange={this.handleChange} />
        </label>
        &nbsp;
        <label htmlFor="songs">
          Artist:&nbsp;
          <input type="text" className="input" name="artist" value={artist} onChange={this.handleChange} />
        </label>
        &nbsp;
        <input type="submit" className="input" value="Submit" />
      </form>
    );
  }
}

InputSongs.propTypes = {
  playlist: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default InputSongs;
