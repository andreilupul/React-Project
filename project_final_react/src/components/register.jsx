import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Error Mesage.
    const [isReg, setIsReg] = useState(false);


    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorBirthdate, setErrorBirthdate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    async function handleClick() {
        setErrorMessage(""); // Reset error message.
        if (!isReg) {
            setIsReg(true);

 // Basic email validation.
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 //Errors Validation.
            if(!firstName.trim()){
                setErrorFirstName("First Name is required")
                setIsReg(false);
            }else(setErrorFirstName(""))

            if(!lastName.trim()){
                setErrorLastName("Last Name is required")
                setIsReg(false);  
            }else(setErrorLastName(""))

            if(!birthdate.trim()){
                setErrorBirthdate("Birthdate is required")
                setIsReg(false);  
            }else(setErrorBirthdate(""))

            if(!email.trim()){
                setErrorMessage("Email is required")
            }else if (!emailRegex.test(email)) {
                setErrorMessage("Invalid email format");
                setIsReg(false);
            }else(setErrorMessage(""))

            if(!password.trim()){
                setErrorPassword("Password is required")
                setIsReg(false);
                return;
            }else if (password.length < 6) {
                setErrorPassword("Password should be at least 6 characters");
                setIsReg(false)
            }else(setErrorPassword(""))

            await doCreateUserWithEmailAndPassword(email, password)
                .then(async (user) => {
                    await setDoc(
                        doc(db, "users", user.user.uid),
                        { firstName, lastName, birthdate, email, password }
                    );
                    setIsReg(false);
                    setFirstName("");
                    setLastName("");
                    setBirthdate("");
                    setEmail("");
                    setPassword("");
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage(error.message);
                    setIsReg(false);
                });
        }}//End of Validation Function.

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

//HTML and JS
    return (

        <Box sx={{ maxWidth: 300, margin: 'auto', border: '2px solid black', padding: 3 }}>
            <Typography variant="h4" component="h4" gutterBottom>
                Registration Form
            </Typography>

            <TextField
                required
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ marginBottom: 2, width: '250px' }}
                error={Boolean(errorFirstName)}
                helperText={errorFirstName}




            />
            <TextField
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ marginBottom: 2, width: '250px' }}
                error={Boolean(errorLastName)}
                helperText={errorLastName}
                
            />
            <TextField
                required
                id="birthdate"
                label="Birthdate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                sx={{ marginBottom: 2, width: '250px' }}
                error={Boolean(errorBirthdate)}
                helperText={errorBirthdate}
            />
            <TextField
                required
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2, width: '250px' }}
                error={Boolean(errorMessage)}
                helperText={errorMessage}
            />
            <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 2, width: '250px' }}
                error={Boolean(errorPassword)}
                helperText={errorPassword}
            />
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{ marginBottom: 2, width: '250px' }}
                disabled={isReg}
            >
                Register
            </Button>
            <Typography variant="body2">
                Aveți cont? <Link to="/login">Login</Link>
            </Typography>
        </Box>
    );
}

export default Register;



//Notite:
//Am facut validarile dar nu am reusit sa vad de unde vine validarea pe password de la Firebase.
