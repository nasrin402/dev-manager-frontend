import React, { useContext, useState } from 'react'
import { Button, Form, ProgressBar  } from 'react-bootstrap';
import { authContext } from '../components/authContext/AuthContext'
import { axiosPrivateInstance } from '../config/axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const uploadPercentage = (total, loaded) => {
  //console.log(total, loaded)
  return Math.floor((total / loaded) * 100)
}

function Profile() {
  const {user, token, profileInfo} = useContext(authContext);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) =>{
   
    setFile(e.target.files[0]);
  }
  console.log(profileInfo);
  const profileImg = profileInfo?.profile?.profilePicture?.url;
 const {username, email, id} = user;
 //const {profile} = profileInfo;
 //console.log(profile);
  const handleSubmit = async (e) =>{
    e.preventDefault();
   
    const data={
      
        user: user.id
      }
      const formData = new FormData();
      formData.append('files.profilePicture', file, file.name)
      formData.append("data", JSON.stringify(data));

        //at first you have to delete the image
    //update as usual

    //image upload alone
    //along  with resource creation
    //upload file to the server
    try {
      setSubmitting(true)
      const response = await axiosPrivateInstance(token).post(
        '/profiles?populate=*',
        formData,
        {
          onUploadProgress: (progress) => {
            const percentage = uploadPercentage(progress.total, progress.loaded)
            
            setPercentage(percentage)
          },
        }
      )

      setImageURL(
        response.data.data.attributes?.profilePicture?.data?.attributes?.url
      )
      console.log( response.data.data.attributes?.profilePicture?.data.attributes?.url)
      setSubmitting(false)
    
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <>
      <h2>Profile Info</h2>
      <p>user id: {id}</p>
      <p>
        username : <em>{username}</em>
      </p>
      <p>
        email : <em>{email}</em>
      </p>
      <div style={{ width: 200, height: 200 }}>
      {imageURL ? <img src={imageURL} alt='profile image' width={"200px"} height={"150px"}/>: 
      <img src={profileImg} alt="img" width={"200px"} height={"150px"}/>
  }
      </div>
     
   
      {percentage > 0 && submitting && (
        <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`}   styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,
      
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
      
          // Text size
          textSize: '16px',
      
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
      
          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',
      
          // Colors
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}/>
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor='profilePicture'>ProfilePicture: </label>
        <input
          type='file'
          accept='image/*'
          name='profilePicture'
          id='profilePicture'
          onChange={handleChange}
        />

        <Button type='submit' variant='primary' disabled={submitting}>
          Upload File
        </Button>
      </Form>
    </>
  )
}

export default Profile