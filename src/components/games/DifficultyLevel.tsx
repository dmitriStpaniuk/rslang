import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Button, FormControl, FormLabel, Grid } from '@mui/material';
import { difficulty } from '../constant';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const [, setHelperText] = useState('Choose wisely');
  const [difficultyId, setDifficultyId] = useState('1')


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(' ');
    setDifficultyId(event.target.value)
  };

  const gameLink = `/game/${location.pathname.split('/').at(-1)}/${difficultyId}`

  return (
    <Grid container direction='column' alignItems='center' sx={{
      width: '100%',
      position: "relative",
      maxWidth:'1900px',
    }}>
      <FormControl sx={{ m: 3 }} variant="filled">
        <Grid item sx={{ mt: 3, textAlign: 'center' }} >
          <FormLabel id="demo-error-radios">Выберите уровень сложности для продолжения</FormLabel>
        </Grid>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <Grid container sx={{ mt: 5, width: '100%', ml: 0, justifyContent: 'space-evenly' }} >
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
                <Grid item sx={{ background: el.colorTitle1, color: 'white', p: 1, width: '100%' }}>
                  {el.titleDiscription1}
                </Grid>
                <Grid item sx={{ p: 1 , fontSize:12}}>
                  {el.discription1}
                </Grid>
                <Grid item sx={{ background: el.colorTitle2, color: 'white', p: 1, width: '100%' }}>
                  {el.titleDiscription2}
                </Grid>
                <Grid item sx={{ p: 1, fontSize:12 }}>
                  {el.discription2}
                </Grid>
              </Grid>
            )}
          </Grid>
        </RadioGroup>
        <Grid item sx={{ mt: 3, textAlign: 'center' }} >
          <Link to={gameLink}>
            <Button sx={{ display: 'inline-block', textDecoration: 'none', borderRadius: '50%', height: '4.5rem' }} type="submit" variant="contained">
              Start
            </Button>
          </Link>
        </Grid>
      </FormControl>
    </Grid>

  );
}