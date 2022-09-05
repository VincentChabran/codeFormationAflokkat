const createFormationErrors = (err) => {
    let errors = { nom: "", pole: "", dateDebut: "", dateFin: "", estCertifiante: "" };

    if (err.errors.nom) {
        if (err.errors.nom.kind === "required") errors.nom = "Nom requis";
        if (err.errors.nom.kind === "minlength") errors.nom = "Nom trop petit";
        if (err.errors.nom.kind === "unique") errors.nom = "Nom déjà pris";
    }

    if (err.errors.pole) errors.pole = "Pole requis";
    if (err.errors.dateDebut) errors.dateDebut = "Date debut requis";
    if (err.errors.dateFin) errors.dateFin = "Date fin requis";
    if (err.errors.estCertifiante) errors.estCertifiante = "estCertifiante requis";
    return errors;
};

module.exports = { createFormationErrors };
// if (err.message.includes("estCertifiante")) console.log("Certifiante");
