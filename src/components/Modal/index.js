import React, { Component} from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal'



class VideoModal extends Component {

  render() {
    let { modalOpen, closeModal, vidUrl, videoTitle } = this.props
    return (
      <div>
        <Modal onClose={closeModal} open={modalOpen} center>
          <iframe width="560" height="315" src={vidUrl} frameBorder="0" title={videoTitle} allowFullScreen allow="autoplay; encrypted-media"></iframe>
          <h5>{videoTitle}</h5>
        </Modal>
      </div>
    );
  }
}


VideoModal.propTypes = {
  vidUrl: PropTypes.string,
  videoTitle: PropTypes.string,
  modalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

VideoModal.defaultProps = {
  vidUrl: "",
  videoTitle: "",
  modalOpen: false,
  closeModal: () => {}
}

export default VideoModal

