import React, { useState } from 'react';
import { Box, Input, Button, Heading, Center, Flex, useToast, Select } from '@chakra-ui/react';
import axios from 'axios';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'; // Import the CSS file

export function SignUp() {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    role: '', // Added role state
  });
  const [passBox, setPassBox] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialChar: false,
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === 'password') {
      setPassBox(true);
      setPasswordValid({
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        numbers: /\d/.test(value),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      passwordValid.length &&
      passwordValid.lowercase &&
      passwordValid.numbers &&
      passwordValid.uppercase &&
      passwordValid.specialChar &&
      userData.role // Ensure role is selected
    ) {
      axios
        .post('https://freedom-firebase-045.onrender.com/users/register', userData)
        .then((res) => {
          toast({
            title: 'Account created successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          navigate('/login');
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: 'Error creating account. Please try again.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: 'Please fill all fields correctly.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Center className="center-container">
      <Box className="signup-box">
        <Heading as="h2" className="signup-heading" size="lg">
          Sign Up
        </Heading>
        <Box className="form-container">
          <form onSubmit={handleSubmit}>
            <Input
              className="signup-input"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={userData.username}
            />
            <Input
              className="signup-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={userData.email}
            />
            <Input
              className="signup-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={userData.password}
            />
            <Select
              className="signup-select"
              name="role"
              placeholder="Select Role"
              onChange={handleChange}
              value={userData.role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>

            {passBox && (
              <div style={{ paddingBottom: '20px' }}>
                <Flex alignItems="center" className="validation-item">
                  {passwordValid.length ? (
                    <FaRegCircleCheck className="validation-icon validation-valid" />
                  ) : (
                    <FaRegTimesCircle className="validation-icon validation-invalid" />
                  )}
                  <p className={`validation-text ${passwordValid.length ? 'validation-valid' : 'validation-invalid'}`}>
                    Minimum 8 characters
                  </p>
                </Flex>
                <Flex alignItems="center" className="validation-item">
                  {passwordValid.lowercase ? (
                    <FaRegCircleCheck className="validation-icon validation-valid" />
                  ) : (
                    <FaRegTimesCircle className="validation-icon validation-invalid" />
                  )}
                  <p className={`validation-text ${passwordValid.lowercase ? 'validation-valid' : 'validation-invalid'}`}>
                    At least one lowercase letter
                  </p>
                </Flex>
                <Flex alignItems="center" className="validation-item">
                  {passwordValid.uppercase ? (
                    <FaRegCircleCheck className="validation-icon validation-valid" />
                  ) : (
                    <FaRegTimesCircle className="validation-icon validation-invalid" />
                  )}
                  <p className={`validation-text ${passwordValid.uppercase ? 'validation-valid' : 'validation-invalid'}`}>
                    At least one uppercase letter
                  </p>
                </Flex>
                <Flex alignItems="center" className="validation-item">
                  {passwordValid.numbers ? (
                    <FaRegCircleCheck className="validation-icon validation-valid" />
                  ) : (
                    <FaRegTimesCircle className="validation-icon validation-invalid" />
                  )}
                  <p className={`validation-text ${passwordValid.numbers ? 'validation-valid' : 'validation-invalid'}`}>
                    At least one number
                  </p>
                </Flex>
                <Flex alignItems="center" className="validation-item">
                  {passwordValid.specialChar ? (
                    <FaRegCircleCheck className="validation-icon validation-valid" />
                  ) : (
                    <FaRegTimesCircle className="validation-icon validation-invalid" />
                  )}
                  <p className={`validation-text ${passwordValid.specialChar ? 'validation-valid' : 'validation-invalid'}`}>
                    At least one special character
                  </p>
                </Flex>
              </div>
            )}
            <Button type="submit" className="signup-button">
              Sign Up
            </Button>
          </form>
          <Box mt={4} textAlign="center">
            <Button
              variant="link"
              className="login-link"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
