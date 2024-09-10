// ** React Imports
import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { CreateDivision } from 'src/service/divisionService'
import toast from 'react-hot-toast'

function Division() {
      // ** States
  /*const [values, setValues] = useState({
    privilege:"",
    description:""
  })*/

  const [values, setValues] = useState({
    name: '',
    acronym: '',
    status: '',
    level:''
  })
  
  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  


  const handleSubmitDivision = (e)=>{
    e.preventDefault()
    console.log(values);
    CreateDivision(values)
        .then(res =>{
            if(res.error){
                console.log(res.error)
                console.log("an error on submit")
                toast.error("an error on submit")
            }else{
                console.log("success")
                toast.success("success")
            }
        } )
  }

    return ( 
        <div>
            
            <Card>
                <CardHeader title='Division' />
                <CardContent>
                    <form onSubmit={handleSubmitDivision}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                            <TextField
                                value={values.name}
                                onChange={handleChange}
                                name='name'
                                fullWidth label='Name'
                                required
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name='acronym'
                                value={values.acronym.toUpperCase()}
                                onChange={handleChange}
                                type='text'
                                label='Acronym'
                                required
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                value={values.status}
                                onChange={handleChange}
                                name='status'
                                fullWidth label='Status'
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name='level'
                                value={values.level}
                                onChange={handleChange}
                                type='number'
                                label='Level'
                            />
                            </Grid>
                            
                            <Grid item xs={12}>
                            <Box
                                sx={{
                                gap: 5,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                                }}
                            >
                                <Button type='submit' variant='contained' size='large'>
                                create division
                                </Button>
                                
                            </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div> 
    );
}

export default Division;