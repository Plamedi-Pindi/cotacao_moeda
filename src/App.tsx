import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import './App.css'

function App() {

  return (
    <>
      <p className='text-red-400'>Teste</p>
      <Button variant="contained">Hello world</Button>

      <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            },
          }}
        />
    </>
  )
}

export default App
