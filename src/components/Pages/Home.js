import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import '..bootstrap/dist/js/bootstrap.min.js';


import './styles/Home.css'
import { Container,Row,Col } from 'reactstrap'
import Subtitle from '../../shared/Subtitle'
import worldImg from '../../assets/tourData/worldImg.jpg'
import g4 from '../../assets/tourData/g4.jpg'
import g1 from '../../assets/tourData/g1.jpg'
import g3 from '../../assets/tourData/g3.jpg'
import SearchBar from '../../shared/SearchBar'
import FeaturedTourList from '../features-tour/FeaturedTourList'
import Testimonials from '../Testimonial/Testimonials';
import Newsletter from '../../shared/Newsletter';




const Home = () => {
  return (
    
    <>
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className='hero_content'>
<div className="hero_subtitle d-flex align-items-center">
<Subtitle subtitle={'know before you go'}/>
<img src= {worldImg} alt='Img'/>
</div>
<h1>
    Travelling opens the door to creating{''}
    <span className='highlight'> Memories </span>
</h1>
<p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus deserunt numquam ducimus suscipit quisquam veritatis delectus quam. Facere, cupiditate omnis.
</p>
                    </div>
                </Col>
                <Col lg='2'>
                    <div className="hero_img-box">
                        <img src={g4} alt="" />
                    </div>
                
                </Col>
                <Col lg='2'>
                    <div className="hero_img-box mt-4">
                        <img src={g1} alt="" />
                    </div>
              </Col>
                <Col lg='2'>
                    <div className="hero_img-box mt-5">
                        <img src={g3} alt="" />
                    </div>
              </Col>
              <SearchBar/>
            </Row>
        </Container>
    </section>

{/* feature tour section start */}

<section>
    <Container>
        <Row>
            <Col lg='3'>
                <Subtitle subtitle={"Explore"}/>
   <h2 className='featured_tour-title'>Our featured tour</h2>
            </Col>
        </Row>
    </Container>
    <FeaturedTourList/>
</section>
{/* feature tour section ends */}
{/*============== testimonial section starts */}
<section>
  <Container>
    <Row>
    <Col lg='12'>
        <Subtitle subtitle={'User view'}/>
        <h2 className="testm_title">what our user say about us</h2>
    </Col>
    <Col lg='12'>
        <Testimonials/>
    </Col>
    </Row>
    </Container>  
</section>
{/* testimonial section end========= */}
<Newsletter/>

    </>
  )
}

export default Home