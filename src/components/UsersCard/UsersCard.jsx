
import "./UsersCard.css";

export const UserCard = ({ user, handleClick }) => {
  return (
    <div className="user-card" onClick={handleClick}>
      <h4>{`${user.firstName}`}</h4>
      <p>Email: {user.email}</p>
      <p>Teléfono: {user.phone}</p>
      {user.role ? (
        <p>Rol: {user.role.name}</p>
      ) : (
        <>
          <p>Biografía: {user.biography}</p>
          <p>Especialidad: {user.specialty}</p>
          <p>Portfolio: <a href={user.portfolio}>{user.portfolio}</a></p>
        </>
      )}
      
    </div>
  );
};
