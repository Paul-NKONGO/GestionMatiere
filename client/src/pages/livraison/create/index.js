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
import { useState } from 'react'
import Link from 'next/link'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/StepperAlternativeLabel'
function Create() {
    const [values, setValues] = useState({
        groupName:"",
        groupDescription:"",
        criticalQuantity:""
      })
    
      const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value })
      }
    
      const handleSubmitProfil = (e)=>{
        e.preventDefault()
        console.log(values);
      }
      
    return ( 
        <div>
            <Card>
                <CardHeader title='Groupe materiel' />
                <CardContent>
                    <form onSubmit={handleSubmitProfil}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                value={values.groupName}
                                onChange={handleChange}
                                name='groupName'
                                fullWidth label='Groupe Name' />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name='groupDescription'
                            value={values.groupDescription}
                            onChange={handleChange}
                            type='text'
                            label='Description'
                            helperText='Entrer la description du groupe'
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.criticalQuantity}
                                onChange={handleChange}
                                name='criticalQuantity'
                                fullWidth label='Critical Quantity' />
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
                            create
                            </Button>
                            
                        </Box>
                        </Grid>
                    </Grid>
                    </form>
                </CardContent>
            </Card>
            <Grid item xs={12}>
                <StepperAlternativeLabel />
            </Grid>
        </div>
     );
}

export default Create;