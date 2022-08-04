1. Veri tabanını sıfırla.
2. book-store-course isimli boş bir schema oluştur. 
3. FakeApplicationUserDao kullanarak (fake) uygulamayı başlat. 
   1. User, Editor, Admin Rollerini post et..
   2. User, Editor, Admin kullanıcıları oluştur.
4. Uygulamayı durdur. 
5. UserServiceImp kullanarak (mysql) uygulamayı yeniden başlat. 
6. Postman'de kullanıcılar için koleksiyon oluştur. 
7. {{accessToken}} değişkenini koleksiyonlar için tanımla. 
8. Login testine bak. 
9. API güvenlik testleri denemesi yap.