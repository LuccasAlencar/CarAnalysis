import Image from 'next/image';
import Link from 'next/link';

const Header = () => {

  return (
    <header>
      <nav className="NavBar">
        <Link href="/" className='Logo'>
          <Image src="/images/logo-car.svg" alt="" width={210} height={50}/>
        </Link>
        <div className="ItemsNav">
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/">Chat</Link></li>
            <li><Link href="/">Meu Carro</Link></li>
          </ul>
          <button className='Login'>Entrar</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
