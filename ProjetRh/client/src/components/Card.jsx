import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/apiUser/all").then((res) => {
            setUser(res.data);
        });
    }, []);

    return (
        <div>
            {user ? (
                <div className="cardContainer">
                    <h1>User dans la BDD mongo : </h1>
                    <div className="cardContainerGrid">
                        {user.map((user) => (
                            <div>
                                <li key={user._id} className="card">
                                    <h3 className="cardTitle">User id : {user._id}</h3>
                                    <p className="cardDescription">
                                        Nom : {user.nom} <br /> Login : {user.login}
                                    </p>
                                </li>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h2>Chargement ...</h2>
            )}
        </div>
    );
};

export default Card;
