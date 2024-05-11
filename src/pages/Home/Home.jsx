import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import Button from "../../components/ButtonCita/ButtonCita";
import { Container, Row, Col } from 'react-bootstrap';
import imgBox1 from "../../img/imgBox1.jpeg"
import imgBox2 from "../../img/imgBox2.jpg"
import imgBox3 from "../../img/imgBox3.jpg"

import "./Home.css";


export const Home = () => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const images = [imgBox1, imgBox2, imgBox3];
  const timeInterval = 5000;

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const handleNavClick = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      const targetSection = useRef(null);

      useEffect(() => {
      targetSection.current = document.getElementById(targetId);
      }, [targetId]);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    sections.forEach(section => {
      section.addEventListener('click', handleNavClick);
    });

    return () => {
      sections.forEach(section => {
        section.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    setImageIndex(prevIndex => (prevIndex + 1) % images.length);
  }, timeInterval);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="home-page">
      <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
      <Button className="button-cita" text="<  Pedir Cita  >" />
      {/* <ScrollToTop smooth className="scrollToTop" /> */}
      <div id="home" className="section container-fluid d-flex justify-content-center align-items-center">
      
      <Container fluid>
      <Row className="mb-4">
        <Col sm={6} className="pr-2">
          <div className="box">
            <h3>Estudio de Tatuaje en Madrid</h3>
            <p>
            Realizamos trabajos de máxima calidad desde 2021. RKS TATTOO, estudio de tatuajes en Madrid.
            Tienda de tatuaje respetada por el carácter de todos nuestros artistas y por la higiene y profesionalidad que el estudio ofrece a nuestros clientes.
            </p>
            <p>Realizamos todo tipo de trabajos, Pircing, Covers, Black&White, Realista, etc. También realizamos eliminación de tatuajes con la última tecnología laser.</p>
          
            <p>Tambíen impartimos cursos de formación. ¡Tu futuro como tatuador es con nosotros!</p>
            <p>¡Pásate a conocernos! Te asesoramos sin ningún compromiso!</p>
            <br />
            <h5> <a href="https://maps.app.goo.gl/Pc3Sjmkdg99h48yY9" target="_blank">Nuestros estudios de tatuaje están en Vallecas</a></h5>
            

          </div>
        </Col>
        <Col sm={6} className="pl-2">
          <div className="box">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                className={index === imageIndex ? "show" : "hide"}
              />
            ))}
          </div>
        </Col>
      </Row>
      
    </Container>
  </div>

      <div id="studio" className="section container-fluid">
        <h1>El Estudio</h1>
        <p>Contenido del estudio</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
      </div>

      <div id="services" className="section container-fluid">
        <h1>Servicios</h1>
        <p>Contenido de los servicios</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>

      </div>

      <div id="artists" className="section">
        <h1>Artistas</h1>
        <p>Contenido de los artistas</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
      </div>

      <div id="contact" className="section container-fluid">
        <h1>Contacto</h1>
        <p>Información de contacto</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
      </div>

      <div id="reviews" className="section container-fluid">
        <h1>Reseñas</h1>
        <p>Reseñas de clientes</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
        <h6>Otra parte</h6> <br />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus unde dolore porro repellat maiores accusantium assumenda expedita? Corporis tempore commodi maiores, perferendis placeat soluta provident corrupti deserunt saepe vero repellendus?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed unde perspiciatis id consectetur similique placeat eaque perferendis odio debitis repellat, sapiente labore culpa ducimus aliquid ea velit dolorum maiores ratione.</p>
      </div>
    </div>
  );
};
export default Home;