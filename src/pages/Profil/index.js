import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Profil() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  return (
    <div>
      <h1>Profil Page</h1>
      {Object.keys(userInfo).length ? (
        <div>
          <p>Nom: {userInfo.lastname}</p>
          <p>Prénom: {userInfo.firstname}</p>
          <p>Pseudo: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Profil;
