import React, {useState} from 'react'
import EmployeeService from '../services/EmployeeService'

export default function EmployeeAdd() {
  
  const employeeService = new EmployeeService();
  
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');

  const handleAdd = () => {
    const employee = {
      firstName,
      lastName
    }

    employeeService.postOneEmployee(employee).then(resp => {
      console.log(resp);
      
    })

    console.log(employee);
  }

  const onFirstNameChange = (e) => {
    console.log(e.target.value);
    setFirstName(e.target.value);
  }

  const onLastNameChange = (e) => {
    console.log(e.target.value);
    setLastName(e.target.value);
  }

  return (
    <div>
    
     <input name="firstName" 
     onChange={(e) => onFirstNameChange(e)}
     placeholder='firstName' />
     
     <input name="lastName" 
     onChange = {(e) => onLastNameChange(e)} 
     placeholder='lastName' 
     />

     <button onClick={() => handleAdd()} >Add </button>
     <div>
      {firstName} {lastName}
     </div>

    </div>
  )
}
