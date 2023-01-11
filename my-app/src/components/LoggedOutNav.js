import React from 'react'
import "/Users/amirashlag/Desktop/fs-pet-adoption-fe-AmirAshlag/my-app/src/components/LoggedOutNav.css";
import { Link } from 'react-router-dom';

const LoggedOutNav = (props) => {
  return (
    <nav>
      <ul className={props.class}>
        <Link to="/">
          <h2 className="logged-out-nav">Login in order to continue</h2>
        </Link>
      </ul>
    </nav>
  );
}

export default LoggedOutNav
