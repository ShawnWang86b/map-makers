import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
// import { setCredential } from "../../store/reducer/authSlice";
// import { useLoginMutation } from "../../redux/authApi";
import LoginSchema from "./LoginSchema";

const Login = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const [login, { isLoading }] = useLoginMutation();

  //   if (isLoading) return <div>Loading</div>;
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={({ email, password }, actions) => {
        // const { accessToken } = login({ email, password }).unwrap();
        // dispatch(setCredential({ accessToken }));
        navigate("/chat");
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Box>
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email"></FormLabel>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password"></FormLabel>
                  <Input {...field} id="password" placeholder="Password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              margin={4}
              isLoading={props.isSubmitting}
              type="submit"
              backgroundColor="#00C38A"
              color="#ffffff"
            >
              Login
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
