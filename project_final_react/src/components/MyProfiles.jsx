// // import { getFirestore } from 'firebase/firestore';
// import React, { useState, useEffect } from 'react';
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Typography,
//     Box,
//     Card,
//     CardContent
// } from '@mui/material';
// import { useAuth } from '../contexts/authContext';
// import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '../firebase';



// const MyProfiles = async () => {
//     const { currentUser } = useAuth();
//     const [open, setOpen] = useState(false);
//     const [userData, setUserData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         birthdate: ''
//     });
//     const [editData, setEditData] = useState({});

//     useEffect(() => {
//         if (currentUser) {
//             fetchUserData();
//         }
//     }, [currentUser]);

//     const fetchUserData = async () => {
//         const userDoc = doc(db, 'users', currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//             setUserData(userSnapshot.data());
//         }
//     };

//     const handleEditOpen = () => {
//         setEditData(userData);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleChange = (e) => {
//         setEditData({
//             ...editData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleUpdate = async () => {
//         const userDoc = doc(db, 'users', currentUser.uid);
//         await updateDoc(userDoc, editData);
//         setUserData(editData);
//         handleClose();
//     };

//     const handleDelete = async () => {
//         const userDoc = doc(db, 'users', currentUser.uid);
//         await deleteDoc(userDoc);
//         // Handle user sign-out or navigation here
//     };

//     return (
//         <Box>
//             <Card>
//                 <CardContent>
//                     <Typography variant="h5">Profile</Typography>
//                     <Typography variant="body1">First Name: {userData.firstName}</Typography>
//                     <Typography variant="body1">Last Name: {userData.lastName}</Typography>
//                     <Typography variant="body1">Email: {userData.email}</Typography>
//                     <Typography variant="body1">Birthdate: {userData.birthdate}</Typography>
//                     <Button variant="contained" color="primary" onClick={handleEditOpen}>
//                         Edit Profile
//                     </Button>
//                     <Button variant="contained" color="secondary" onClick={handleDelete}>
//                         Delete Account
//                     </Button>
//                 </CardContent>
//             </Card>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="First Name"
//                         name="firstName"
//                         fullWidth
//                         value={editData.firstName}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Last Name"
//                         name="lastName"
//                         fullWidth
//                         value={editData.lastName}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Email"
//                         name="email"
//                         fullWidth
//                         value={editData.email}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Birthdate"
//                         name="birthdate"
//                         type="date"
//                         fullWidth
//                         InputLabelProps={{ shrink: true }}
//                         value={editData.birthdate}
//                         onChange={handleChange}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleUpdate} color="primary">
//                         Update
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default MyProfiles;

import React from 'react'
import Header from './Header'
import { Button, Toolbar, AppBar, Typography } from "@mui/material";
import { useNavigate, Outlet, Link } from "react-router-dom";


function MyProfiles() {


    return (
        <div>
            <Header />
            <h1> My profiles</h1>
            <Toolbar>

                <Button
                    color="inherit"
                    component={Link}
                    // to="/all-flats"
                    sx={{ color: 'black' }} // Textul butonului în negru
                >
                    Users Profiles
                </Button>
            </Toolbar>
        </div>

    )
}

export default MyProfiles

