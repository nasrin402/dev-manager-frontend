import { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import { contactContext } from "../ContactContext/ContactContext";
import FormTextInput from "../../layouts/FormTextInput";
import img from '../../assets/saad.jpg'
import { authContext } from "../authContext/AuthContext";
const schema = yup
  .object({
    firstName: yup
      .string()
      .required("FirstName is Required")
      .min(3, "FirstName must be 3 or more in length "),
    lastName: yup
      .string()
      .required("LastName is Required")
      .min(3, "LastName must be 3 or more in length "),
    email: yup
      .string()
      .required("email is Required")
      .email("Must be a valid email"),
    profession: yup
      .string()
      .required("Profession is Required")
      .oneOf(["developer", "designer", "marketer"])
      .min(3, "Profession must be 3 or more in length "),
    bio: yup
      .string()
      .required("Bio is Required")
      .min(10, "Bio must be 10 or more in length ")
      .max(300, "Bio must be equal or less thant 300 character"),
    // image: yup
    //   .string()
    //   .required("profile Image URL is Required")
    //   .url("Must be a valid URL"),
    gender: yup
      .mixed()
      .required("Gender is required")
      .oneOf(["Male", "Female"]),
  })
  .required();

function ContactForm({ contact }) {
  const { addContact, updateContact } = useContext(contactContext);
  const {user} = useContext(authContext)
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const defaultValue = {
    firstName: contact?.firstName || "Nasreen",
    lastName: contact?.lastName || "Akter",
    email: contact?.email || "nasreen.akter34@gmail.com",
    gender: contact?.gender || "Female",
    profession: contact?.profession || "developer",
    bio: contact?.bio || "All about myself, Modify of your own if necessary",
   profilePicture: contact?.profilePicture || "",
    dateOfBirth: contact?.dateOfBirth || new Date(),
  };

  const { firstName, lastName, email, gender, profession, bio, profilePicture} =
    defaultValue;

  const [birthYear, setBirthYear] = useState(new Date());

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        profession: "",
        bio: "",
        gender: "Male",
      });
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setValue("dateOfBirth", birthYear);
   
  }, [birthYear, file]);
  
  const handleChange = (e) =>{
    setFile(e.target.files[0]);
    
  }
  const onSubmit = (data) => {
    const id = contact?.id;

    //const formData = new FormData();
    //formData.append('files.profilePicture', file, file.name)
   // formData.append("data", JSON.stringify(data));

 const allData = {
  ...data, 
    file,
  author: user.id
 }

    //adding contacts
    if (id) {
      toast.success("contact is Updated Successfully");
      updateContact(formData, +id);
    } else {
      
      //show flash message
      toast.success("contact is Added Successfully");
      addContact(allData);
    }

    navigate("/contacts");
  };

  return (
    <>
      <h2 className="text-center text-white py-4">
        {contact?.id ? "Edit Contact" : "Add Contact"}
      </h2>
      <div className='form' >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="firstName"
          label="First Name"
          placeholder="Enter Your First Name"
          errors={errors}
          register={register}
          defaultValue={firstName}
        />
        <FormTextInput
          name="lastName"
          label="Last Name"
          placeholder="Enter Your Last Name"
          errors={errors}
          register={register}
          defaultValue={lastName}
        />

        <FormTextInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          errors={errors}
          register={register}
          defaultValue={email}
        />
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="profession" column>
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select
              {...register("profession")}
              id="profession"
              defaultValue={profession}
              isInvalid={errors?.profession}
              aria-label="Select your profession"
            >
              <option value="" disabled>
                Select your profession
              </option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="marketer">Markerter</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.profession?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="profilePicture" column>
              ProfilePicture:
            </Form.Label>
          </Col>
          <Col sm={9}>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              id="profilePicture"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.image?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dateOfBirth" column>
              Date of Birth
            </Form.Label>
          </Col>
          <Col sm={9}>
            <DatePicker
              selected={birthYear}
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter your Date of Birth"
              maxDate={new Date()}
              showYearDropdown
              onChange={(date) => setBirthYear(date)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="gender" column>
              Gender{" "}
            </Form.Label>
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Male"
              defaultChecked={gender === "Male"}
              value="Male"
              {...register("gender")}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Female"
              value="Female"
              defaultChecked={gender === "Female"}
              {...register("gender")}
            />
          </Col>
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.gender?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <FormTextInput
          name="bio"
          label="Bio"
          placeholder="Enter Your Bio"
          errors={errors}
          register={register}
          defaultValue={bio}
          as="textarea"
        />
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting ? "disabled" : ""}
        >
          {contact?.id ? "Update Contact" : "Add Contact"}
        </Button>
      </Form>
      </div>
    </>
  );
}

export default ContactForm;
