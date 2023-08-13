/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/home">
          <img
            src="https://scontent.fcmb11-1.fna.fbcdn.net/v/t39.30808-6/300800079_443331807815756_8870031635736273898_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGCmw2bb32ANQMRXyTcJ_iLkGz4EYsNwdGQbPgRiw3B0U24ftZtPJ0AkovXVBCPvZNvlsURiiaA7y4FuSzwKQCL&_nc_ohc=V2C34Z9A_AYAX8malNV&_nc_ht=scontent.fcmb11-1.fna&oh=00_AfAVIZEgMaJG-A9W0zYB6eM16As3RZgV5k4Uj7XBJH6xgw&oe=645DF035"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
            loading="lazy"
          ></img>
          CEYLON BIO GAS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mr-5">
            {!user?.isAdmin &&(
              <>
            <li className="nav-item">
                  <a className="nav-link" href="/order">
                    Order
                  </a>
                </li>
          <li className="nav-item">
                  <a className="nav-link" href="/payment">
                    Finance
                  </a>
                </li></>
)}
            {user?.isAdmin && (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/inventory">
                    Inventory
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/employees">
                    Employee
                  </a>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link" href="/report">
                    Report
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/orderad">
                    Order
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/report">
                    Transport
                  </a>
                </li>
              </>
            )}

            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn2 btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i> {user.name}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Log Out
                    </a>
                    {user.isAdmin && (
                      <a className="dropdown-item" href="/employees">
                        Employee Management
                      </a>
                    )}
                    {user.isAdmin && (
                      <a className="dropdown-item" href="/inventory">
                        Inventory Management
                      </a>
                    )}
                    {user.isAdmin && (
                      <a className="dropdown-item" href="/payment">
                        Finance Management
                      </a>
                    )}
                    {user.isAdmin && (
                      <a className="dropdown-item" href="/report">
                        Report Management
                      </a>
                    )}
                    {user.isAdmin && (
                      <a className="dropdown-item" href="/orderad">
                        Order Management
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disable" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
