import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import Navbar from '../components/Navbar';
import Slider from '../components/slider';

const Movies = () => {
    const [isScrolled, setIsScrolled] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset !== 0)
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies)
    const genres = useSelector((state) => state.netflix.genres)

    useEffect(() => {
        dispatch(getGenres());
    }, [])


    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "movies" }))
    },[genresLoaded])

    return (
        <div className='bg-black text-white'>
            <div >
                <Navbar isScrolled={isScrolled} forceBlack={true}  />
            </div>
            
            <div className='mt-20'>
                {
                    movies.length ? <Slider movies={movies} /> : <div>No movies available</div>
                }
            </div>

        </div>

    )
}

export default Movies