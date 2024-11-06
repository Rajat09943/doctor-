import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import './Login.css';  // Import the CSS file

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishLogin = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        message.success('Login Successfully');
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const onFinishRegister = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Registration Successful!');
        setIsRegistering(false);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Form
          layout="vertical"
          onFinish={isRegistering ? onFinishRegister : onFinishLogin}
          className="form"
        >
          <h3 className="title">{isRegistering ? 'Register Form' : 'Login Form'}</h3>

          {isRegistering && (
            <>
              <Form.Item label="Name" name="name" required>
                <Input
                  type="text"
                  className="input"
                  placeholder="Enter your name"
                />
              </Form.Item>
            </>
          )}

          <Form.Item label="Email" name="email" required>
            <Input
              type="email"
              className="input"
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item label="Password" name="password" required>
            <Input
              type="password"
              className="input"
              placeholder="Enter your password"
            />
          </Form.Item>

          {!isRegistering ? (
            <Link to="#" onClick={() => setIsRegistering(true)} className="link">
              Not a user? Register here
            </Link>
          ) : (
            <Link to="#" onClick={() => setIsRegistering(false)} className="link">
              Already a user? Login here
            </Link>
          )}

          <button className="button" type="submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
