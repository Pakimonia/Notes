import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveNotes,
  findNotesByTitle,
  deleteAllNotes,
} from "../../actions/notes";
import { Link } from "react-router-dom";

const NotesList = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  
  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveNotes());
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentNote(null);
    setCurrentIndex(-1);
  };

  const setActiveNote = (note, index) => {
    setCurrentNote(note);
    setCurrentIndex(index);
  };

  const removeAllNotes = () => {
    dispatch(deleteAllNotes())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findNotesByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Notes List</h4>

        <ul className="list-group il">
          {notes &&
            notes.map((note, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                  
                }
                onClick={() => setActiveNote(note, index)}
                key={index}
              >
                {note.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllNotes}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentNote ? (
          <div className=" frr">
            <h4>Note</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentNote.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentNote.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentNote.published ? "Done" : "Not Done"}
            </div>

            <Link
              to={"/notes/" + currentNote.id}
              className="badge badge-warning "
              
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p >Please click on a Note...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
