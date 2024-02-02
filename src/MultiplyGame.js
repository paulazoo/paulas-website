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

    const [answer, setAnswer] = useState('');
    const [[questionString, correctAnswer], setQuestion] = useState(['', 0]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUnsuccess, setShowUnsuccess] = useState(false);
    const [totalCorrect, setTotalCorrect] = useState(0);

    useEffect(() => {
        setQuestion(randomQuestion());
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Number(answer) == correctAnswer) {
            setShowSuccess(true);
            setShowUnsuccess(false);
            setAnswer('');
            setTotalCorrect(totalCorrect + 1);
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
        > 
            <Alert
            onClose={handleSuccessSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}>
                Correct!
            </Alert>
        </Snackbar>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            open={showUnsuccess}
            autoHideDuration={1000}
            onClose={handleUnsuccessSnackbarClose}
        >
            <Alert
            onClose={handleUnsuccessSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}>
                Incorrect.
            </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            marginRight: '20vw',
            marginLeft: '20vw',
            alignItems: 'center',
            align: "center",
            justify: "center"
          }}
        >
            <Grid container spacing={2} align = "center" justify = "center" alignItems = "center">
                <Grid item xs={12}>
                    <Typography color='secondary'>
                        Total Correct: {totalCorrect}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" color='secondary'>
                        <b>{questionString}</b>
                    </Typography>
                </Grid>
                <Grid item xs={0} md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                    fullWidth
                    margin='normal'
                    label="Answer"
                    value={answer}
                    color='secondary'
                    onChange={(event) => {
                        setAnswer(event.target.value);
                    }}
                    />
                </Grid>
                <Grid item xs={0} md={3}></Grid>
                <Grid item xs={0} md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <Button
                    fullWidth
                    variant="contained"
                    color='secondary'
                    onClick={handleSubmit}
                    >
                        <Typography color='primary'>Submit</Typography>
                    </Button>
                </Grid>
                <Grid item xs={0} md={3}></Grid>
                <Grid item xs={12}>
                    <Link onClick={() => navigate('/')} color='secondary'>
                        Give up and go back to home?
                    </Link>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}