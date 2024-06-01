import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formValues.email === 'admin@7gmail.com' && formValues.password === 'password') {
      localStorage.setItem('authenticated', 'true');
      Navigate('saleorder');
      window.location.reload();
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <Box w={"100vw"}>
      <LoginForm
        formValues={formValues}
        handleFormValues={handleFormValues}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Login;
