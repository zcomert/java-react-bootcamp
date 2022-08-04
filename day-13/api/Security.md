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

Bu durumda: - Admin, GET, POST, PUT, DELETE işlemlerini yapabilir. - Editör; GET, POST, PUT yapabilir. - User; sadece GET yapabilir.

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

## 7.5.1 UserService

**ApplicationUserDao** üzerinden import edilen bu arayüz **UserServiceImp** için bir kontrat/interface/arayüz olarak kullanılır.

```java
package com.bookstore.api.services.Abstract;

import java.util.List;

import com.bookstore.api.entities.User;
import com.bookstore.api.entities.dto.UserDto;
import com.bookstore.api.entities.models.ApiResponse;

public interface UserService extends ApplicationUserDao {
    ApiResponse<List<UserDto>> getAllUsers();

    ApiResponse<UserDto> getOneUser(int id);

    ApiResponse<UserDto> postOneUser(User user);

    ApiResponse<UserDto> putOneUser(int userId, User user);

    User getOneUserByUserName(String userName);

    void deleteOneUser(int userId);

    User saveOneUser(User user);

}

```

## 7.5.2 UserServiceImp

**services** klasörü altına eklenir.
**UserService** arayüzünü implemente eder.

```java
@Service
@RequiredArgsConstructor
@Repository("mysql")
public class UserServiceImp implements UserService {

}
```

En başta UserService kalıtıldığı **ApplicationUserDao** sınıfında tanımlanan metot implemente edilir.

```java
@Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

        User user = userRepository.findByUserName(username);

        Set<SimpleGrantedAuthority> grantedAuthorities = new HashSet<>();
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

Sonra diğer metotlar yazılabilir.

```java
package com.bookstore.api.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.dto.UserDto;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.UserNotFoundException;
import com.bookstore.api.repositories.RoleRepository;
import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.UserService;

import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import static com.bookstore.api.security.ApplicationUserRole.*;

@Service
@RequiredArgsConstructor
@Repository("mysql")
public class UserServiceImp implements UserService {

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

    @Override
    public void deleteOneUser(int userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public User saveOneUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

        User user = userRepository.findByUserName(username);

        Set<SimpleGrantedAuthority> grantedAuthorities = new HashSet<>();
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

## 7.6 Application Security Config Güncelleme

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

Aynı zamanda sistemde bulunan **Fake** repository tanımının geçerisiz olmasını sağlamak amacıyla **@Repository("mysql")** ifadesini burada kullanıyoruz. \*\*\*\*

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

[JWT IO](https://jwt.io/)

JWT Header, Payload ve VERIFY SIGNATURE bölümlerinden oluşur.

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

## 9.2. Değişken Tanımları (application.properties)

application.jwt özellikle prefix olarak kullanılmıştır.

```
application.jwt.secretKey=springsecurityspringsecurityspringsecurityspringsecurityspringsecurityspringsecurityxxyy12345698
application.jwt.expires.in=3600000
application.jwt.tokenPrefix=Bearer
application.jwt.tokenExpirationAfterDays=10
application.jwt.refresh.token.expires.in=604800
```

## 9.3. JwtConfig

jwt klasörünün altında eklenir.
application.properties dosyasındaki değişkenler ile ilişki kurar. 
Bir konfigürasyon dosyasıdır.

```java
package com.bookstore.api.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "application.jwt")
@Data
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;

    @Value("${application.jwt.expires.in}")
    private Long expiresIn;

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }
}
```
## 9.4. JwtSecretKey

jwt klasörünün altında eklenir.
JwtConfig buraya enjekte edilir.
Bir konfigürasyon dosyasıdır.

```java
package com.bookstore.api.jwt;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Configuration
public class JwtSecretKey {

    private final JwtConfig jwtConfig;

    public JwtSecretKey(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
    }
}
```

## 9.5 JwtAuthenticationEntryPoint
Geçersiz istekleri karşılamak üzere kullanılır. 

```java
package com.bookstore.api.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }

}
```

## 9.6. JwtTokenProvider
Anahtar üretmek üzere kullanılır. 
**JwtSecretKey** ve **JwtConfig** ile birlikte çalışır. 

```java
package com.bookstore.api.jwt;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bookstore.api.security.ApplicationUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {

    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;

    public JwtTokenProvider(JwtConfig jwtConfig, SecretKey secretKey) {
        this.jwtConfig = jwtConfig;
        this.secretKey = secretKey;
        System.out.println(jwtConfig.getExpiresIn());
    }

    public String generateJwtToken(Authentication auth) {

        ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtConfig.getExpiresIn()))
                .signWith(secretKey)
                .compact();
    }

    public String generateJwtTokenByUserId(int userId) {

        Date expireDate = new Date(new Date().getTime() + jwtConfig.getExpiresIn());
        return Jwts.builder()
                .setSubject(Integer.toString(userId))
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    public String generateJwtTokenByUserName(String username) {
        Date expireDate = new Date(new Date().getTime() + jwtConfig.getExpiresIn());
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    String getUsernameFromJwt(String token) {
        Claims claims = getJwtBody(token);
        return claims.getSubject();
    }

    boolean validateToken(String token) {
        try {
            getJwtBody(token);
            return !isTokenExpired(token);
        } catch (MalformedJwtException e) {
            return false;
        } catch (ExpiredJwtException e) {
            return false;
        } catch (UnsupportedJwtException e) {
            return false;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    boolean isTokenExpired(String token) {
        Date expiration = getJwtBody(token).getExpiration();
        return expiration.before(new Date());
    }

    private Claims getJwtBody(String token) {

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}

```
## 9.7. JwtAuthenticationFilter

Http isteklerinde araya girerek kullanılan bir filter görevi görür. 

- **JwtTokenProvider** 
- **userDetailsService**

bu sınıfa enjekte edilir. 

```java
package com.bookstore.api.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bookstore.api.services.ApplicationUserService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    ApplicationUserService userDetailsService; 

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwtToken = extractJwtFromRequest(request);
            if (StringUtils.hasText(jwtToken) && jwtTokenProvider.validateToken(jwtToken)) {
                String username = jwtTokenProvider.getUsernameFromJwt(jwtToken);
                UserDetails user = userDetailsService.loadUserByUsername(username);
                if (user != null) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null,
                            user.getAuthorities());

                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception e) {
            return;
        }
        filterChain.doFilter(request, response);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer "))
            return bearer.substring("Bearer".length() + 1);
        return null;
    }
}

```

## 9.8. ApplicationSecurityConfig Güncellemesi

Bazı önemli import ifadeleri

>import org.springframework.security.config.http.SessionCreationPolicy;
>import org.springframework.security.config.BeanIds;
>import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
>import org.springframework.security.authentication.AuthenticationManager;

```java

package com.bookstore.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.BeanIds;

import com.bookstore.api.jwt.JwtAuthenticationEntryPoint;
import com.bookstore.api.jwt.JwtAuthenticationFilter;
import com.bookstore.api.services.ApplicationUserService;

import static com.bookstore.api.security.ApplicationUserRole.*;
import static com.bookstore.api.security.ApplicationUserPermission.*;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

        private final PasswordEncoder passwordEncoder;
        private final ApplicationUserService applicationUserService;
        private final JwtAuthenticationEntryPoint handler;

        @Bean
        public JwtAuthenticationFilter jwtAuthenticationFilter() {
                return new JwtAuthenticationFilter();
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                                .csrf().disable()
                                .exceptionHandling().authenticationEntryPoint(handler)
                                .and()
                                .sessionManagement()
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                .and()
                                .authorizeRequests()
                                .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                                .antMatchers("/api/v1/auth/**").permitAll()
                                .antMatchers("/api/**").permitAll()
                                .anyRequest()
                                .authenticated();
        }

        @Bean(BeanIds.AUTHENTICATION_MANAGER)
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
                return super.authenticationManagerBean();
        }

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

}
```

## 9.9. UserRole

### Entity
```java
package com.bookstore.api.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users_roles")
@Data
@NoArgsConstructor
public class UserRole {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "role_id")
    private int roleId;

    public UserRole(int userId, int roleId) {
        this.userId = userId;
        this.roleId = roleId;
    }

}

```

## UserRoleRepository

```java
package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
}

```

## UserRoleService

```java
package com.bookstore.api.services;

import org.springframework.stereotype.Service;

import com.bookstore.api.entities.UserRole;
import com.bookstore.api.repositories.UserRoleRepository;

@Service
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public void Add(int userId, int roleid) {
        UserRole userRole = new UserRole(userId, roleid);
        userRoleRepository.save(userRole);
    }

}
```

> # Varsa UserService ve UserServiceImp'deki eksiklikler giderilir.

## 9.9 RefreshToken
Entities eklenir. 

```java
package com.bookstore.api.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Entity
@Table(name = "refresh_token")
@Data
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    User user;

    @Column(nullable = false, unique = true)
    String token;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    Date expiryDate;
}

```
## 9.10. RefreshTokenRepository

```java
package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    RefreshToken findByUserId(int userId);
}

```

## 9.11. RefreshTokenService

```java
package com.bookstore.api.services;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.RefreshToken;
import com.bookstore.api.entities.User;
import com.bookstore.api.repositories.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    @Value("${application.jwt.refresh.token.expires.in}")
    Long expireSeconds;

    private RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String createRefreshToken(User user) {
        RefreshToken token = refreshTokenRepository.findByUserId(user.getId());
        if (token == null) {
            token = new RefreshToken();
            token.setUser(user);
        }
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Date.from(Instant.now().plusSeconds(expireSeconds)));
        refreshTokenRepository.save(token);
        return token.getToken();
    }

    public boolean isRefreshExpired(RefreshToken token) {
        return token.getExpiryDate().before(new Date());
    }

    public RefreshToken getByUser(int userId) {
        return refreshTokenRepository.findByUserId(userId);
    }

}
```

## 9.12. RefreshTokenService

```java
package com.bookstore.api.services;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.RefreshToken;
import com.bookstore.api.entities.User;
import com.bookstore.api.repositories.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    @Value("${application.jwt.refresh.token.expires.in}")
    Long expireSeconds;

    private RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String createRefreshToken(User user) {
        RefreshToken token = refreshTokenRepository.findByUserId(user.getId());
        if (token == null) {
            token = new RefreshToken();
            token.setUser(user);
        }
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Date.from(Instant.now().plusSeconds(expireSeconds)));
        refreshTokenRepository.save(token);
        return token.getToken();
    }

    public boolean isRefreshExpired(RefreshToken token) {
        return token.getExpiryDate().before(new Date());
    }

    public RefreshToken getByUser(int userId) {
        return refreshTokenRepository.findByUserId(userId);
    }
}

```

## 9.12 AuthResponse

```java
package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String message;

    private int userId;
    private String userName;

    private String firstName;
    private String lastName;

    private String accessToken;
    private String refreshToken;
}

```

## 9.13. RefreshRequest

```java

package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class RefreshRequest {
    private int userId;
    private String refreshToken;
}

```
## 9.14. UserDto

```java
package com.bookstore.api.entities.dto;

import java.util.Set;

import com.bookstore.api.entities.Role;

import lombok.Data;

@Data
public class UserDto {
    private int id;
    private String userName;
    private String firstName;
    private String lastName;
    private Set<Role> roles;
}


```

## 9.15. UserRequest

```java
package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
}
```
### UserRequestForRegister

```java
package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class UserRequestForRegister {
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
}
```

## 9.16 AuthController

```java
package com.bookstore.api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.rsocket.RSocketSecurity.AuthorizePayloadsSpec;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.RefreshToken;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.dto.AuthResponse;
import com.bookstore.api.entities.dto.RefreshRequest;
import com.bookstore.api.entities.dto.UserRequest;
import com.bookstore.api.entities.dto.UserRequestForRegister;
import com.bookstore.api.jwt.JwtTokenProvider;
import com.bookstore.api.services.RefreshTokenService;
import com.bookstore.api.services.UserRoleService;
import com.bookstore.api.services.Abstract.UserService;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = { "http://localhost:3000/", "http://localhost:3001" })
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private RefreshTokenService refreshTokenService;
    private UserRoleService userRoleService;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
            UserService userService, PasswordEncoder passwordEncoder, RefreshTokenService refreshTokenService,
            UserRoleService userRoleService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenService = refreshTokenService;
        this.userRoleService = userRoleService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserRequest loginRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getUserName(),
                loginRequest.getPassword());

        Authentication auth = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        User user = userService.getOneUserByUserName(loginRequest.getUserName());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken("Bearer " + jwtToken);
        authResponse.setRefreshToken(refreshTokenService.createRefreshToken(user));
        authResponse.setUserId(user.getId());
        authResponse.setMessage("Successed.");
        authResponse.setFirstName(user.getFirstName());
        authResponse.setLastName(user.getLastName());

        return authResponse;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserRequestForRegister registerRequest) {

        AuthResponse authResponse = new AuthResponse();

        // User exists?
        if (userService.getOneUserByUserName(registerRequest.getUserName()) != null) {
            authResponse.setMessage("Username already in use.");
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        // User creating...
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setUserName(registerRequest.getUserName());
        user.setPassword(registerRequest.getPassword());

        userService.saveOneUser(user);

        // Adding role -> User role is given by default
        userRoleService.Add(user.getId(), 3);

        //
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                registerRequest.getUserName(),
                registerRequest.getPassword());

        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        authResponse.setMessage("User successfully registered.");
        authResponse.setAccessToken("Bearer " + jwtToken);
        authResponse.setRefreshToken(refreshTokenService.createRefreshToken(user));
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUserName());
        authResponse.setFirstName(user.getFirstName());
        authResponse.setLastName(user.getLastName());

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest refreshRequest) {
        AuthResponse authResponse = new AuthResponse();

        RefreshToken token = refreshTokenService.getByUser(refreshRequest.getUserId());

        if (token.getToken().equals(refreshRequest.getRefreshToken()) &&
                !refreshTokenService.isRefreshExpired(token)) {

            User user = token.getUser();

            String jwtToken = jwtTokenProvider.generateJwtTokenByUserId(user.getId());

            authResponse.setMessage("Token has been refreshed successfully.");
            authResponse.setAccessToken("Bearer " + jwtToken);
            authResponse.setUserId(user.getId());
            authResponse.setFirstName(user.getFirstName());
            authResponse.setLastName(user.getLastName());
            authResponse.setUserName(user.getUserName());
            authResponse.setRefreshToken(token.getToken());

            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } else {
            authResponse.setMessage("refresh token is not valid.");
            return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        var response = userService.getAllUsers();
        return ResponseEntity.ok(response);
    }

}

```






















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
application.jwt.refresh.token.expires.in=604800
```
