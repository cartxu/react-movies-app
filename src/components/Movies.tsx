import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { MovieInfo } from './MovieInfo';
import { MovieType } from '../types/MovieType';
import { RiSearchLine } from "react-icons/ri";
import { FaFireAlt } from 'react-icons/fa';
import { AiFillStar } from "react-icons/ai";
import {
    BsFillDisplayFill,
    BsFillArrowLeftCircleFill,
    BsFillLightningChargeFill,
    BsFillArrowRightCircleFill
} from "react-icons/bs";
import './Movies.css'
import logo from '../assets/images/logo.png';


export const Movies = () => {
    const [request, setRequest] = useState<string>("popular")
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [movie, setMovie] = useState<MovieType>();
    const [title, setTitle] = useState<string>("Popular movies");
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const apiKey: string = 'e5e4db3dbc304d099091bfe9536607fa';
    const refScroll = useRef() as React.MutableRefObject<HTMLInputElement>;
    const path = new URL('https://api.themoviedb.org/3/movie/');
    const searchUrl = new URL('https://api.themoviedb.org/3/search/movie');
    const url = new URL(String(request), path)
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('page', String(page));
    url.searchParams.set('language', 'en-US');
    searchUrl.searchParams.set('query', String(query));
    searchUrl.searchParams.set('api_key', apiKey);
    searchUrl.searchParams.set('language', 'en-US');
    searchUrl.searchParams.set('include_adult', 'false');

    const fetchMovies = (dynamicUrl: string) => {
        fetch(dynamicUrl)
            .then(data => data.json())
            .then(res => {
                setMovies(movies.concat(res.results));
            })
            .catch(err => console.log(err))
    }

    const scroll = (scrollOffset: number) => {
        const maxWidth = refScroll.current.scrollWidth;
        const totalScroll = refScroll.current.scrollLeft += scrollOffset;
        if (totalScroll >= maxWidth) {
            setPage(Number(page) + 1)
            refScroll.current.scrollLeft += scrollOffset + 20;
        } else {
            refScroll.current.scrollLeft += scrollOffset;
        }

    };

    const handleChange = (newMovie: MovieType) => {
        setMovie(newMovie);
    }

    useEffect(() => {
        if (query.length === 0) {
            fetchMovies(String(url));
        } else {
            fetchMovies(String(searchUrl));
        }


    }, [page, request, query]);

    return (

        <>
            <div className="movies-container">
                <div className="menu">
                    <img
                        className="logo"
                        src={logo} alt="logo" />
                    <div
                        className="scroll-btn"
                        onClick={() => scroll(document.documentElement.clientWidth)}>
                        <BsFillArrowRightCircleFill />
                    </div>
                    <span
                        onClick={() => [
                            request==="popular"&&page===1?setMovies(movies):
                            setMovies([]),
                            setRequest("popular"),
                            setTitle("Trending"),
                            setPage(1),
                            setQuery("")
                        ]}>
                        <FaFireAlt />
                    </span>
                    <span
                        onClick={() => [
                            request==="top_rated"&&page===1?setMovies(movies):
                            setMovies([]),
                            setRequest("top_rated"),
                            setTitle("Top rated"),
                            setPage(1),
                            setQuery("")
                        ]}>
                        <BsFillLightningChargeFill />
                    </span>
                    <span
                        onClick={() => [
                            request==="now_playing"&&page===1?setMovies(movies):
                            setMovies([]),
                            setRequest("now_playing"),
                            setTitle("Now playing"),
                            setPage(1),
                            setQuery("")
                        ]}>
                        <BsFillDisplayFill />
                    </span>
                    <div
                        className="scroll-btn"
                        onClick={() => scroll(-document.documentElement.clientWidth)}>
                        <BsFillArrowLeftCircleFill />
                    </div>
                </div>
                <div>
                    <div className="movies-search">
                        <h2>{title}</h2>
                        <div className="search-input">
                            <input
                                placeholder='Search movies...'
                                type="text"
                                onChange={(event) => [
                                    setMovies([]),
                                    setQuery(event.target.value),
                                    setTitle("Results")]}
                            />
                            <RiSearchLine />
                        </div>

                    </div>
                    <div className="movies" ref={refScroll}>
                        {
                            movies.length > 0
                                ?
                                movies.map((movie: MovieType) => (
                                    <div
                                        className='movie'
                                        onClick={() => setMovie(movie)}
                                        key={movie.id}
                                    >
                                        <span>
                                            <AiFillStar /> {movie.vote_average}
                                        </span>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt={movie.title}
                                            className="movie">
                                        </img>

                                    </div>


                                ))
                                :

                                <div className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                        }

                    </div>

                </div>
            </div>
            <div className="info-container">

                {
                    movie
                        ?
                        <MovieInfo
                            onChange={handleChange}
                            title={movie.title}
                            overview={movie.overview}
                            poster_path={movie.poster_path}
                            id={movie.id}
                            vote_average={movie.vote_average}
                        />
                        :
                        <div className="movie-empty">
                            <h2>Select a movie</h2>
                        </div>
                }


            </div>
        </>

    )
}
