import { FaPlay } from "react-icons/fa";
import Moviecarousel from "../components/Moviecarousel";
import TextPressure from "../components/textpressure";
import Movies from "../components/movies";
import BreakingBadImg from "../assets/Breaking_Bad.jpg"; // import image

const Homepage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-screen px-10 flex flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6), #00000033, rgba(0,0,0,0)), url(${BreakingBadImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 max-w-lg">Breaking Bad</h1>
        <p className="text-lg md:text-xl mb-6 max-w-md">
          A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family's future.
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-white text-black font-semibold rounded-md transition transform hover:scale-105">
            <FaPlay /> Watch Trailer
          </button>
          <button className="px-4 py-2 border border-white hover:bg-black text-white font-semibold rounded-md transition transform hover:scale-105">
            Details
          </button>
        </div>
      </div>

      {/* Trending Text */}
      <section className="py-16 text-center relative h-24 md:h-32">
        <TextPressure
          className="absolute inset-0"
          text="Trending!"
          flex={false}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={24}
        />
      </section>

      {/* Movie Carousel */}
      <section className="px-4 md:px-16 pb-16">
        <Moviecarousel />
      </section>

      {/* Movies Grid */}
      <section className="px-4 md:px-16 pb-16">
        <Movies />
      </section>
    </div>
  );
};

export default Homepage;