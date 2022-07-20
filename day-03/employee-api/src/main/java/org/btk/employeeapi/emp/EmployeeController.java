package org.btk.employeeapi.emp;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public Employee createOneEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    // ./api/employees/id : id : * PathVariable
    // ./api/employees?id={id} : RequestParam

    @GetMapping("/{id}")
    public Employee getOneEmployee(@PathVariable int id) {
        Optional<Employee> emp = employeeRepository.findById(id);
        if (emp.isPresent()) {
            return emp.get();
        }
        throw new RuntimeException(String.format("Employee with %s id could not found.", id));
    }

    @PutMapping("/{id}")
    public Employee updateOneEmployee(@PathVariable(name = "id", required = true) int id,
            @RequestBody Employee employee) {
        Employee emp = employeeRepository.findById(id).orElse(null);

        if (emp != null) {
            emp.setFirstName(employee.getFirstName());
            emp.setLastName(employee.getLastName());
            return employeeRepository.save(emp);
        }

        throw new RuntimeException("Employe is not exists!");
    }

    // ./employees/id
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable("id") int id) {
        employeeRepository.deleteById(id);
    }

    // [DELETE]./employees?id={id}
       @DeleteMapping
    public void deletedEmployee(@RequestParam(name="id") int id){
        Employee emp = employeeRepository.findById(id).orElse(null);

        if(emp!=null){
            employeeRepository.delete(emp);
            return;
        }
        throw new RuntimeException("Employee could not found");
    }

}
