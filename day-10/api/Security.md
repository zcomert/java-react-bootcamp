# 1. Bağımılılık

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

# 2. Application Security Config

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

# 3. Authentication Nasıl Yapılır? 
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