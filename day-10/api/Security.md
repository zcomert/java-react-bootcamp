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

* Logout olma şansı yoktur. 
* Kullanıcı adı ve şifresine müdahale edilemez.

## 1.2. Application Security Config

**security/config** gibi bir isimle yeni bir klasör projeye dahil edilir.

Gelen Request yapılarını hangi kurallara göre cevap verileceğini belirlemek üzere **ApplicationSecurityConfig** sınıfı kullanılır.
Bu sınıf **WebSecurityConfigurerAdapter** sınıfından kalıtılır. 

**config** metodu (HttpSecurity imzalı olanı)  **Override** edilir.

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

*  CachingUserDetailsService, 
*  InMemoryDaoImpl, 
*  *InMemoryUserDetailsManager*, 
*  JdbcDaoImpl, 
*  JdbcUserDetailsManager, 
*  LdapUserDetailsManager,
*  LdapUserDetailsService, 
*  UserDetailsServiceWrapper

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
