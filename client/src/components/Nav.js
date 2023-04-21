import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

/**
 Panel de navegación
 */
const Nav = () => {
  const user = useSelector((state) => state);
  return (
    <nav className="secondary">
      <NavLink exact activeClassName="active" to="/">
              Inicio
            </NavLink> 
           
        {user && user.isLoggedIn === false ? (<>
          <NavLink exact activeClassName="active" to="/login">
              Iniciar Sesión
          </NavLink>
          </>) : (<>
            <NavLink exact activeClassName="active" to="/create">
              Crear Nota
            </NavLink>
            <NavLink exact activeClassName="active" to="/notes">
              Mis Notas
            </NavLink>
          </>)}
          <NavLink exact activeClassName="active" to="/about">
              Sobre mí
          </NavLink>
            
    </nav>
  );
};

export default Nav;
