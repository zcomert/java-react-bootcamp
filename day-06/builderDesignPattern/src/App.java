public class App {
    public static void main(String[] args) throws Exception {
        
       var user = User.builder()
        .firstName("Zafer")
        .lastName("Cömret");

        System.out.println(user.getFirstName());
        System.out.println(user.getLastName());
       

        // User.builder().firstName("Ahmet").lastName("Gunes");
    }
}
