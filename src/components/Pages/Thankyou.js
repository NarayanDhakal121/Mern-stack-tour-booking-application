import React from 'react'
import { Container, Row, Col,Button } from 'reactstrap'
import './styles/Thankyou.css'
import { Link } from 'react-router-dom'

const Thankyou = () => {
  return (
<Container>
    <Row>
        <Col lg='12'>
            <div className='thank-you'>
                <span> <i className='ri-checkbox-circle-line'></i></span>
                <h1 className='mb-3 fw-semibold'>Thank You</h1>
<h3 className='mb-4'>your tour is booked</h3>
<Button className=' btn primary_btn'>
<Link to='/home'>back to Home</Link>
</Button>
            </div>
        </Col>
    </Row>
</Container>

  )
}

export default Thankyou