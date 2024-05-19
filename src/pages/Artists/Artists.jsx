import React, { useState, useEffect } from "react";
import { getAllArtists } from "../../service/apiCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Col, Row, Form } from "react-bootstrap";
import { ArtistDetailsModal } from "../../components/ArtistDetailsModal/ArtistDetailsModal";
import { UserCard } from "../../components/UsersCard/UsersCard";
import "./Artists.css";

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector(state => state.user);
  const role = userData.decodificado.userRole;
  const navigate = useNavigate();

  useEffect(() => {
    getAllArtists()
      .then((response) => {
        const fetchedArtists = response[0];
        setArtists(fetchedArtists);
        setFilteredArtists(fetchedArtists); // Inicialmente, mostrar todos los artistas
      })
      .catch((error) => {
        alert('Hubo un error al recuperar los artistas');
      });
  }, []);

  const handleArtistClick = async (artistId) => {
    const selected = artists.find(artist => artist.id === artistId);
    if (selected) {
      setSelectedArtist(selected);
      setShowModal(true);
    } else {
      alert('Artista no encontrado.');
    }
  };

  const handleCloseModal = () => {
    setSelectedArtist(null);
    setShowModal(false);
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
        <ArtistDetailsModal
          show={showModal}
          artistData={selectedArtist}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};


