import {
    CREATE_NOTE,
    RETRIEVE_NOTES,
    UPDATE_NOTE,
    DELETE_NOTE,
    DELETE_ALL_NOTES,
  } from "./types";
  
  import NoteDataService from "../services/NoteService";
  
  export const createNote = (title, description) => async (dispatch) => {
    try {
      const res = await NoteDataService.create({ title, description });
  
      dispatch({
        type: CREATE_NOTE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveNotes = () => async (dispatch) => {
    try {
      const res = await NoteDataService.getAll();
  
      dispatch({
        type: RETRIEVE_NOTES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateNote = (id, data) => async (dispatch) => {
    try {
      const res = await NoteDataService.update(id, data);
  
      dispatch({
        type: UPDATE_NOTE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteNote = (id) => async (dispatch) => {
    try {
      await NoteDataService.remove(id);
  
      dispatch({
        type: DELETE_NOTE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllNotes = () => async (dispatch) => {
    try {
      const res = await NoteDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_NOTES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findNotesByTitle = (title) => async (dispatch) => {
    try {
      const res = await NoteDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_NOTES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  