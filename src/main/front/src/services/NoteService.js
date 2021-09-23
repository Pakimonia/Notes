import http from "../http-common";

const getAll = () => {
  return http.get("/api/notes");
};

const get = id => {
  return http.get(`/api/notes/${id}`);
};

const create = data => {
  return http.post("/api/notes", data);
};

const update = (id, data) => {
  return http.put(`/api/notes/${id}`, data);
};

const remove = id => {
  return http.delete(`/api/notes/${id}`);
};

const removeAll = () => {
  return http.delete(`/api/notes`);
};

const findByTitle = title => {
  return http.get(`/api/notes?title=${title}`);
};

const NoteService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default NoteService;
