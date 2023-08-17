import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export default function PageNavigator() {
    const [page, setPage] = useState<string>("/task/mail")
    const router = useRouter();

    useEffect(() => {
        setPage(router.asPath)
    }, [router]);

    const handleChange = (event: SelectChangeEvent) => {
        router.push(event.target.value as string);
      };

  return (
    <Box sx={{ width: "12rem", marginBottom: "1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Task Type</InputLabel>
        <Select
          value={page}
          label="Task Type"
          onChange={handleChange}
        >
          <MenuItem value={"/task/mail"}>Mail Tasks</MenuItem>
          <MenuItem value={"/task/document"}>Document Tasks</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
