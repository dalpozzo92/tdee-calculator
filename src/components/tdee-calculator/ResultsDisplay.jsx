// import { useState } from 'react';
// import { Box, Typography, Grid, Divider, Card, CardContent, LinearProgress, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info';

// const ResultsDisplay = ({ results }) => {
//   const theme = useTheme();
//   const [selectedOption, setSelectedOption] = useState('maintenance');

//   if (!results) {
//     return <Typography>Calcolo in corso...</Typography>;
//   }

//   const getColorForMacro = (macro) => {
//     switch(macro) {
//       case 'proteins': return theme.palette.success.main;
//       case 'carbs': return theme.palette.info.main;
//       case 'fats': return theme.palette.warning.main;
//       default: return theme.palette.primary.main;
//     }
//   };

//   // Calcola le calorie per cut e bulk
//   const options = {
//     cut20: {
//       label: 'Cut Aggressivo (-20%)',
//       calories: Math.round(results.tdee * 0.8),
//       diff: -Math.round(results.tdee * 0.2),
//       color: theme.palette.error.main
//     },
//     cut10: {
//       label: 'Cut Moderato (-10%)',
//       calories: Math.round(results.tdee * 0.9),
//       diff: -Math.round(results.tdee * 0.1),
//       color: theme.palette.error.light
//     },
//     maintenance: {
//       label: 'Mantenimento',
//       calories: results.tdee,
//       diff: 0,
//       color: theme.palette.primary.main
//     },
//     bulk10: {
//       label: 'Bulk Moderato (+10%)',
//       calories: Math.round(results.tdee * 1.1),
//       diff: Math.round(results.tdee * 0.1),
//       color: theme.palette.success.light
//     },
//     bulk20: {
//       label: 'Bulk Aggressivo (+20%)',
//       calories: Math.round(results.tdee * 1.2),
//       diff: Math.round(results.tdee * 0.2),
//       color: theme.palette.success.main
//     }
//   };

//   // Calcola i macronutrienti per l'opzione selezionata, mantenendo proteine e grassi invariati
//   const calculateMacros = (calorieTarget) => {
//     // Mantiene gli stessi grammi di proteine e grassi
//     const proteins = results.macros.proteins;
//     const fats = results.macros.fats;
    
//     // Calcola le calorie da proteine e grassi
//     const proteinCalories = proteins * 4; // 4 calorie per grammo
//     const fatCalories = fats * 9; // 9 calorie per grammo
    
//     // Calorie rimanenti per i carboidrati
//     const remainingCalories = calorieTarget - proteinCalories - fatCalories;
//     const carbs = Math.max(0, Math.round(remainingCalories / 4)); // 4 calorie per grammo, evita valori negativi
    
//     // Calcola le nuove percentuali
//     const totalCalories = proteinCalories + fatCalories + (carbs * 4);
//     const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
//     const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
//     const carbPercentage = Math.round(((carbs * 4) / totalCalories) * 100);
    
//     // Assicurati che la somma sia 100%
//     const sum = proteinPercentage + fatPercentage + carbPercentage;
//     const adjustedCarbPercentage = carbPercentage + (100 - sum);
    
//     return {
//       proteins: proteins,
//       fats: fats,
//       carbs: carbs,
//       percentages: {
//         proteins: proteinPercentage,
//         fats: fatPercentage,
//         carbs: adjustedCarbPercentage
//       }
//     };
//   };

//   const currentMacros = calculateMacros(options[selectedOption].calories);

//   return (
//     <Box sx={{ mt: 2, textAlign: 'center' }}>
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Metabolismo Basale (BMR)
//           </Typography>
//           <Typography variant="h4" color="secondary" gutterBottom>
//             {results.bmr} calorie
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {results.bodyFatProvided 
//               ? "Calcolato con la formula ibrida con correzione massa grassa."
//               : "Calcolato con la formula ibrida senza correzione massa grassa."}
//           </Typography>
//         </CardContent>
//       </Card>

//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Fabbisogno Energetico Totale (TDEE)
//           </Typography>
//           <Typography variant="h4" color="secondary" gutterBottom>
//             {results.tdee} calorie
//           </Typography>
//           <Typography variant="body1">
//             Questo valore considera la tua attività lavorativa, l'allenamento, altri sport e i passi giornalieri.
//           </Typography>
//         </CardContent>
//       </Card>
      
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Dettaglio Componenti TDEE
//           </Typography>
          
//           <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', my: 2 }}>
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell component="th" scope="row">
//                     BMR (Metabolismo Basale)
//                   </TableCell>
//                   <TableCell align="right">{results.bmr} kCal</TableCell>
//                   <TableCell align="right">
//                     <Tooltip title="Energia necessaria per le funzioni vitali a riposo">
//                       <InfoIcon fontSize="small" />
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell component="th" scope="row">
//                     NEAT (Attività Non-Esercizio)
//                   </TableCell>
//                   <TableCell align="right">{results.neat} kCal</TableCell>
//                   <TableCell align="right">
//                     <Tooltip title="Energia spesa in attività quotidiane, lavoro e passi">
//                       <InfoIcon fontSize="small" />
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell component="th" scope="row">
//                     EAT (Attività Esercizio)
//                   </TableCell>
//                   <TableCell align="right">{results.eat} kCal</TableCell>
//                   <TableCell align="right">
//                     <Tooltip title="Energia spesa in allenamenti e sport">
//                       <InfoIcon fontSize="small" />
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell component="th" scope="row">
//                     TEF (Termogenesi da Cibo)
//                   </TableCell>
//                   <TableCell align="right">{results.tef} kCal</TableCell>
//                   <TableCell align="right">
//                     <Tooltip title="Energia spesa per digerire, assorbire e metabolizzare il cibo (10% del totale)">
//                       <InfoIcon fontSize="small" />
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'left' }}>
//             Il TDEE (Total Daily Energy Expenditure) è la somma di tutte le calorie che il tuo corpo brucia in un giorno.
//           </Typography>
//         </CardContent>
//       </Card>
      
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Massa Magra Stimata
//           </Typography>
//           <Typography variant="h4" color="secondary" gutterBottom>
//             {results.leanBodyMass} kg
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {results.bodyFatProvided 
//               ? "Calcolata dalla percentuale di grasso corporeo fornita."
//               : "Stimata in base a valori medi per il tuo sesso (maschile: 15-20%, femminile: 25-30%)."}
//           </Typography>
//         </CardContent>
//       </Card>
      
//       {/* Nuova sezione per Cut e Bulk con Tabs */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Calorie e Macronutrienti per Obiettivo
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'left' }}>
//             Clicca su un obiettivo per vedere le calorie e i macronutrienti consigliati.
//             Puoi anche modificare i grammi di proteine e grassi nella sezione precedente.
//           </Typography>
//           <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', mt: 2, mb: 3 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Obiettivo</TableCell>
//                   <TableCell align="center">Calorie</TableCell>
//                   <TableCell align="right">Differenza</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {Object.entries(options).map(([key, option]) => (
//                   <TableRow 
//                     key={key}
//                     sx={{ 
//                       bgcolor: selectedOption === key ? `${option.color}22` : 'inherit',
//                       cursor: 'pointer',
//                       '&:hover': { bgcolor: `${option.color}11` }
//                     }}
//                     onClick={() => setSelectedOption(key)}
//                   >
//                     <TableCell component="th" scope="row">
//                       {selectedOption === key ? <strong>{option.label}</strong> : option.label}
//                     </TableCell>
//                     <TableCell align="center">
//                       {selectedOption === key ? <strong>{option.calories}</strong> : option.calories}
//                     </TableCell>
//                     <TableCell 
//                       align="right" 
//                       sx={{ 
//                         color: option.diff === 0 
//                           ? 'inherit' 
//                           : option.diff < 0 
//                             ? theme.palette.error.main 
//                             : theme.palette.success.main
//                       }}
//                     >
//                       {option.diff === 0 
//                         ? '0' 
//                         : option.diff < 0 
//                           ? option.diff
//                           : `+${option.diff}`}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Divider sx={{ my: 2 }} />
          
//           <Typography variant="h6" sx={{ color: options[selectedOption].color, mb: 2 }}>
//             Macronutrienti per {options[selectedOption].label} ({options[selectedOption].calories} calorie)
//           </Typography>

//           {/* Barre percentuali per i macronutrienti dell'obiettivo selezionato */}
//           <Box sx={{ mb: 4, p: 2 }}>
//             {Object.entries(currentMacros.percentages).map(([macro, percentage]) => (
//               <Box key={macro} sx={{ mb: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                   <Typography variant="body2">
//                     {macro === 'proteins' ? 'Proteine' : macro === 'carbs' ? 'Carboidrati' : 'Grassi'}
//                   </Typography>
//                   <Typography variant="body2">{percentage}%</Typography>
//                 </Box>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={percentage} 
//                   sx={{ 
//                     height: 8, 
//                     borderRadius: 5,
//                     backgroundColor: theme.palette.background.paper,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: getColorForMacro(macro)
//                     }
//                   }} 
//                 />
//               </Box>
//             ))}
//           </Box>

//           {/* Schede per i macronutrienti dell'obiettivo selezionato */}
//           <Grid container spacing={2}>
//         <Grid size={{ xs: 12}}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Typography variant="subtitle1" sx={{ color: getColorForMacro('proteins') }}>Proteine</Typography>
//                   <Typography variant="h5">{currentMacros.proteins}g</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {Math.round(currentMacros.proteins * 4)} calorie
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {currentMacros.percentages.proteins}% del totale
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
            
//         <Grid size={{ xs: 12}}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Typography variant="subtitle1" sx={{ color: getColorForMacro('carbs') }}>Carboidrati</Typography>
//                   <Typography variant="h5">{currentMacros.carbs}g</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {Math.round(currentMacros.carbs * 4)} calorie
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {currentMacros.percentages.carbs}% del totale
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
            
//         <Grid size={{ xs: 12}}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Typography variant="subtitle1" sx={{ color: getColorForMacro('fats') }}>Grassi</Typography>
//                   <Typography variant="h5">{currentMacros.fats}g</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {Math.round(currentMacros.fats * 9)} calorie
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {currentMacros.percentages.fats}% del totale
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'left' }}>
//             <strong>Nota importante:</strong> Quando cambi l'obiettivo calorico, i grammi di proteine e grassi rimangono invariati. 
//             Solo i carboidrati vengono aggiustati per raggiungere il nuovo target calorico. Questo approccio è ideale perché 
//             mantiene costante l'apporto proteico per preservare la massa muscolare e mantiene un adeguato apporto di grassi 
//             essenziali per le funzioni ormonali. Se vuoi cambiare i grammi di proteine o grassi,
//             puoi farlo nella sezione precedente di personalizzazione dei macronutrienti.
//           </Typography>
//         </CardContent>
//       </Card>
      
//       <Box sx={{ mt: 3 }}>
//         <Typography variant="body2" color="text.secondary">
//           Nota: Questa è una stima basata sui dati forniti e sulle tue preferenze di macronutrienti. È una base di partenza! Per esigenze specifiche, consulta un nutrizionista o un dietologo.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default ResultsDisplay;
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  Card, 
  CardContent, 
  LinearProgress, 
  useTheme, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  useMediaQuery, 
  Tooltip 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const ResultsDisplay = ({ results }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedOption, setSelectedOption] = useState('maintenance');
  
  // Stato per gestire i tooltip
  const [tooltips, setTooltips] = useState({
    bmr: false,
    neat: false,
    eat: false,
    tef: false
  });

  // Funzione per gestire l'apertura/chiusura dei tooltip
  const handleTooltipToggle = (tooltip) => {
    setTooltips(prev => ({
      ...prev,
      [tooltip]: !prev[tooltip]
    }));
  };

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

  // Funzione per mostrare info in un modo mobile-friendly con tooltip
  const renderInfoItem = (label, value, tooltip, tooltipKey) => {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'left',
        mb: 1.5,
        pb: 1.5,
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">{label}</Typography>
          <Tooltip
            title={tooltip}
            open={tooltips[tooltipKey]}
            onClose={() => setTooltips(prev => ({ ...prev, [tooltipKey]: false }))}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <IconButton 
              onClick={() => handleTooltipToggle(tooltipKey)}
              size="small"
              sx={{ ml: 0.5, p: 0.5 }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="body2">{value} kCal</Typography>
      </Box>
    );
  };

  // Calcola le calorie per cut e bulk
  const options = {
    cut20: {
      label: 'Cut Aggressivo (-20%)',
      calories: Math.round(results.tdee * 0.8),
      diff: -Math.round(results.tdee * 0.2),
      color: theme.palette.error.main
    },
    cut10: {
      label: 'Cut Moderato (-10%)',
      calories: Math.round(results.tdee * 0.9),
      diff: -Math.round(results.tdee * 0.1),
      color: theme.palette.error.light
    },
    maintenance: {
      label: 'Mantenimento',
      calories: results.tdee,
      diff: 0,
      color: theme.palette.primary.main
    },
    bulk10: {
      label: 'Bulk Moderato (+10%)',
      calories: Math.round(results.tdee * 1.1),
      diff: Math.round(results.tdee * 0.1),
      color: theme.palette.success.light
    },
    bulk20: {
      label: 'Bulk Aggressivo (+20%)',
      calories: Math.round(results.tdee * 1.2),
      diff: Math.round(results.tdee * 0.2),
      color: theme.palette.success.main
    }
  };

  // Calcola i macronutrienti per l'opzione selezionata, mantenendo proteine e grassi invariati
  const calculateMacros = (calorieTarget) => {
    // Mantiene gli stessi grammi di proteine e grassi
    const proteins = results.macros.proteins;
    const fats = results.macros.fats;
    
    // Calcola le calorie da proteine e grassi
    const proteinCalories = proteins * 4; // 4 calorie per grammo
    const fatCalories = fats * 9; // 9 calorie per grammo
    
    // Calorie rimanenti per i carboidrati
    const remainingCalories = calorieTarget - proteinCalories - fatCalories;
    const carbs = Math.max(0, Math.round(remainingCalories / 4)); // 4 calorie per grammo, evita valori negativi
    
    // Calcola le nuove percentuali
    const totalCalories = proteinCalories + fatCalories + (carbs * 4);
    const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
    const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
    const carbPercentage = Math.round(((carbs * 4) / totalCalories) * 100);
    
    // Assicurati che la somma sia 100%
    const sum = proteinPercentage + fatPercentage + carbPercentage;
    const adjustedCarbPercentage = carbPercentage + (100 - sum);
    
    return {
      proteins: proteins,
      fats: fats,
      carbs: carbs,
      percentages: {
        proteins: proteinPercentage,
        fats: fatPercentage,
        carbs: adjustedCarbPercentage
      }
    };
  };

  const currentMacros = calculateMacros(options[selectedOption].calories);

  // Rendering della tabella obiettivi in modo responsive
  const renderGoalsTable = () => {
    if (isMobile) {
      // Versione mobile: ogni obiettivo in una card separata
      return (
        <Box sx={{ mt: 2 }}>
          {Object.entries(options).map(([key, option]) => (
            <Card 
              key={key} 
              sx={{ 
                mb: 1.5, 
                bgcolor: selectedOption === key ? `${option.color}22` : 'inherit',
                cursor: 'pointer',
                '&:hover': { bgcolor: `${option.color}11` }
              }}
              onClick={() => setSelectedOption(key)}
            >
              <CardContent sx={{ py: 1.5, px: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant={selectedOption === key ? "subtitle1" : "body1"} sx={{ fontWeight: selectedOption === key ? 'bold' : 'normal' }}>
                    {option.label}
                  </Typography>
                  <Box>
                    <Typography variant="body1">
                      {option.calories} kCal
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: option.diff === 0 
                          ? 'inherit' 
                          : option.diff < 0 
                            ? theme.palette.error.main 
                            : theme.palette.success.main,
                        textAlign: 'right'
                      }}
                    >
                      {option.diff === 0 
                        ? '±0' 
                        : option.diff < 0 
                          ? option.diff
                          : `+${option.diff}`}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      );
    } else {
      // Versione desktop: tabella
      return (
        <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', mt: 2, mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Obiettivo</TableCell>
                <TableCell align="center">Calorie</TableCell>
                <TableCell align="right">Differenza</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(options).map(([key, option]) => (
                <TableRow 
                  key={key}
                  sx={{ 
                    bgcolor: selectedOption === key ? `${option.color}22` : 'inherit',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: `${option.color}11` }
                  }}
                  onClick={() => setSelectedOption(key)}
                >
                  <TableCell component="th" scope="row">
                    {selectedOption === key ? <strong>{option.label}</strong> : option.label}
                  </TableCell>
                  <TableCell align="center">
                    {selectedOption === key ? <strong>{option.calories}</strong> : option.calories}
                  </TableCell>
                  <TableCell 
                    align="right" 
                    sx={{ 
                      color: option.diff === 0 
                        ? 'inherit' 
                        : option.diff < 0 
                          ? theme.palette.error.main 
                          : theme.palette.success.main
                    }}
                  >
                    {option.diff === 0 
                      ? '0' 
                      : option.diff < 0 
                        ? option.diff
                        : `+${option.diff}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
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
              ? "Calcolato con la formula ibrida con correzione massa grassa."
              : "Calcolato con la formula ibrida senza correzione massa grassa."}
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
            Dettaglio Componenti TDEE
          </Typography>
          
          {isMobile ? (
            // Vista mobile-friendly per i dettagli TDEE
            <Box sx={{ px: 1, py: 1, textAlign: 'left'}}>
              {renderInfoItem(
                "BMR (Metabolismo Basale)", 
                results.bmr, 
                "Energia necessaria per le funzioni vitali a riposo",
                "bmr"
              )}
              {renderInfoItem(
                "NEAT (Attività Non-Esercizio)", 
                results.neat, 
                "Energia spesa in attività quotidiane, lavoro e passi",
                "neat"
              )}
              {renderInfoItem(
                "EAT (Attività Esercizio)", 
                results.eat, 
                "Energia spesa in allenamenti e sport",
                "eat"
              )}
              {renderInfoItem(
                "TEF (Termogenesi da Cibo)", 
                results.tef, 
                "Energia spesa per digerire, assorbire e metabolizzare il cibo (10% del totale)",
                "tef"
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, pt: 1 }}>
                <Typography variant="subtitle2">TDEE Totale</Typography>
                <Typography variant="subtitle2">{results.tdee} kCal</Typography>
              </Box>
            </Box>
          ) : (
            // Vista desktop
            <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', my: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      BMR (Metabolismo Basale)
                    </TableCell>
                    <TableCell align="right">{results.bmr} kCal</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Energia necessaria per le funzioni vitali a riposo">
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      NEAT (Attività Non-Esercizio)
                    </TableCell>
                    <TableCell align="right">{results.neat} kCal</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Energia spesa in attività quotidiane, lavoro e passi">
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      EAT (Attività Esercizio)
                    </TableCell>
                    <TableCell align="right">{results.eat} kCal</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Energia spesa in allenamenti e sport">
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      TEF (Termogenesi da Cibo)
                    </TableCell>
                    <TableCell align="right">{results.tef} kCal</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Energia spesa per digerire, assorbire e metabolizzare il cibo (10% del totale)">
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '& > *': { fontWeight: 'bold' } }}>
                    <TableCell component="th" scope="row">
                      TDEE Totale
                    </TableCell>
                    <TableCell align="right">{results.tdee} kCal</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'left' }}>
            Il TDEE (Total Daily Energy Expenditure) è la somma di tutte le calorie che il tuo corpo brucia in un giorno.
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
      
      {/* Nuova sezione per Cut e Bulk con Tabs */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Calorie e Macronutrienti per Obiettivo
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'left' }}>
//             Clicca su un obiettivo per vedere le calorie e i macronutrienti consigliati.
//             Puoi anche modificare i grammi di proteine e grassi nella sezione precedente.
//           </Typography>
          {renderGoalsTable()}

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" sx={{ color: options[selectedOption].color, mb: 2 }}>
            Macronutrienti per {options[selectedOption].label} ({options[selectedOption].calories} calorie)
          </Typography>

          {/* Barre percentuali per i macronutrienti dell'obiettivo selezionato */}
          <Box sx={{ mb: 4, p: 2 }}>
            {Object.entries(currentMacros.percentages).map(([macro, percentage]) => (
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
          </Box>

          {/* Schede per i macronutrienti dell'obiettivo selezionato */}
          <Grid container spacing={2}>
        <Grid size={{ xs: 12}}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ color: getColorForMacro('proteins') }}>Proteine</Typography>
                  <Typography variant="h5">{currentMacros.proteins}g</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(currentMacros.proteins * 4)} calorie
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentMacros.percentages.proteins}% del totale
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
        <Grid size={{ xs: 12}}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ color: getColorForMacro('carbs') }}>Carboidrati</Typography>
                  <Typography variant="h5">{currentMacros.carbs}g</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(currentMacros.carbs * 4)} calorie
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentMacros.percentages.carbs}% del totale
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
        <Grid size={{ xs: 12}}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ color: getColorForMacro('fats') }}>Grassi</Typography>
                  <Typography variant="h5">{currentMacros.fats}g</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(currentMacros.fats * 9)} calorie
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentMacros.percentages.fats}% del totale
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'left' }}>
            <strong>Nota importante:</strong> Quando cambi l'obiettivo calorico, i grammi di proteine e grassi rimangono invariati. 
            Solo i carboidrati vengono aggiustati per raggiungere il nuovo target calorico. Questo approccio è ideale perché 
            mantiene costante l'apporto proteico per preservare la massa muscolare e mantiene un adeguato apporto di grassi 
            essenziali per le funzioni ormonali.
          </Typography>
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Nota: Questa è una stima basata sui dati forniti e sulle tue preferenze di macronutrienti. Per esigenze specifiche, consulta un nutrizionista o un dietologo.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultsDisplay;