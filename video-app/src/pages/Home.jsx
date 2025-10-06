import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Slider from '../components/slider';
import Banner from '../components/Banner';
import { fetchMovies, getGenres } from '../store';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: 'all' }));
  }, [genresLoaded, dispatch]);

  return (
    <div className="bg-black text-white">
      <Navbar isScrolled={isScrolled} forceBlack={true} />
      <Banner />
      <div className="mt-20">
        {movies.length ? <Slider movies={movies} /> : <div>No content available</div>}
      </div>
    </div>
  );
};

export default Home;
