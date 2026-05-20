import { IoIosSearch } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import logo from '../assets/LogoDark.webp';
import newLogo from '../assets/cinestream_logo.png';
import '../CSS/header.css'; 

import { Link, useLocation } from "react-router-dom"
import Genre from "./Genre";

function Navbar(){
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const currentFeed = search.get("feed") || "popular";
    const hasGenre = Boolean(search.get("genre"));

    return <>
    <div className="navbar">
    <Link to="/"><img className="logo rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] object-cover" src={newLogo} alt="CineStream Logo" /></Link>
    <div className="btnDiv">
    <Link to="/" className={`btn ${!hasGenre && currentFeed === "popular" ? "active" : ""}`}>Popular</Link>
    <Link to="/?feed=trending" className={`btn ${currentFeed === "trending" ? "active" : ""}`}>Trending</Link>
    <Link to="/?feed=now-playing" className={`btn ${currentFeed === "now-playing" ? "active" : ""}`}>Now Playing</Link>
    <Link to="/?feed=upcoming" className={`btn ${currentFeed === "upcoming" ? "active" : ""}`}>Upcoming</Link>
    <Genre />
    <Link to="/?feed=top-rated" className={`btn ${currentFeed === "top-rated" ? "active" : ""}`}>Top Rated</Link>
    <RxDividerVertical className="divider"/>
   <Link to="/search" className="btn">
  <IoIosSearch />
</Link>
</div>
    </div>

    </>
}
 export default Navbar
