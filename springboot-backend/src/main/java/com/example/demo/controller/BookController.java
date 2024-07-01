package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/books")
public class BookController {

	@Autowired
	private BookRepository bookRepository;

	@GetMapping
	public List<Book> getbooks() {
		return bookRepository.findAll();
	}

	@PostMapping
	public Book createBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}

	@GetMapping("{id}")
	public ResponseEntity<Book> getBookByID(@PathVariable long id) {
		Book book = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id: " + id));

		return ResponseEntity.ok(book);
	}

	@PutMapping("{id}")
	public ResponseEntity<Book> updateBook(@PathVariable long id, @RequestBody Book book) {
		Book existingBook = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id: " + id));
		
		existingBook.setTitle(book.getTitle());
		existingBook.setAuthor(book.getAuthor());
		
		return ResponseEntity.ok(bookRepository.save(existingBook));
	}

	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteBook(@PathVariable long id) {
		Book book = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id: " + id));
		
		bookRepository.delete(book);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
