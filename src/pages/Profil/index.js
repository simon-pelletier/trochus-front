import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { Divider } from "antd";

import "./style.scss";

function Profil() {
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="profile">
      <h1>Profil</h1>
      {currentUser ? (
        <div>
          <div className="section">
            <Divider orientation="left">Informations générales</Divider>
            <p>Nom: {currentUser.userInfo.lastname}</p>
            <p>Prénom: {currentUser.userInfo.firstname}</p>
            <p>Pseudo: {currentUser.userInfo.pseudo}</p>
            <p>Email: {currentUser.userInfo.email}</p>
            <p>Date de naissance: {currentUser.userInfo.dateOfBirth}</p>
          </div>
          <div className="section">
            <Divider orientation="left">Position</Divider>
            <p>Localisation: {currentUser.userInfo.location}</p>
            <p>Adresse: {currentUser.userInfo.address}</p>
            <p>Ville: {currentUser.userInfo.city}</p>
            <p>Code postal: {currentUser.userInfo.postalCode}</p>
          </div>
          <div className="section">
            <Divider orientation="left">Préférences</Divider>
            <p>
              Périmètre de recherche: {currentUser.userInfo.searchPerimeter}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profil;
