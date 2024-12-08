import React from 'react';
import dynamic from 'next/dynamic';

const ModelViewer = dynamic(() => import('../components/CarModel'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div>
      <ModelViewer />
    </div>
  );
};

export default Home;
