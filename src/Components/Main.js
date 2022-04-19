import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { toaster } from 'evergreen-ui';
import Modal from '@mui/material/Modal';

export default function Main() {

    const[questions,setQuestions] = useState([]);
    const[currques,setCurrques] = useState("");
    const[answers,setAnswers] = useState([]);
    const[currans,setCurrans] = useState("");
    const[quesno,setQuesno] = useState(0);
    const [open, setOpen] = useState(false);
    const[currscore,setCurrscore] = useState(0);
    const[hasEnded,setHasEnded] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    useEffect(()=>{
        (async function getQuestions()
        {
            let n=0;
            try{
                const response=await axios.get("https://quiz-app39-default-rtdb.firebaseio.com/results.json");
                setQuestions(response.data);
                n=Object.keys(response.data).length;
                if(n!=0)
                {
                    let i=0;
                    setCurrques(response.data[i].question);
                    setAnswers(response.data[i].answers);
                    setCurrans(response.data[i].correct_answer);
                    setQuesno(i);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        })();
    },[])

    function changeQuestion()
    {
        let i=quesno+1;
        if(i==Object.keys(questions).length)
        {
            setHasEnded(true);
            setOpen(true);
            setCurrques("");
            setAnswers([]);
            setCurrans("");
            setQuesno(0);
            return;
        }
        let cur_obj=questions[i];
        setCurrques(cur_obj.question);
        setAnswers(cur_obj.answers);
        setCurrans(cur_obj.correct_answer);
        setQuesno(quesno+1);
        
    }

    function handleClick1(e)
    {
        e.preventDefault();
        if(answers[0]==currans)
        {
            setCurrscore(currscore+1);
            toaster.success('Correct Answer');
        }
        else
        {
            toaster.danger('Wrong Answer');
        }
        changeQuestion();
    }

    function handleClick2(e)
    {
        e.preventDefault();
        if(answers[1]==currans)
        {
            setCurrscore(currscore+1);
            toaster.success('Correct Answer');
        }
        else
        {
            toaster.danger('Wrong Answer');
        }
        changeQuestion();
    }

    function handleClick3(e)
    {
        e.preventDefault();
        if(answers[2]==currans)
        {
            setCurrscore(prevState => prevState + 1);
            toaster.success('Correct Answer');
        }
        else
        {
            toaster.danger('Wrong Answer');
        }
        changeQuestion();
    }

    function handleClick4(e)
    {
        e.preventDefault();
        if(answers[3]==currans)
        {
            setCurrscore(prevState => prevState + 1);
            toaster.success('Correct Answer');
        }
        else
        {
            toaster.danger('Wrong Answer');
        }
        changeQuestion();
    }



  return (
    <div className="main-div">
        <Card raised={true} elevation={24} sx={{ width:"28%",display:"flex",justifyContent:"space-around",backgroundColor:"#113f67",color:"#fcfefe",borderRadius:"15px"}}>
            {
                hasEnded==false?
                <CardContent sx={{textAlign:"center", display:"flex", flexDirection:"column",flexFlow:"column wrap",alignContent:"flex-start"}}>
                    <h2>Question {quesno+1}</h2>
                    <h4>{currques}</h4>
                </CardContent>
                :
                <CardContent sx={{textAlign:"center", display:"flex", flexDirection:"column",flexFlow:"column wrap",alignContent:"flex-start"}}>
                    <h2>THE END</h2>
                </CardContent>
            }
            {
                hasEnded==false &&
                <CardContent sx={{textAlign:"center", display:"flex", flexDirection:"column",gap:"10px"}}>
                    <Button variant="outlined" sx={{color:"#fcfefe",padding:"8px",borderRadius:"10px"}} onClick={handleClick1}>{answers[0]}</Button>
                    <Button variant="outlined" sx={{color:"#fcfefe",padding:"8px",borderRadius:"10px"}} onClick={handleClick2}>{answers[1]}</Button>
                    <Button variant="outlined" sx={{color:"#fcfefe",padding:"8px",borderRadius:"10px"}} onClick={handleClick3}>{answers[2]}</Button>
                    <Button variant="outlined" sx={{color:"#fcfefe",padding:"8px",borderRadius:"10px"}} onClick={handleClick4}>{answers[3]}</Button>
                </CardContent>
            }
        </Card>
        {
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Quiz has ended
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle1" component="p"><h3>Your Score is {currscore}</h3></Typography>
            </Box>
          </Modal>
        }
    </div>
  )
}
