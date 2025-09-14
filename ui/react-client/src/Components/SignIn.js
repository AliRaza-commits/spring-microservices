// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import axios from 'axios';

// const SinIn = ()=>{
//   const [emailError, setEmailError] = React.useState(true);
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
//   const [passwordError, setPasswordError] = React.useState(true);
//   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const handleSubmit = () => {
//    if(isValid()) {
//     loginCheck();
//    }
//   }

//   React.useEffect( () => {
//     if (!emailError && !passwordError) {
//       const loginCheck = async () => {
//         console.log("reached");
//         await axios.post('http://localhost:9090/realms/book-social-network/protocol/openid-connect/token', {
//           username: email,
//           password: password
//       },{
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(r => r.json())
//       .then(response => {
//         console.log(response);
//       }).catch(error => {
//         console.log(error);
//       });
//       } 

//       loginCheck();
//     }

//   },[emailError,passwordError]);

//   const isValid = () => {
//     setEmailError(false);
//     setPasswordError(false);
//     setEmailErrorMessage('');
//     setPasswordErrorMessage('');

//     if (email.length<5) {
//       console.log("email issue");
//       setEmailError(true);
//       console.log(emailError);
//       setEmailErrorMessage('Please Enter Proper Email');
//     }

//     if (password.length<5) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Please Enter Proper Password');
//     }
//     console.log(emailError);
//     console.log(passwordError);
//     if (emailError || passwordError) {
//       return false;
//     }

//     return true;

//   }

//     const paperStyle={padding :20,height:'70vh',width:280,margin:"19px auto" ,backgroundColor:'#E6F4F1', borderRadius: '12px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 25)'}
//     const avatarStyle={backgroundColor:'#D9D9D9'}
//     const btnstyle={backgroundColor:'#1B6DA1',margin:'12px 0'}
//     const logoStyle={backgroundColor:'#D9D9D9', margin:'10px 0', width: 70, height: 70}

//     return(
//         <Grid>
//            <Paper elavation={12} style={paperStyle}>
//                 <Grid align='center'>
//                     <Avatar style={avatarStyle}></Avatar>
//                     <h2>Login</h2>
//                 </Grid>

//                 <TextField error={emailError} helperText={emailErrorMessage} id="standard-basic" label="Email" onKeyUp={(e) => setEmail(e.target.value)} variant="standard" placeholder='Enter Your Email' fullWidth required/>
//                 <TextField error={passwordError} helperText={passwordErrorMessage} id="standard-basic" label="Passsword" onKeyUp={(e) => setPassword(e.target.value)}
//                  variant="standard" placeholder='Enter Your Password' type='password' fullWidth required/>
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

//                 <Button style={btnstyle} onClick={handleSubmit} type='submit' color='primary' variant="contained" fullWidth>Login</Button>
//                 <Typography>Don't have an account?
//                     <Link href="#" >
//                         Sign Up Here.
//                     </Link>
//                 </Typography>

//             </Paper>
//         </Grid>
//     )
// }

// export default SinIn;