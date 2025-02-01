import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Maxwell Materiais</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/cliente">Clientes</Link>
                        <Link className="nav-link" to="/equipamento">Equipamentos</Link>
                        <Link className="nav-link" to="/emprestimo">Emprestimos</Link>
                        <Link className="nav-link active" aria-current="page" to="/login">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
