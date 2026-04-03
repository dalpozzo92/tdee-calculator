import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LeadForm = ({ onSubmitSuccess, onOpenPrivacy }) => {
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    privacyAccepted: false,
    marketingAccepted: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setLeadData({
      ...leadData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email || !leadData.privacyAccepted) {
      setError('Compila i campi obbligatori ed accetta la privacy per proseguire.');
      return;
    }

    setError('');
    setLoading(true);

    // Sostituisci questo URL con quello che ti fornirà Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxV7FeNYhLoqkyLCDdDTyZnuurVG3oy5ZzfTxBLvDlOyal9M-FON101z4104WR8S6H8Q/exec';

    try {
      // In un setup reale toglieresti il commento a questa fetch:

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Spesso necessario con Google Apps Script dal frontend puro
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          marketing: leadData.marketingAccepted,
          date: new Date().toISOString()
        })
      });


      // Simuliamo ritardo di network per la demo
      await new Promise(resolve => setTimeout(resolve, 800));

      onSubmitSuccess(leadData);
    } catch (err) {
      console.error(err);
      // Avanza comunque in caso di errore di rete, per non bloccare mai l'utente
      onSubmitSuccess(leadData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 4
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary.light">
          Il tuo report è pronto!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Inserisci il tuo nome e la tua email per sbloccare i tuoi risultati dettagliati e scoprire il tuo piano nutrizionale.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, textAlign: 'left' }}>
          <TextField
            fullWidth
            label="Il tuo Nome"
            name="name"
            value={leadData.name}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Indirizzo Email"
            name="email"
            type="email"
            value={leadData.email}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
          />

          <FormGroup sx={{ mt: 2, mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="privacyAccepted"
                  checked={leadData.privacyAccepted}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Ho letto e accetto la{' '}
                  <Button
                    variant="text"
                    size="small"
                    onClick={(e) => { e.preventDefault(); onOpenPrivacy(); }}
                    sx={{ p: 0, minWidth: 0, verticalAlign: 'baseline', textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Privacy Policy
                  </Button>
                  {' '}* (Richiesto)
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="marketingAccepted"
                  checked={leadData.marketingAccepted}
                  onChange={handleChange}
                  color="secondary"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Acconsento a ricevere comunicazioni sui servizi ed offerte promozionali
                </Typography>
              }
            />
          </FormGroup>

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !leadData.privacyAccepted || !leadData.name || !leadData.email}
            sx={{
              mt: 1,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #00d4ff 30%, #8b5cf6 90%)',
              boxShadow: '0 3px 15px rgba(139, 92, 246, 0.4)',
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: '0 5px 25px rgba(139, 92, 246, 0.6)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'Sblocca i Miei Risultati'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LeadForm;
