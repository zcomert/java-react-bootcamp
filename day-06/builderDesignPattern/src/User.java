public class User {
    private String firstName;
    private String lastName;

    private User() {
        System.out.println("Construcutor..... ");
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public static User builder() {
        return new User();
    }

    public User firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public User lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

}
