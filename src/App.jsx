import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainAnalysis from './components/PainAnalysis';
import Pricing from './components/Pricing';
import Referral from './components/Referral';
import AIFeatures from './components/AIFeatures';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainAnalysis />
        <Pricing />
        <Referral />
        <AIFeatures />
      </main>
      <Footer />
    </>
  );
}

export default App;
