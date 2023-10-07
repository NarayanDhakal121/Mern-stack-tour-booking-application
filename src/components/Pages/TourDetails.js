import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/tour-details.css";
import { Container, Row, Col, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import CalculateAvgRating from "../../utils/avgRating"; // Corrected the import
import avatar from "../../assets/tourData/avatar.jpg";
import Booking from "../Booking/Booking";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour } = useFetch(`${BASE_URL}/api/v1/tours/${id}`);
console.log(tour);
  if (!tour) {
    return <div>Tour not found</div>;
  }

  const {
    GroupSize,
    address,
    description,
    location,
    photo,
    price,
    title,
    reviews,
  } = tour;

  const { totalRating, avgRating } = CalculateAvgRating(reviews);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(`${reviewText} ${tourRating}`);

    if (!user || user === undefined || user === null) {
      alert("Please sign in");
      return;
    }

    try {
      const reviewObj = {
        username: user.username,
        reviewText,
        rating: tourRating,
        
      };

      const res = await fetch(`${BASE_URL}/api/v1/reviews/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });


      const reviews = await res.json();
      console.log('Reviews: ', reviews)
      console.log('Review Object:', reviewObj);
      console.log('User:', user);
      if (!res.ok) {
        return alert(reviews.message);
      }

      alert(reviews.message);
    
    } catch (error) {
      alert(error.message);
    }
   
   
  };


  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour_content">
              <img src={photo} alt="" />
              <div className="tour_info">
                <h2>{title}</h2>

                <Container>
                  <Row>
                    <Col lg="2">
                      <div className="Full_tour-details"></div>
                    </Col>
                  </Row>
                </Container>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour_rating d-flex align-items-center gap-1">
                    <AiOutlineStar
                      style={{ color: "var(--secondary-color)" }}
                    />
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews.length})</span>
                    )}
                  </span>

                  <span>
                    <i className="ri-map-pin-fill"></i> {address}
                  </span>
                </div>
                <div className="tour_extra-details">
                  <span>
                    <i className="ri-map-pin-2-line"></i> {location}
                  </span>

                  <span>
                    {" "}
                    <i className="ri-money-dollar-circle-line"></i> {price}/per
                    person
                  </span>
                  <span>
                    <i className="ri-group-line"></i> {GroupSize}
                  </span>
                </div>
                <h5>Description</h5>
                <p>{description}</p>
              </div>

              <div className="tour_reviews mt-4">
                <form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span
                        key={rating}
                        onClick={() => setTourRating(rating)}
                      >
                        {rating}
                        <i className="ri-star-fill"></i>
                      </span>
                    ))}


                  </div>
                  <div className="reviews_input">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your thoughts"
                      required
                    />
                    <button className="btn primary_btn w-50" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
                <ListGroup className="user_reviews">
                  {reviews &&
                    Array.isArray(reviews) &&
                    reviews.map((review) => (
                      <div className="reviews_item" key={review.id}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                              {new Date().toLocaleDateString("en-US")}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}
                              <i className="ri-star-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                </ListGroup>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
