import Image from 'next/image';

const HomePage = () => {
  return (
    <section className="Section-1">
      <Image 
        src="/images/video-site.gif" 
        alt="video site" 
        layout="fill" 
        objectFit="cover" 
      />

      <div className="overlay"></div>

      <div className="LogoSection1">
        <Image 
          src="/images/logo-car.svg" 
          alt="logo site" 
          layout="intrinsic" 
          width={660} 
          height={100} 
        />
      </div>
    </section>
  );
};

export default HomePage;
