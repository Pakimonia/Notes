package com.example.springboot.repositories;


import com.example.springboot.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByPublished(boolean published);
    List<Note> findByTitleContaining(String title);
}
