import React, { useContext } from 'react'
import './Booking.css'
import {AiOutlineStar} from 'react-icons/ai'
import { Form, FormGroup,ListGroup,ListGroupItem,Button } from 'reactstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({tour, avgRating}) => {
    const{price,reviews,title}=tour
    const navigate = useNavigate();



    const{user}=useContext(AuthContext)

const[booking, setBooking] =useState({
    // userId: 123456,             without user 
    // userEmail: 'ccc@examp.com', 
     tourName: title,
     fullName: '',
     phone: '',
     guestSize:1,
     bookAt: '',

})

const handleChange = (e) => {
    setBooking(prev=>({...prev,[e.target.id]:e.target.value}))
};
const serviceFee=10
const totalAmount = Number(price)*Number(booking.guestSize)+Number(serviceFee)

//send data to server
const handleClick= async e => {
e.preventDefault()
console.log(booking)


try {

  if (!user || user===undefined || user===null) {

      return alert('please sign in')
  }

const res= await fetch(`${BASE_URL}/api/v1/booking`, {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(booking)
})
const result= await res.json()
if(!res.ok){
    return alert(result.message)
}
navigate("/thank-you")

} catch (error) {
alert(error.message)
    
}


}

  return (
   <>
   <div className='booking'>
{/* <div className='booking_top d-flex align-items-center justify-content-center  justify-content-between'>
<h3>${price} <span>/per person</span> </h3>
<span className='tour_rating d-flex align-items-center '>
<AiOutlineStar />{avgRating === 0 ? null : avgRating} ({reviews.length})

</span>
</div> */}



<div className='booking_top d-flex align-items-center justify-content-center justify-content-between'>
  <h3>${price} <span>/per person</span> </h3>
  <span className='tour_rating d-flex align-items-center '>
    <AiOutlineStar />
    {avgRating === null ? null : avgRating}
    {reviews ? ` (${reviews.length})` : ''}
  </span>
</div>





{/* ==============booking form=========== */}
<div className="booking_form">
    <h5>Information</h5>
    <Form className='booking_info-form' onSubmit={handleClick}>
        <FormGroup>
            <input type="text" placeholder='full name' id='fullName' required onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
            <input type="nummber" placeholder='phone' id='phone' required onChange={handleChange}/>
        </FormGroup>
        <FormGroup className='d-flex align-items-center gap-3'>
            <input type="date" placeholder='' id='bookAt' required onChange={handleChange}/>
            <input type="number" placeholder='guest' id='guestSize' required onChange={handleChange}/>
        </FormGroup>
    </Form>
</div>
{/*================= boooking end============== */}
{/* =======boooking button========== */}
<ListGroup>
    <ListGroupItem className='border-0 px-0'>
<h5 className='d-flex align-items-center gap-1'>${price}<i className='ri-close-line'></i>1 person</h5>
<span>{price}</span>
    </ListGroupItem>
    <ListGroupItem className='border-0 px-0'>
<h5>Service Charge</h5>
<span>${serviceFee}</span>
    </ListGroupItem>
    <ListGroupItem className='border-0 px-0 total'>
<h5>Total</h5>
<span>${totalAmount}</span>
    </ListGroupItem>
    <Button className='btn primary_btn w-100 mt-4' onClick={handleClick}>
Book Now
    </Button>
</ListGroup>
   </div>
   </>
  )
}

export default Booking
