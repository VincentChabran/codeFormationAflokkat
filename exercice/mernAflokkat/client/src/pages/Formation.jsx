import React, { useEffect, useState } from "react";
import axios from "axios";
import FormationRead from "../components/formations/FormationRead";
import FormationCreate from "../components/formations/FormationCreate";

const Formation = () => {
    const crud = ["create", "read"];

    const [selectionRadio, setSelectionRadio] = useState("read");
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4500/api/formation")
            .then((res) => setFormations(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="formationContainer">
            <h1>Pages Formation.jsx</h1>
            <div className="radiosContainer">
                {crud.map((el, index) => (
                    <div className="radioBox" key={index}>
                        <input
                            type="radio"
                            name="crudChoix"
                            id={el}
                            checked={el === selectionRadio}
                            onChange={(e) => setSelectionRadio(e.target.id)}
                        />
                        <label htmlFor={el}>{el}</label>
                    </div>
                ))}
            </div>

            {selectionRadio === "create" && (
                <div className="formationFormContainer">
                    <FormationCreate />
                </div>
            )}
            {selectionRadio === "read" && (
                <div className="formationCardContainer">
                    {formations.length > 0 ? (
                        formations.map((formation, index) => <FormationRead key={index} formation={formation} />)
                    ) : (
                        <div>
                            <h1>Attente de connexion au serveur ...</h1>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Formation;
