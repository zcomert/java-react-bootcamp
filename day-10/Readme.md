# 9. Gün 
- value and reference types
- primitive types and Wrapper classes
- ModelMapper
- DTO

- React Router DOM
  - BrowserRoute
  - Routes
  - Route
  - useNavigate
  - useParams
- ContexAPI
  - Context.Provider
  - useContext
- Enviroment variables in React

#Mapping

Buradaki temel amacımız API ile gelen istekleri alıp, işleyip ve daha sonra cevap verirken `internal` yani içeride kullanılan nesneler ile `external` yani dış dünyaya açılan nesneler arasında bir düzenleme yapmaktır.

## 1. Bağımlılık

```xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>2.3.2</version>
</dependency>
```

## 2. Klasör Yapılandırması 
### config 

Öncelikle **config** isimli bir klasör açıp, **ModelMapper** sınıfından bir örneğin IoC kapsamında üretilmesini sağlıyoruz. 

Aynı zamanda eşleştirme (matching) stratejisini de yine bu bölümde gerçekleştiriyoruz. 

```java
@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper getModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }
}
```

### dto 
Ana paketin altında/entities klasörü altında dto isimli bir klasör eklenebilir. Data Transfer Objects yapılarının tercih edilen bir klasör altında toplanması tercih edilir. 

## 3. Örnek Kullanımlar
Örnek kullanımlar aşağıdaki gibi verilmiştir. 

```java
@Override
    public UserDto createOneUser(UserDto userDto) {
        // Dto -> Entity
        User user = modelMapper.map(userDto, User.class);
        user.setPassword("123456");
        User savedUser = userDao.save(user);
        // Entity -> User
        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public List<UserDto> getAllUsers() {

        Iterable<User> iterable = userDao.findAll();
        List<User> users = new ArrayList<User>();
        iterable.forEach(users::add);

        List<UserDto> usersDto = new ArrayList<UserDto>();

        // for (User user : users) {
        // usersDto.add(modelMapper.map(user, UserDto.class));
        // }

        usersDto = users
                .stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
        return usersDto;
    }

    @Override
    public List<User> getAllUsersList() {
        Iterable<User> iterable = userDao.findAll();
        List<User> users = new ArrayList<User>();
        iterable.forEach(users::add);
        return users;
    }
```


# Kaynaklar
1. [Model Mapper](https://mvnrepository.com/artifact/org.modelmapper/modelmapper/3.1.0)
2. [Model Mapper](http://modelmapper.org/getting-started/)
3. [Converting Iterable to Collection in Java](https://www.baeldung.com/java-iterable-to-collection)
