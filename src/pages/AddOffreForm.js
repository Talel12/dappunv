import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import styled from "styled-components";

// Styled components
const StyledModal = styled(Modal)`
  width: 70vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: #4caf50;
  margin: auto;
  & .content {
    width: 70vw;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 600px;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: auto;
  }

  & .overlay {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }

  & h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  & label {
    display: block;
    margin-bottom: 5px;
  }

  & input,
  & button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  & button {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }
`;

const AddOffreForm = ({ isOpen, onRequestClose, onSubmit }) => {
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    salary: Yup.number().required("Salary is required"),
  });

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <h2>Add Offer</h2>
      <Formik
        initialValues={{
          type: "",
          title: "",
          description: "",
          location: "",
          salary: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label>Type:</label>
            <Field type="text" name="type" />
            <ErrorMessage name="type" component="div" />
          </div>

          <div>
            <label>Title:</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label>Description:</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label>Location:</label>
            <Field type="text" name="location" />
            <ErrorMessage name="location" component="div" />
          </div>

          <div>
            <label>Salary:</label>
            <Field type="number" name="salary" />
            <ErrorMessage name="salary" component="div" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </StyledModal>
  );
};

export default AddOffreForm;
