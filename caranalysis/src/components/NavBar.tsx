import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [is_visible, set_is_visible] = useState(false);
  const [last_scroll_y, set_last_scroll_y] = useState(0);
  const router = useRouter();
  const is_home_page = router.pathname === '/';

  useEffect(() => {
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
  }, [last_scroll_y, is_visible]);

  return (
    <header className={`navbar ${is_home_page ? 'glass-effect' : ''} ${is_visible ? 'visible' : ''}`}>
      <nav>
        <Link href="/" className="logo">
          <Image src="/images/logo-car.svg" alt="Logo" width={210} height={50} />
        </Link>
        <div className="items-nav">
          <ul>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/">Chat</Link>
            </li>
            <li>
              <Link href="/">Meu Carro</Link>
            </li>
          </ul>
          <button className="login">Entrar</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
