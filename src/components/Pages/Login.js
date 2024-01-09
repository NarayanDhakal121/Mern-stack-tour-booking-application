import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';
import loginImg from '../../assets/tourData/loginImg.png';
import useravatar from '../../assets/tourData/useravatar.png';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log(result)
      if (res.ok) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        navigate('/');
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
        alert(result.message);
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      // console.error(error); 
      alert('An error occurred while logging in.'); 
    }
  };



  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='12' className='m-auto'>
              <div className="login_container d-flex justify-content-between">
                <div className="login_img">
                  <img src={loginImg} alt="Login" />
                </div>
                <div className='login_form'>
                  <div className='user'>
                    <img src={useravatar} alt="User Avatar" />
                  </div>
                  <h2>Login</h2>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder='Email'
                        required
                        id='email'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder='Password'
                        required
                        id='password'
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button className='btn secondary_btn auth_btn' type='submit'>
                      Login
                    </Button>
                  </Form>
                  <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
