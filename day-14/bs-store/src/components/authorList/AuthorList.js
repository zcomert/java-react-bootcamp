import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
export default function AuthorList({ authors }) {
  return (
    <AvatarGroup max={4}>
      {authors.map((author) => {
        const { id, firstName, lastName, email } = author;
        return (
          <Tooltip key={id} title={`${firstName} ${lastName}`}>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={`/authors/${id % 20}.jpg`}
            />
          </Tooltip>
        );
      })}
    </AvatarGroup>
  );
}
