import React from 'react'
import Slider from 'react-slick'
import R from '../../assets/tourData/R.jpg';
import download10 from '../../assets/tourData/download10.jpg';
import  OIP from '../../assets/tourData/OIP.jpg';

const Testimonials = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return <Slider {...settings}>
<div className='testimonial py-4 px-3'>
<p>
Lorem ipsum dolor sit amet.
Voluptas quam aspernatur neque libero.
Laboriosam sed id numquam porro!
Repellat placeat quis facere eos.
Nobis maxime ducimus dignissimos eaque.
</p>
<div className='d-flex align-items-center gap-4 mt-3'> 
<img src={R} className='w-25 h-25 rounded-2' alt="" />
</div>
<div>
  <h6 className='mb-0 mt-3'>Ram shrestha</h6>
  <p>user</p>
</div>
</div>


<div className='testimonial py-4 px-3'>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae at id vitae voluptatum aperiam ipsa consequuntur harum nobis architecto obcaecati. Reprehenderit explicabo doloremque corrupti.
</p>
<div className='d-flex align-items-center gap-4 mt-3'> 
<img src={download10} className='w-25 h-25 rounded-2' alt="" />
</div>
<div>
  <h6 className='mb-0 mt-3'> Deepak aryal</h6>
  <p>user</p>
</div>
</div>




<div className='testimonial py-4 px-3'>
<p>
Lorem ipsum dolor sit amet.
Voluptas quam aspernatur neque libero.
Laboriosam sed id numquam porro!
Repellat placeat quis facere eos.
Nobis maxime ducimus dignissimos eaque.

</p>
<div className='d-flex align-items-center gap-4 mt-3'> 
<img src={OIP} className='w-25 h-25 rounded-2' alt="" />
</div>
<div>
  <h6 className='mb-0 mt-3'>Ashwin kumar</h6>
  <p>user</p>
</div>
</div>




  </Slider>
  
}

export default Testimonials