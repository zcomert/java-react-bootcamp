import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function AuthorList({authors}) {
    
  return (
    <AvatarGroup max={4}>
        {
            authors.map((author) => {
                const {id, firstName, lastName, email}  = author;
                return(
                    <Avatar alt={`${firstName} ${lastName}`} 
                    src={`/authors/${id%20}.jpg`} />

                )
            })
        }
     
    </AvatarGroup>
  );
}
