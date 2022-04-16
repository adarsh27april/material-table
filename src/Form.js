import React, { useState } from 'react'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Controller from '@mui/material/Button';
import {
    Typography,
    Box,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from "@mui/material/";
// import {
//     useForm,
//     Controller,
//     FormProvider,
//     useFormContext,
// } from "react-hook-form";

const url = 'http://localhost:8430/students';

const Form = () => {

    const [Err, setErr] = useState(null)
    const [Student, setStudent] = useState(
        {
            firstName: '',
            lastName: '',
            cgpa: '',
            id: '',
            year: ''
        }
    )

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudent({ ...Student, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(url)
        fetch(`${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Student)
        })
            .then(async (res) => {
                if (!res.ok) {
                    const { msg } = await res.json();
                    console.log('handleErrors-> msg: ', msg)
                    setErr(msg)
                    throw Error(msg);
                }
                return res.json();
            })
            .then((data) => {
                console.log("data: ", data);
            })
            .catch((err) => {
                console.log("err", err)

            })
    }

    return (
        <div>

            <Box component="form" noValidate autoComplete="off"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            >
                <TextField name="firstName" id="standard-basic" label="First Name" variant="standard"
                    value={Student.firstName} onChange={handleChange} />

                <TextField name="lastName" id="standard-basic" label="Last Name" variant="standard"
                    value={Student.lastName} onChange={handleChange} />

                <TextField name="id" id="standard-basic" label="ID" variant="standard"
                    value={Student.id} onChange={handleChange} />

                <TextField name="year" id="standard-basic" label="Year" variant="standard"
                    value={Student.year} onChange={handleChange} />

                <TextField name="cgpa" id="standard-basic" label="CGPA" variant="standard"
                    value={Student.cgpa} onChange={handleChange} />

                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>

            {/* <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                    <TextField
                        id="first-name"
                        label="First Name"
                        variant="outlined"
                        placeholder="Enter Your First Name"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            />

            <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                    <TextField
                        id="last-name"
                        label="Last Name"
                        variant="outlined"
                        placeholder="Enter Your Last Name"
                        fullWidth
                        margin="normal"
                        {...field}
                    />
                )}
            /> */}
        </div>
    )
}

export default Form