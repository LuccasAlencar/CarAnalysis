import Image from 'next/image';
import { useEffect } from 'react';
import gsap from 'gsap'; // Importando o gsap

const Secao2 = () => {
  const cards = [
    { imageSrc: '/images/time.png', imageAlt: 'Imagem Aleatória 1', title: 'Economia de Tempo', text: 'Diagnósticos rápidos e precisos sem a necessidade de longas visitas ao mecânico.' },
    { imageSrc: '/images/money.png', imageAlt: 'Imagem Aleatória 2', title: 'Redução de Custos', text: 'Evite gastos desnecessários identificando o problema correto em poucas tentativas.' },
    { imageSrc: '/images/puzzle.png', imageAlt: 'Imagem Aleatória 3', title: 'Versatilidade', text: 'Funciona com uma ampla variedade de modelos e marcas de automóveis.' },
    { imageSrc: '/images/easy.png', imageAlt: 'Imagem Aleatória 4', title: 'Facilidade de Uso', text: ' Intuitivo tanto para motoristas quanto para profissionais da área automotiva.' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quando o card entra na tela, aplicamos a animação do GSAP
            gsap.to(entry.target, {
              y: 0, // Move o card para sua posição original
              opacity: 1, // Faz o card aparecer
              duration: .5,
              ease: 'power3.out',
            });
            entry.target.classList.add('visible'); // Marca o card como visível
          }
        });
      },
      { threshold: 0.2 } // Inicia a animação quando 50% do card está visível
    );

    const elements = document.querySelectorAll('.secao-2-content-inside-card');
    elements.forEach((el) => {
      // Inicialmente posiciona os cards acima e com opacidade 0
      gsap.set(el, { y: 50, opacity: 0 });
      observer.observe(el); // Observa os cards para animação
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="secao-2-elements">
      <div className="secao-2-content">
        <h2>Por Que Escolher o Car Analysis?</h2>
        <div className="secao-2-content-cards">
          {cards.map((card, index) => (
            <div className="secao-2-content-inside-card" key={index}>
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                width={60}
                height={60}
                className="secao-2-content-card-image"
              />
              <p className="secao-2-content-card-title">{card.title}</p>
              <p className="secao-2-content-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Secao2;
