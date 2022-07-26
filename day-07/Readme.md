# Day 07

- n-Tier Architecture
- SOLID
- Service Layer Implementation
- Abstaction
- ApiResponse Design
- ApiErrorResponse Design
- Controller-based Error Handling
  - @ExceptionHandler
- Global Error Handling
  - @ControllerAdvice

# Global Error Handlig

**@ControllerAdvice** mekanizması ile global olarak hataları yönetmek mümkündür. **@ExceptionHandler** bu mekanizma ile tip güvenliğini sağlayarak farklı hatalara karşı farklı aksiyonların alınabilmesine olanak sağlamaktadır.

![Global Error Handling](http://www.zafercomert.com/Medya/Java/Java-ErrorHandlig.svg)

- **Rest** isteklerine cevap olarak üretilen **StatusCode** ifadeleri tam olarak açıklayıcı olmayabilir.
- Böylesi durumlarda mutlaka bir **body** ifadesiyle dönüş hakkında/hata hakkında detaylı bilgiler sunulmalıdır.

## NotFoundExcepiton

Endpoint bulunamaması durumunda tüm **NotFoundException** ifadeleri için yazılmış bir hata yönetim metodur.

```java
// Not Found Hataları için
@ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundExceptions(NotFoundException ex,
            WebRequest request) {

        var response = new ApiErrorResponse<>();
        response.setHttpStatus(HttpStatus.NOT_FOUND);
        response.setStatusCode(HttpStatus.NOT_FOUND.value());

        // response.setTimestamp(ResponseMessage.timestamp);
        response.setPath(request.getDescription(false));
        response.setErrors(Arrays.asList(ex.getMessage()));

        log.error(response.toString());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
```

## TypeMismatchException

Parametre olarak beklenen tip gelen, giriş olarak uygulanan tip bilgilerinin uyuşmaması durumunda ortaya çıkan hatadır.
İllgili hatanın yönetimi aşağıdaki gibi yapılır. 

```java
@Override
    protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        // return super.handleTypeMismatch(ex, headers, status, request);

        var response = new ApiErrorResponse<>();
        response.setPath(request.getDescription(false));
        response.setErrors(Arrays.asList(ex.getMessage(), "Required Type: " + ex.getRequiredType()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
```

## application.properties

# ERROR HANDLING (ErrorProperties)

server.error.path=/error # the error path
server.error.include-stacktrace=never
server.error.whitelabel.enabled=true

# Kaynaklar

1. [Handling Standard Spring MVC Exceptions](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-ann-rest-spring-mvc-exceptions)
2. [Error Handling for REST with Spring](https://www.baeldung.com/exception-handling-for-rest-with-spring)
3. [Custom Error Message Handling for REST API](https://www.baeldung.com/global-error-handler-in-a-spring-rest-api)
4. [Guide to Spring Boot REST API Error Handling](https://www.toptal.com/java/spring-boot-rest-api-error-handling)
5. [Bootstrap a Simple Application](https://www.baeldung.com/spring-boot-start)
6. [LIKE Queries in Spring JPA](https://www.baeldung.com/spring-jpa-like-queries)
7. [Common Application Properties](https://docs.spring.io/spring-boot/docs/1.3.0.RC1/reference/html/common-application-properties.html)

## Postman

[Postman API Test](https://solar-firefly-132087.postman.co/workspace/Book-Store-Course~922ac43b-f419-4af7-8060-875660e37dfc/overview)

[API-Docs](https://documenter.getpostman.com/view/16879698/UzXM1Jcg)
