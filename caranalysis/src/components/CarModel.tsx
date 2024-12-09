import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import gsap from 'gsap'; // Importando gsap para animação suave

type ModelProps = {
  url: string;
  position: number;
};

const Model: React.FC<ModelProps> = ({ url, position }) => {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  // Inicializando a animação quando o componente for montado
  useEffect(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]];
      action?.play();
      action?.setDuration(17);
    }
  }, [actions]);

  // Manter a rotação do modelo
  useEffect(() => {
    scene.rotation.set(0, 8.5, 0);
  }, [scene]);

  // Atualizando a posição do modelo 3D com base no 'position' recebido como prop
  useEffect(() => {
    gsap.to(scene.position, {
      x: position, // Movendo para a nova posição
      duration: 2,
      ease: 'power3.out',
    });
  }, [position, scene]);

  return <primitive object={scene} scale={[2, 2, 2]} />;
};

const ModelViewer: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  // Detectar a rolagem da página
  const handleScroll = () => {
    setScrollY(window.scrollY);
    // Mostrar o texto quando rolar mais de 100px
    if (window.scrollY > 5) {
      setTextVisible(true);
    } else {
      setTextVisible(false);
    }
  };

  // Adicionando o listener de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular a posição com base no scroll
  const position = Math.min(scrollY / 3, 3.5); // Limitar a translação a um valor máximo de 4

  // Calcular o fov da câmera com base na posição
  const fov = scrollY > 100 ? 35 : 20; // Fov de 35 quando movido para baixo, 20 no topo

  // Adicionando animação do texto (entrando de baixo para cima)
  useEffect(() => {
    const canvasText = document.querySelector('.canvas-text');
    if (canvasText && textVisible) {
      gsap.to(canvasText, {
        y: 0, // Faz o texto subir para a posição inicial
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });
    } else {
      gsap.to('.canvas-text', {
        y: '100%', // Texto começa fora da tela
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [textVisible]);

  return (
    <div className="model-viewer-container">
      {/* Degradê */}
      <div className="gradient-overlay"></div>

      {/* Texto sobre o canvas */}
      <div className={`canvas-text ${textVisible ? 'show' : ''}`}>
        <h1>CAR ANALYSIS</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus earum</p>
        <button>Teste agora!</button>
      </div>

      {/* Canvas */}
      <Canvas
        className="modelo"
        camera={{ position: [0, 5, 20], fov }} // Fov dinâmico
        gl={{ antialias: true }}
        onCreated={(state) => {
          state.gl.setClearColor('#011124');
        }}
      >
        {/* Iluminação */}
        <ambientLight color="#A1C6C5" intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={3} color="#FF28C9" />
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#6EEAE2" />
        <directionalLight position={[5, -5, -5]} intensity={10} color="#0047a5" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#0047a5" />
        <directionalLight position={[10, 0, 0]} intensity={2} color="#cc2c2c" />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={true} />
        <Model url="/models/scene.gltf" position={position} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
