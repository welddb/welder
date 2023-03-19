import { Field, Form, Formik } from "formik";
import React from "react";

const User_Form = () => {
  const initialValues = {
    id: "",
    name: "",
    role: "",
    joining_data: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form>
              <h6>Add User</h6>

              <div>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Please Enter User Name"
                />
              </div>

              <div>
                <label htmlFor="id">Id</label>
                <Field
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Please Enter Id"
                />
              </div>

              <div>
                <label htmlFor="role">Role</label>
                <Field as="select" name="role" id="role">
                  <option value="supervisor">Supervisor</option>
                  <option value="operator">Operator</option>
                </Field>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default User_Form;
