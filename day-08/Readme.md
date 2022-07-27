# 8. Gün
- Validation in Spring Boot
- MethodArgumentNotValidException 
  
- CrudRepository
- PagingAndSortingRepository
- JpaRepository

- OneToOne relation
- OneToMany relation
- ManyToMany relation

- @RequiredArgsConstructor
   
# Java Persistancce API

![JPA](http://www.zafercomert.com/Medya/Java/Java-JPA.svg)

# JPA için Örnekler

```java
    // Başlığıa göre arama sonuçlarını döner.
    List<Book> findAllByTitleContainingIgnoreCase(String title);

    // Bir category bağlı kitapların listesinin getirir.
    List<Book> findAllByCategory_CategoryId(int id);

    // Seçili categories ifadesine bağlı kayıtları getirir.
    List<Book> findAllByCategory_CategoryIdIn(List<Integer> categoryIds);

    //  books_authors tablosundaki author_id alanına bağlı olarak, bir yazarın yazdığı kitapların listesini oluşturan SQL sorgusudur.
    @Query(value = "SELECT * FROM books b WHERE b.id IN (SELECT ba.book_id FROM books_authors ba WHERE ba.author_id = :authorId)", nativeQuery = true)
    List<Book> findAllBooksByAuthorId(@Param("authorId") int authorId);

    // findAll ile aynı işlevi gören JPQL sorgusudur.
    @Query("SELECT b FROM Book b")
    List<Book> AllBooks();
```

![JPA](http://www.zafercomert.com/Medya/Java/Java-JPA2.svg)

# ManytoOne

- Bire çok ilişki anlamına gelir.
- Bu ilişki türünün anlamı bir tablodaki bir çok satır bir başka tablodaki bir satır ile eşleşir.
- **Book** - **Category** arasında böyle bir ilişki kurulabilir.
- Bu ilişkini _"Her kitabın bir kategorisi vardır."_ anlamına gelir.

## Book Tanımı

```java
@Data
@Entity
@Table(name = "books")
@AllArgsConstructor
@NoArgsConstructor
public class Book implements BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.EAGER) // Lazy yapılırsa Kitap listesi alınırken category alanına yer verilmez.
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany()
    @JoinTable(name = "books_authors", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    private Set<Author> Authors = new HashSet<Author>();
}
```

> **Book** tablosuna dahil olan alan **category_id** alanıdır.
> **Category** tablosunda ise ek bir tanım yer almamaktadır. Ancak istenirse **OneToMany** şeklinde bir ilişki tanımı gerçekleştirilebilir.

## OneToMany - Category Tanımı

```java
@Entity
@Data
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
// @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Category {
    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "description")
    @Lob
    private String description;

    @OneToMany(mappedBy = "category")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<Book> books;
}
```

> - İki yönlü tanım gerçekleştirilmiştir.
>
> - **@JsonIgnore** ile **Category** tablosunda **books** ifadelerinin tekrar gösterilmesi engellenmiştir.
>
> - @OneToMany(mappedBy = "category"), ifadesindeki mappedBy book tablosundaki Category tipindeki özelliğin adıdır. İlişkinin yönetiminin ilgili tablo tarafından yapılacağı burada ifade edilmektedir.

## Author

Kitaplar ve yazarlar arasında çokça çok ilişki kurulabilir. Yani bir kitabın birden fazla yazarı olabilir; benzer şekilde bir yazar birden fazla kitap yazabilir.

```java
@Data
@Entity
@Table(name = "authors")
@NoArgsConstructor
@AllArgsConstructor
// @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Author {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "fullname")
    private String fullName;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "books_authors", joinColumns = @JoinColumn(name = "author_id"), inverseJoinColumns = @JoinColumn(name = "book_id"))
    private Set<Author> booksAuthor;
}
```

## Book
```java
    @ManyToMany()
    @JoinTable(name = "books_authors", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    private Set<Author> Authors = new HashSet<Author>();
```
**Book** nesnesinde sadece ilişkinin kurulduğu bölüme yer verilmiştir. 

