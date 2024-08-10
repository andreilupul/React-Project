import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';

function FavoriteFlats() {
    const { currentUser } = useAuth();
    const [flats, setFlats] = useState([]);

    useEffect(() => {
        const fetchFavoriteFlats = async () => {
            const flatsCollection = collection(db, 'flats');
            const q = query(flatsCollection, where('favorites', 'array-contains', currentUser.uid));
            const flatsSnapshot = await getDocs(q);
            const flatsList = flatsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFlats(flatsList);
        };

        fetchFavoriteFlats();
    }, [currentUser.uid]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>Street Name</TableCell>
                        <TableCell>Street Number</TableCell>
                        <TableCell>Area Size</TableCell>
                        <TableCell>Has AC</TableCell>
                        <TableCell>Year Built</TableCell>
                        <TableCell>Rent Price</TableCell>
                        <TableCell>Date Available</TableCell>
                    </TableRow>
                </TableHead>
                {/* <TableBody>
                    {flats.map(flat => (
                        <TableRow key={flat.id}>
                            <TableCell>{flat.id}</TableCell>
                            <TableCell>{flat.fullName}</TableCell>
                            <TableCell>{flat.senderEmail}</TableCell>
                            <TableCell>{flat.content}</TableCell>
                            <TableCell>{flat.receiverUid}</TableCell>
                            <TableCell>{flat.flats}</TableCell>
                            <TableCell>{flat.timestamp.toDate().toLocaleString()}</TableCell>
                            <TableCell>
                                <Button variant="outlined">Remove Favorite</Button>
                                <Button variant="outlined" color="error">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> */}
            </Table>
        </TableContainer>
    );
}

export default FavoriteFlats;

