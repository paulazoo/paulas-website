import React, {useState, useEffect, createRef} from 'react';
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

import avocado from './avocado.png';

const randomQuestion = () => {
    const num1 = Math.ceil(Math.random() * 100);
    const num2 = Math.ceil(Math.random() * 100);
    const questionString = num1.toString()+ ' x ' + num2.toString();
    const correctAnswer = num1 * num2;
    return [questionString, correctAnswer];
}

export default function MultiplyGame() {
    const navigate = useNavigate();
    const textInput = createRef();

    const [answer, setAnswer] = useState('');
    const [[questionString, correctAnswer], setQuestion] = useState(['', 1]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUnsuccess, setShowUnsuccess] = useState(false);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [averageTime, setAverageTime] = useState(null);
    const [lastProblemTime, setLastProblemTime] = useState(0);
    const [showReward, setShowReward] = useState(false);

    useEffect(() => {
        setQuestion(randomQuestion());
    }, [])

    const startTime = Date.now();
    const getTime = (startTime) => {
        const time = Date.now() - startTime;
        setSeconds(Math.floor(time / 1000));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(startTime), 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        console.log(Number(answer));
        if (Number(answer) == correctAnswer) {
            setShowSuccess(true);
            setShowUnsuccess(false);
            setAnswer('');
            if (totalCorrect == 2) {
                setShowReward(true);
            }
            setTotalCorrect(totalCorrect + 1);
            setLastProblemTime(seconds)
            setQuestion(randomQuestion());
            textInput.current.focus();
        } else {
            setShowUnsuccess(true);
            setShowSuccess(false);
            textInput.current.focus();
        }
    };

    useEffect(() => {
        function handleKeyDown(e) {
          if (e.keyCode == 13) {
            handleSubmit(e);
          }
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Don't forget to clean up
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
    }, [answer]);

    useEffect(() => {
        setAverageTime(seconds/totalCorrect);
    }, [totalCorrect])

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

    const handleRewardSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setShowReward(false);
    };

    return (
        <>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            open={showSuccess}
            autoHideDuration={500}
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
            autoHideDuration={500}
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
        <Snackbar
            anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
            open={showReward}
            autoHideDuration={1000}
            onClose={handleRewardSnackbarClose}
            message='You earned an avocado!'
        />
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
                <Grid item xs={4}>
                    <Typography color='secondary'>
                        Total Correct: {totalCorrect}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography color='secondary'>
                        Time: {seconds - lastProblemTime}s
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography color='secondary'>
                        Average Time: {(totalCorrect>0)? averageTime:null}s
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
                    autoFocus
                    inputRef={textInput} 
                    sx={{ input: { fontWeight: 'bold' } }}
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
                {(totalCorrect > 2)? <Grid item xs={2}>
                    <img src={avocado} alt=""/>
                </Grid>:null}
            </Grid>
        </Box>
        </>
    );
}