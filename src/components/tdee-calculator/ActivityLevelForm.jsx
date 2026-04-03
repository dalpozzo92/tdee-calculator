import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Grid, Typography, InputAdornment, Slider, Card, CardContent } from '@mui/material';

const ActivityLevelForm = ({ formData, onChange }) => {
  // Gestisci il cambio dei giorni di allenamento
  const handleTrainingDaysChange = (event, newValue) => {
    onChange('trainingDays', newValue);
  };

  // Gestisci il cambio dei giorni di altri sport
  const handleOtherSportsDaysChange = (event, newValue) => {
    onChange('otherSportsDays', newValue);
  };

  return (
    <Box component="form" noValidate sx={{ mt: 2, textAlign: 'center' }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Attività lavorativa
          </Typography>
          
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              name="workActivity"
              value={formData.workActivity || 'sedentary'}
              onChange={(e) => onChange('workActivity', e.target.value)}
            >
              <FormControlLabel value="sedentary" control={<Radio />} label="Sedentaria (lavoro d'ufficio)" />
              <FormControlLabel value="light" control={<Radio />} label="Leggera (in piedi, cameriere, insegnante)" />
              <FormControlLabel value="moderate" control={<Radio />} label="Moderata (lavoro manuale leggero)" />
              <FormControlLabel value="heavy" control={<Radio />} label="Intensa (lavoro manuale pesante)" />
              <FormControlLabel value="veryHeavy" control={<Radio />} label="Molto intensa (lavori molto fisici)" />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Allenamento in palestra
          </Typography>
          
          <Box sx={{ px: 2, mb: 3 }}>
            <Typography gutterBottom>
              Giorni di allenamento alla settimana: <strong>{formData.trainingDays || 0}</strong>
            </Typography>
            <Slider
              value={parseInt(formData.trainingDays || 0)}
              onChange={handleTrainingDaysChange}
              step={1}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
              ]}
              min={0}
              max={7}
            />
          </Box>

          <Typography gutterBottom>
            Intensità dell'allenamento
          </Typography>
          <RadioGroup
            row
            name="trainingLevel"
            value={formData.trainingLevel || 'light'}
            onChange={(e) => onChange('trainingLevel', e.target.value)}
            sx={{ justifyContent: 'center', mb: 2 }}
          >
            <FormControlLabel value="light" control={<Radio />} label="Leggero" />
            <FormControlLabel value="moderate" control={<Radio />} label="Moderato" />
            <FormControlLabel value="intense" control={<Radio />} label="Intenso" />
            <FormControlLabel value="veryIntense" control={<Radio />} label="Molto intenso" />
          </RadioGroup>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, textAlign: 'left' }}>
            <strong>{formData.trainingLevel === 'light' ? 'Leggero' : 
              formData.trainingLevel === 'moderate' ? 'Moderato' : 
              formData.trainingLevel === 'intense' ? 'Intenso' : 'Molto intenso'}</strong>: {
              formData.trainingLevel === 'light' ? '30-45 min o bassa intensità o serie < 8' :
              formData.trainingLevel === 'moderate' ? '45-90 min o intensità media o serie 8-15' :
              formData.trainingLevel === 'intense' ? '90-120 min o alta intensità (cedimento muscolare) o serie 15-25' :
              '120+ min o intensità massima (doppi allenamenti) o serie +25'
            }
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Altri sport
          </Typography>
          
          <Box sx={{ px: 2, mb: 3 }}>
            <Typography gutterBottom>
              Giorni di altri sport alla settimana: <strong>{formData.otherSportsDays || 0}</strong>
            </Typography>
            <Slider
              value={parseInt(formData.otherSportsDays || 0)}
              onChange={handleOtherSportsDaysChange}
              step={1}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
              ]}
              min={0}
              max={7}
            />
          </Box>

          <Typography gutterBottom>
            Tipo di sport
          </Typography>
          <RadioGroup
            name="otherSports"
            value={formData.otherSports || 'light'}
            onChange={(e) => onChange('otherSports', e.target.value)}
            sx={{ justifyContent: 'center' }}
          >
            <FormControlLabel value="light" control={<Radio />} label="Leggeri (yoga, pilates)" />
            <FormControlLabel value="moderate" control={<Radio />} label="Moderati (ciclismo, nuoto)" />
            <FormControlLabel value="intense" control={<Radio />} label="Intensi (calcio, basket)" />
            <FormControlLabel value="veryIntense" control={<Radio />} label="Molto intensi (sport agonistici)" />
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Attività quotidiana
          </Typography>
          
          <TextField
            required
            fullWidth
            id="dailySteps"
            label="Media passi giornalieri"
            name="dailySteps"
            type="number"
            value={formData.dailySteps || ''}
            onChange={(e) => onChange('dailySteps', e.target.value)}
            InputProps={{ 
              inputProps: { min: 0 },
              endAdornment: <InputAdornment position="end">passi</InputAdornment>,
            }}
            helperText="Inserisci la media dei passi che fai in un giorno"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityLevelForm;