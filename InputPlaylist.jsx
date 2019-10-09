/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class InputPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const { update } = this.props;
    if (!value) {
      alert('Playlist name cannot be blank');
      return;
    }
    Axios.post('/api/playlists', { name: value })
      .then(() => {
        this.setState({
          value: '',
        });
      })
      .then(() => update())
      .catch((err) => console.log(err));
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="playlist">
            Add Playlist:&nbsp;
            <input type="text" className="input" value={value} onChange={this.handleChange} />
          </label>
          &nbsp;
          <input type="submit" className="input" value="Submit" />
        </form>
      </div>
    );
  }
}

InputPlaylist.propTypes = {
  update: PropTypes.func.isRequired,
};

export default InputPlaylist;
