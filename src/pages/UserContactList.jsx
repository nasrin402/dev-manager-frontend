import React, { useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { authContext } from '../components/authContext/AuthContext'
import { contactContext } from '../components/ContactContext/ContactContext'

function UserContactList() {
  const { profileInfo, loaded, setTriggerDelete } = useContext(authContext)

  const { deleteContact } = useContext(contactContext)
//console.log(profile);
  const handleDelete = (id) => {
    deleteContact(id)
    setTriggerDelete(true)
  }
  return (
    loaded && (
      <Table striped size='md' style={{backgroundColor:"aliceblue", borderRadius:"5px"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>profession</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {profileInfo.contacts?.map((userContact) => {
            return (
              <tr key={userContact.id}>
                <td>{userContact.id}</td>
                <td>{userContact.firstName}</td>
                <td>{userContact.lastName}</td>
                <td>{userContact.email}</td>
                <td>{userContact.profession}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(userContact.id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant='secondary'
                    as={Link}
                    to={`/edit-contact/${userContact.id}`}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  )
}

export default UserContactList;