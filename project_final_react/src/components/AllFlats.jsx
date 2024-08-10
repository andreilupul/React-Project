import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


function AllFlats() {
    const [flats, setFlats] = useState([]);

    useEffect(() => {
        const fetchFlats = async () => {
            const flatsCollection = collection(db, 'flats');
            const flatsSnapshot = await getDocs(flatsCollection);
            const flatsList = flatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFlats(flatsList);
        };

        fetchFlats();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>Stret Name</TableCell>
                        <TableCell>Street Number</TableCell>
                        <TableCell>Area Size</TableCell>
                        <TableCell>Ac</TableCell>
                        <TableCell>Year Built</TableCell>
                        <TableCell>Rent Price $</TableCell>
                        <TableCell>Date Available</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flats.map(flat => (
                        <TableRow key={flat.id}>
                            <TableCell>{flat.city}</TableCell>
                            <TableCell>{flat.streetName}</TableCell>
                            <TableCell>{flat.streetNumber}</TableCell>
                            <TableCell>{flat.areaSize}</TableCell>
                            <TableCell>{flat.ac}</TableCell>
                            <TableCell>{flat.yearBuilt}</TableCell>
                            <TableCell>{flat.rentPrice}</TableCell>
                            <TableCell>{flat.dateAvailable}</TableCell>
                            <TableCell>
                                <Button variant="outlined">Favorite</Button>
                                <Button variant="outlined" color="error">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AllFlats;

