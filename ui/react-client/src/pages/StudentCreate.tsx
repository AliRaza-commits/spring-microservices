import { Alert, Box, Button, Card, CardContent, Divider, Grid, Grid2, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import { fetchCall } from "../helpers/fetchCall";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface StudentProp  {
    type: string
};

const StudentCreate = ({ type }: StudentProp ) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    const [creating,setCreating] = useState(false);
    const [updating,setUpdating] = useState(false);
    
    const navigate = useNavigate();
    const { id }  = useParams();
    const [data, setData] = useState([]);

    interface studentchema {
        firstName: string,
        lastName: string,
        email: string
    }

    useEffect(() => {
        let isMounted = true;
        const newData = async() => {
            try {
                const url = process.env.REACT_APP_GATEWAY_URL+'/api/v1/students/create';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                };
                
                const body = JSON.stringify(form?.values);
                const response = await fetchCall('post',url,headers,body);
             
                if (isMounted) {
                    setIsSuccess(true);
                    navigate('/student');
                }
    
               } catch(error) {
                if (isMounted) setIsSuccess(false);
               } finally {
                if (isMounted) {
                    setCreating(false);
                    setLoading(false);
                }
               
               }
        }

        if(creating) {
            newData();
        }

        return () => {
            isMounted = false;
        }
    },[creating]);

    useEffect(() => {
        let isMounted = true;
          
        const updateData = async () => {
            try {
                  const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                  };
                  const body = JSON.stringify(form.values);
                  const result = await fetchCall('put', `${process.env.REACT_APP_GATEWAY_URL}/api/v1/students/edit/${id}`,
                    headers,
                    body
                  )

                  console.log(result);
                  if (isMounted) {
                    setData(result.content);
                    setIsSuccess(true);
                  }
    
            } catch(error) {
                if (isMounted) {
                    console.log(error);
                    setIsSuccess(false);
                }
                
            } finally {
                if (isMounted) {
                    setUpdating(false);
                    setLoading(false);
                }
            }
        }

        if (updating) {
            updateData();
        }

        return () => {
            isMounted = false;
        }
    
    },[updating]);


    useEffect(() => {
        const showData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_GATEWAY_URL}/api/v1/students/view/${id}`,{
                    method: 'get',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
                  });

                const result = await response.json();
                form.setFieldValue('firstName', result?.firstName ?? '');
                form.setFieldValue('lastName', result?.lastName ?? '');
                form.setFieldValue('email', result?.email ?? '');

            } catch(error) {
                console.log(error);
            }
        }

        if (type == 'edit') {
            showData();
        }
    },[]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required').min(3),
        lastName: Yup.string().required('Last Name is required').min(3),
        email: Yup.string().required('Email is required').min(6)
    });

    const form = useFormik<studentchema>({
        initialValues:  {
            firstName: '',
            lastName: '',
            email: ''
        },
        validationSchema,
        onSubmit: async () => {
        if (type == 'edit') {
         setUpdating(true);
        } else {
           setCreating(true);
        }
        }
    })

    return (
        <Box sx={{
            justifyContent: 'center',
            display: 'flex',
            p: 3
        }}>
            <Card elevation={3}>
                <CardContent>
                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Typography sx={{ textAlign: 'center', alignItems: 'center' }} variant="h5">Student</Typography>
                    <Button variant="contained" onClick={() => navigate('/student')} >List</Button>
                    </Grid>
                    
                    {isSuccess && (
                    <Alert severity="success">Record saved Successfully</Alert>
                    )}
                    <Divider sx={{ mb: 2 }} />
                    <form onSubmit={form.handleSubmit}>
                        <Grid spacing={3} container sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} >
                                <TextField
                                id="firstName"
                                name="firstName"
                                label="firstName"
                                fullWidth
                                value={form.values.firstName}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.firstName && Boolean(form.errors.firstName)}
                                helperText={form.touched.firstName && form.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                id="lastName"
                                name="lastName"
                                label="lastName"
                                fullWidth
                                value={form.values.lastName}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.lastName && Boolean(form.errors.lastName)}
                                helperText={form.touched.lastName && form.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                id="email"
                                name="email"
                                label="email"
                                fullWidth
                                value={form.values.email}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.email && Boolean(form.errors.email)}
                                helperText={form.touched.email && form.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                type="submit"
                                disabled={form.isSubmitting}
                                sx={{ width: '100%' }} 
                                color="primary"
                                variant="contained">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default StudentCreate;