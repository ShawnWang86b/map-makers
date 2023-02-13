import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  Button,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { setCredential } from "../../store/reducer/authSlice";
import { useRegisterMutation } from "../../redux/authApi";
import SignUpSchema from "./SignUpSchema";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  if (isLoading) return <div>Loading</div>;
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        phone: "",
        avatar: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(
        { firstName, lastName, userName, email, password, phone, avatar },
        actions
      ) => {
        //const accessToken =
        register({
          firstName,
          lastName,
          userName,
          email,
          password,
          phone,
          avatar,
        }).unwrap();
        //dispatch(setCredential({ accessToken }));
        navigate("/chat");
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Box width="480px">
          <Form>
            <Field name="firstName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                >
                  <FormLabel htmlFor="firstName"></FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="firstName"
                    placeholder="First name"
                    height="50px"
                  />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                >
                  <FormLabel htmlFor="lastName"></FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="lastName"
                    placeholder="Last name"
                    height="50px"
                  />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="userName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.userName && form.touched.userName}
                >
                  <FormLabel htmlFor="userName"></FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="userName"
                    placeholder="User name"
                    height="50px"
                  />
                  <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email"></FormLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="Email"
                    height="50px"
                  />
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
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      height="50px"
                    />
                    <InputRightElement
                      cursor="pointer"
                      marginTop="1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible fontSize="28" color="#4F4F4F" />
                      ) : (
                        <AiOutlineEye fontSize="28" color="#4F4F4F" />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.phone && form.touched.phone}
                >
                  <FormLabel htmlFor="phone"></FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="phone"
                    placeholder="Phone"
                    height="50px"
                  />
                  <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="avatar">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.avatar && form.touched.avatar}
                >
                  <FormLabel htmlFor="avatar"></FormLabel>
                  <Input
                    {...field}
                    type="file"
                    id="avatar"
                    placeholder="Avatar"
                    height="50px"
                  />
                  <FormErrorMessage>{form.errors.avatar}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              marginY={4}
              isLoading={props.isSubmitting}
              type="submit"
              backgroundColor="#00C38A"
              color="#ffffff"
              width="480px"
              height="50px"
            >
              Create account
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default SignUp;
