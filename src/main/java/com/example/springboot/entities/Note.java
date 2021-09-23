package com.example.springboot.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private boolean published;

    public Note() {

    }

    public Note(String title, String description, boolean published) {
        this.title = title;
        this.description = description;
        this.published = published;
    }

    @Override
    public String toString() {
        return "Note [id=" + id + ", title=" + title + ", desc=" + description + ", published=" + published + "]";
    }

}
