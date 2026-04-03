import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PersonalInfoForm from './components/tdee-calculator/PersonalInfoForm';
import ActivityLevelForm from './components/tdee-calculator/ActivityLevelForm';
import MacroCustomizer from './components/tdee-calculator/MacroCustomizer';
import ResultsDisplay from './components/tdee-calculator/ResultsDisplay';
import LeadForm from './components/tdee-calculator/LeadForm';
import PrivacyPolicy from './components/tdee-calculator/PrivacyPolicy';
import { LinearProgress } from '@mui/material';

// Tema scuro
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff', // cyan
    },
    secondary: {
      main: '#8b5cf6', // purple
    },
    background: {
      default: 'transparent',
      paper: 'rgba(30, 30, 46, 0.65)',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
          backdropFilter: 'blur(30px) saturate(150%)',
          WebkitBackdropFilter: 'blur(30px) saturate(150%)',
          backgroundColor: 'rgba(10, 10, 20, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
          color: 'white',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)',
            transform: 'translateY(-2px)'
          }
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'white'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00d4ff',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          min-height: 100vh;
          margin: 0;
          padding: 0;
          background: linear-gradient(-45deg, #000000, #0a0515, #000000, #001217) !important;
          background-size: 400% 400% !important;
          animation: gradientBG 15s ease infinite !important;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        #root {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `,
    },
  },
});

const steps = ['Informazioni personali', 'Livello di attività', 'Personalizza macros', 'Ricevi i Risultati', 'Risultati'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    bodyFat: '',
    workActivity: 'sedentary',
    trainingLevel: 'light',
    trainingDays: 0,
    otherSports: 'light',
    otherSportsDays: 0,
    dailySteps: '',
  });
  const [macroSettings, setMacroSettings] = useState({
    proteinPerKg: 2.0,
    fatPerKg: 0.8,
  });
  const [calculationData, setCalculationData] = useState({
    bmr: 0,
    tdee: 0,
    leanBodyMass: 0,
  });
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Per debug: verifica i valori di formData
    console.log("Form data aggiornato:", formData);
  }, [formData]);

  const handleNext = () => {
    if (activeStep === 1) {
      const preCalculation = calculatePreResults();
      setCalculationData(preCalculation);
    }
    
    if (activeStep === 2) {
      calculateFinalResults();
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleLeadSubmit = (leadData) => {
    // Avanza automaticamente ai risultati al completamento del form
    setActiveStep(4);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      age: '',
      gender: 'male',
      height: '',
      weight: '',
      bodyFat: '',
      workActivity: 'sedentary',
      trainingLevel: 'light',
      trainingDays: 0,
      otherSports: 'light',
      otherSportsDays: 0,
      dailySteps: '',
    });
    setMacroSettings({
      proteinPerKg: 2.0,
      fatPerKg: 0.8,
    });
    setResults(null);
    window.scrollTo(0, 0);
  };

  const handleFormChange = (field, value) => {
    // Per i campi numerici, assicuriamoci che siano numeri
    if (['trainingDays', 'otherSportsDays'].includes(field)) {
      value = Number(value);
    }
    
    let updatedFormData = {
      ...formData,
      [field]: value,
    };
    
    // Logica aggiuntiva per gestire dipendenze tra campi
    if (field === 'trainingDays' && value === 0) {
      updatedFormData.trainingLevel = 'light';
    }
    
    if (field === 'otherSportsDays' && value === 0) {
      updatedFormData.otherSports = 'light';
    }
    
    setFormData(updatedFormData);
  };

  const handleMacroSettingsChange = (field, value) => {
    setMacroSettings({
      ...macroSettings,
      [field]: value,
    });
  };

  // Nel file App.jsx, modifichiamo la funzione calculatePreResults per evitare NaN

const calculatePreResults = () => {
  // Estrai i dati necessari
  const weight = parseFloat(formData.weight) || 0;
  const height = parseFloat(formData.height) || 0;
  const age = parseFloat(formData.age) || 0;
  const bodyFat = formData.bodyFat ? parseFloat(formData.bodyFat) / 100 : null;
  const gender = formData.gender;
  
  // Calcolo massa magra
  let leanBodyMass;
  if (bodyFat !== null) {
    leanBodyMass = weight * (1 - bodyFat);
  } else {
    // Stima della massa magra se non viene fornita la percentuale di grasso
    const estimatedBodyFat = gender === 'male' ? 0.15 : 0.25;
    leanBodyMass = weight * (1 - estimatedBodyFat);
  }
  
  // 1. Calcolo BMR con la formula ibrida con correzione massa grassa
  // BMR = (10 × peso) + (6.25 × altezza) - (5 × età) + S - (12 × peso × %grasso)
  const genderFactor = gender === 'male' ? 5 : -161;
  
  let bmr;
  if (bodyFat !== null) {
    // Formula con correzione massa grassa se disponibile
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + genderFactor - (12 * weight * bodyFat);
  } else {
    // Formula standard senza correzione massa grassa
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + genderFactor;
  }
  
  // 2. Calcolo componenti del TDEE
  
  // 2.1 NEAT (Non-Exercise Activity Thermogenesis) - attività quotidiana non legata all'esercizio
  let neat = 0;
  
  // Fattori di attività lavorativa per NEAT
  const workNeatFactors = {
    sedentary: bmr * 0.1,      // +10% del BMR
    light: bmr * 0.2,          // +20% del BMR
    moderate: bmr * 0.3,       // +30% del BMR
    heavy: bmr * 0.4,          // +40% del BMR
    veryHeavy: bmr * 0.5,      // +50% del BMR
  };
  
  neat += workNeatFactors[formData.workActivity] || 0;
  
  // Passi giornalieri (approssimazione: 0.03 calorie per passo per un adulto di peso medio)
  const dailySteps = parseFloat(formData.dailySteps || 0);
  const stepsFactor = dailySteps * 0.03;
  neat += stepsFactor;
  
  // 2.2 EAT (Exercise Activity Thermogenesis) - attività fisica da esercizio
  let eat = 0;
  
  // Allenamento in palestra
  const trainingDailyFactors = {
    light: 150,     // calorie bruciate per giorno di allenamento leggero
    moderate: 250,  // calorie bruciate per giorno di allenamento moderato
    intense: 350,   // calorie bruciate per giorno di allenamento intenso
    veryIntense: 500 // calorie bruciate per giorno di allenamento molto intenso
  };
  
  // Calcolo calorie settimanali da allenamento in palestra
  const trainingDays = parseInt(formData.trainingDays || 0);
  const trainingLevel = formData.trainingLevel || 'light';
  const trainingCaloriesPerWeek = trainingDays * (trainingDailyFactors[trainingLevel] || 0);
  
  // Altri sport
  const otherSportsDailyFactors = {
    light: 150,     // calorie bruciate per giorno di sport leggero
    moderate: 300,  // calorie bruciate per giorno di sport moderato
    intense: 500,   // calorie bruciate per giorno di sport intenso
    veryIntense: 700 // calorie bruciate per giorno di sport molto intenso
  };
  
  // Calcolo calorie settimanali da altri sport
  const otherSportsDays = parseInt(formData.otherSportsDays || 0);
  const otherSportsLevel = formData.otherSports || 'light';
  const otherSportsCaloriesPerWeek = otherSportsDays * (otherSportsDailyFactors[otherSportsLevel] || 0);
  
  // Converti calorie settimanali in giornaliere
  eat = (trainingCaloriesPerWeek + otherSportsCaloriesPerWeek) / 7;
  
  // Calcolo iniziale del TDEE (senza TEF ancora)
  const tdeeWithoutTef = bmr + neat + eat;
  
  // 2.3 TEF (Termogenesi da cibo) - 10% del TDEE
  const tef = 0.1 * tdeeWithoutTef;
  
  // Calcolo finale del TDEE
  const tdee = tdeeWithoutTef + tef;
  
  console.log("Calcolo dettagliato:", {
    bmr,
    neat,
    eat,
    tef,
    tdee,
    leanBodyMass
  });
  
  return {
    bmr: Math.round(bmr) || 0,
    neat: Math.round(neat) || 0,
    eat: Math.round(eat) || 0,
    tef: Math.round(tef) || 0,
    tdee: Math.round(tdee) || 0,
    leanBodyMass: Math.round(leanBodyMass * 10) / 10 || 0, // Arrotonda a 1 decimale
  };
};

  const calculateFinalResults = () => {
    const { tdee, leanBodyMass, bmr, neat, eat, tef } = calculationData;
    
    // Calcolo macronutrienti basato sui grammi per kg di massa magra
    const proteins = leanBodyMass * macroSettings.proteinPerKg;
    const fats = leanBodyMass * macroSettings.fatPerKg;
    
    // Calcolo calorie da proteine e grassi
    const proteinCalories = proteins * 4; // 4 calorie per grammo
    const fatCalories = fats * 9; // 9 calorie per grammo
    
    // Calorie rimanenti per i carboidrati
    const remainingCalories = tdee - proteinCalories - fatCalories;
    const carbs = remainingCalories / 4; // 4 calorie per grammo
    
    setResults({
      bmr: bmr,
      neat: neat,
      eat: eat,
      tef: tef,
      tdee: tdee,
      leanBodyMass: leanBodyMass,
      macros: {
        proteins: Math.round(proteins),
        carbs: Math.max(0, Math.round(carbs)), // Evita valori negativi
        fats: Math.round(fats),
      },
      bodyFatProvided: formData.bodyFat && formData.bodyFat !== '',
      macroPercentages: {
        proteins: Math.round((proteinCalories / tdee) * 100),
        carbs: Math.round((remainingCalories / tdee) * 100),
        fats: Math.round((fatCalories / tdee) * 100),
      }
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm formData={formData} onChange={handleFormChange} />;
      case 1:
        return <ActivityLevelForm formData={formData} onChange={handleFormChange} />;
      case 2:
        return <MacroCustomizer 
                  macroSettings={macroSettings} 
                  onChange={handleMacroSettingsChange} 
                  leanBodyMass={calculationData.leanBodyMass} 
                  tdee={calculationData.tdee} 
               />;
      case 3:
        return <LeadForm onSubmitSuccess={handleLeadSubmit} onOpenPrivacy={() => setShowPrivacy(true)} />;
      case 4:
        return <ResultsDisplay results={results} />;
      default:
        return 'Passo sconosciuto';
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return !formData.age || !formData.height || !formData.weight;
    }
    if (activeStep === 1) {
      return !formData.dailySteps;
    }
    return false;
  };

  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          {/* Logo */}
          <img 
            src="./images/logo.png" 
            alt="Logo" 
            style={{ 
              maxWidth: '150px', 
              maxHeight: '150px',
              objectFit: 'contain'
            }} 
          />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Calcolatore TDEE
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {steps[activeStep]}
          </Typography>
        </Box>

        {/* Barra di progresso in alto */}
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={(activeStep / (steps.length - 1)) * 100} 
            sx={{ height: 10, borderRadius: 5 }} 
          />
        </Box>

        {/* Contenuto principale o Privacy */}
        {showPrivacy ? (
          <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
        ) : (
          <>
            <Box sx={{ mx: 'auto', maxWidth: 600 }}>
              {getStepContent(activeStep)}
            </Box>

            {/* Pulsanti di navigazione in fondo */}
            {activeStep !== 3 && (
              <Box sx={{ 
                mx: 'auto', 
                maxWidth: 600, 
                mt: 3,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                {activeStep === steps.length - 1 ? (
                  <Button 
                    onClick={handleReset} 
                    variant="outlined" 
                    fullWidth
                  >
                    Ricomincia
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="large" 
                      onClick={handleBack} 
                      disabled={activeStep === 0}
                      startIcon={<KeyboardArrowLeft />}
                      variant="outlined"
                      sx={{ minWidth: '120px' }}
                    >
                      Indietro
                    </Button>
                    <Button 
                      size="large" 
                      onClick={handleNext} 
                      disabled={isNextDisabled()}
                      endIcon={<KeyboardArrowRight />}
                      variant="contained"
                      sx={{ minWidth: '120px' }}
                    >
                      {activeStep === 2 ? 'Calcola' : 'Avanti'}
                    </Button>
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  </ThemeProvider>
);
}

export default App;