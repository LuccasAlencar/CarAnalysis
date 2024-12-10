import React from 'react';
import dynamic from 'next/dynamic';
import RandomCard from '../components/teste';
const ModelViewer = dynamic(() => import('../components/CarModel'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div>
      <ModelViewer />
      <RandomCard/>
    </div>
  );
};

export default Home;
