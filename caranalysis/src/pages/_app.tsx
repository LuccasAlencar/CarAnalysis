import { AppProps } from 'next/app';
import Navbar from '../components/NavBar'; 
import '../styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <div>
        <Navbar/>  
        <Component {...pageProps} />  
    </div>
  );
}

export default MyApp;