# 6. Gün
Bugün Book Store App uygulamamız için API tasarımına başladık. 

Book ve Category nesnelerini odağa alarak ilgili nesneler için `BookRepository` ve `CategoryRepository` tanımlarını gerçkeleştirdik. İlaveten  `BookContoller` ve `CategoryController` yapılarını kodladık. 

# Logging in Spring Boot 

Bir uygulama **Development** modunda çalıştırıldığında nerde ne hatanın olduğunu anlamak ve buna göre uygulamayı düzenlemek zor değildir. Ancak, uygulama **Production** aşamasına geçtiğinde hata ayıklama süreci daha zorlayıcı olabilir. Bu nedenle **Production** gibi hata ayıklamanın mümkün olmadığı durumlarda; **Log** mesajları son derece değerlidir. Bu mesajlar aracılığıyla neyin, nerede yanlış gittiği anlaşılabilir. 

Aşağıdaki şekilde Spring Boot içerisindeki Logging mekanızmasına genel hatlarıyla yer verilmiştir. 

![Logging in Spring Boot](http://zafercomert.com/medya/java/java-logging.svg)
****
## En iyi pratikler 
* Loglama asenkron olmalıdır. 
* Tutarlı ve formatlanabilir olmalıdır. 
* İçerisinde hassas bilgiler (kredi kartı numarası, şifre, vb.) olmamalıdır. 
* Merkezi olarak yönetilmelidir. 
* Loglama seviyeleri amacına uygun olarak kullanılmalıdır. 

## Logback
Spring Boot varsayılan olarak Logback ile çalışır. Ancak bu logging için farklı kütüphaneler ile çalışamayacağınz anlamına gelmez. Eğer farklı kütüphaneler ile çalışacaksanız, Logback kütüphanesini pom dosyasında dışarda bırakmanız gerekir. 

## Logger
Bir Logger log mesajları için oluşturulmuş bir context yapısıdır. Bir Logger bir ya da daha fazla Appender yapısına sahiptir. Appender yapıları bir dosya ya da veri tabanı ile ilişkili olarak log ifadeleri için son nokta olarak değerlendirilebilir. 

## Logger Oluşturmak 
* Logger nesnesi üzerinden loglama işlemleri yapılabilir. Logger nesnesi aşağıdaki gibi oluşturulır. 

```java
Logger logger = LoggerFactory.getLogger(this.getClass());
```

* Lombok ile birlikte gelen **@Slf4j** yapısı ile de bir logger nesnesi oluşturulabilir. 
```java
@Slf4j
```

Bu nesneye log adı ile ilgili sınıf içerisinde erişim sağlanabilir. 

## Yapılandırma
Eğer bir `xml` konfigürasyonu kullanılacak ise **resoruce** klasörü altına yapılandırma dosyası eklenir.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <property name="LOGS" value="./logs" />

    <appender name="Console"
        class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <Pattern>
                %black(%d{ISO8601}) %highlight(%-5level) [%blue(%t)] %yellow(%C{1.}): %msg%n%throwable
            </Pattern>
        </layout>
    </appender>

    <appender name="RollingFile"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOGS}/spring-boot-logger.log</file>
        <encoder
            class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <Pattern>%d %p %C{1.} [%t] %m%n</Pattern>
        </encoder>

        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- rollover daily and when the file reaches 10 MegaBytes -->
            <fileNamePattern>${LOGS}/archived/spring-boot-logger-%d{yyyy-MM-dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>10MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
    </appender>
    
    <!-- LOG everything at INFO level -->
    <root level="info">
        <appender-ref ref="RollingFile" />
        <appender-ref ref="Console" />
    </root>

    <!-- LOG "com.baeldung*" at TRACE level -->
    <logger name="com.yazilimevi" level="trace" additivity="false">
        <appender-ref ref="RollingFile" />
        <appender-ref ref="Console" />
    </logger>
</configuration>
```


## Kaynaklar
1. [Maven Repository](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-logging/2.7.1)
2. [Java Util Logging](https://docs.oracle.com/javase/8/docs/api/java/util/logging/package-summary.html)
3. [Logging in Spring Boot](https://www.baeldung.com/spring-boot-logging)
4. [Logback](https://www.baeldung.com/logback)
5. [Intro to Log4j2 – Appenders, Layouts and Filters](https://www.baeldung.com/log4j2-appenders-layouts-filters)


## Konu başlıkları
- Search implementation for `employee-api` is done.
- Design Patterns Overview
- Builder Design Pattern
- SuperBuilder 
- `bookstore-api`
- ApiResponse Model
- Inheritance
- NotFoundException
  - BookNotFoundException
  - CategoryNotFoundException