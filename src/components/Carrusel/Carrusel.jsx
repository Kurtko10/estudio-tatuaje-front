import Carousel from 'react-bootstrap/Carousel';
import "./Carrusel.css";
// import img1 from "../../img/6219.jpg"
// import img2 from "../../img/img2.jpeg"
// import img3 from "../../img/img3.jpg"

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item className='carousel-img'>
        <img
          className="d-block w-100 carousel-img"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-img'>
        <img
          className="d-block w-100 "
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-img'>
        <img
          className="d-block w-100 carousel-img"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;