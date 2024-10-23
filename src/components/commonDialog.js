import React, { useEffect, useState } from 'react';
import '../DisplayCip.css'; // Import CSS specific to DisplayPort component
import axios from 'axios';
import Close from './icon/close';

import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function CommonDialog({ open, appSelector, maxWidth, handleClose }) {

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                fullWidth
                maxWidth={maxWidth}
            >

                <DialogTitle id="dialog-title">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ flexGrow: '1' }}></Box>
                        {/* <S.TextCss>{dialogTitle}</S.TextCss> */}
                        <div
                            onClick={handleClose}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'lightgray',
                                borderRadius: '50%',
                                padding: '3px',
                                height: '30px'
                            }}
                        >
                            <Close
                                fill='black'
                                width='18px'
                                height='18px'
                            />
                        </div>
                    </Box>

                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="dialog">
                        {appSelector}
                    </DialogContentText>
                </DialogContent>

            </Dialog>
    );
}

export default CommonDialog;