/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ handleClose, show, searchResults, selectedSong, selectSong}) => {
  
  let iFrame = null;
  
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  const songs = searchResults.map(result => {
    return (
      <div 
        className='search-results'
        key={result.uri}
        id={result.uri}
        onClick={selectSong}
      >
        <div className='search-results-contents' id={result.uri}>
          <img src={result.album.images[2].url} id={result.uri} />
        </div>
        <div className='search-results-contents' id={result.uri}>
          {result.name}<br />
          {result.album.artists[0].name}<br />
        </div>
      </div>
    )
  });

  const songList = (
    <div className="modal-contents">
      {songs}
    </div>
  )

  if(selectedSong) {
    iFrame = (
      <div className='iFrame'>
        <iframe
          title="Spotify"
          className="SpotifyPlayer"
          src={`https://embed.spotify.com/?uri=${selectedSong}=list&theme=$black`}
          width={300}
          height={80}
          frameBorder="0"
          data-allow="encrypted-media"
        />
      </div>
    );
  }
  
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        {iFrame || songList}
        <button
          type="button"
          onClick={handleClose}
        >
          close
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  albums: PropTypes.array,
};

Modal.defaultProps = {
  albums: [],
};

export default Modal;
