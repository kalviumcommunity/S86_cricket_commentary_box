import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CommentaryCard from "../components/CommentaryCard";


const LandingPage = () => {
  return (
    <div
      className="flex relative flex-col min-h-screen text-white"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1176722220/photo/empty-green-grass-field-and-illuminated-outdoor-stadium-with-fans-front-field-view.jpg?s=612x612&w=0&k=20&c=YFh_7QVyJKuF9iBFgX4QF9c4-ojJE0_vCJjeORQExX4=')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute top-0 w-full h-full"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
              Welcome to the Cricket Commentary Box
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl drop-shadow-lg">
              Generate fun, exaggerated, and hilarious cricket commentary for your favorite matches.
            </p>
            <Button text="Get Started" />

            <div className="mt-10">
              <CommentaryCard
                commentator="Mukesh"
                style="Over-the-Top"
                text="Boom! That's not just a six, that's a missile launched into the stands!"
              />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
