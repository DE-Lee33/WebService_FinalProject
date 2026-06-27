import React from "react";
import { Carousel } from "react-bootstrap";
import '../App.css'

const HomePage: React.FC = () => {
  return(
    <Carousel className="d-flex justify-content-center align-items-center " style={{ height: '100vh' }}>
      <Carousel.Item>
        <div className="carousel-item-custom">
          <img
            className = "fixed-size-img"
            src='/img/서울.jpg'
            alt = "First slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-custom">
          <img
            className = "fixed-size-img"
            src='/img/강원.jpg'
            alt = "Second slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-custom">
          <img
            className = "fixed-size-img"
            src='/img/경주.jpg'
            alt = "Third slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-custom">
          <img
            src="/img/대전.jpg"
            alt = "Fourth slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-custom">
          <img
            src="/img/부산.jpg"
            alt = "Fifth slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-custom">
          <img
            src="/img/제주.jpg"
            alt = "Sixth slide" />
        </div>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomePage
