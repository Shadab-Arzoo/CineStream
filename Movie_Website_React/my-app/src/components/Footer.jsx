import "../CSS/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-white/10 bg-black px-6 py-8 text-zinc-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            CineStream • Built with React +{" "}
            <span className="font-bold text-yellow-400">
              TMDB
            </span>
          </p>
          <p className="text-sm">Browse trending, top-rated, and genre-based movies</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
