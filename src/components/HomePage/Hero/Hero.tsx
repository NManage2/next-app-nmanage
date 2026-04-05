import Image from 'next/image';
import nm from '../../../../public/nm.png';
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-16">
      <div className="flex flex-col items-center md:items-start gap-8">
        <h2 className="text-8xl font-bold text-blue-500 text-center md:text-left">
          Hero Page
        </h2>
        <p className="text-gray-700 max-w-2xl text-center md:text-left ">
          New-Manage.. est une company de developpement des applications de
          gestion informatique comme la gestion des stocks, scolarité,
          pharmaceutique, laboratoire, entreprises....
        </p>
      </div>
      <div>
        <Image src={nm} alt="NManage.." width={300} height={300} />
      </div>
    </div>
  );
};

export default Hero;
