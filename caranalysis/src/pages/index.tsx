// src/paginas/index.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import CardAleatorio from '../components/teste';

const ModeloCarro = dynamic(() => import('../components/car_model'), { ssr: false });

const Inicio: React.FC = () => {
  return (
    <div>
      <ModeloCarro />
      <CardAleatorio />
    </div>
  );
};

export default Inicio;
