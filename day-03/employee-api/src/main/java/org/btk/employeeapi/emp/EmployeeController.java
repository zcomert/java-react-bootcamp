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
    public EmployeeController(EmployeeRepository _employeeRepository) {
        employeeRepository = _employeeRepository;

    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

}
