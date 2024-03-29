import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie list:', error);
    throw error;
  }
};

export const searchMovie = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movie:', error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${baseUrl}/trending/movie/week?api_key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getPopularMoviesThisWeek = async () => {
  try {
    // Dapatkan tanggal awal dan akhir untuk minggu ini
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(today.setDate(today.getDate() + 6));

    // Format tanggal dalam format yang diterima oleh API (YYYY-MM-DD)
    const formattedFirstDayOfWeek = formatDate(firstDayOfWeek);
    const formattedLastDayOfWeek = formatDate(lastDayOfWeek);

    // Panggil API untuk mendapatkan film-film populer untuk minggu ini
    const response = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_date.gte=${formattedFirstDayOfWeek}&primary_release_date.lte=${formattedLastDayOfWeek}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies for the week:', error);
    throw error;
  }
};

// Fungsi untuk memformat tanggal menjadi format YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
