/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  handleClose, show, song, albums,
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const albumArt = albums.map((alb) => <img src={alb.album.images[1].url} alt={alb.album.id} />);

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="modal-song-name">
          {song}
        </div>
        <div className="modal-albums">
          {albumArt}
        </div>
        <button
          type="button"
          onClick={handleClose}
        >
          close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  song: PropTypes.string,
  albums: PropTypes.array,
};

Modal.defaultProps = {
  song: null,
  albums: [],
};

export default Modal;
