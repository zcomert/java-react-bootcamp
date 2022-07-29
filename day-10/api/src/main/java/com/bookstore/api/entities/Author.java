package com.bookstore.api.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "authors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Author {
    @Id
    @GeneratedValue
    @Column(name = "author_id")
    private int id;

    @Column(name = "first_name")
    @NotNull
    @NotBlank
    private String firstName;

    @NotNull
    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @NotBlank
    @Email
    @Column(name = "email")
    private String email;

    // @ManyToMany
    // @JoinTable(name = "bookauthors", joinColumns = @JoinColumn(name =
    // "author_id"), inverseJoinColumns = @JoinColumn(name = "book_id"))
    // @JsonIgnore
    // private Set<Book> bookAuthors;
}
