import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import gsap from 'gsap';

type ModelProps = {
  url: string;
  scale: number[];
  position: number;
};

const Model: React.FC<ModelProps> = ({ url, scale, position }) => {
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]];
      action?.play();
      action?.setDuration(17);
    }
  }, [actions]);

  useEffect(() => {
    scene.rotation.set(0, 8.5, 0);
  }, [scene]);

  useEffect(() => {
    gsap.to(scene.position, {
      x: position,
      duration: 2,
      ease: 'power3.out',
    });
  }, [position, scene]);

  return <primitive object={scene} scale={scale} />;
};

const ModelViewer: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState(0); // Controla a posição do modelo
  const [textVisible, setTextVisible] = useState(false);

  const handleResize = () => {
    const width = window.innerWidth;

    // Ajusta o tamanho do modelo 3D dinamicamente
    const newScale = Math.max(1, Math.min(2, width / 800)); // Ajuste dinâmico entre 1 e 2
    setScale([newScale, newScale, newScale]);

    // Centraliza o modelo em telas menores que 500px
    if (width <= 500) {
      setPosition(0);
    } else if (width > 1150) {
      setPosition(Math.min(scrollY / 2, 2.5)); // Ajusta para telas maiores
    } else if (width <= 768) {
      setPosition(Math.min(scrollY / 2, 1.5)); 
    }
  };

  const handleScroll = () => {
    const width = window.innerWidth;

    setScrollY(window.scrollY);
    setTextVisible(window.scrollY > 5);

    // Atualiza a posição do modelo apenas para telas maiores
    if (width > 500) {
      setPosition(Math.min(window.scrollY / 2, 2.5)); // Limita a 2.5
    } else if (width <= 500) {
      setPosition(0); // Centraliza em telas menores
    } 
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize(); // Aplica os ajustes na montagem inicial
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const fov = 20; // Mantém um valor fixo de fov

  useEffect(() => {
    const canvasText = document.querySelector('.canvas-text');
    const gradientOverlay = document.querySelector('.gradient-overlay');

    if (textVisible) {
      // Quando o texto estiver visível
      gsap.to(canvasText, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });

      // Aumentar a opacidade do fundo
      gsap.to(gradientOverlay, {
        opacity: 0.5,
        duration: 1,
        ease: 'power3.out',
      });
    } else {
      // Quando o texto não estiver visível
      gsap.to(canvasText, {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Reduzir a opacidade do fundo
      gsap.to(gradientOverlay, {
        opacity: 0.35,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [textVisible]);

  return (
    <div className="model-viewer-container">
      <div className="gradient-overlay"></div>
      <div className={`canvas-text ${textVisible ? 'show' : ''}`}>
        <h1>CAR ANALYSIS</h1>
        <p>O futuro do diagnóstico automotivo está aqui. Teste nossa IA hoje e cuide do seu carro com mais confiança!</p>
        <button>Teste agora!</button>
      </div>
      <Canvas
        className="modelo"
        camera={{ position: [0, 5, 20], fov }}
        gl={{ antialias: true }}
        onCreated={(state) => state.gl.setClearColor('#011124')}
      >
        <ambientLight color="#A1C6C5" intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={3} color="#FF28C9" />
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#6EEAE2" />
        <Model url="/models/scene.gltf" scale={scale} position={position} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
