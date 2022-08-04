package com.bookstore.api.services;

import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Author;
import com.bookstore.api.entities.Book;
import com.bookstore.api.entities.Category;
import com.bookstore.api.entities.dto.BookDtoForPost;
import com.bookstore.api.entities.dto.BookDtoForPut;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.BookNotFoundException;
import com.bookstore.api.repositories.BookRepository;
import com.bookstore.api.services.Abstract.AuthorService;
import com.bookstore.api.services.Abstract.BookService;
import com.bookstore.api.services.Abstract.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImp implements BookService {

    private final BookRepository bookRepository; // IoC // DI
    private final CategoryService categoryService;
    private final AuthorService authorService;
    private final ModelMapper mapper;

    @Override
    public ApiResponse<List<Book>> getAllBook() {
        List<Book> list = bookRepository.findAll();
        return ApiResponse.default_OK(list);
    }

    @Override
    public ApiResponse<Book> getOneBook(int id) {
        Book book = bookRepository
                .findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        return ApiResponse.default_OK(book);
    }

    @Override
    public ApiResponse<Book> postOneBook(BookDtoForPost request) {
        // BookRequestForPost -> Book (entity)
        Category category = categoryService
                .getOneCategory(request.getCategoryId()).getData();

        // Set<Author> ... authorServie.x(authorIds)

        Set<Author> authors = authorService.getAuthorsByIds(request.getAuthorIds());

        Book book = mapper.map(request, Book.class);

        // book.setTitle(bookRequestForPost.getTitle());
        // book.setPrice(bookRequestForPost.getPrice());
        // book.setPublisher(bookRequestForPost.getPublisher());

        book.setCategory(category);
        book.setBookAuthors(authors);

        bookRepository.save(book);
        return ApiResponse.default_CREATED(book);
    }

    @Override
    public ApiResponse<Book> putOneBook(int id, BookDtoForPut request) {
        // Category var mı? Varsa bilgilerini alır yoksa hata fırlatır.
        Category category = categoryService
                .getOneCategory(request.getCategoryId())
                .getData();

        Set<Author> authors = authorService
                .getAuthorsByIds(request.getAuthorIds());

        // Book var mı? Varsa kitap bilgilerini getirir; yoksa hata fırlatır.
        Book book = getOneBook(id).getData(); // yoksa hata fırlatır!
        book.setTitle(request.getTitle());
        book.setCategory(category);
        book.setBookAuthors(authors);

        return ApiResponse.default_ACCEPTED(bookRepository.save(book));
    }

    @Override
    public void deleteOneBook(int id) {
        // getOneBook(id); // kitap yoksa hata fırlatır.
        // bookRepository.deleteById(id);
        bookRepository.delete(getOneBook(id).getData());
    }
}
