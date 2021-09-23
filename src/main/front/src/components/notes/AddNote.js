import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes";

const AddNote = () => {

  const initialNoteState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  //ми в компонеті робимо стейт, елемент стейту note
  const [note, setNote] = useState(initialNoteState);

  //ми зробили елемент стейту, submitted - фіксує відправку форми
  const [submitted, setSubmitted] = useState(false);

  //Зміна відповідає за dispatch - Redux
  const dispatch = useDispatch();

  //стрелочна функція, яка міняє значення в стейті текстових полів
  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  //зберігаємо дані про туторіал
  const saveNote = () => {
    const { title, description } = note;

    dispatch(createNote(title, description))
      .then(data => {
        setNote({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newNote = () => {
    setNote(initialNoteState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4 className="lbe">You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newNote}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={note.title}
              onChange={handleInputChange}
              name="title" //
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={note.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveNote} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNote;
