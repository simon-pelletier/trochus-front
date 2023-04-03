import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

function Profil() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${process.env.API_URL}/items/user/${currentUser.userInfo.id}`)
        .then((res) => {
          setUserItems(res.data);
        });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Profil Page</h1>
      {currentUser ? (
        <div>
          <p>Nom: {currentUser.userInfo.lastname}</p>
          <p>Prénom: {currentUser.userInfo.firstname}</p>
          <p>Pseudo: {currentUser.userInfo.pseudo}</p>
          <p>Email: {currentUser.userInfo.email}</p>
          <p>Date de naissance: {currentUser.userInfo.dateOfBirth}</p>
          <p>Location: {currentUser.userInfo.location}</p>
          <p>Adresse: {currentUser.userInfo.address}</p>
          <p>Ville: {currentUser.userInfo.city}</p>
          <p>Code postal: {currentUser.userInfo.postalCode}</p>
          <p>Périmètre de recherche: {currentUser.userInfo.searchPerimeter}</p>
          <div>
            {userItems.map((item) => {
              return (
                <div>
                  <p>Titre: {item.title}</p>
                  <p>Description: {item.description}</p>
                  <p>Estimation: {item.estimation}</p>
                  <p>Etat: {item.condition}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profil;
