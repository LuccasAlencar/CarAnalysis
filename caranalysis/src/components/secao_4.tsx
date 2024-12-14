/*import Image from 'next/image';*/

const secao4= () => {
    return (
      <div className="secao-4-elements">
        <div className="secao-4-content">
          <h2>Planos e Preços</h2>
          <h3>Escolha o Plano Ideal para Você</h3>
          <p>Nossa plataforma oferece um plano inicial gratuito para diagnósticos 
            básicos e uso do chatbot. Porém, para uma experiência ainda mais completa, confira 
            nosso plano premium:</p>
            <div className="secao-4-content-card">
              <h4>A partir de R$20/mês:</h4>
              <ul>
                <li>Adicione mais de um veículo à lista de tarefas de manutenção.</li>
                <li>Acesse gráficos detalhados de desempenho e histórico de manutenções.</li>
                <li>Respostas mais elaboradas e detalhadas no chatbot.</li>
              </ul>
              <p>Invista na saúde do seu veículo com uma solução acessível e prática!</p>
              <button>Assine Aqui!</button>
            </div>
        </div>
      </div>
    );
  };
  
  export default secao4;
  