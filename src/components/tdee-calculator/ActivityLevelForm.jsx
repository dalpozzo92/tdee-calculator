import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Grid, Typography } from '@mui/material';

const ActivityLevelForm = ({ formData, onChange }) => {
  return (
    <Box component="form" noValidate sx={{ mt: 2, textAlign: 'center' }}>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'left' }}>
        <Grid size={{ xs: 12, md: 10 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ textAlign: 'left', mb: 1 }}>Attività lavorativa</FormLabel>
            <RadioGroup
              name="workActivity"
              value={formData.workActivity}
              onChange={(e) => onChange('workActivity', e.target.value)}
              sx={{ display: 'flex', alignItems: 'left' }}
            >
              <FormControlLabel value="sedentary" control={<Radio />} label="Sedentaria (lavoro d'ufficio)" />
              <FormControlLabel value="light" control={<Radio />} label="Leggera (in piedi, cameriere, insegnante)" />
              <FormControlLabel value="moderate" control={<Radio />} label="Moderata (lavoro manuale leggero)" />
              <FormControlLabel value="heavy" control={<Radio />} label="Intensa (lavoro manuale pesante)" />
              <FormControlLabel value="veryHeavy" control={<Radio />} label="Molto intensa (lavori molto fisici)" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ textAlign: 'left', mb: 1 }}>Livello di allenamento</FormLabel>
            <RadioGroup
              name="trainingLevel"
              value={formData.trainingLevel}
              onChange={(e) => onChange('trainingLevel', e.target.value)}
              sx={{ display: 'flex', alignItems: 'left' }}
            >
              <FormControlLabel value="none" control={<Radio />} label="Nessun allenamento" />
              <FormControlLabel value="light" control={<Radio />} label="Leggero (1-2 volte a settimana)" />
              <FormControlLabel value="moderate" control={<Radio />} label="Moderato (3-4 volte a settimana)" />
              <FormControlLabel value="intense" control={<Radio />} label="Intenso (5-6 volte a settimana)" />
              <FormControlLabel value="veryIntense" control={<Radio />} label="Molto intenso (2 volte al giorno)" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ textAlign: 'left', mb: 1 }}>Altri sport praticati</FormLabel>
            <RadioGroup
              name="otherSports"
              value={formData.otherSports}
              onChange={(e) => onChange('otherSports', e.target.value)}
              sx={{ display: 'flex', alignItems: 'left' }}
            >
              <FormControlLabel value="none" control={<Radio />} label="Nessuno" />
              <FormControlLabel value="light" control={<Radio />} label="Leggeri (yoga, pilates)" />
              <FormControlLabel value="moderate" control={<Radio />} label="Moderati (ciclismo, nuoto)" />
              <FormControlLabel value="intense" control={<Radio />} label="Intensi (calcio, basket)" />
              <FormControlLabel value="veryIntense" control={<Radio />} label="Molto intensi (sport agonistici)" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <TextField
            required
            fullWidth
            id="dailySteps"
            label="Media passi giornalieri"
            name="dailySteps"
            type="number"
            value={formData.dailySteps}
            onChange={(e) => onChange('dailySteps', e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
            helperText="Inserisci la media dei passi che fai in un giorno"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityLevelForm;