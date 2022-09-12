import React, { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { FaEye, FaRegTrashAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { contactContext } from "../ContactContext/ContactContext";
import { authContext } from "../authContext/AuthContext";


const Contact = ({ contact, }) => {
  const {deleteContact} = useContext(contactContext);
  const {user} = useContext(authContext);
  const {
    firstName,
    lastName,
    email,
    profession,
    profilePicture,
    dateOfBirth,
    bio,
    gender,
    id,
  } = contact;
  const isOwner = user.id === contact?.author?.data?.id;
  //console.log(user.id, "=", contact?.author?.data?.id);
  return (
    <Card style={{ width: "800px", margin: "50px auto" }}>
      <div className="d-flex">
        <Card.Img src={profilePicture?.data?.attributes?.url} className="card-img" />
        <div>
          <Card.Body>
            <Card.Title className="text-info">
              {firstName} {lastName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {profession}
            </Card.Subtitle>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>Date of birth: {dateOfBirth instanceof Object ? format(dateOfBirth, 'dd/mm/yyyy') : dateOfBirth}</ListGroup.Item>
            <ListGroup.Item>Bio: {bio}</ListGroup.Item>
            <ListGroup.Item>Gender: {gender}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link as={Link} to={`/contacts/${id}`} style={{color:"#133150", cursor:"pointer"}}><FaEye/></Card.Link>
           {isOwner &&  <Card.Link style={{ cursor:"pointer"}} className="text-danger" onClick={() =>{deleteContact(id)}}><FaRegTrashAlt/></Card.Link>}
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default Contact;
