import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, ListItemAvatar } from "@mui/material";

export default function AuthorList({ authors }) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label='secondary mailbox folders'>
        <List>
          {authors.map((author) => {
            const { id, firstName, lastName } = author;
            return (
              <ListItem key={id}>
                <ListItemAvatar>
                  <Avatar alt={`${firstName} ${lastName}`} src={`/authors/${id}.jpg`} />
                </ListItemAvatar>
                <ListItemButton>
                  <ListItemText primary={`${firstName} ${lastName}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
