import { Button, Stack, TextField } from '@mui/material';
import React, {useState} from 'react'
import EmployeeService from '../services/EmployeeService'

export default function EmployeeAdd({setRefresh, refresh}) {
  
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
      setRefresh(!refresh);
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
    <Stack direction="column" spacing={2} sx={{m:2}}>
     
     <TextField name="firstName" 
     onChange={(e) => onFirstNameChange(e)}
     placeholder='firstName' />

     <TextField name="lastName" 
     onChange = {(e) => onLastNameChange(e)} 
     placeholder='lastName' 
     />
     
     <Button variant='contained' onClick={() => handleAdd()} >Add </Button>
    
    </Stack>
     
    </div>
  )
}
