// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
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
import { MenuItem, Select } from '@mui/material'
import { status } from 'nprogress'
import { CreateUser } from 'src/service/userService'
import toast from 'react-hot-toast'


export const getStaticProps = async () => {
    const res = await fetch(`http://localhost:5001/api/division`,{
      headers :{
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    return {
      props: {
        data: data,
      }
    }
  }
  
function User({data}) {

    // ** States
    const [division, setDivision] = useState(data)
    const [profile, setProfil] = useState(['PERSONNEL', 'COMPTABLE MATIERE', 'DIRECTEUR GENERAL', 'ADMINISTRATEUR' ])
    const [values, setValues] = useState({
        registrationNumber: '',
        lastName: '',
        firstName: '',
        email: '',
        function: '',
        phone: '',
        password: '',
        divisionId:''
  })

  const [confirmPassValues, setConfirmPassValues] = useState({
        password: '',
        showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmPassChange = prop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }
  
  const handleSubmitUser = (e)=>{
    e.preventDefault()
    console.log(values);
    CreateUser(values)
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
                <CardHeader title='Create User' />
                <CardContent>
                    <form onSubmit={handleSubmitUser}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    value={values.registrationNumber}
                                    onChange={handleChange("registrationNumber")} 
                                    fullWidth label='registration number'
                                    placeholder=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={values.firstName}
                                    onChange={handleChange("firstName")} 
                                    fullWidth label='First Name' 
                                    placeholder=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={values.lastName}
                                    onChange={handleChange("lastName")} 
                                    fullWidth label='Last Name'
                                    placeholder=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={values.phone}
                                    onChange={handleChange("phone")} 
                                    type='number'
                                    fullWidth label='Phone number'
                                    placeholder='xxx xxx xxx'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    value={values.email}
                                    onChange={handleChange("email")} 
                                    type='email'
                                    label='Email'
                                    placeholder=''
                                    helperText='You can use letters, numbers & periods'
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={values.function}
                                    onChange={handleChange("function")} 
                                    fullWidth label='function'
                                    placeholder=''
                                />
                            </Grid>
                            <Grid item xs={12} className='d-flex'>
                                <FormControl className='w-100'>
                                    <InputLabel id='demo-simple-select-outlined-label'>Division</InputLabel>
                                    <Select
                                    label='Division'
                                    value={values.divisionId}
                                    onChange={handleChange("divisionId")} 
                                    id='demo-simple-select-outlined'
                                    labelId='demo-simple-select-outlined-label'
                                    required
                                    >
                                        {division.map(e=>(
                                            <MenuItem value={e.acronym}>
                                                {e.acronym}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className='w-100'>
                                    <InputLabel id='demo-simple-select-outlined-label'>Profile</InputLabel>
                                    <Select
                                    label='Profile'
                                    value={values.profile}
                                    onChange={handleChange("profile")} 
                                    id='demo-simple-select-outlined'
                                    labelId='demo-simple-select-outlined-label'
                                    required
                                    >
                                        {profile.map(e=>(
                                            <MenuItem value={e}>
                                                {e}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                                <OutlinedInput
                                label='Password'
                                value={values.password}
                                id='form-layouts-basic-password'
                                onChange={handleChange('password')}
                                type={values.showPassword ? 'text' : 'password'}
                                aria-describedby='form-layouts-basic-password-helper'
                                required
                                endAdornment={
                                    <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={e => e.preventDefault()}
                                        aria-label='toggle password visibility'
                                    >
                                        <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                    </IconButton>
                                    </InputAdornment>
                                }
                                />
                                <FormHelperText id='form-layouts-basic-password-helper'>
                                Use 8 or more characters with a mix of letters, numbers & symbols
                                </FormHelperText>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                                <OutlinedInput
                                label='Confirm Password'
                                value={confirmPassValues.password}
                                id='form-layouts-confirm-password'
                                onChange={handleConfirmPassChange('password')}
                                aria-describedby='form-layouts-confirm-password-helper'
                                type={confirmPassValues.showPassword ? 'text' : 'password'}
                                required
                                endAdornment={
                                    <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                        onClick={handleClickConfirmPassShow}
                                        onMouseDown={e => e.preventDefault()}
                                        aria-label='toggle password visibility'
                                    >
                                        <Icon icon={confirmPassValues.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                    </IconButton>
                                    </InputAdornment>
                                }
                                />
                                <FormHelperText id='form-layouts-confirm-password-helper'>
                                Make sure to type the same password as above
                                </FormHelperText>
                            </FormControl>
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
        </div>
     );
}

export default User;