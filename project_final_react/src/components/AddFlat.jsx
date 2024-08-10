import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


function AddFlat() {

    const [value] = useState('off'); // Starea inițială
    const [flatData, setFlatData] = useState({
        city: '',
        streetName: '',
        streetNumber: '',
        areaSize: '',
        ac: '',
        yearBuilt: '',
        rentPrice: '',
        dateAvailable: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlatData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const flatsCollection = collection(db, 'flats');
            await addDoc(flatsCollection, flatData);
            navigate('/all-flats');
        } catch (error) {
            console.error("Error adding flat: ", error);
        }

    };

    return (
        <Container>
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
                            <TableCell>Save</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField name="city" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <TextField name="streetName" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <TextField name="streetNumber" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <TextField name="areaSize" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <ToggleButtonGroup
                                    value={value}
                                    exclusive
                                    onChange={handleChange}
                                    aria-label="Toggle Button"
                                >
                                    <ToggleButton value="on">ON</ToggleButton>
                                    <ToggleButton value="off">OFF</ToggleButton>
                                </ToggleButtonGroup>

                            </TableCell>
                            <TableCell>
                                <TextField name="yearBuilt" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <TextField name="rentPrice" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <TextField name="dateAvailable" onChange={handleChange} />
                            </TableCell>
                            <TableCell>
                                <Button onClick={handleSubmit}>Save</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AddFlat;
