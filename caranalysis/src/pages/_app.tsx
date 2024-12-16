import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/navbar'; 
import '../styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <AuthProvider>
        <Navbar/>  
        <Component {...pageProps} />  
    </AuthProvider>
  );
}

export default MyApp;