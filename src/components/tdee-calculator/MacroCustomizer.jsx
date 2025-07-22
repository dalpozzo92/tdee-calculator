import { useState, useEffect } from 'react';
import { Box, Typography, Slider, Card, CardContent, Grid, InputAdornment, TextField } from '@mui/material';

const MacroCustomizer = ({ macroSettings, onChange, leanBodyMass, tdee }) => {
  const [macroCalories, setMacroCalories] = useState({
    proteins: 0,
    fats: 0,
    carbs: 0,
  });

  useEffect(() => {
    calculateMacroCalories();
  }, [macroSettings, leanBodyMass, tdee]);

  const calculateMacroCalories = () => {
    const proteinGrams = leanBodyMass * macroSettings.proteinPerKg;
    const fatGrams = leanBodyMass * macroSettings.fatPerKg;
    
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbCalories = tdee - proteinCalories - fatCalories;
    
    setMacroCalories({
      proteins: Math.round(proteinCalories),
      fats: Math.round(fatCalories),
      carbs: Math.max(0, Math.round(carbCalories)),
    });
  };

  // Versione più sicura dei gestori di eventi
  const handleSliderChange = (field) => (event, newValue) => {
    // Previeni comportamenti indesiderati su mobile
    if (event) {
      event.stopPropagation();
    }
    onChange(field, newValue);
  };

  const getTotalCalories = () => {
    return macroCalories.proteins + macroCalories.fats + macroCalories.carbs;
  };

  const getPercentage = (calories) => {
    return Math.round((calories / tdee) * 100);
  };

  return (
    <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Personalizza i tuoi macronutrienti
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            La tua massa magra stimata è di <strong>{leanBodyMass} kg</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Imposta i grammi di proteine e grassi per kg di massa magra. I carboidrati verranno calcolati automaticamente per completare il tuo fabbisogno calorico di {tdee} calorie.
          </Typography>
        </CardContent>
      </Card>
      
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 10 }}>
          <Card sx={{ p: 2 }}>
            <Typography id="protein-slider" gutterBottom>
              Proteine: <strong>{macroSettings.proteinPerKg}g</strong> per kg di massa magra
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={macroSettings.proteinPerKg}
                onChange={handleSliderChange('proteinPerKg')}
                aria-labelledby="protein-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks={[
                  { value: 1, label: '1g' },
                  { value: 2, label: '2g' },
                  { value: 3, label: '3g' },
                ]}
                min={1}
                max={3}
                sx={{ mb: 2 }}
              />
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1 
            }}>
              <TextField 
                value={Math.round(leanBodyMass * macroSettings.proteinPerKg)}
                disabled
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
                sx={{ width: { xs: '100%', md: '40%' } }}
              />
              <Typography variant="body2" color="text.secondary">
                {macroCalories.proteins} calorie
                ({getPercentage(macroCalories.proteins)}% del totale)
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <Card sx={{ p: 2 }}>
            <Typography id="fat-slider" gutterBottom>
              Grassi: <strong>{macroSettings.fatPerKg}g</strong> per kg di massa magra
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={macroSettings.fatPerKg}
                onChange={handleSliderChange('fatPerKg')}
                aria-labelledby="fat-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks={[
                  { value: 0.4, label: '0.4g' },
                  { value: 0.8, label: '0.8g' },
                  { value: 1.2, label: '1.2g' },
                  { value: 1.5, label: '1.5g' },
                ]}
                min={0.4}
                max={1.5}
                sx={{ mb: 2 }}
              />
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1 
            }}>
              <TextField 
                value={Math.round(leanBodyMass * macroSettings.fatPerKg)}
                disabled
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
                sx={{ width: { xs: '100%', md: '40%' } }}
              />
              <Typography variant="body2" color="text.secondary">
                {macroCalories.fats} calorie
                ({getPercentage(macroCalories.fats)}% del totale)
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 10 }}>
          <Card sx={{ p: 2, bgcolor: 'rgba(144, 202, 249, 0.08)' }}>
            <Typography gutterBottom>
              Carboidrati (calcolati automaticamente)
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1,
              mt: 2
            }}>
              <TextField 
                value={Math.max(0, Math.round(macroCalories.carbs / 4))}
                disabled
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
                sx={{ width: { xs: '100%', md: '40%' } }}
              />
              <Typography variant="body2" color="text.secondary">
                {macroCalories.carbs} calorie
                ({getPercentage(macroCalories.carbs)}% del totale)
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      
      <Card sx={{ mt: 4, bgcolor: 'rgba(244, 143, 177, 0.08)' }}>
        <CardContent>
          <Typography variant="body1">
            Totale: <strong>{getTotalCalories()} / {tdee}</strong> calorie
          </Typography>
          {macroCalories.carbs < 0 && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              Attenzione: Con questi valori, i carboidrati risultano negativi. Riduci proteine o grassi.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MacroCustomizer;