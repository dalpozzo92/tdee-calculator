import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/tdee-calculator/', // Aggiungi questa riga (sostituisci con il nome del tuo repository)

})
