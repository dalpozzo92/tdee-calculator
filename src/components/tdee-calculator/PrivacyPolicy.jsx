import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PrivacyPolicy = ({ onBack }) => {
  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={onBack}
        sx={{ mb: 3 }}
        color="primary"
      >
        Torna al calcolatore
      </Button>
      
      <Paper elevation={0} sx={{ p: 4, backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main" fontWeight="bold">
          Informativa sulla Privacy
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
        </Typography>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
          1. Titolare del Trattamento
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Il titolare del trattamento dei dati è BST Crew. Per qualsiasi comunicazione inerente la privacy, è possibile contattarci all'indirizzo email indicato sul nostro sito web principale.
        </Typography>

        <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
          2. Dati Raccolti
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Durante l'utilizzo del nostro Calcolatore TDEE, raccogliamo volontariamente i seguenti dati personali:
          <br/>- Nome e Cognome (se forniti)
          <br/>- Indirizzo Email
          <br/>- Dati fisici ed abitudini di allenamento (Peso, Altezza, Età, Livello di attività) inseriti nel modulo per calcolare il fabbisogno calorico.
        </Typography>

        <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
          3. Finalità del Trattamento
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          I dati raccolti vengono utilizzati esclusivamente per le seguenti finalità:
          <br/>- <strong>Erogazione del servizio:</strong> Calcolare e fornire il report nutrizionale (TDEE).
          <br/>- <strong>Marketing (solo previo consenso espresso):</strong> Invio di comunicazioni commerciali, offerte relative ai nostri servizi di personal training ed aggiornamenti.
        </Typography>

        <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
          4. Base Giuridica
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Il trattamento dei dati per l'erogazione dei risultati si basa sul legittimo interesse di fornire il servizio richiesto. L'invio di comunicazioni di marketing si basa esclusivamente sul consenso esplicito dell'utente, revocabile in qualsiasi momento.
        </Typography>

        <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
          5. Conservazione e Condivisione dei Dati
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          I dati non vengono in alcun caso ceduti a terze parti a scopo di lucro. Vengono archiviati in modo sicuro, avvalendoci di infrastrutture Cloud conformi al GDPR. I dati verranno conservati per il tempo strettamente necessario a compiere le finalità per le quali sono stati raccolti.
        </Typography>

        <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 3 }}>
          6. Diritti dell'Utente (GDPR)
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          In ottemperanza al Regolamento Europeo 2016/679 (GDPR), l'utente ha il diritto di:
          <br/>- Ottenere l'accesso ai propri dati personali.
          <br/>- Chiederne la rettifica o la cancellazione (diritto all'oblio).
          <br/>- Revocare il consenso in qualsiasi momento (opt-out) da tutte le comunicazioni cliccando sull'apposito link presente nelle nostre email o contattandoci direttamente.
        </Typography>

      </Paper>
    </Box>
  );
};

export default PrivacyPolicy;
