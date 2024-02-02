import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const randomQuestion = () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const questionString = num1.toString()+ ' x ' + num2.toString();
    const correctAnswer = num1 * num2;
    return [questionString, correctAnswer];
}

export default function MultiplyGame() {
    const navigate = useNavigate();

    const [[questionString, correctAnswer], setQuestion] = useState(['', 0]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUnsuccess, setShowUnsuccess] = useState(false);

    useEffect(() => {
        setQuestion(randomQuestion());
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        playerAnswer: data.get('answer'),
        correctAnswer: correctAnswer
        });
        if (Number(data.get('answer')) == correctAnswer) {
            setShowSuccess(true);
            setShowUnsuccess(false);
            setQuestion(randomQuestion());
        } else {
            setShowUnsuccess(true);
            setShowSuccess(false);
        }
    };


    const handleSuccessSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setShowSuccess(false);
    };

    const handleUnsuccessSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setShowUnsuccess(false);
    };

    return (
        <>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            open={showSuccess}
            autoHideDuration={1000}
            onClose={handleSuccessSnackbarClose}
            message="Correct!"
        > 
            <Alert
            onClose={handleSuccessSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}/>
        </Snackbar>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            open={showUnsuccess}
            autoHideDuration={1000}
            onClose={handleUnsuccessSnackbarClose}
            message="Incorrect."
        >
            <Alert
            onClose={handleUnsuccessSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}/>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" color='secondary'>
                    {questionString}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    fullWidth
                    id="answer"
                    label="Your Answer"
                    name="answer"
                    autoComplete="answer"
                    autoFocus
                    color='secondary'
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color='secondary'
                    >
                        <Typography color='primary'>Submit</Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Link onClick={() => navigate('/')} color='secondary'>
                    Give up and go back to home?
                </Link>
            </Grid>
        </Box>
        </>
    );
}