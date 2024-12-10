import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false); // Controle da visibilidade
  const [lastScrollY, setLastScrollY] = useState(0); // Posição do scroll
  const router = useRouter();

  // Verifica se a página é a inicial
  const isHomePage = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Quando o usuário rolar para baixo e a navbar ainda não foi visível
      if (currentScrollY > lastScrollY && currentScrollY > 0 && !isVisible) {
        setIsVisible(true); // Navbar aparece ao rolar para baixo
      } else if (currentScrollY === 0) {
        setIsVisible(false); // No topo da página, a navbar fica invisível
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isVisible]); // Atualiza a dependência para incluir a visibilidade da navbar

  return (
    <header className={`NavBar ${isHomePage ? 'glass-effect' : ''} ${isVisible ? 'visible' : ''}`}>
      <nav>
        <Link href="/" className="Logo">
          <Image src="/images/logo-car.svg" alt="Logo" width={210} height={50} />
        </Link>
        <div className="ItemsNav">
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/">Chat</Link></li>
            <li><Link href="/">Meu Carro</Link></li>
          </ul>
          <button className="Login">Entrar</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
