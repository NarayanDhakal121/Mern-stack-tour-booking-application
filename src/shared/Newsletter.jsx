import React from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
const Newsletter = () => {
  return (
<section className='newsletter'>
    <Container>
        <Row>
            <Col lg='6'>
                <div className='newsletter_content'>
                    <h3> <span className='newsletter_content-subs'>Subscribe</span> to get useful travelling information</h3>

                    <div className="newsletter_input">
                        <input type="email" placeholder='Enter your Email' />
                        <button className="btn newsletter_btn">Suscribe</button>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, sit. Similique soluta ducimus consequatur !</p>
                </div>
            </Col>
          
        </Row>
    </Container>
</section>
  )
}

export default Newsletter