import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { Divider } from "antd";

import "./style.scss";

function EmailConfirmation() {
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const confirmEmail = async () => {
      const token = window.location.href.split("/")[4];

      await axios.get(`${process.env.API_URL}/auth/verifyemail/${token}`).then(
        (response) => {
          console.log("R", response.data);
        },
      );
    };

    confirmEmail();
  }, []);

  return (
    <div className="page-container">
      <div className="header">
        <h1>Confirmation d'email</h1>
      </div>
      {currentUser ? (
        //! GERER LE CAS OU L'EMAIL EST DEJA CONFIRME
        //! GERER LE CAS OU L'EMAIL N'EST PAS CONFIRME
        //! GERER MIEUX LA PAGE QUE CA
        <div className="content">
          <p>
            Un email de confirmation a été envoyé à l'adresse{" "}
            <strong>{currentUser.email}</strong>.<br />
            Veuillez cliquer sur le lien contenu dans cet email pour confirmer
            votre adresse email.
          </p>
          <Divider />
          <p>
            Si vous n'avez pas reçu l'email de confirmation, veuillez{" "}
            <a href="/resend-confirmation-email">cliquer ici</a>.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default EmailConfirmation;
