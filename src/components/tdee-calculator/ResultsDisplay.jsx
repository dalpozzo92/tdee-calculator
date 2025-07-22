import { Box, Typography, Grid, Divider, Card, CardContent, LinearProgress, useTheme } from '@mui/material';

const ResultsDisplay = ({ results }) => {
  const theme = useTheme();

  if (!results) {
    return <Typography>Calcolo in corso...</Typography>;
  }

  const getColorForMacro = (macro) => {
    switch(macro) {
      case 'proteins': return theme.palette.success.main;
      case 'carbs': return theme.palette.info.main;
      case 'fats': return theme.palette.warning.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Metabolismo Basale (BMR)
          </Typography>
          <Typography variant="h4" color="secondary" gutterBottom>
            {results.bmr} calorie
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {results.bodyFatProvided 
              ? "Calcolato con la formula di Katch-McArdle basata sulla massa magra."
              : "Calcolato con la formula di Harris-Benedict basata su età, peso, altezza e sesso."}
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Fabbisogno Energetico Totale (TDEE)
          </Typography>
          <Typography variant="h4" color="secondary" gutterBottom>
            {results.tdee} calorie
          </Typography>
          <Typography variant="body1">
            Questo valore considera la tua attività lavorativa, l'allenamento, altri sport e i passi giornalieri.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Massa Magra Stimata
          </Typography>
          <Typography variant="h4" color="secondary" gutterBottom>
            {results.leanBodyMass} kg
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {results.bodyFatProvided 
              ? "Calcolata dalla percentuale di grasso corporeo fornita."
              : "Stimata in base a valori medi per il tuo sesso."}
          </Typography>
        </CardContent>
      </Card>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" color="primary" gutterBottom>
        Ripartizione Macronutrienti Personalizzata
      </Typography>
      
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent sx={{ p: 1 }}>
          {Object.entries(results.macroPercentages).map(([macro, percentage]) => (
            <Box key={macro} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">
                  {macro === 'proteins' ? 'Proteine' : macro === 'carbs' ? 'Carboidrati' : 'Grassi'}
                </Typography>
                <Typography variant="body2">{percentage}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={percentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 5,
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColorForMacro(macro)
                  }
                }} 
              />
            </Box>
          ))}
        </CardContent>
      </Card>
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 10 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: getColorForMacro('proteins') }}>Proteine</Typography>
              <Typography variant="h5">{results.macros.proteins}g</Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(results.macros.proteins * 4)} calorie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {results.macroPercentages.proteins}% del totale
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 10 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: getColorForMacro('carbs') }}>Carboidrati</Typography>
              <Typography variant="h5">{results.macros.carbs}g</Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(results.macros.carbs * 4)} calorie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {results.macroPercentages.carbs}% del totale
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 10 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: getColorForMacro('fats') }}>Grassi</Typography>
              <Typography variant="h5">{results.macros.fats}g</Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(results.macros.fats * 9)} calorie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {results.macroPercentages.fats}% del totale
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Nota: Questa è una stima basata sui dati forniti e sulle tue preferenze di macronutrienti. Per esigenze specifiche, consulta un nutrizionista o un dietologo.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultsDisplay;