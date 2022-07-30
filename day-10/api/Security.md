# 1. Basic Authentication

## 1.1. Dependency

Öncelikle projeye yeni bir bağımlılık eklenir.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Yukarıdkai bağımlılık ifadesiyle artık API güvenliği ilk adım atılır. Konsol ortamında verilen **generated security password** ve **user** kullanıcı adı ile oturum açılabilir.

- Logout olma şansı yoktur.
- Kullanıcı adı ve şifresine müdahale edilemez.

## 1.2. Application Security Config

**security/config** gibi bir isimle yeni bir klasör projeye dahil edilir.

Gelen Request yapılarını hangi kurallara göre cevap verileceğini belirlemek üzere **ApplicationSecurityConfig** sınıfı kullanılır.
Bu sınıf **WebSecurityConfigurerAdapter** sınıfından kalıtılır.

**config** metodu (HttpSecurity imzalı olanı) **Override** edilir.

```java
@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO Auto-generated method stub
        super.configure(http);
    }
}
```

## 1.3. Authentication Nasıl Yapılır?

Bu metot üzerinde authentication işleminin nasıl yapılması gerektiği tanımlanır. Basic Authentication ile API güvenliğini sağlayalım.

```java
@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
}
```

Bu işlem sonucunda herhangi bir kaynak üzerinden GET, POST, PUT ve DELETE işlemlerinin yapılması tavsiye edilir.
User ve password bilgisi girilmeden hiçbir http isteği yanıtlanmaz iken; user ve password bilgisi bir Authorization header ifadesiyle gönderildiğinde yalnızca GET isteklerinin yanıtlandığı ancak POST, PUT ve DELETE gibi işlemlerin ise yanıtlanmadığı (Forbidden) yani yasaklandığı görülür.

![Basic Authentication](http://www.zafercomert.com/medya/java/springSecurity-BasicAuth.svg)

# 2. UserDetailsService

## 2.1. UserDetailsService

**UserDetailService** üzerinden kullanıcı tanımları gerçekleştirebilir. Bu noktada kullanıcı bilgilerini tutmak üzere **InMemoryUserDetailsManager** kullanıyoruz.

Ancak **UserDetailService** implemente eden daha farklı sınıflar da vardır. Detaylar için resmi dokümantasyon incelenebilir [Interface UserDetailsService](https://docs.spring.io/spring-security/site/docs/3.2.8.RELEASE/apidocs/org/springframework/security/core/userdetails/UserDetailsService.html).

**UserDetailService** interface yapısını implemente eden sınıflar:

- CachingUserDetailsService,
- InMemoryDaoImpl,
- _InMemoryUserDetailsManager_,
- JdbcDaoImpl,
- JdbcUserDetailsManager,
- LdapUserDetailsManager,
- LdapUserDetailsService,
- UserDetailsServiceWrapper

```java
@Override
@Bean
protected UserDetailsService userDetailsService() {

    UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder.encode("admin123456"))
            .roles("ADMIN")
            .build();

    UserDetails editor = User.builder()
            .username("editor")
            .password(passwordEncoder.encode("editor123456"))
            .roles("EDITOR")
            .build();

    UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder.encode("user123456"))
            .roles("USER")
            .build();

    return new InMemoryUserDetailsManager(admin, editor, user);
}
```

> UserDetailsService de bir konfigürasyon ifadesidir. Bu nedenle @Bean annotation yapısı mutlaka bu metodun üzerine eklenmelidir.

Uygulamanın bu haliyle yukarıda verilen kullanıcı adı ve şifreler ile artık API test edilebilir durumdadur.

## 2.2 PasswordEncoder

```java
@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
```

Injection unutulmamalıdır:

```java
private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
```

## 2.3. configure Metodu Güncellenir.

```java
@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/index", "/css/*", "/js/**").permitAll()
                .antMatchers("/api/**").hasAnyRole("ADMIN", "EDITOR")
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
```

## 3. Roles and Permissions

## 3.1. Google Guava

Öncelikle projemize Google Guava bağımlılığını ekleyeceğiz [Google Guava](https://github.com/google/guava).

> Guava, yeni koleksiyon türleri (çoklu harita ve çoklu küme gibi), değişmez koleksiyonlar, bir grafik kitaplığı ve eşzamanlılık için yardımcı programları içeren Google'ın temel Java kitaplıkları kümesidir.
> pom.xml dosyasına aşağıdaki bağımlılık eklenir.

```xml
<dependency>
			<groupId>com.google.guava</groupId>
			<artifactId>guava</artifactId>
			<version>28.1-jre</version>
</dependency>
```

## 3.2. ApplicationUserRole

ApplicationUserRole içerisinde uygulamadaki rol tanımlarını gerçekleştirmeye çalışıyoruz. Bu kapsamda Admin, Editor ve User rollerinin tanımını enum formatında gerçekleştiriyoruz.

```java
public enum ApplicationUserRole {
    ADMIN(Sets.newHashSet(BOOK_READ, BOOK_WRITE, BOOK_PUT, BOOK_DELETE)),
    EDITOR(Sets.newHashSet(BOOK_READ, BOOK_WRITE, BOOK_PUT)),
    USER(Sets.newHashSet(BOOK_READ));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
}
```

> #### Bir role çok sayıda Permission tanımı içerebilir.

## 3.3 ApplicationUserPermission

**ApplicationUserPermission** da bir **enum** yapısıdır ve kaynaklara ait yazma ya da okuma gibi işlevlerin tanımlanmasını sağlar. Burada tanımlanan izin ifadeleri istenilen Rollere atanabilir.

```java
public enum ApplicationUserPermission {
    BOOK_GET("book:get"),
    BOOK_DELETE("book:delete"),
    BOOK_PUT("book:put"),
    BOOK_POST("book:post");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
```

```java
import java.util.Set;

import com.google.common.collect.Sets;
import static com.bookstore.api.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    ADMIN(Sets.newHashSet(BOOK_GET, BOOK_POST, BOOK_PUT, BOOK_DELETE)),
    EDITOR(Sets.newHashSet(BOOK_GET, BOOK_POST, BOOK_PUT)),
    USER(Sets.newHashSet(BOOK_GET));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
}

```

## 3.4. ApplicationSecurityConfig Güncellemesi

Artık rol tanımları bir enum yapısı içerisinde tanımlandığından String ifadeleri konfigürasyon dosyamızdan çıkartabiliriz.

```java

import static com.bookstore.api.security.ApplicationUserRole.*;

 @Override
protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/", "/index", "/css/*", "js/**").permitAll()
            .antMatchers("/api/**").hasAnyRole(ADMIN.name(), EDITOR.name())
            .anyRequest()
            .authenticated()
            .and()
            .httpBasic();
}
```
# 4. CSRF Disable

Burada öncelikle **POST**, **PUT** ya da **DELETE** gibi http isteklerinin gönderilebilmesi için ya **CSRF** (Cross-Side Request Forgery) ifadesinin kapatılması ya da **CRSF** için bir implementasyonun yapılması gerekir. 

**CSRF** ifadesini kapatarak devam edeceğiz. Bu konfigürasyonu gerçekleştirmek için de **ApplicationSecurityConfig** dosyası üzerinde çalışıyoruz. 

Ayrıca management API çağırısı yapabilmek için hasRole ifadesiyle **ADMIN** rolünü geçerli kılıyoruz. 

configure metodu içerisinde **categories** kaynağı için ADMIN yetkili kılıyoruz.

```java

@Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                    .csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/", "/index", "/css/*", "js/**").permitAll()
                    .antMatchers("/api/v1/categories").hasAnyRole(ADMIN.name())
                    .antMatchers("/api/**").hasAnyRole(ADMIN.name(), EDITOR.name())
                    .anyRequest()
                    .authenticated()
                    .and()
                    .httpBasic();
}

```

# 5. Permission based Authentication
Bu bölümde permission tabanlı oturum açma işlemini gerçekleştiriyoruz. Hatırlayacağınız üzere bir role tanımı birden fazla permission içerebilirdi. Bir başka ifadeyle, çeşitli permission ifadelerinin birleşimi role tanımını oluşturmaktadır. 

## 5.1. getAuthorities() metodunun uygulanması 

**getAuthorities** metodu ApplicationUserRole sınıfı içerisinde tanımlanır. 

**getAuthorities()** aslında Role üzerinde tanımlı olan permission ifadelerinin getirilmesini sağlar. 

```java

public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
    Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toSet());
    permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return permissions;
}

```

## 5.2 UserDetailsService Güncellemesi 
Bu durumda artık role tabanlı değil; permission tabanlı olarak kullanıcı bilgilerinin getirilmesi gerekir. Bu çerçevede **ApplicationUserRole** sınıfı içerisindeki **getGrantedAuthorities()** metodu kullanılır.


```java
@Override
@Bean
protected UserDetailsService userDetailsService() {
    UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder.encode("admin123456"))
            // .roles(ADMIN.name())
            .authorities(ADMIN.getGrantedAuthorities())
            .build();

    UserDetails editor = User.builder()
            .username("editor")
            .password(passwordEncoder.encode("editor123456"))
            .authorities(EDITOR.getGrantedAuthorities())
            // .roles(EDITOR.name())
            .build();

    UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder.encode("user123456"))
            .authorities(USER.getGrantedAuthorities())
            // .roles(USER.name())
            .build();

    return new InMemoryUserDetailsManager(admin, editor, user);
}
```

## 5.3. hasAuthority veya hasAnyAuthority 
Path tanımlarına bağlı olarak herhangi bir permission ifadesi için **hasAuthority** ya da **hasAnyAuthority** metotlarıyla izin tanımları gerçekleştirilir. 

```java

@Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                        .csrf().disable()
                        .authorizeRequests()
                        .antMatchers("/", "/index", "/css/*", "js/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/api/v1/**").hasAuthority(BOOK_DELETE.getPermission())
                        .antMatchers(HttpMethod.PUT, "/api/v1/**").hasAuthority(BOOK_PUT.getPermission())
                        .antMatchers(HttpMethod.POST, "/api/v1/**").hasAuthority(BOOK_POST.getPermission())
                        .antMatchers(HttpMethod.GET, "/api/v1/**").hasAuthority(BOOK_GET.getPermission())
                        .antMatchers("/api/**").hasAnyRole(ADMIN.name(), EDITOR.name())
                        .anyRequest()
                        .authenticated()
                        .and()
                        .httpBasic();
        }

```

Artık permission/authority bazlı yetkilendirme işlemi gerçekleştirilebilir durumdadır. 

Bu durumda: 
    - Admin, GET, POST, PUT, DELETE işlemlerini yapabilir.
    - Editör; GET, POST, PUT yapabilir.
    - User; sadece GET yapabilir.