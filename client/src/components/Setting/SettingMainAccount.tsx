import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { TaskPersonData } from "../../utility/models";

export default function SettingMainAccount() {
  const [personData, setPersonData] = useState<TaskPersonData>({
    avatar: "",
    name: "",
    position: "",
    email: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const key: string = event.target.name;
    const value: string = event.target.value;
    setPersonData({ ...personData, [key]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleCancel() {
    const resetData: TaskPersonData = {
      avatar: "",
      name: "",
      position: "",
      email: "",
    };
    setPersonData(resetData);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "1.3rem",
        height: "100%",
      }}
    >
      <Box component="div">
        <Typography gutterBottom variant="h5" component="div">
          Accaunt Settings
        </Typography>
      </Box>
      <Box component="div" sx={{ display: "flex", gap: "1.3rem" }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
            width: "50%",
          }}
        >
          <TextField
            label="Name"
            name="name"
            type="text"
            value={personData.name}
            onChange={handleChange}
            required
            helperText="Please fill your full name here."
          />
          <TextField
            label="Avatar"
            name="avatar"
            type="text"
            value={personData.avatar}
            onChange={handleChange}
            required
            helperText="Please copy here your link into your avatar."
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
            width: "50%",
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={personData.email}
            onChange={handleChange}
            required
            helperText="Please fill your email here."
          />
          <TextField
            label="Position"
            name="position"
            type="text"
            value={personData.position}
            onChange={handleChange}
            required
            helperText="Please fill your position here."
          />
        </Box>
      </Box>
      <Box sx={{ height: "100%" }}></Box>
      <Box component="div" sx={{ display: "flex", gap: "1.3rem" }}>
        <Button variant="outlined" size="large" type="submit">
          Update
        </Button>
        <Button
          variant="outlined"
          size="large"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}