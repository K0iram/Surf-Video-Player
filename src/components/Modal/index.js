import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

class VideoModal extends Component {


  render() {
    return (
      <div>
        <Modal open={this.props.modalOpen} onClose={this.props.closeModal} center>
          <iframe src={this.props.vidUrl} frameborder="0"></iframe>
        </Modal>
      </div>
    );
  }
}

export default VideoModal