const API_KEY = "0cc74b685e276eff7b661d58d21277b1";
const BASE_URL = `https://api.themoviedb.org/3/`;

const movies = {
  trending: ({ pageParam = 1 }) =>
    fetch(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}&language=ko-KR&region=KR&page=${pageParam}`
    ).then((res) => res.json()),
  topRated: ({ pageParam = 1 }) =>
    fetch(
      `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=KR&page=${pageParam}`
    ).then((res) => res.json()),
  nowPlaying: ({ pageParam = 1 }) =>
    fetch(
      `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR&page=${pageParam}`
    ).then((res) => res.json()),
  similar: ({ queryKey, pageParam = 1 }) =>
    fetch(
      `${BASE_URL}movie/${queryKey[2]}/similar?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`
    ).then((res) => res.json()),
  search: ({ queryKey, pageParam = 1 }) =>
    fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=ko-KR&query=${queryKey[2]}&page=${pageParam}&region=KR`
    ).then((res) => res.json()),
};

const tvs = {
  trending: ({ pageParam = 1 }) =>
    fetch(
      `${BASE_URL}trending/tv/week?api_key=${API_KEY}&language=ko-KR&region=KR&page=${pageParam}`
    ).then((res) => res.json()),
  topRated: ({ pageParam = 1 }) =>
    fetch(
      `${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=KR&page=${pageParam}`
    ).then((res) => res.json()),
  onTheAir: ({ pageParam = 1 }) =>
    fetch(
      `${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=ko-KR&region=KR&page=${pageParam}`
    ).then((res) => res.json()),
  similar: ({ queryKey, pageParam = 1 }) =>
    fetch(
      `${BASE_URL}tv/${queryKey[2]}/similar?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`
    ).then((res) => res.json()),
  search: ({ queryKey, pageParam = 1 }) =>
    fetch(
      `${BASE_URL}search/tv?api_key=${API_KEY}&language=ko-KR&query=${queryKey[2]}&page=${pageParam}&region=KR`
    ).then((res) => res.json()),
};

export const contents = {
  movies: ["trending", "topRated", "nowPlaying"],
  tvs: ["trending", "topRated", "onTheAir"],
};

const api = { movies, tvs };

export default api;
