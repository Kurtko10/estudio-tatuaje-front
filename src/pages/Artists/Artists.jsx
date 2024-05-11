import React, { useState, useEffect } from "react";
import { getAllArtists } from "../../service/apiCalls";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Form } from "react-bootstrap"; // Importar componentes de tarjetas, columnas, filas y formulario de Bootstrap
import { UserDetailsModal } from "../../components/UserModal/UserDetailsModal";
import { UserCard } from "../../components/UsersCard/UsersCard"; // Importar el componente UserCard
import "./Artists.css";

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]); // Nuevo estado para artistas filtrados
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState(null); 
  const [selectedStyle, setSelectedStyle] = useState(""); // Nuevo estado para estilo seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    getAllArtists()
      .then((response) => {
        const fetchedArtists = response[0];
        console.log(fetchedArtists);
        setArtists(fetchedArtists);
        setFilteredArtists(fetchedArtists); // Inicialmente, mostrar todos los artistas
      })
      .catch((error) => {
        console.log("Error fetching artists:", error);
      });
  }, []);

  const handleArtistClick = async (artistId) => { 
    try {
      const selected = artists.find((artist) => artist.id === artistId);
      setSelectedArtist(selected);
    } catch (error) {
      console.log("Error fetching artist details:", error);
      navigate("/");
    }
  };

  const handleCloseModal = () => {
    setSelectedArtist(null);
  };

  const handleStyleChange = (e) => {
    setSelectedStyle(e.target.value);
    if (e.target.value === "") {
      setFilteredArtists(artists); // Mostrar todos los artistas si no se selecciona un estilo
    } else {
      const filtered = artists.filter(artist => artist.specialty === e.target.value);
      setFilteredArtists(filtered);
    }
  };

  return (
    <div className="artist-list">
      <h1 className="titleArtist">Lista de Artistas</h1>
      <Form.Select id="selectArtist" onChange={handleStyleChange} value={selectedStyle}>
        <option value="">Todos los estilos</option>
        <option value="BlackWhite">Black & White</option>
        <option value="Realista">Realista</option>
        <option value="Pircing">Pircing</option>
        <option value="Laser">Laser</option>
      </Form.Select>
      <Row xs={1} md={3} className="g-3">
        {filteredArtists.map((artist) => (
          <Col key={artist.id}>
            <Card className="artist-card">
              <UserCard
                user={{
                  firstName: artist.user.firstName,
                  lastName: artist.user.lastName,
                  email: artist.user.email,
                  phone: artist.user.phone,
                  role: artist.role,
                  biography: artist.biography,
                  specialty: artist.specialty,
                  portfolio: artist.portfolio,
                }}
                handleClick={() => handleArtistClick(artist.id)}
              />
            </Card>
          </Col>
        ))}
      </Row>
      {selectedArtist && (
        <UserDetailsModal
          userData={selectedArtist} // Cambiar a selectedArtist
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};



