import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';

type ModelProps = {
  url: string;
};

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene, animations } = useGLTF(url); 
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]];
      action?.play();
      action?.setDuration(15);
    }
  }, [actions]);

  scene.rotation.set(0, 8.5, 0);
  return <primitive object={scene} scale={[2, 2, 2]} />;
};

const ModelViewer: React.FC = () => {
  return (
    <Canvas className='modelo'
      style={{ width: '100%', height: '90vh' }}
      camera={{ position: [0, 5, 10], fov: 35 }}
      gl={{ antialias: true }}
      onCreated={(state) => {
        state.gl.setClearColor('#137ED0');
      }}
    >
        {/* Iluminação */}
            <ambientLight color="#A1C6C5" intensity={1} /> {/* Luz ambiente branca */}
      
      {/* Luzes direcionais adicionais */}
      <directionalLight position={[5, 5, 5]} intensity={3} color="#FF28C9" /> {/* Luz direcional vermelha */}
      <directionalLight position={[-5, 5, 5]} intensity={2} color="#6EEAE2" /> {/* Luz direcional verde */}
      <directionalLight position={[5, -5, -5]} intensity={10} color="#0047a5" /> {/* Luz direcional azul */}
      <directionalLight position={[-5, -5, -5]} intensity={.5} color="#0047a5" /> {/* Luz direcional amarela */}
      <directionalLight position={[10, 0, 0]} intensity={2} color="#cc2c2c" /> {/* Luz direcional ciano */}
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={true} />
      <Model url="/models/scene.gltf" />
    </Canvas>
  );
};

export default ModelViewer;
