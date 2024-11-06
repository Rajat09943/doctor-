import React from 'react';
import { Form, Input, message } from 'antd'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Register Successfully!');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrong');
    }
  };

  return (
    <div className='form-container' style={styles.container}>
      <Form layout="vertical" onFinish={onFinishHandler} className='register-form' style={styles.form}>
        <h3 className='text-center' style={styles.title}>Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required style={styles.input} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required style={styles.input} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required style={styles.input} />
        </Form.Item>
        <Link to="/login" className='m-2' style={styles.link}>
          Already a user? Log in here
        </Link>
        <button className="btn btn-primary" type="submit" style={styles.button}>
          Register
        </button>
      </Form>
    </div>
  );
};

// Styles for the Register component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderRadius: '4px',
    borderColor: '#d9d9d9',
    marginBottom: '15px',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    color: '#1890ff',
    margin: '10px 0',
    textDecoration: 'none',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Register;
