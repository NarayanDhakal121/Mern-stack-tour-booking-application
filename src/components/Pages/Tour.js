import React, { useEffect, useState } from "react";
import TourCard from "../../shared/TourCard";
import { Container, Col, Row } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import CommonSection from "../../shared/CommonSection";
import Newsletter from "../../shared/Newsletter";
import SearchBar from "../../shared/SearchBar";
import './styles/Tour.css';

function Tour() {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tourData, setTourData] = useState([]);
  const [tourCount, setTourCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/tours?page=${page}`) // Update the API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTourData(data.tours);
        setTourCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  }, [page]);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 4); // Update the page size (8 tours per page)
    setPageCount(pages);
  }, [tourCount]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {Array.isArray(tourData) ? (
              tourData.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            ) : (
              <p>Loading....</p>
            )}
          </Row>
        </Container>
      </section>

      <Col lg="12">
        <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
          {Array.from({ length: pageCount }).map((_, number) => (
            <span
              key={number}
              onClick={() => handlePageClick(number)}
              className={page === number ? "active_page" : ""}
            >
              {number + 1}
            </span>
          ))}
        </div>
      </Col>

      <Newsletter />
    </>
  );
}

export default Tour;
