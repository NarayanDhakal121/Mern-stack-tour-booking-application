import React, { useRef } from 'react';
import './SearchBae.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const locationRef = useRef('');
  // const GroupSizeRef = useRef('');
  const navigate = useNavigate(); // Define the navigate function here

  const searchHandler = async () => {
    const location = locationRef.current.value;
    // const GroupSize = GroupSizeRef.current.value;

    if (location === '' ) {
      return alert('All fields are required');
    }

    try {
      const res = await fetch(`${BASE_URL}/api/v1/tours/search/getTourBySearch?location=${location}`);
      if (!res.ok) throw new Error('Something went wrong');
      const result = await res.json();
    
      // Update the route path to match your defined route '/tour/search'
      navigate(`/tour/search?place=${location}`, { state: result.data });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Col lg='12'>
      <div className='search_bar'>
        <Form className='d-flex align-items-center gap-4'>
          <FormGroup className='d-flex gap-3 form_group form_group_fast'>
            <span>
              <i className='ri-map-pin-line'></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type='text' placeholder='Where are you going' ref={locationRef} />
            </div>
          </FormGroup>

          {/* <FormGroup className='d-flex gap-3 form_group form_group_last'>
            <span>
              <i className='ri-group-line'></i>
            </span>
            <div>
              <h6>No. of People</h6>
              <input type='text' placeholder='0' ref={GroupSizeRef} />
            </div>
          </FormGroup> */}
          <button className='search_icon' type='button' onClick={searchHandler}>
            <i className='ri-search-line'></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
























// import React, { useRef } from 'react';
// import './SearchBae.css'; // Make sure to use the correct CSS file name
// import { Col, Form, FormGroup } from 'reactstrap';
// import { BASE_URL } from '../utils/config';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const locationRef = useRef('');
//   const GroupSizeRef = useRef(''); // Renamed to GroupSizeRef for consistency
//  const navigate = useNavigate();

//   const searchHandler = async () => {
//     const location = locationRef.current.value;
//     const GroupSize = GroupSizeRef.current.value; // Updated to use GroupSize

//     if (location === '' || GroupSize === '') {
//       return alert('All fields are required');
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?location=${location}&GroupSize=${GroupSize}`);
//       if (!res.ok) throw new Error('Something went wrong');
//       const result = await res.json();

// navigate(`/tours/search?city=${location}&GroupSize=${GroupSize}`, { state: result.data });


//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <Col lg='12'>
//       <div className='search_bar'>
//         <Form className='d-flex align-items-center gap-4'>
//           <FormGroup className='d-flex gap-3 form_group form_group_fast'>
//             <span>
//               <i className='ri-map-pin-line'></i>
//             </span>
//             <div>
//               <h6>Location</h6>
//               <input type='text' placeholder='Where are you going' ref={locationRef} />
//             </div>
//           </FormGroup>

//           <FormGroup className='d-flex gap-3 form_group form_group_last'>
//             <span>
//               <i className='ri-group-line'></i>
//             </span>
//             <div>
//               <h6>No. of People</h6>
//               <input type='text' placeholder='0' ref={GroupSizeRef} />
//             </div>
//           </FormGroup>
//           <button className='search_icon' type='button' onClick={searchHandler}>
//             <i className='ri-search-line'></i>
//           </button>
//         </Form>
//       </div>
//     </Col>
//   );
// };

// export default SearchBar;
