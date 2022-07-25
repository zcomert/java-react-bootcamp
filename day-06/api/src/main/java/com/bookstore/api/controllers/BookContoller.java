package com.bookstore.api.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.Book;
import com.bookstore.api.repositories.BookRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/books")
@Slf4j // logger -> log
public class BookContoller {

    // Logger logger = LoggerFactory.getLogger(BookContoller.class.getName());

    private final BookRepository bookRepository;

    public BookContoller(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @PostMapping
    public Book postOneBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @PutMapping(path = "/{id}")
    public Book putOneBook(@PathVariable(name = "id", required = true) int id, @RequestBody Book book) {
        Optional<Book> bookOpt = bookRepository.findById(id);
        if (bookOpt.isPresent()) {
            book.setId(id);
            return bookRepository.save(book);
        }
        throw new RuntimeException(String.format("Book %s id coluld not found.", id));
    }

    @DeleteMapping(path = "/{id}")
    public Book deleteOneBook(@PathVariable int id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            bookRepository.delete(book);
        }
        throw new RuntimeException(String.format("Book with %s id could not found.", id));
    }
}
