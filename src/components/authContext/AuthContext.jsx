import { createContext, useState, useEffect } from "react";
import { axiosPrivateInstance, axiosPublicInstance } from "../../config/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import qs from 'qs'


export const authContext = createContext();
const signedInUser = JSON.parse(localStorage.getItem("user"));
const signedInToken = JSON.parse(localStorage.getItem("token"));

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState(null)
  const [triggerDelete, setTriggerDelete] = useState(false)
  const [userContacts, setUserContacts] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState(signedInUser ? signedInUser : null);
  const [token, setToken] = useState(signedInToken ? signedInToken : null);
  const location = useLocation();

  const registerUser = async (data) => {
    try {
      const response = await axiosPublicInstance.post(
        "/auth/local/register",
        data
      );
     
      const { user, jwt } = response.data;
      setUser(user);
      setToken(jwt);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      toast.success('Register successfully redirecting...')
      //redirecting the user
      navigate("/contacts");
      
    } catch (err) {
     // console.log(err.response.data.error.message);
      toast.error(err.response.data.error.message);
    }
  };
  //load user profile
  useEffect(() => {
    if (token && loaded) {
      (async () => {
        await loadUserProfile()
      })()
    }
  }, [token, loaded])

  //load user
  useEffect(() => {
    if (token) {
      (async () => {
        await loadUserContact()
      })()
    }
  }, [token, triggerDelete])


  const loadUserContact = async () => {
    const query = qs.stringify(
      {
        populate: ['profile', 'profile.profilePicture', 'contacts'],
      },
      {
        encodeValuesOnly: true,
      }
    )
    try {
      const response = await axiosPrivateInstance(token).get(
        `/users/me?${query}`
      )
      
      setProfileInfo(response.data);
      //console.log(response.data);
      setLoaded(true)
    } catch (err) {
      console.log(err.response)
      setLoaded(true)
    }
  }


  const loadUserProfile = async () => {
    const query = qs.stringify(
      {
        populate: ['profilePicture', 'user', 'user.contacts'],
      },
      {
        encodeValuesOnly: true,
      }
    )
    try {
      const response = await axiosPrivateInstance(token).get(
        `/profiles/${profileId}?${query}`
      )
      const mappedContacts =
        response.data.data.attributes.user.data.attributes.contacts.data.map(
          (contact) => formateContact(contact)
        )
     console.log(response.data)
      setUserContacts(mappedContacts)
    
      setLoaded(true)
    } catch (err) {
      //console.log(err.response)
   
      setLoaded(true)
    }
  }

 





  const login = async (data) => {
    try {
      const response = await axiosPublicInstance.post("/auth/local", data);
      const { user, jwt } = response.data;
     

      setUser(user);
      setToken(jwt);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      toast.success("Login successfully redirecting...");

      //Redirecting the user
      // navigate("/contacts");
      navigate(location?.state?.from ? location?.state?.from : "/contacts");
    } catch (err) {
      toast.error(err.response?.data?.error?.message);
    }
  };
  const logout = () => {
    //remove data from localStorage

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    //remove data from state
    setUser(null);
    setToken(null);
    toast.success("Logout successful redirecting...");
    navigate("/");
  };
  const value = {
    setTriggerDelete,
    userContacts,
    loaded,
    registerUser,
    login,
    logout,
    user,
    token,
    profileInfo
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
