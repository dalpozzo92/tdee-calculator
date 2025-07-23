import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Typography, Tooltip, InputAdornment, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

const PersonalInfoForm = ({ formData, onChange }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setTooltipOpen(!tooltipOpen);
  };

  return (
    <Box component="form" noValidate sx={{ mt: 2, textAlign: 'center' }}>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            required
            fullWidth
            id="age"
            label="Età"
            name="age"
            type="number"
            value={formData.age}
            onChange={(e) => onChange('age', e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mx: 'auto' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 10 }}>
          <FormControl component="fieldset" fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
            <FormLabel component="legend" sx={{ alignSelf: 'flex-start' }}>Sesso</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={(e) => onChange('gender', e.target.value)}
              sx={{ justifyContent: 'center' }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Uomo" />
              <FormControlLabel value="female" control={<Radio />} label="Donna" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            required
            fullWidth
            id="height"
            label="Altezza (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={(e) => onChange('height', e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            required
            fullWidth
            id="weight"
            label="Peso (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => onChange('weight', e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            fullWidth
            id="bodyFat"
            label="Percentuale di grasso corporeo"
            name="bodyFat"
            type="number"
            value={formData.bodyFat}
            onChange={(e) => onChange('bodyFat', e.target.value)}
            InputProps={{ 
              inputProps: { min: 0, max: 100 },
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip 
                    title="La percentuale di grasso corporeo permette un calcolo più preciso del metabolismo basale. Se non conosci questo valore, puoi lasciare il campo vuoto. (valori predefiniti 15% per gli uomini, 25% per le donne)"
                    open={tooltipOpen}
                    onClose={() => setTooltipOpen(false)}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                  >
                    <IconButton 
                      onClick={handleTooltipToggle}
                      size="small"
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  %
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;