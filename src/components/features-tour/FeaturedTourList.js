import React, { useEffect, useState } from "react";
import TourCard from "../../shared/TourCard";
import { Container, Col, Row } from "reactstrap";
import { BASE_URL } from "../../utils/config";


function FeaturedTourList() {
  const [featuredTour, setFeaturedTour] = useState(null); // Initialize as null or an empty object

  useEffect(() => {
    // Fetch the data from the API
    fetch(`${BASE_URL}/api/v1/tours/search/getFeaturedTours`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFeaturedTour(data.tours);
      })
      .catch((error) => {
        console.error("Error fetching featured tours:", error);
      });
  }, []);

  console.log(featuredTour);

  return (
    <>
      <Container>
        <Row>
          {Array.isArray(featuredTour) ? (
            featuredTour.map((featuredTour) => (
              <Col lg="3" className="mb-4" key={featuredTour._id}>
                <TourCard tour={featuredTour} />
              </Col>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default FeaturedTourList;


