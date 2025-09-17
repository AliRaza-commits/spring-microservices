import { Alert, Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { fetchCall } from "../helpers/fetchCall";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface SchoolProp  {
    type: string
};

const SchoolCreate = ({ type }: SchoolProp ) => {
    const [isSuccess, setIsSuccess] = useState(false);
   // const [loading,setLoading] = useState(false);
    const [creating,setCreating] = useState(false);
    const [updating,setUpdating] = useState(false);

    const navigate = useNavigate();
    const { id }  = useParams();
    // const [data, setData] = useState([]);

    interface SchoolSchema {
        name: string
    }

        const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(6)
    });

    const form = useFormik<SchoolSchema>({
        initialValues:  {
            name: ''
        },
        validationSchema,
        onSubmit: async () => {
        if (type === 'edit') {
           setUpdating(true);
        } else {
            setCreating(true);
        }
        }
    })

    useEffect(() => {
        let isMounted = true;
        const newData = async() => {
            try {
                const url = process.env.REACT_APP_GATEWAY_URL+'/api/v1/schools/create';
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                };

                const body = JSON.stringify(form?.values);
                await fetchCall('post',url,headers,body);

                if (isMounted) {
                    setIsSuccess(true);
                    navigate('/school');
                }

               } catch(error) {
                if (isMounted) setIsSuccess(false);
               } finally {
                if (isMounted) {
                    setCreating(false);
                 //   setLoading(false);
                }

            }
        }

        if(creating) {
            newData();
        }

        return () => {
            isMounted = false;
        }
    },[creating,form.values, navigate]);

    useEffect(() => {
        let isMounted = true;

        const updateData = async () => {
            try {
                  const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                  };
                  const body = JSON.stringify(form.values);
                  await fetchCall('put', `${process.env.REACT_APP_GATEWAY_URL}/api/v1/schools/edit/${id}`,
                    headers,
                    body
                  )

                  if (isMounted) {
                    // setData(result.content);
                    setIsSuccess(true);
                  }

            } catch(error) {
                if (isMounted) {
                    setIsSuccess(false);
                }

            } finally {
                if (isMounted) {
                    setUpdating(false);
                 //   setLoading(false);
                }
            }
        }

        if (updating) {
            updateData();
        }

        return () => {
            isMounted = false;
        }
    },[updating,form.values,id]);


    useEffect(() => {
        const showData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_GATEWAY_URL}/api/v1/schools/view/${id}`,{
                    method: 'get',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
                  });

                const result = await response.json();
                form.setFieldValue('name', result?.name ?? '');

            } catch(error) {
                console.log(error);
            }
        }

        if (type === 'edit') {
            showData();
        }
    },[id,form,type, navigate,form.values]);

    return (
        <Box sx={{
            justifyContent: 'center',
            display: 'flex',
            p: 3
        }}>
            <Card elevation={3}>
                <CardContent>
                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                    <Typography sx={{ textAlign: 'center', alignItems: 'center' }} variant="h5">School</Typography>
                    <Button variant="contained" onClick={() => navigate('/school')} >List</Button>
                    </Grid>

                    {isSuccess && (
                    <Alert severity="success">Record saved Successfully</Alert>
                    )}
                    <Divider sx={{ mb: 2 }} />
                    <form onSubmit={form.handleSubmit}>
                        <Grid spacing={3} container sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} >
                                <TextField
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                value={form.values.name}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.name && Boolean(form.errors.name)}
                                helperText={form.touched.name && form.errors.name}
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

export default SchoolCreate;