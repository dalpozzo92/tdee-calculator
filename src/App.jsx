import { useState, useRef } from 'react';
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
import { LinearProgress } from '@mui/material';

// Tema scuro
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#90caf9',
            },
          },
        },
      },
    },
  },
});

const steps = ['Informazioni personali', 'Livello di attività', 'Personalizza macros', 'Risultati'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    bodyFat: '',
    workActivity: 'sedentary',
    trainingLevel: 'none',
    otherSports: 'none',
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

  const handleNext = () => {
    if (activeStep === 1) {
      const preCalculation = calculatePreResults();
      setCalculationData(preCalculation);
    }
    
    if (activeStep === 2) {
      calculateFinalResults();
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    // Scroll to top of container when changing steps
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // Scroll to top of container when changing steps
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
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
      trainingLevel: 'none',
      otherSports: 'none',
      dailySteps: '',
    });
    setMacroSettings({
      proteinPerKg: 2.0,
      fatPerKg: 0.8,
    });
    setResults(null);
    // Scroll to top of container when resetting
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleMacroSettingsChange = (field, value) => {
    setMacroSettings({
      ...macroSettings,
      [field]: value,
    });
  };

  const calculatePreResults = () => {
    // Calcolo del BMR (Basal Metabolic Rate)
    let bmr;
    let leanBodyMass;
    
    // Calcolo della massa magra
    if (formData.bodyFat && formData.bodyFat !== '') {
      const bodyFatPercentage = parseFloat(formData.bodyFat) / 100;
      leanBodyMass = parseFloat(formData.weight) * (1 - bodyFatPercentage);
      bmr = 370 + (21.6 * leanBodyMass);
    } 
    else {
      // Stima approssimativa della massa magra in base al sesso
      const estimatedBodyFat = formData.gender === 'male' ? 0.15 : 0.25; // 15% uomini, 25% donne (media)
      leanBodyMass = parseFloat(formData.weight) * (1 - estimatedBodyFat);
      
      // Formula di Harris-Benedict
      if (formData.gender === 'male') {
        bmr = 88.362 + (13.397 * parseFloat(formData.weight)) + (4.799 * parseFloat(formData.height)) - (5.677 * parseFloat(formData.age));
      } else {
        bmr = 447.593 + (9.247 * parseFloat(formData.weight)) + (3.098 * parseFloat(formData.height)) - (4.330 * parseFloat(formData.age));
      }
    }

    // Fattori di attività lavorativa
    const workFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725,
      veryHeavy: 1.9,
    };

    // Fattori di allenamento
    const trainingFactors = {
      none: 0,
      light: 200,
      moderate: 300,
      intense: 500,
      veryIntense: 700,
    };

    // Fattori per altri sport
    const sportsFactors = {
      none: 0,
      light: 150,
      moderate: 250,
      intense: 400,
      veryIntense: 600,
    };

    // Calcolo calorie per passi (approssimazione: 0.04 calorie per passo per un adulto di peso medio)
    const stepsFactor = parseFloat(formData.dailySteps || 0) * 0.04;
    
    // Calcolo TDEE combinando tutti i fattori
    const workTDEE = bmr * workFactors[formData.workActivity];
    const tdee = workTDEE + trainingFactors[formData.trainingLevel] + sportsFactors[formData.otherSports] + stepsFactor;
    
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      leanBodyMass: Math.round(leanBodyMass * 10) / 10, // Arrotonda a 1 decimale
    };
  };

  const calculateFinalResults = () => {
    const { tdee, leanBodyMass } = calculationData;
    
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
      bmr: calculationData.bmr,
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
      <Box 
        sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          bgcolor: 'background.default',
          overflowX: 'hidden',
          pt: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: 4 }
        }}
      >
        <Container 
          maxWidth="md" 
          sx={{ 
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto'
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              width: '100%',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {/* Logo */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img 
                  src="/images/logo.png" 
                  alt="Logo" 
                  style={{ 
                    maxWidth: '150px', 
                    maxHeight: '150px',
                    objectFit: 'contain'
                  }} 
                />
              </Box>
              
              <Typography variant="h4" component="h1" gutterBottom>
                Calcolatore TDEE
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                {steps[activeStep]}
              </Typography>
            </Box>

            {/* Custom Stepper alternative */}
            <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
              <LinearProgress 
                variant="determinate" 
                value={(activeStep / (steps.length - 1)) * 100} 
                sx={{ height: 10, borderRadius: 5 }} 
              />
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 1,
                  '& .MuiButton-root': {
                    minWidth: '100px'
                  }
                }}
              >
                <Button 
                  size="small" 
                  onClick={handleBack} 
                  disabled={activeStep === 0}
                  startIcon={<KeyboardArrowLeft />}
                >
                  Indietro
                </Button>
                <Button 
                  size="small" 
                  onClick={handleNext} 
                  disabled={isNextDisabled() || activeStep === steps.length - 1}
                  endIcon={<KeyboardArrowRight />}
                >
                  {activeStep === steps.length - 2 ? 'Calcola' : 'Avanti'}
                </Button>
              </Box>
            </Box>

            {/* Contenuto principale con scroll migliorato */}
            <Box 
              ref={containerRef}
              sx={{ 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box sx={{ width: '100%', maxWidth: '600px' }}>
                {getStepContent(activeStep)}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Box sx={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between' }}>
                {activeStep === steps.length - 1 && (
                  <Button 
                    onClick={handleReset} 
                    variant="outlined" 
                    fullWidth
                  >
                    Ricomincia
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;