import { IoIosSearch } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import logo from '../assets/LogoDark.webp';
import '../CSS/header.css'; 

import { Link } from "react-router-dom"
import Genre from "./Genre";
function Navbar(){
    return <>
    <div className="navbar">
    <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
    <div className="btnDiv"><button className="btn">Trending</button>
    <Genre className="genreBtn"/>
    <button className="btn">Top Rated</button>
    <RxDividerVertical className="divider"/>
   <Link to="/search" className="btn">
  <IoIosSearch />
</Link></div>
    </div>

    </>
}
 export default Navbar