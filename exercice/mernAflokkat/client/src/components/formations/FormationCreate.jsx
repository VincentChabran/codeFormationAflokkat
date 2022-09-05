import axios from "axios";
import React, { useState } from "react";

const FormationCreate = () => {
    const [nom, setNom] = useState("");
    const [pole, setPole] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nomError = document.querySelector(".nom.error");

        axios
            .post("http://localhost:4500/api/formation", {
                nom: nom,
                pole: pole,
                dateDebut: dateDebut,
                dateFin: dateFin,
                estCertifiante: true,
            })
            .then((res) => {
                if (res.data.errors) {
                    nomError.innerHTML = res.data.errors.nom;
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <form id="formationForm" action="" onSubmit={handleSubmit}>
            <div className="input">
                <input
                    type="text"
                    className="inputField"
                    name="nom"
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
                <label htmlFor="" className="inputLabel">
                    Nom
                </label>
                <div className="nom error"></div>
            </div>
            <div className="input">
                <input
                    type="text"
                    className="inputField"
                    name="pole"
                    onChange={(e) => setPole(e.target.value)}
                    required
                />
                <label htmlFor="" className="inputLabel">
                    Pole
                </label>
                <div className="pole error"></div>
            </div>
            <div className="input">
                <input
                    type="text"
                    className="inputField"
                    name="dateDebut"
                    onChange={(e) => setDateDebut(e.target.value)}
                    required
                />
                <label htmlFor="" className="inputLabel">
                    DateDébut
                </label>
                <div className="dateDebut error"></div>
            </div>
            <div className="input">
                <input
                    type="text"
                    className="inputField"
                    name="dateFin"
                    onChange={(e) => setDateFin(e.target.value)}
                    required
                />
                <label htmlFor="" className="inputLabel">
                    DateFin
                </label>
                <div className="dateFin error"></div>
            </div>
            <div className="action">
                <button className="actionButton">Ajouter Formation</button>
            </div>
        </form>
    );
};

export default FormationCreate;
