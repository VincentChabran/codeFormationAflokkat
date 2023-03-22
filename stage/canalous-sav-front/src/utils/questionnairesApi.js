import axios from "axios";

const api = axios.create({
    baseURL: "http://planning-quentin.f2p.net/api/sav/",
});

export const getQuestionnaires = (page) => api.get(`/questionnaires?page=${page}`).then((res) => res.data);

export const getQuestionnaire = (id) => api.get(`/questionnaire/${id}`).then((res) => res.data);
