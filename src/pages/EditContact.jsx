import React, { useContext } from 'react'
import ContactForm from '../components/contacts/ContactForm'
import { useParams } from 'react-router-dom'
import { contactContext } from '../components/ContactContext/ContactContext'

function EditContact() {
  const { contacts } = useContext(contactContext);
  const { id } = useParams()

  const foundContact = contacts.find((contact) => contact.id === +id)
console.log(foundContact);
  return <ContactForm contact={foundContact}  />
}

export default EditContact;
