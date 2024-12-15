import { useEffect } from 'react';
import Image from 'next/image';


const Secao3 = () => {
    useEffect(() => {
        const handleScroll = () => {
            const paragraphs = document.querySelectorAll('.secao-3-content p');
            const image = document.querySelector('.secao-3-image');

            // Animação dos parágrafos conforme o scroll
            paragraphs.forEach((p) => {
                const paragraphRect = p.getBoundingClientRect();
                if (paragraphRect.top < window.innerHeight && paragraphRect.bottom > 0) {
                    p.classList.add('visible');
                } else {
                    p.classList.remove('visible');
                }
            });

            // Animação da imagem conforme o scroll
            if (image) {
                const lastParagraph = paragraphs[paragraphs.length - 1];
                const lastRect = lastParagraph?.getBoundingClientRect();

                if (lastRect && lastRect.bottom <= 0) {
                    image.classList.add('overlay'); // Altere para 'overlay' para garantir a sobreposição
                } else {
                    image.classList.remove('overlay');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div className="secao-3-elements">
        <div className="secao-3-content">
          <h2>Funcionalidades da Plataforma</h2>
          <div className="image-container">
            <Image 
              src="/images/greenvolt.png" 
              alt="Logo" 
              width={350} 
              height={450} 
              className="secao-3-image"
            />
          </div>
          <p>Diagnóstico de problemas</p>
          <p>Relatórios exportáveis</p>
          <p>Controle completo das manutenções do seu veículo</p>
          <p>O futuro da tecnologia automotiva, ao seu alcance!</p>
        </div>
      </div>
    );
};

export default Secao3;
