import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote, deleteNote } from "../../actions/notes";
import NoteDataService from "../../services/NoteService";

const Note = (props) => {
  const initialNoteState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentNote, setCurrentNote] = useState(initialNoteState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getNote = id => {
    NoteDataService.get(id)
      .then(response => {
        setCurrentNote(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNote(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentNote.id,
      title: currentNote.title,
      description: currentNote.description,
      published: status
    };

    dispatch(updateNote(currentNote.id, data))
      .then(response => {
        console.log(response);

        setCurrentNote({ ...currentNote, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateNote(currentNote.id, currentNote))
      .then(response => {
        console.log(response);

        setMessage("The note was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeNote = () => {
    dispatch(deleteNote(currentNote.id))
      .then(() => {
        props.history.push("/notes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentNote ? (
        <div className="edit-form">
          <h4>Note</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentNote.title}
                onChange={handleInputChange}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentNote.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group lbe">
              <label>
                <strong>Status:</strong>
              </label>
              {currentNote.published ? "Done" : "Not Done"}
            </div>
          </form>

          {currentNote.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              Not Done
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Done
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeNote} >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Note...</p>
        </div>
      )}
    </div>
  );
};

export default Note;
