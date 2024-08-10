

import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { doSignOut } from '../auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        doSignOut().then(() => {
            navigate('/login');  // Navighează către pagina de login după deconectare
        });
        handleClose();  // Închide modalul după ce utilizatorul a confirmat
    };

    return (
        <div>
            <Button
                style={{
                    backgroundColor: 'red',
                    border: '1px solid black',
                    color: 'black',
                }}
                onClick={handleOpen}
            >
                Logout
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="logout-modal-title"
                aria-describedby="logout-modal-description"
            >
                <div style={{
                    backgroundColor: 'white',  // Fundal alb pentru modal
                    padding: '20px',  // Padding pentru spațiere interioară
                    margin: 'auto',  // Centrare automată a modalului
                    marginTop: '20%',  // Distanta de sus pentru plasare verticală
                    width: '300px',  // Lățimea modalului
                    textAlign: 'center',  // Centrarea textului
                    borderRadius: '8px',  // Colțuri rotunjite pentru aspect modern
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'  // Umbră pentru a adăuga efect de profunzime
                }}>
                    <h2 id="logout-modal-title">Confirmare Logout</h2>
                    <p id="logout-modal-description">Ești sigur că vrei să te deconectezi?</p>
                    <Button
                        onClick={handleLogout}
                        style={{
                            marginRight: '10px',  // Spațiere între butoane
                            backgroundColor: '#007BFF',  // Culoare albastră pentru butonul "Da"
                            color: 'white'  // Text alb pentru contrast
                        }}
                    >
                        Da
                    </Button>
                    <Button
                        onClick={handleClose}
                        style={{
                            backgroundColor: '#6c757d',  // Culoare gri pentru butonul "Nu"
                            color: 'white'  // Text alb pentru contrast
                        }}
                    >
                        Nu
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Logout;



