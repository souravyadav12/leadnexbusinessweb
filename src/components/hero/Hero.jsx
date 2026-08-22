import HeroContent from './HeroContent';
import HeroDashboard from './HeroDashboard'; // Tumhara right side wala UI component

export default function Hero() {
  return (
    // overflow-x-hidden guarantee karta hai ki horizontal scroll nahi aayega
    <section className="relative w-full overflow-x-hidden min-h-[100svh] flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* Grid container ko strictly max-w-7xl diya hai */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Content */}
        <div className="w-full flex justify-center lg:justify-start">
          <HeroContent />
        </div>

        {/* Right Side: Dashboard UI */}
        {/* yahan pe fixed width ko constrain karne ke liye wrapper banaya hai */}
        <div className="w-full flex justify-center lg:justify-end relative">
          <div className="w-full max-w-[100vw] sm:max-w-md lg:max-w-xl xl:max-w-2xl overflow-hidden rounded-2xl lg:overflow-visible">
            {/* Dashboard Component yahan render hoga */}
            <HeroDashboard />
          </div>
        </div>
        
      </div>
    </section>
  );
}