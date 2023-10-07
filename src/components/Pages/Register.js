import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';
import registerimg from '../../assets/tourData/registerimg.png';
import { Container, Row, Col, Form, FormGroup, Button, Alert } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  console.log(credentials);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordsMatch, setPasswordsMatch] = useState(true); // To track if passwords match

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // Reset passwordsMatch when user edits password fields
    setPasswordsMatch(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='m-auto'>
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerimg} alt="Register" />
              </div>
              <div className='login_form'>
                <h2>Register</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder='Username'
                      required
                      id='username'
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                  <FormGroup>
                    <input
                      type="password"
                      placeholder='Confirm Password'
                      required
                      id='confirmPassword'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  {!passwordsMatch && (
                    <Alert color="danger">Passwords do not match.</Alert>
                  )}
                  <Button className='btn secondary_btn auth_btn' type='submit'>
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
