package org.btk.employeeapi.emp;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// ./api/employees
@RestController
@RequestMapping("api/employees")
@CrossOrigin
public class EmployeeController {

    // Dependency Injection (DI)
    private final EmployeeRepository employeeRepository;

    // Constructor Injection
    public EmployeeController(EmployeeRepository _employeeRepository) {
        employeeRepository = _employeeRepository;

    }

    // HttpEntity (super class)
    // ResponseEntity / RequestEntity (subclasses)
    @GetMapping
    public HttpEntity<List<Employee>> getAllEmployees() {
        List<Employee> list = employeeRepository.findAll();
        return new ResponseEntity<List<Employee>>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employee> createOneEmployee(@RequestBody Employee employee) {
        Employee emp = employeeRepository.save(employee);
        return new ResponseEntity<Employee>(emp, HttpStatus.CREATED);
    }

    // ./api/employees/id : id : * PathVariable
    // ./api/employees?id={id} : RequestParam

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getOneEmployee(@PathVariable int id) {
        Optional<Employee> emp = employeeRepository.findById(id);
        if (emp.isPresent()) {
            return ResponseEntity.ok(emp.get());
        }
        throw new RuntimeException(String.format("Employee with %s id could not found.", id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOneEmployee(@PathVariable(name = "id", required = true) int id,
            @RequestBody Employee employee) {
        Employee emp = employeeRepository.findById(id).orElse(null);

        if (emp != null) {
            emp.setFirstName(employee.getFirstName());
            emp.setLastName(employee.getLastName());
            return new ResponseEntity<>(employeeRepository.save(emp), HttpStatus.ACCEPTED);
        }
        throw new RuntimeException("Employe is not exists!");
    }

    // ./api/employees/id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable(name = "id") int id) {
        employeeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // [DELETE]./api/employees?id={id}
    @DeleteMapping
    public ResponseEntity<?> deletedEmployee(@RequestParam(name = "id") int id) {
        Employee emp = employeeRepository.findById(id).orElse(null);
        if (emp != null) {
            employeeRepository.delete(emp);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        throw new RuntimeException("Employee could not found");
    }
}