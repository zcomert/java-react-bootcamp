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

import static org.btk.bookstore.security.ApplicationUserPermission.*;

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

# 6. PreAuthorize
# 6.1. @PreAuthorize
Metotların öncesinde kullanılan bir annotation yapısı ile herbir metoda ait **Role** ya da **Permission** tanımı gerçekleştirmek mümkündür. Bu çerçevede: 

- hasRole
- hasAuthority
- hasAnyRole
- hasAnyAuthority

ifadeleri kullanılabilir.

**@PreAuthorize** ifadesi metotların başına eklenir. 
```java
@RestController
@RequestMapping("/management/api/books")
public class BooksManagerController {

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EDITOR','ROLE_USER')")
    public List<Book> getAllBooks() {
   
    }

    @PostMapping
    @PreAuthorize("hasAuthority('book:write')")
    public ResponseEntity<Book> addOneBook(@RequestBody Book book) {
   
    }

    @PutMapping(path = "{id}")
    @PreAuthorize("hasAuthority('book:put')")
    public ResponseEntity<Book> addOneBook(@PathVariable(name = "id") int id, @RequestBody Book book) {
   
    }

    @DeleteMapping(path = "{id}")
    @PreAuthorize("hasAuthority('book:delete')")
    public ResponseEntity<Book> addOneBook(@PathVariable(name = "id") int id) {
   
    }
}
```

## 6.2. EnableGlobalMethodSecurity
**@PreAuthorize ** annotation yapısının kullanılabilmesi için **EnableGlobalMethodSecurity** özelliğinin **ApplicationSecurityConfig** ifadesinin hemen üzerinde tanımlanması gerekir.

```java
Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {
    // ... 
}
```

## 6.3. antMatchers 
Son adımda artık antMatcher ifadelerinin kullanımına gerek kalmamaktadır. İlgili ifadeler artık kaldırılabilir. Biz uygulama çerçevesinde sadece **BooksManagerController** içine **@PreAuthorize** kullandığımızdan dolayı sadece **/management/api/books** ait olan tanımları yorum satırına çeviriyoruz. 

```java
@Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                                .csrf().disable()
                                .authorizeRequests()
                                .antMatchers("/", "/index", "/css/*", "js/**").permitAll()
                                .antMatchers("/api/**").permitAll()
                                .anyRequest()
                                .authenticated()
                                .and()
                                .httpBasic();
        }
```

# 7. UserDetailService Implementation

# 7 UserDetailService Implementation

## 7.1 ApplicationUser (-> UserDetails)
Öncelikle **ApplicationSecurityConfig** bölümünde bulunan **userDetailsService()** metodunun işlevini bir veri tabanı ile bir başka ifadeyle bir Repository ile çalışacak şekilde düzenliyoruz. 

Bu çerçevede, öncelikle **UserDetails** interface yapısını implemente eden **ApplicationUser** isimli bir sınıf tanımı gerçekleştiriyoruz. Böylelikle **Spring** **Security** sınıfı içerisinde kullanabileceğimiz bir **UserDetails** sınıfı elde ediyoruz. 

```java

public class ApplicationUser implements UserDetails {

    private final String username;
    private final String password;
    private final Set<? extends GrantedAuthority> grantedAuthorities;
    private final boolean isAccountNonExpired;
    private final boolean isAccountNonLocked;
    private final boolean isCredentialsNonExpired;
    private final boolean isEnabled;

    public ApplicationUser(String username,
            String password,
            Set<? extends GrantedAuthority> grantedAuthorities,
            boolean isAccountNonExpired,
            boolean isAccountNonLocked,
            boolean isCredentialsNonExpired,
            boolean isEnabled) {
        this.username = username;
        this.password = password;
        this.grantedAuthorities = grantedAuthorities;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}

```

## 7.2 ApplicationUserService (-> UserDetailsService)

**UserDetails** sınıfını kullancak olan bir servis tanımı gerçekleştiriyoruz. Bu servis **UserDetailsService** interface yapısını implemente etmektedir ve sadece **loadByUsername()** metodunun implemente edilmesini gerektirmektedir. 

> Servis katmanı üzerinde bu işlemi gerçekleştiriyoruz.

```java
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return applicationUserDao
            .selectApplicationUserByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", username)));
}
```
> Burada önemli olan bir nokta Repository tanımının bir interface aracılığıyla bu sınıf içerisinde kullanılmasıdır. Herhangi bir Repository ile çalışmak için **ApplicationUserDao** isimli bir interface yapısı bu çerçevde tanımlanır. 

## 7.3. ApplicationUserDao
**ApplicationUserService** içerisinde tanımlanan tek metot olan **loadByUsername** metodu içerisinde kullanılmak üzere; kullanıcıyı seçmek amacıyla bir metot imzası içerir. 

```java
public interface ApplicationUserDao {
    Optional<ApplicationUser> selectApplicationUserByUsername(String username);
}
```

## 7.4. FakeApplicationUserDaoService
**ApplicationUserDao** interface yapısını uygulayan sınıftır. Bu sınıf içerisinde bir servisten ya da bir Repo üzerinden kullanıcılar alınabilir. 

Mevcut uygulamada bir private metot içerisinde kullanıcıların manuel olarak oluşturulması sağlanmıştır. 

```java
package com.bookstore.api.services;

import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.ApplicationUserDao;
import com.google.common.collect.Lists;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.bookstore.api.security.ApplicationUserRole.*;

@Repository("fake")
@RequiredArgsConstructor
public class FakeApplicationUserDaoService implements ApplicationUserDao {

    private final PasswordEncoder passwordEncoder;

    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return getApplicationUsers()
                .stream()
                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }

    private List<ApplicationUser> getApplicationUsers() {
        List<ApplicationUser> applicationUsers = Lists.newArrayList(
                new ApplicationUser(
                        "admin",
                        passwordEncoder.encode("admin123456"),
                        ADMIN.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true),
                new ApplicationUser(
                        "editor",
                        passwordEncoder.encode("editor123456"),
                        EDITOR.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true),
                new ApplicationUser(
                        "user",
                        passwordEncoder.encode("user123456"),
                        USER.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true));
        return applicationUsers;
    }
}
```

> Dikkate edilirse tanımlanan somut Repository("Fake") olarak isimlendirilmiştir. **ApplicationUserService** gidildiğinde bu alanın **@Qualifier("fake")** ile özellikle vurgulandığı görülmektedir. Yani birden fazla Repository olması durumunda özellikle kullanılacak olan Repository kesin bir şekilde ifade edilmiştir. 

```java
    private final ApplicationUserDao applicationUserDao;

    @Autowired
    public ApplicationUserService(@Qualifier("fake") ApplicationUserDao applicationUserDao) {
        this.applicationUserDao = applicationUserDao;
    }
```

## 7.5 Application Security Config Güncelleme 
ApplicationSecurityConfig içerinde **AuthenticationManagerBuilder** kullanılarak oturum açma için bir veri servisine bağlanılacağı bildirilir. 

```java

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
}

@Bean
public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(applicationUserService);
        return provider;
}
```

> #### ApplicationUserService içerisinde birden fazla kaynak var ise @Qualifier("fake") annotation yapısı ile hangi dao implementasyonunun kullanılacağı belirlenir. 

# 8 UserDetails için Dao Implementasyonu
Bu adımda MySQL üzerinde kullanıcıları ve rolleri organize ediyoruz. 

## 8.1. Entities, Repositories, Services ve Controllers Tanımları
- **User** **ve** **Role** sınıflarını projemize ekliyoruz. Bu sınıfları entities paketi altında topluyoruz. 
- **User** ve **Role** için **UserRepostiroy** ve **RoleRepository** interface yapılarını **JpaRepository** kullanarak tanımlıyoruz. 
- **UserService** tanımını gerçekleştiriyoruz ve bunun **services** klasörü altında yapıyoruz. 
- **UsersController** tanımı yapıp içerisinde ilgili metot tanımlarını **controllers** paketi altında gerçekleştiriyoruz.

## 8.3. ApplicationUserDao Implementasyonu
Uygulamamızın artık kullanıcı verilerini **MySQL** veritabanınından almasını istiyoruz. Bu amaçla öncelikle daha önce implemente ettiğimiz **UserService** sınıfına gidip **ApplicationUserDao** interface yapısını burada implemente edeceğimizi ifade ediyoruz. 

Aynı zamanda sistemde bulunan **Fake** repository tanımının geçerisiz olmasını sağlamak amacıyla **@Repository("mysql")** ifadesini burada kullanıyoruz. ****

```java

import static com.bookstore.api.security.ApplicationUserRole.*;

@Service
@RequiredArgsConstructor
@Repository("mysql")
public class UserServiceImp implements ApplicationUserDao, UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;

    @Override
    public ApiResponse<List<UserDto>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserDto> list = users
                .stream()
                .map(user -> mapper.map(user, UserDto.class))
                .collect(Collectors.toList());

        return ApiResponse.default_OK(list);
    }

    @Override
    public ApiResponse<UserDto> getOneUser(int userId) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        UserDto userDto = mapper.map(user, UserDto.class);

        return ApiResponse.default_OK(userDto);
    }

    @Override
    public ApiResponse<UserDto> postOneUser(User user) {
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("USER");
        if (role == null) {
            throw new RuntimeException("USER role is not defined.");
        }
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ApiResponse.default_CREATED(mapper.map(user, UserDto.class));
    }

    @Override
    public ApiResponse<UserDto> putOneUser(int userId, User user) {
        getOneUser(userId);

        Set<Role> roles = roleRepository.findByIdIn(user.getRoles());
        user.setId(userId);
        user.setRoles(roles);

        userRepository.save(user);
        return ApiResponse.default_ACCEPTED(mapper.map(user, UserDto.class));
    }

    public void deleteOneUser(int userId) {
        userRepository.deleteById(userId);
    }

    public User getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

        User user = userRepository.findByUserName(username);

        Set<SimpleGrantedAuthority> grantedAuthorities = null;
        Set<Role> roles = user.getRoles();

        for (Role role : roles) {
            switch (role.getId()) {
                case 1:
                    grantedAuthorities.addAll(ADMIN.getGrantedAuthorities());
                    break;
                case 2:
                    grantedAuthorities.addAll(EDITOR.getGrantedAuthorities());
                    break;
                case 3:
                    grantedAuthorities.addAll(USER.getGrantedAuthorities());
                    break;
                default:
                    break;
            }

        }

        Optional<ApplicationUser> applicationUser = Optional.ofNullable(new ApplicationUser(
                user.getUserName(),
                user.getPassword(),
                grantedAuthorities,
                true,
                true,
                true,
                true));

        return applicationUser;
    }

}




```

Bu interface yapısını kabul ettiğimizde **selectApplicationUserByUsername** metodunu aslında garanti etmiş oluyoruz. Bu noktada artık ilgili metodun implemente edilmesi gerekir. Metot gövdesi aşağıdaki gibi implemente edilir. 

```java
@Override
public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

    User user = userRepository.findByUserName(username);

    Set<SimpleGrantedAuthority> grantedAuthorities = new HashSet<>();;
    Set<Role> roles = user.getRoles();

    for (Role role : roles) {
        switch (role.getId()) {
            case 1:
                grantedAuthorities.addAll(ADMIN.getGrantedAuthorities());
                break;
            case 2:
                grantedAuthorities.addAll(EDITOR.getGrantedAuthorities());
                break;
            case 3:
                grantedAuthorities.addAll(USER.getGrantedAuthorities());
                break;
            default:
                break;
        }

    }

    Optional<ApplicationUser> applicationUser = Optional.ofNullable(new ApplicationUser(
            user.getUserName(),
            user.getPassword(),
            grantedAuthorities,
            true,
            true,
            true,
            true));

    return applicationUser;
}
```

![BasicAuthWithDao](http://www.zafercomert.com/medya/java/springSecurity-BasicAuthWithDao.svg)

# 9 JWT

## 9.1. [Java JWT: JSON Web Token for Java and Android](https://github.com/jwtk/jjwt)

Öncelikle bağımlılıkların sisteme eklenmesi gerekir.

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

## 9.2. [JWT IO](https://jwt.io/)

JWT Header, Payload ve VERIFY SIGNATURE bölümlerinden oluşur.

## 9.3. UsernameAndPasswordAuthenticationRequest

Kullanıcı adı ve şifre taleplerini iletmek üzere bir request nesnesi oluşturulur.

```java
@Data
@NoArgsConstructor
public class UsernameAndPasswordAuthenticationRequest {

    private String username;
    private String password;
}
```

## 9.4. JwtUsernameAndPasswordAuthenticationFilter

- **JwtUsernameAndPasswordAuthenticationFilter** sınıfı öncelikle **UsernameAndPasswordAuthenticationRequest** nesnesinden gelen kullanıcı adı ve şifresini **ObjectMapper** aracılığıyla okur ve **Authentication** nesnesi oluşturur.

- Oluşturulan **Authentication** nesnesi **AuthenticationManager** aracılığıyla oturum açmak üzere kullanılır.

- Authentication bir interface yapısıdır. Bu interface farklı sınıflar tarafından implemente edilir ([Authentication](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/Authentication.html)).
  - AbstractAuthenticationToken,
  - AbstractOAuth2TokenAuthenticationToken,
  - AnonymousAuthenticationToken,
  - BearerTokenAuthentication,
  - BearerTokenAuthenticationToken,
  - CasAssertionAuthenticationToken,
  - CasAuthenticationToken,
  - JaasAuthenticationToken,
  - JwtAuthenticationToken,
  - OAuth2AuthenticationToken,
  - OAuth2AuthorizationCodeAuthenticationToken,
  - OAuth2LoginAuthenticationToken,
  - OpenIDAuthenticationToken,
  - PreAuthenticatedAuthenticationToken,
  - RememberMeAuthenticationToken,
  - RunAsUserToken,
  - Saml2Authentication,
  - Saml2AuthenticationToken,
  - TestingAuthenticationToken,
  - _UsernamePasswordAuthenticationToken_

> **AuthenticationManager.authenticate(Authentication)** bu metot çalıştığı anda oturum açma isteği iletilir.

Bu noktaya kadar istemciden -> sunucuya istek kullanıcı bilgilerini (credentials) içerik şekilde iletilir. Dolasıyla bir sonraki adımda kullanıcı bilgilerinin sunucu tarafında doğrulanması gerekir. Doğrulama işlemi başarılı olursa üretilen JWT token istemciye gönderilir.

Eğer oturum açma işlemi başarılı olursa bir başka ifadeyle kullanıcı bilgileri (credentials) ifadeleri doğrulanırsa, **successfulAuthentication** metodu çalıştırılır.

Bu metot içerisinde JWT Token oluşturulur. Oluşturulan token Header eklenir. 

Dolasıyla JwtUsernameAndPasswordAuthenticationFilter tasarımı bu şekilde tamamlanır. 


```java
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;

    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager,
            JwtConfig jwtConfig,
            SecretKey secretKey) {
        this.authenticationManager = authenticationManager;
        this.jwtConfig = jwtConfig;
        this.secretKey = secretKey;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {

        try {
            UsernameAndPasswordAuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), UsernameAndPasswordAuthenticationRequest.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword());

            Authentication authenticate = authenticationManager.authenticate(authentication);
            return authenticate;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException, ServletException {

        String token = Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities", authResult.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(secretKey)
                .compact();

        response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + token);
    }
}

```
## 9.5. JwtConfig
JWT yapılandırılmasını sağlamak üzere JwtConfig sınıfı düzenlenir. 

```java

@ConfigurationProperties(prefix = "application.jwt")
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpirationAfterDays;

    public JwtConfig() {
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getTokenPrefix() {
        return tokenPrefix;
    }

    public void setTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;
    }

    public Integer getTokenExpirationAfterDays() {
        return tokenExpirationAfterDays;
    }

    public void setTokenExpirationAfterDays(Integer tokenExpirationAfterDays) {
        this.tokenExpirationAfterDays = tokenExpirationAfterDays;
    }

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }
}

```

## 9.6. JwtSecretKey
Anahtar değer ve şifreleme algoritması için JwtSecretKey sınıfı kullanılır. 

```java
@Configuration
public class JwtSecretKey {

    private final JwtConfig jwtConfig;

    @Autowired
    public JwtSecretKey(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
    }
}
```

## 9.7. ApplicationSecurityConfig ifadesinin yapılandırılması 
Öncelikle yapılandırıcıya enjekte edilmesi gereken yapıların enjeksiyonu gerçekleştirilir. Temelde bir filtre yapısı istek zincirine eklenir ve Session yani oturum bilgisini STATELESS olarak ayarlanır. 

```java
private final PasswordEncoder passwordEncoder;
private final ApplicationUserService applicationUserService;
private final SecretKey secretKey;
private final JwtConfig jwtConfig;

@Autowired
public ApplicationSecurityConfig(PasswordEncoder passwordEncoder,
        ApplicationUserService applicationUserService,
        SecretKey secretKey,
        JwtConfig jwtConfig) {
    this.passwordEncoder = passwordEncoder;
    this.applicationUserService = applicationUserService;
    this.secretKey = secretKey;
    this.jwtConfig = jwtConfig;
}
```

Daha sonra **configure** metodu üzerinde değişiklikler yapılır. 

```java
 @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(
                        new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfig, secretKey))
                .addFilterAfter(new JwtTokenVerifier(secretKey, jwtConfig),
                        JwtUsernameAndPasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                .antMatchers("/api/**").hasRole(USER.name())
                .anyRequest()
                .authenticated();
    }
```


## Properties 

```text
application.jwt.secretKey=springsecurityspringsecurityspringsecurityspringsecurityspringsecurityspringsecurity
application.jwt.tokenPrefix=Bearer 
application.jwt.tokenExpirationAfterDays=10
```