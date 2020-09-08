import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { createPost } from '../../API-Calls/Data-provider'
import { FiImage } from "react-icons/fi";
import { useToasts } from 'react-toast-notifications'
import {successMessage, errorMessage} from '../../method/common'

function PostModal(props) {
  const { addToast } = useToasts()
  const handleClose = () => {
    props.closeModal(false);
  };


  const { state, dispatch } = useContext(UserContext)
  const [body, setBody] = useState("");
  const [processing, setProcessing] = useState(false);
  const [photo, setPhoto] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function uploadImage(e) {
    setProcessing(true)
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "amirsohel");
    let imageUrl = await axios.post(
      `https://api.cloudinary.com/v1_1/amirsohel/image/upload`, data)
      .catch(error => {
      addToast('Upload a image', errorMessage())
        setProcessing(false)
      })
    if (imageUrl)
      setImageUrl(imageUrl.data.url);
  }

  useEffect(() => {
    if (imageUrl) {
      submitPost();
    }
    //run this function when imageUrl value get changed
  }, [imageUrl]);


  async function submitPost() {
    setProcessing(true);
    const newPost = await createPost(body, imageUrl);
    if (newPost.error) {
      addToast(newPost.error, errorMessage())
      setProcessing(false);
    }
    else {
      addToast('Post published', successMessage())
      setProcessing(false);
      window.location.href = '/'
    }
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="user-header d-flex align-items-center">
          <img src={state && state.profileImg} />
          <h5>{state && state.name}</h5>
        </div>
        <textarea
          type="text"
          className="message-body"
          placeholder="Add a image caption..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="image-uploader" htmlFor="image-file"> <FiImage /> {photo ? photo.name : 'Choose Image'}</label>
        <input accept="audio/*,video/*,GIF/*,image/*" className="d-none" id="image-file" type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={uploadImage}>
          {processing && processing ? 'Processing...' : 'Submit Post'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;
