import React from 'react';
import { Link } from 'react-router-dom';

const Menu2 = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Yenne Kids Academy</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/eleve" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Eleves
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/eleve">Eleve</Link></li>
                        <li><Link className="dropdown-item" to="/Note">Note</Link></li>
                        <li><Link className="dropdown-item" to="/classe">Classe</Link></li>
                        <li><Link className="dropdown-item" to="/evaluation">Evaluation</Link></li>
                        <li><Link className="dropdown-item" to="/pdi">Pdi</Link></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/pdi" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Pdi
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/classe">Classe</Link></li>
                        <li><Link className="dropdown-item" to="/evaluation">Evaluation</Link></li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Menu2;