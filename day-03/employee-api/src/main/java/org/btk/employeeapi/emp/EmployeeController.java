package org.btk.employeeapi.emp;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// ./api/employees
@RestController
@RequestMapping("api/employees")
public class EmployeeController {

    // Dependency Injection (DI)
    private final EmployeeRepository employeeRepository;

    // Constructor Injection
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;

    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return Arrays.asList(
                new Employee(1, "Ahmet", "Can"),
                new Employee(2, "Filiz", "Tepe"),
                new Employee(3, "Erdi", "Yıldırım"),
                new Employee(4, "Hatice", "Gezen"),
                new Employee(5, "Zeynep", "Katran"));
    }

}
