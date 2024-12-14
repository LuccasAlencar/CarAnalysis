import { useEffect, useState } from 'react';
import gsap from 'gsap';  // Certifique-se de importar o gsap corretamente
import Image from 'next/image';

const Secao1 = () => {
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;

      // Ativar animação quando o scroll passar de 150px
      if (scrollPosition > 150) {
        setShowElements(true);
      } else {
        setShowElements(false);
      }
    };

    // Adicionando evento de scroll
    window.addEventListener('scroll', onScroll);

    // Aplicando animações com GSAP
    if (showElements) {
      gsap.to('.secao-1-content-image', {
        opacity: 1,
        x: 0,  // Desliza a imagem de volta para a posição inicial
        duration: .5,
        ease: 'power3.out',
      });
      gsap.to('.secao-1-content-text', {
        opacity: 1,
        x: 0,  // Desliza o texto de volta para a posição inicial
        duration: .5,
        ease: 'power3.out',
      });
    } else {
      gsap.to('.secao-1-content-image', {
        opacity: 0,
        x: '-100%',  // Esconde a imagem deslizando para a esquerda
        duration: .5,
        ease: 'power3.out',
      });
      gsap.to('.secao-1-content-text', {
        opacity: 0,
        x: '-100%',  // Esconde o texto deslizando para a esquerda
        duration: .5,
        ease: 'power3.out',
      });
    }

    // Remover evento de scroll quando o componente for desmontado
    return () => window.removeEventListener('scroll', onScroll);
  }, [showElements]);  // A animação será disparada sempre que `showElements` mudar

  return (
    <div className={`secao-1-elements ${showElements ? 'show' : ''}`}>
      <div className="secao-1-content">
        <Image
          src="/images/chatbot-image2.png"
          alt="Imagem Aleatória"
          width={600}
          height={600}
          className="secao-1-content-image"
        />
        <div className="secao-1-content-text">
          <h2>Diagnóstico Inteligente para seu Veículo</h2>
          <p>
            Com nossa IA, você tem acesso a diagnósticos automotivos de última geração. Descreva os sintomas ou dúvidas sobre o
            seu veículo, e nossa inteligência artificial irá oferecer respostas rápidas e precisas, tudo ao seu alcance!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Secao1;
