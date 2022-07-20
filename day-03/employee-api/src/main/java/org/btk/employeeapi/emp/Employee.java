package org.btk.employeeapi.emp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // default constructor
@AllArgsConstructor // constructor with all fields
public class Employee {
    private int id;
    private String firstName;
    private String lastName;

}
