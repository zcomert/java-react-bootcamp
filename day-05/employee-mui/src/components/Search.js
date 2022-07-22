import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Search() {
  return (
    <Box
      sx={{
        m:2,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Search" id="fullWidth" />
    </Box>
  );
}
