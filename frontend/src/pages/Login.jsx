import React, { useState } from "react";
import {
  Center,
  Box,
  Heading,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file


export function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://freedom-firebase-045.onrender.com/users/login", userData)
      .then((res) => {
        setLoading(false);
        const { token, role } = res.data;
        localStorage.setItem("fitbuddy", JSON.stringify({ token, role }));
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <Center className="center-container">
      <Box className="login-box">
        <Heading as="h2" className="login-heading" size="lg">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={userData.email}
          />
          <InputGroup className="password-input-group" size="md">
            <Input
              className="login-input"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                variant="unstyled"
                onClick={handleTogglePassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                className="toggle-password-button"
              />
            </InputRightElement>
          </InputGroup>
          {error && <p className="error-message">{error}</p>}
          <Button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Box className="signup-container">
          <Button
            variant="link"
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Create new Account
          </Button>
        </Box>
     
      </Box>
    </Center>
  );
}
