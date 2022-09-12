import React, { useContext, useEffect } from "react";
import { contactContext } from "../components/ContactContext/ContactContext";
import Contact from "../components/contacts/Contact";
import { Pagination } from "react-bootstrap";
import Loader from "../components/Loader";
import { authContext } from "../components/authContext/AuthContext";

const generateArr = (num) => {
  let arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};

function Contacts({ searchInput }) {
  const {token} = useContext(authContext);
  const { contacts, pageCount, pageNumber, setPageNumber, loaded } =
    useContext(contactContext);

  const pageCountArr = generateArr(pageCount);
 
  const isPageErrorOfBound = pageCount? pageNumber > pageCount : false;
 useEffect(()=>{
  if(isPageErrorOfBound){
    setPageNumber(pageCount - 1)
  }
 }, [isPageErrorOfBound])

  const handlePageClick = (e) =>{
    setPageNumber(+e.target.dataset.count);
   
  }

  return (
    <>
      <h2 className="text-center text-white mt-4">All Contacts</h2>
      {loaded ? (
        <>
          {contacts?.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}

          <div>
          <Pagination style={{justifyContent: 'center'}}>
          {pageCountArr.map((count, i) =>{
            return(
              <Pagination.Item
              key={i}
              active={count === pageNumber}
              data-count = {count}
              onClick={handlePageClick} >
              {count}
              </Pagination.Item>
            )
          })}
          </Pagination>
        </div>
        </>
      ) : (
        <Loader />
      )}
   
    </>
  );
}

export default Contacts;
