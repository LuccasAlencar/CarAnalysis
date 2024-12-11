'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import gsap from 'gsap';

type ModelProps = {
  url: string;
  scale: number[];
  position: number[];
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
    // Atualiza a posição do modelo dinamicamente
    gsap.to(scene.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1,
      ease: 'power3.out',
    });
  }, [position, scene]);

  return <primitive object={scene} scale={scale} />;
};

const ModelViewer: React.FC = () => {
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0, .6, 0]); // Posição inicial do modelo
  const [textVisible, setTextVisible] = useState(false);

  const handleResize = () => {
    const width = window.innerWidth;

    // Ajusta o tamanho do modelo 3D dinamicamente
    const newScale = Math.max(1, Math.min(2, width / 1500)); // Ajuste dinâmico entre 1 e 2
    setScale([newScale, newScale, newScale]);

    // Centraliza o modelo em telas menores que 1180px
    if (width <= 1180) {
      setPosition([0, 0, 0]); // Centraliza o modelo no eixo Y
    }
  };

  const handleScroll = () => {
    const width = window.innerWidth;
    const scrollPos = window.scrollY;

    setTextVisible(scrollPos > 5); // Atualiza a visibilidade

    if (width > 1180) {
      // Para telas maiores, move diagonalmente
      setPosition([Math.min(scrollPos / 2, 1.7), -Math.min(scrollPos / 2, 1.6), 0]);
    } else if (width <= 1180) {
      // Para telas menores, move somente no eixo Y
      setPosition([0, -Math.min(scrollPos / 5, .8), 0]);
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
  }, []);

  const fov = 20; // Mantém um valor fixo de fov

  useEffect(() => {
    const canvasText = document.querySelector('.canvas-texto');
    const gradientOverlay = document.querySelector('.gradiente-sobreposicao');

    if (canvasText && gradientOverlay) {
      if (textVisible) {
        gsap.to(canvasText, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        });

        gsap.to(gradientOverlay, {
          opacity: 0.5,
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        gsap.to(canvasText, {
          y: '100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        });

        gsap.to(gradientOverlay, {
          opacity: 0.35,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    }
  }, [textVisible]);

  return (
    <div className="container-visualizador-modelo">
      <div className="gradiente-sobreposicao"></div>
      <div className={`canvas-texto ${textVisible ? 'show' : ''}`}>
        <h1>CAR ANALYSIS</h1>
        <p>O futuro do diagnóstico automotivo está aqui. Teste nossa IA hoje e cuide do seu carro com mais confiança!</p>
        <button>Teste agora!</button>
      </div>
      <Canvas
        className="modelo"
        camera={{ position: [0, 5, 20], fov }}
        gl={{ antialias: true }}
      >
        <ambientLight color="#A1C6C5" intensity={1} />
        <directionalLight position={[3, 5, 5]} intensity={5} color="#FF28C9" />
        <directionalLight position={[-5, 5, 5]} intensity={2.5} color="#6EEAE2" />
        <directionalLight position={[-3, -15, 1]} intensity={25} color="#d84e4e" />
        <Model url="/models/scene.gltf" scale={scale} position={position} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;



