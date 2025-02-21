/*import Image from 'next/image';*/

const secao4= () => {
    return (
      <div className="secao-4-elements">
        <div className="secao-4-content">
          <h2>Planos e Preços</h2>
          <div className="wrap-card">
            <div className="secao-4-content-outside-card">
              <h3>Escolha o Plano Ideal para Você</h3>
              <p>Nossa plataforma oferece um plano inicial gratuito para diagnósticos
                básicos e uso do chatbot. Porém, para uma experiência ainda mais completa, confira
                nosso plano premium:</p>
            </div>
              <div className="secao-4-content-card">
                <h4>A partir de:</h4>
                <h4 className="secao-4-content-card-preco">R$20</h4>
                <h4 className="secao-4-content-card-mes">/mês</h4>
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
      </div>
    );
  };
  
  export default secao4;
  