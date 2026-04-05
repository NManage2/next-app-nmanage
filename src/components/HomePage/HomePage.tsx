import Hero from './Hero/Hero';
import WebPlan from './WebPlan/WebPlan';

const HomePage = () => {
  console.log('homepage is called');
  return (
    <div>
      <Hero />
      <WebPlan />
    </div>
  );
};

export default HomePage;
