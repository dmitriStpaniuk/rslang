import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Button, FormControl, FormHelperText, FormLabel, Grid } from '@mui/material';
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
  const [helperText, setHelperText] = useState('Choose wisely');
  const [difficultyId, setDifficultyId] = useState('1')

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(' ');
    setDifficultyId(event.target.value)
  };
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
  );
}