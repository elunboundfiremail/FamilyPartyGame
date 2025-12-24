import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3g3mE4G6IFFB5wNAn_r2OWSymdaa0L-A",
  authDomain: "family-party-3.firebaseapp.com",
  databaseURL: "https://family-party-3-default-rtdb.firebaseio.com",
  projectId: "family-party-3",
  storageBucket: "family-party-3.firebasestorage.app",
  messagingSenderId: "1099076939270",
  appId: "1:1099076939270:web:b8dff85f0da98da0431d87"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
