import React, { useContext } from 'react';
import { contactContext } from '../components/ContactContext/ContactContext';
import ContactForm from '../components/contacts/ContactForm'
const AddContacts = () => {
    const {addContact} = useContext(contactContext);
    return (
        <div className='text-white '>
            <ContactForm addContact={addContact}/>
        </div>
    );
}

export default AddContacts;
