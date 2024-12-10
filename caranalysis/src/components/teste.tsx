import Image from 'next/image';

const RandomCard = () => {
  return (
    <div className="RandomCard">
<div className="wrap">
    
          <Image
            src="/images/chatbot-image2.png"
            alt="Imagem Aleatória"
            width={600}
            height={600}
            className="RandomCard__image"
          />
          <div className="RandomCard__content">
            <h2>Diagnóstico Inteligente para seu Veículo</h2>
            <p>
            Com nossa IA, você tem acesso a diagnósticos automotivos de última geração. 
            Descreva os sintomas ou dúvidas sobre o seu veículo, e nossa inteligência artificial 
            irá oferecer respostas rápidas e precisas, tudo ao seu alcance!
            </p>
          </div>
</div>
    </div>
  );
};

export default RandomCard;
