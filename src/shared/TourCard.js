import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link} from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import CalculateAvgRating from "../utils/avgRating";
import "./tour-card.css";

function TourCard({ tour }) {
  const { _id, title, price, location, featured, photo, reviews } = tour;
  Object.entries(tour);
  const { totalRating, avgRating } = CalculateAvgRating(reviews);

  return (
    <div className="tour_card">
      <Card>
        {/* <span>featured</span> */}
        <div className="tour_img">
          <img src={photo} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="Card_top d-flex align-item-center justify-content-between">
            <span className="tour_location d-flex align-items-center">
              <HiOutlineLocationMarker />
              {location}
            </span>
            <span className="tour_rating d-flex align-items-center gap-1">
              <AiOutlineStar />
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>
          <h5 className="tour_title">
            {" "}
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className="card_button d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span>/per person</span>{" "}
            </h5>
            <button className="btn booking_btn">
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TourCard;
