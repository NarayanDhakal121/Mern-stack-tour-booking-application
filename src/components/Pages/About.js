import React, { useState } from 'react';
import './styles/About.css';
import { Container, Row, Col, Button } from 'reactstrap';

const About = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'YOUR_API_KEY';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Nepal&appid=${API_KEY}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg='12'>
          <h1 className='display-3'>About Page</h1>
          <p className='lead'>This is the About page of our website.</p>
        </Col>
      </Row>

      <Row>
        <Col className='section'>
          <h2>Weather Forecast</h2>
          <p>Details about the weather forecast will go here.</p>
          <Button color='primary' onClick={fetchWeatherData}>
            Check Weather
          </Button>
          {weatherData && (
            <div className='weather-info'>
              <h3>Weather in Nepal</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}
        </Col>
        <Col className='section'>
          <h2>Tour Guides</h2>
          <p>Information about our tour guides will go here.</p>
          <Button color='primary'>Meet Our Guides</Button>
        </Col>
        <Col className='section'>
          <h2>Customization</h2>
          <p>Details about customization options will go here.</p>
          <Button color='primary'>Customize Your Experience</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
