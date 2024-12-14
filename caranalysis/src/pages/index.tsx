// src/paginas/index.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import Section1 from '../components/secao_1';
import Section2 from '../components/secao_2';
import Section3 from '../components/secao_3';
import Section4 from '../components/secao_4';
import Footer from '../components/footer';


const ModeloCarro = dynamic(() => import('../components/car_model'), { ssr: false });

const Inicio: React.FC = () => {
  return (
    <div>
      <ModeloCarro />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
};

export default Inicio;
