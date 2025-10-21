import "../CSS/genre.css"
import axios from "axios";
import { useEffect, useState } from "react";

const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const apiKey = import.meta.env.VITE_API_KEY;

const Genre = () => {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const res = await axios.get(`${url}&api_key=${apiKey}`);
        setGenre(res.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  }, []);

  return (
    <div className="dropdown relative">
      <div tabIndex={0} className="btn">
        Genre
      </div>
      <ul
        tabIndex={0}
        className=" genre dropdown-content menu bg-base-100 rounded-box z-50 w-52 max-h-96 p-2 shadow-sm overflow-y-auto mt-2 absolute"
      >
        {genre.map((g) => (
          <li key={g.id}>
            <a>{g.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;