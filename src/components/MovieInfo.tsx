import { useRef, useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineSortAscending } from 'react-icons/ai';
import { ImSortNumbericDesc } from 'react-icons/im';
import { AiFillStar } from "react-icons/ai";
import { BsChevronExpand } from 'react-icons/bs';
import { MovieType } from '../types/MovieType';
import './MovieInfo.css'



export const MovieInfo = (props: any) => {
    const refOverview = useRef() as React.MutableRefObject<HTMLDivElement>;
    const refToggle = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [liked, setLiked] = useState<boolean>(false);
    const [more, setMore] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] =
        useState<MovieType>({
            id: props.id,
            title: props.title,
            overview: props.overview,
            poster_path: props.poster_path,
            vote_average: props.vote_average
        });
    const [favMovies, setFavMovies] = useState<MovieType[]>([]);

    const handleChange = (movie: MovieType) => {
        props.onChange(movie);
    }

    const sortMoviesByTitle = () => {
        let newArray = [...favMovies];
        newArray = newArray.sort((a, b) => (a.title < b.title) ? -1 : 1)
        setFavMovies(newArray);
    }

    const sortMoviesByVotes = () => {
        let newArray = [...favMovies];
        newArray = newArray.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1)
        setFavMovies(newArray);
    }

    useEffect(() => {
        setSelectedMovie(props);
    }, [liked, props, favMovies, selectedMovie, more])

    return (
        <>
            <div className="movie-info">
                <div className="title">
                    <h2>{selectedMovie.title}</h2>
                </div>
                {
                    liked === true && favMovies.find(fav => fav.id === selectedMovie.id) ?
                        <span
                            className="like"
                            onClick={() => [
                                setLiked(false),
                                setFavMovies(favMovies.filter(fav => fav.id !== selectedMovie.id))
                            ]}>
                            <AiFillHeart />
                        </span>
                        :
                        <span
                            className="like"
                            onClick={() => [
                                setLiked(true),
                                setFavMovies([...favMovies, selectedMovie])
                            ]}>
                            <AiOutlineHeart />
                        </span>
                }

            </div>
            <div
                ref={refOverview}
                className="overview">
                {!more ?
                    <p>{selectedMovie.overview.substring(0, 130)} ...
                        <span
                            className='expand'
                            onClick={() => setMore(true)}>
                            <BsChevronExpand /></span>  </p>
                    :
                    <p>{selectedMovie.overview}
                        <span
                            className='expand'
                            onClick={() => setMore(false)}>
                            <BsChevronExpand /></span> </p>
                }

            </div>
            <div className="fav-controls">
                <div className="cont">
                    <div ref={refToggle} className="toggle"></div>
                    <div
                        onClick={() => [
                            refToggle.current.classList.toggle('toggle-move'), sortMoviesByTitle()]}
                        className="left">
                        title <AiOutlineSortAscending />
                    </div>
                    <div
                        onClick={() => [
                            refToggle.current.classList.toggle('toggle-move'), sortMoviesByVotes()]}
                        className="right">
                        votes <ImSortNumbericDesc />
                    </div>
                </div>
            </div>
            <div className="fav-list">
                {
                    favMovies.length > 0 ?
                        favMovies.map((favmovie: MovieType) => (
                            <div
                                onClick={() => [
                                    setLiked(true),
                                    handleChange(favmovie),
                                    setSelectedMovie(favmovie)]}
                                key={favmovie.id}
                                className="fav-movie">
                                <img src={`https://image.tmdb.org/t/p/original/${favmovie.poster_path}`} alt={favmovie.title} />
                                <span className="fav-votes">
                                    <AiFillStar />
                                    {favmovie.vote_average}
                                </span>


                            </div>
                        ))
                        :
                        <div className="fav-empty">
                           <span>Your favorites list is empty...</span> 
                           </div>
                }
            </div>

        </>
    )
}
