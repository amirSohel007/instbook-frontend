import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {headers} from '../../method/common'
import { FiImage } from "react-icons/fi";

function PostModal(props) {

  const handleClose = () => {
    props.closeModal(false);
  };

  const [body, setBody] = useState("");
  const [processing, setProcessing] = useState(false);
  const [photo, setPhoto] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isError, setError] = useState('')

  async function uploadImage(e) {
    setProcessing(true)
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "amirsohel");
    let imageUrl = await axios.post(
      `https://api.cloudinary.com/v1_1/amirsohel/image/upload`,data)
      .catch(error => {
        setError('Upload a image')
        setProcessing(false)
       })
      if(imageUrl)
      setImageUrl(imageUrl.data.url);
  }

  useEffect(() => {
    if (imageUrl) {
    createPost();
    }
    //run this function when imageUrl value get changed
  }, [imageUrl]);


  async function createPost() {
    setProcessing(true)
    const post = {body, imageUrl };
    let res = await axios.post("http://localhost:5000/api/addpost", post, {headers})
    .catch(error => {
      console.log(error)
    })
    if(res.data.error){
      setError(res.data.error)
      setProcessing(false)
    }
    setProcessing(false)
    setError(false)
    window.location.reload()
    
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="user-header d-flex align-items-center">
          <img src="https://scontent.fudr1-1.fna.fbcdn.net/v/t1.0-1/cp0/p40x40/89032796_2568881379999310_9071156969955393536_o.jpg?_nc_cat=100&_nc_sid=7206a8&_nc_ohc=1HgK80DWbWcAX_cW4aV&_nc_ht=scontent.fudr1-1.fna&oh=a9943d102e4ef3ac606dd30d9ba09087&oe=5F03D6C1"/>
          <h5>Amir Sohel</h5>
        </div>
        <textarea
          type="text"
          className="message-body"
          placeholder="Add a image caption..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="image-uploader" for="image-file"> <FiImage/> {photo? photo.name :'Choose Image'}</label>
        <input className="d-none" id="image-file" type="file" onChange={(e) => setPhoto(e.target.files[0])}/>
        {isError && (
                <div
                  className="alert alert-danger mt-3 text-12 text-center"
                  role="alert"
                >
                  {isError}
                </div>
              )}
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
