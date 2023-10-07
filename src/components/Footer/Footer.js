import React from 'react'
import './footer.css'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const quick_links =[
  {
      path:'/home',
      display:'Home'
  },
  {
      path:'/about',
      display:'About'
  },
  {
      path:'/tours',
      display:'Tours'
  },
];

const quick_links2=[
  {
      path:'/gallery',
      display:'gallery'
  },
  {
      path:'/login',
      display:'login'
  },
  {
      path:'/register',
      display:'register'
  },
];

function Footer() {
  const year=new Date().getFullYear();
  return (
   <footer className='footer'>
<Container>
  <Row>
    <Col lg='3'>
<div className='footer-obj'>
  <h2>GuideMate</h2>
  <p> Get in touch with us on</p>
  <div className='social_links d.flex align-items-center gap-4'>
<span>
  <Link to='# '><i class="ri-facebook-fill"></i></Link>
</span>
<span>
  <Link to='# '><i class="ri-youtube-fill"></i></Link>
</span>
<span>
  <Link to='# '><i class="ri-instagram-fill"></i></Link>
</span>
  </div>
</div>
    </Col>
    <Col lg='3'>
    <h5 className='footer_link-title'>Discover</h5>
   {quick_links.map((item, index) =>(
        <div key={index} className='ps-0' border-0> 
        <Link to={item.path}>{item.display}</Link>
        </div>
      ))} 
    </Col>

    <Col lg='3' >
    <h5 className='footer_link-title'>Quick Links</h5>
   {quick_links2.map((item, index) =>(
        <div key={index} className='ps-0' border-0> 
        <Link to={item.path}>{item.display}</Link>
        </div>
      ))} 
    </Col>

    <Col lg='3'>
    <h5 className='footer_link-title'>Contact</h5>
   <div className='ps-0 border-0 d-flex align-items-center gap-3'>
<h6 className='mb-0 d-flex align-item-center gap-2'>
  <span>
  <i class="ri-map-pin-line"></i>
  </span>
  Address:
</h6>
<p className='mb-0 '>Kathmandu, Nepal</p>
   </div>
      
   <div className='ps-0 border-0 d-flex align-items-center gap-3'>
<h6 className='mb-0 d-flex align-item-center gap-2'>
  <span>
  <i class="ri-phone-fill"></i>
  </span>
  contact:
</h6>
<p className='mb-0 '>+977 987890</p>
   </div>


   <div className='ps-0 border-0 d-flex align-items-center gap-3'>
<h6 className='mb-0 d-flex align-item-center gap-2'>
  <span>
  <i class="ri-mail-line"></i>
  </span>
  Email:
</h6>
<p className='mb-0 '>GuideMateNepal123@gmail.com</p>
   </div>

    </Col>
<Col lg='12' className='text-center pt-5'>
  <p className="copyright">Copyright {year}, Guidemate. All rights reserved </p>
</Col>
  </Row>
</Container>
   </footer>
  )
}

export default Footer
