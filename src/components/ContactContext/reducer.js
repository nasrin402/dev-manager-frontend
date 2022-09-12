import { v4 as uuidv4 } from "uuid";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACTS,
  UPDATE_CONTACT,
} from "./actionType";

const contactsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {

    case LOAD_CONTACTS:
      return payload;

    case DELETE_CONTACT:
        return  state.filter((contact) => contact.id !== payload);
      

    case ADD_CONTACT:
      const newContact = {
        id: uuidv4(),
        ...payload,
      };
      return [newContact, ...state];

    case UPDATE_CONTACT:
      const { id, contactToUpdate } = payload;
      const contacts = state.map((contact) => {
        if (contact.id === id) {
          //update
          return {
            id,
            ...contactToUpdate,
          };
        } else {
          return contact;
        }
      });

      return [...contacts];

    default:
      return state;
  }
};

export default contactsReducer;
