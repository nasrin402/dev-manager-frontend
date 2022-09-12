import { useReducer, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../authContext/AuthContext";
import qs from 'qs'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACTS,
  UPDATE_CONTACT,
} from "./actionType";
import contactsReducer from "./reducer";
import axios from "axios";
import { axiosPrivateInstance } from "../../config/axios";
import { formatContact } from "../../utils/formateContact";

export const contactContext = createContext();
const initialContacts = [];

export const ContactContext = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts);
  const [loaded, setLoaded] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const { user, token } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      (async () => {
        await loadContacts();
      })();
    }
    
  }, [token, pageNumber, trigger, searchInput]);

  const loadContacts = async () => {
  
    const query = qs.stringify({
      sort:['id:desc'],
      populate:'*',
      pagination:{
        page: pageNumber,
        pageSize: import.meta.env.VITE_PAGE_SIZE,
      },
      filters: {
        $or: [
          {
            firstName: {
              $contains: searchInput,
            },
          },
          {
            lastName: {
              $contains: searchInput,
            },
          },
          {
            bio: {
              $contains: searchInput,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
    )
    try {
      const response = await axiosPrivateInstance(token).get(`/contacts?${query}`);

      const loadedContacts = response.data.data.map((contacts) =>
        formatContact(contacts)
      );

      dispatch({ type: LOAD_CONTACTS, payload: loadedContacts });
      setPageCount(response.data.meta.pagination.pageCount)
      setLoaded(true)
    } catch (err) {
      setLoaded(true)
      console.log(err.response)
    }
  };

  const updateContact = async(contactToUpdate, id) => {
    try {
      const response = await axiosPrivateInstance(token).put(`/contacts/${id}`, {
        data: contactToUpdate,
      });
      const UpdatedContact = formatContact(response.data.data);
      dispatch({ type: UPDATE_CONTACT, payload: { id, UpdatedContact } });
      toast.success("contact is added successfully");
      navigate('/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
 
    
  };
  const deleteContact = async(id) => {
    try{
      await axiosPrivateInstance(token).delete(`/contacts/${id}`)
      dispatch({ type: DELETE_CONTACT, payload: id });
      setTrigger(!trigger)
      toast.success("contact is deleted successfully");
      //navigate('/contacts')
    }catch(err){
      toast.error(err.response?.data?.error?.message);
    }
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const addContact = async (contactData) => {
    
   let {file, ...data} = contactData;
 
  console.log(contactData);
    const formData = new FormData();
    formData.append('files.profilePicture', file, file.name)
    formData.append("data", JSON.stringify(data));

    try {
      const response = await axiosPrivateInstance(token).post("/contacts?populate=*", 
         formData,
      );
      console.log(response.data);
      const contact = formatContact(response.data.data);
      dispatch({ type: ADD_CONTACT, payload: contact });

      toast.success("contact is added successfully");
      navigate('/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  };
  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    pageCount,
    pageNumber,
    setPageNumber, 
    loaded,
    setSearchInput
  };
  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
};
