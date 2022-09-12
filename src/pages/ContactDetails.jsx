import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaPencilAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { contactContext } from '../components/ContactContext/ContactContext';
import { authContext } from '../components/authContext/AuthContext';

const ContactDetails = () => {
  const {contacts} = useContext(contactContext);
  const {user} = useContext(authContext);
    const [contact, setContact] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    const foundContact = contacts.find((contact) => contact.id === +id);
    const isOwner = user.id === contact?.author?.data?.id;

    console.log(isOwner);
useEffect(() =>{
    if(id && foundContact){
        setContact(foundContact);
    }
}, [id])
const {
    firstName,
    lastName,
    email,
    profession,
    bio,
    gender,
    dateOfBirth,
    image,
  } = contact;

    return (
        <>
        
        <h2 className='text-center mb-3 text-white'>Contact Details</h2>
        {Object.keys(contact).length === 0 ? (
            <p>No Contact to Show </p>
          ) : (
        <Card style={{ width: "800px", margin: "50px auto"  }}>
      <div className="d-flex">
        <Card.Img src={image} className="card-img" />
        <div>
          <Card.Body>
            <Card.Title className='text-info'>
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
         {isOwner && <Card.Link as={Link} to={`/edit-contact/${id}`}>
          <Button variant='warning ms-3' size='md' type='view'>
            <FaPencilAlt />
          </Button>
        </Card.Link>  }
          </Card.Body>
        </div>
      </div>
    </Card>
          )}
        </>
        
    );
}

export default ContactDetails;
