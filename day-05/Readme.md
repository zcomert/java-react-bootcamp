# Employee MUI
Projede Java Spring Boot ile geliştirilmiş olan bir single API (employee-api) uygulamasının React içerisinde kullanılması sağlanmıştır. 

Uygulanmaya ait blog diyagram şekilde gösterildiği gibidir. 

![employee-mui-project](http://www.zafercomert.com/medya/java/employeeApp-employee-mui.svg)

Uygulama içerisinde component yapılarının hiyerarşik bir şekilde organize edilmesi sağlanmıştır. Global state yönetimi yapılmadığın için component drilling yöntemi ile state yönetimi gerçekleştirilmiştir. 

Örneğin **App** component altında yer alan **EmployeeList** component yapısında bir kaydın silinmesi durumunda bir üst seviyede bulunan **App** component yapısında employee listesinin refresh edilmesi sağlanmıştır. Benzer şekilde **EmployeeAdd** component yapısında bir eleman eklendiğinde **EmployeeList** component yapısının da güncellenmesi sağlanmıştır. 

Uygulama üzerinde yer alan Component yapılarının hiyerarşik düzeni aşağıdaki şekilde gösterilmiştir. 

![employee-mui-project-components](http://www.zafercomert.com/medya/java/employeeApp-employee-app-mui-components.svg)