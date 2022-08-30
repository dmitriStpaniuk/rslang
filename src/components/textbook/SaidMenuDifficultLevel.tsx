import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const actions = [
  { icon: "A1", level: '1' },
  { icon: "A2", level: '2' },
  { icon: "B1", level: '3' },
  { icon: "B2", level: '4' },
  { icon: "C1", level: '5' },
  { icon: "C2", level: '6' },
];

export const SaidMenuDifficultLevel = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (level: string) => {
    navigate('/library/level/' + level)
    setOpen(false)
  }


  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', right: 0, top: '100vh' }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: 'absolute',
          bottom: 1,
          right: 1
        }}
        icon={<SpeedDialIcon />}
        // onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.level}
            icon={action.icon}
            onClick={() => handleClose(action.level)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}


