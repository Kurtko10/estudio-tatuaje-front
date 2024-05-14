import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ArtistDetailsModal = ({ show, artistData, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Artista</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>ID: {artistData.id}</p>
          <p>Nombre: {artistData.user ? artistData.user.firstName : artistData.firstName}</p>
          
          {artistData.specialty && <p>Especialidad: {artistData.specialty}</p>}
          {artistData.biography && <p>Biografía: {artistData.biography}</p>}
          {artistData.portfolio && <p>Portfolio: <a href={artistData.portfolio} target="_blank" rel="noopener noreferrer">{artistData.portfolio}</a></p>}
          {artistData.email && (
            <>
              <p>Email: {artistData.email}</p>
              <p>Teléfono: {artistData.phone}</p>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};