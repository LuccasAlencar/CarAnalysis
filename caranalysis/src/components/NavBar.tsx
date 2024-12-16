import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [is_visible, set_is_visible] = useState(false);
  const [last_scroll_y, set_last_scroll_y] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const is_home_page = router.pathname === '/';

  // Lógica de visibilidade de scroll só para a página inicial
  useEffect(() => {
    if (!is_home_page) return;
    const handle_scroll = () => {
      const current_scroll_y = window.scrollY;
      if (current_scroll_y > last_scroll_y && current_scroll_y > 0 && !is_visible) {
        set_is_visible(true);
      } else if (current_scroll_y === 0) {
        set_is_visible(false);
      }
      set_last_scroll_y(current_scroll_y);
    };

    window.addEventListener('scroll', handle_scroll);
    return () => {
      window.removeEventListener('scroll', handle_scroll);
    };
  }, [last_scroll_y, is_visible, is_home_page]);

  // Fechar o menu quando navegar para outra página
  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false); // Fecha o menu ao mudar de página
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={`navbar ${is_home_page ? 'glass-effect' : 'solid-effect'} ${is_visible ? 'visible' : ''}`}>
      <nav>
        <div className="mobile-menu-icon">
          <button onClick={toggleMenu}>
            <Image src="/images/menu.svg" alt="Menu" width={35} height={35} />
          </button>
        </div>

        <Link href="/" className="logo">
          <Image src="/images/logo-car.svg" alt="Logo" width={160} height={40} />
        </Link>

        <div className="items-nav">
          <ul className={menuOpen ? 'open' : ''}>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/chat">Chat</Link></li>
            <li><Link href="/meu-carro">Meu Carro</Link></li>
            <li>
              <Link className='login' href={isLoggedIn ? '/dashboard' : '/login'}>
                {isLoggedIn ? 'Dashboard' : 'Login'}
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMenu}>✖</button>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/chat">Chat</Link></li>
          <li><Link href="/meu-carro">Meu Carro</Link></li>
          <li>
            <Link href={isLoggedIn ? '/dashboard' : '/login'}>
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Sair</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;