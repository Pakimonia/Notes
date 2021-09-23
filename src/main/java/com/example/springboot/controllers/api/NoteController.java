package com.example.springboot.controllers.api;

import com.example.springboot.entities.Note;
import com.example.springboot.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class NoteController {

    @Autowired
    NoteRepository noteRepository;

    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getAllNotes(@RequestParam(required = false) String title) {
        try {
            List<Note> notes = new ArrayList<Note>();

            if (title == null)
                noteRepository.findAll().forEach(notes::add);
            else
                noteRepository.findByTitleContaining(title).forEach(notes::add);

            if (notes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(notes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") long id) {
        Optional<Note> noteData = noteRepository.findById(id);

        if (noteData.isPresent()) {
            return new ResponseEntity<>(noteData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        try {
            Note _note = noteRepository
                    .save(new Note(note.getTitle(), note.getDescription(), false));
            return new ResponseEntity<>(_note, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable("id") long id, @RequestBody Note note) {
        Optional<Note> noteData = noteRepository.findById(id);

        if (noteData.isPresent()) {
            Note _note = noteData.get();
            _note.setTitle(note.getTitle());
            _note.setDescription(note.getDescription());
            _note.setPublished(note.isPublished());
            return new ResponseEntity<>(noteRepository.save(_note), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<HttpStatus> deleteNote(@PathVariable("id") long id) {
        try {
            noteRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/notes")
    public ResponseEntity<HttpStatus> deleteAllNotes() {
        try {
            noteRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @GetMapping("/notes/published")
    public ResponseEntity<List<Note>> findByPublished() {
        try {
            List<Note> notes = noteRepository.findByPublished(true);

            if (notes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(notes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

}
