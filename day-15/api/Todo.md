1. Veri tabanını sıfırla.
2. book-store-course isimli boş bir schema oluştur. 
3. FakeApplicationUserDao kullanarak (fake) uygulamayı başlat. 
   1. User, Editor, Admin Rollerini post et..
   2. User, Editor, Admin kullanıcıları oluştur.
   3. **Unutma** varsayılan olarak tüm kullanıcılar **USER** rolü ile eklendi. Roller dağıtımını yapmayı unutma. Bu veri tabanında **users_role** tablosunu kullanarak yapabilirsin.
4. Uygulamayı durdur. 
6. UserServiceImp kullanarak (mysql) uygulamayı yeniden başlat. 
7. Postman'de kullanıcılar için koleksiyon oluştur. 
8. {{accessToken}} değişkenini koleksiyonlar için tanımla. 
9. Login testine bak. 
10. Üretilen JWT jwt.io üzerinde test et. 
11. Resources için erişim senaryoları uygula.