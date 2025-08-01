import React, { useState } from "react";
import "../loginForm/LoginForm.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../state/index";
import Dropzone from "react-dropzone";
import Input from "../customInput/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast helpers
const notifyError = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    theme: "light",
  });

const notifySuccess = (message, delay) =>
  toast.success(message, {
    position: "top-center",
    autoClose: delay,
    theme: "light",
  });

// Validation schemas
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
    .required("Password is required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
    .required("Password is required"),
});

// Initial values
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [pageType, setPageType] = useState("register");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Register handler
  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picture", values.picture.name);

      const savedUserResponse = await axios.post(
        "http://localhost:8080/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const savedUser = savedUserResponse.data;
      onSubmitProps.resetForm();
      if (savedUser) {
        notifySuccess("Successfully Registered!", 1000);
        setPageType("login");
      }
    } catch (error) {
      notifyError("Email id already exists!");
    }
  };

  // Login handler
  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await axios.post(
        "http://localhost:8080/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const loggedIn = loggedInResponse.data;
      onSubmitProps.resetForm();

      if (loggedIn.user) {
        dispatch(setLogin({ user: loggedIn.user })); // Only user now
        navigate("/home");
      }
    } catch (error) {
      if (error.response?.data?.msg === "User does not exist. ") {
        notifyError("User does not exist!");
      } else {
        notifyError("Invalid credentials!");
      }
    }
  };

  // Unified submit handler
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {(props) => (
        <Form>
          {isRegister && (
            <>
              <Input label="First Name" name="firstName" type="text" />
              <Input label="Last Name" name="lastName" type="text" />
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  props.setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone-container">
                    <div className="dropzone-wrapper" {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!props.values.picture ? (
                        <p className="add-picture">Add Picture Here</p>
                      ) : (
                        <div className="upload">
                          <span className="uploaded-file-text">
                            {props.values.picture.name}
                          </span>
                          <FontAwesomeIcon className="edit-icon" icon={faPen} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
              {props.errors.picture && (
                <div className="error">{props.errors.picture}</div>
              )}
            </>
          )}
          <Input label="Email Id" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <div className="button-wrapper">
            <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
          </div>
          <div
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              props.resetForm();
            }}
            className="login-or-register"
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </div>
          <ToastContainer position="top-center" autoClose={3000} theme="light" />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
