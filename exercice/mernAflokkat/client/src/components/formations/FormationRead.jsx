import React from "react";

const FormationRead = ({ formation }) => {
    const { nom, pole, dateDebut, dateFin, estCertifiante } = formation;

    return (
        <div className="formationReadContainer">
            <div className="formationReadCard">
                <ul>
                    <li>Nom : {nom}</li>
                    <li>Pole : {pole}</li>
                    <li>{dateDebut}</li>
                    <li>{dateFin}</li>
                    <li>Certifiante : {estCertifiante ? <>Oui</> : <>Non</>} </li>
                </ul>
            </div>
        </div>
    );
};

export default FormationRead;
