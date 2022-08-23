import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
<<<<<<< HEAD
import { Button, FormControl, FormHelperText, FormLabel, Grid } from '@mui/material';
import { difficulty } from '../constant';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
=======
import { Button, FormControl, FormLabel, Grid, IconButton, Paper } from '@mui/material';
import { difficulty } from '../constant';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
>>>>>>> f1169683cb862a13420b5e5c06ecc788a90a1a8d

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function DifficultyLevel() {
  const location = useLocation()
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('Choose wisely');
  const [difficultyId, setDifficultyId] = useState('1')

<<<<<<< HEAD
=======

>>>>>>> f1169683cb862a13420b5e5c06ecc788a90a1a8d
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(' ');
    setDifficultyId(event.target.value)
  };
<<<<<<< HEAD
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const gameLink = `/game/${location.pathname.split('/').at(-1)}/${difficultyId}`

  return (
    <Grid container direction='column' alignItems='center'>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 3, width: '100%' }} variant="standard">
          <Grid item sx={{ mt: 5, textAlign: 'center' }} >
            <FormLabel id="demo-error-radios">Выберите уровень сложности для продолжения</FormLabel>
          </Grid>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            <Grid container spacing={2} sx={{ mt: 5 }} >
              {difficulty.map((el) =>
                <Grid key={el.title} item xs={12} sm={6} md={4} >
                  <MyFormControlLabel title={el.title} value={el.level} label={el.title} control={<Radio />}
                    sx={{
                      width: '100%',
                      background: '#f6f6f6'
                    }} />
                </Grid>
              )}
            </Grid>
          </RadioGroup>
          <FormHelperText sx={{ mt: 5, textAlign: 'center' }}>{helperText}</FormHelperText>
          <Link to={gameLink}>
            <Button sx={{ mt: 5, mr: 1, display: 'inline-block', textDecoration: 'none' }} type="submit" variant="contained">
              Start
            </Button>
          </Link>
        </FormControl>
      </form>
    </Grid>
=======

  const gameLink = `/game/${location.pathname.split('/').at(-1)}/${difficultyId}`
  let navigate = useNavigate();
  return (
    <Grid container component={Paper} direction='column' alignItems='center' sx={{
      width: '100%',
      position: "relative"
    }}>
      <IconButton size='large' sx={{
        color: '#1976d2',
        position: "absolute",
        top: '0',
        right: '0'
      }} onClick={() => navigate(-1)}>
        <CloseIcon />
      </IconButton>
      <FormControl sx={{ m: 3 }} variant="filled">
        <Grid item sx={{ mt: 5, textAlign: 'center' }} >
          <FormLabel id="demo-error-radios">Выберите уровень сложности для продолжения</FormLabel>
        </Grid>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <Grid container spacing={0} sx={{ mt: 5, width: '100%', ml: 0, justifyContent: 'space-evenly' }} >
            {difficulty.map((el) =>
              <Grid component={Paper} container key={el.title} xs={12} sm={5} md={4} sx={{ border: `1px solid ${el.colorTitle1}`, borderRadius: '4px', m: 1 ,
              alignContent: 'flex-start'}} >
                <MyFormControlLabel title={el.title} value={el.level} label={el.title} control={<Radio />}
                  sx={{
                    width: '100%',
                    background: '#f6f6f6',
                    m: 0,
                    borderRadius: '4px'
                  }} />
                <Grid item sx={{ background: el.colorTitle1 , color:'white', p:1, width:'100%'}}>
                  {el.titleDiscription1}
                </Grid>
                <Grid item sx={{ p:1}}>
                  {el.discription1}
                </Grid>
                <Grid item sx={{ background: el.colorTitle2 , color:'white', p:1,width: '100%'}}>
                  {el.titleDiscription2}
                </Grid>
                <Grid item sx={{ p:1}}>
                  {el.discription2}
                </Grid>
              </Grid>
            )}
          </Grid>
        </RadioGroup>
        {/* <FormHelperText sx={{ mt: 3, textAlign: 'center' }}>{helperText}</FormHelperText> */}
        <Grid item sx={{ mt: 3, textAlign: 'center' }} >
          <Link to={gameLink}>
            <Button sx={{ display: 'inline-block', textDecoration: 'none', borderRadius: '50%', height: '4.5rem' }} type="submit" variant="contained">
              Start
            </Button>
          </Link>
        </Grid>
      </FormControl>
    </Grid>

>>>>>>> f1169683cb862a13420b5e5c06ecc788a90a1a8d
  );
}