const API_KEY = '44d320cdaba3f7739188319732eaf8cb';
const BASE_PATH = 'https://api.themoviedb.org/3';
const LANGUAGE = 'ko';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  popularity: string;
  release_date: string;
  overview: string;
  vote_average: string;
  vote_count: string;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

// 인기 영화
export async function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

// 현재 상영 영화
export async function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

// 상영 예정 영화
export async function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

// 인기 TV
export async function getPopularTvs() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

// 방송중인 TV
export async function getOnTheAirTodayTvs() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

// 평점높은 TV
export async function getTopRatedTvs() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}
