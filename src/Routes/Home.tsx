import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  IGetMoviesResult,
} from '../api';
import styled from 'styled-components';
import { BannerBox } from '../components/Banner';
import { Slide } from '../components/Slider';
import { Modal } from '../components/Modal';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  background: black;
`;

const Loader = styled.div`
  font-size: 10vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  // 인기 영화
  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(['popularMovies', 'movies'], getPopularMovies);

  // 현재 상영 영화
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(
      ['nowPlayingMovies', 'movies'],
      getNowPlayingMovies
    );

  // 상영 예정 영화
  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(['upcomingMovies', 'movies'], getUpcomingMovies);

  const isLoading =
    popularLoading || nowPlayingLoading || upcomingLoading || false;

  const params = useParams<{
    category: string | undefined;
    movieId: string | undefined;
  }>();

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Helmet>
            <title>Home | 영화</title>
          </Helmet>

          {/* 상단 */}
          <BannerBox
            id="movies"
            division="popularData"
            bannerData={popularData?.results}
          />

          {/* 인기 영화 */}
          <Slide
            id="popularData"
            division="movies"
            title="인기 영화"
            slideData={popularData?.results}
          />

          {/* 현재 상영 영화 */}
          <Slide
            id="nowPlayingData"
            division="movies"
            title="현재 상영 영화"
            slideData={nowPlayingData?.results}
          />

          {/* 상영 예정 영화 */}
          <Slide
            id="upcomingData"
            division="movies"
            title="상영 예정 영화"
            slideData={upcomingData?.results}
          />

          <Modal
            id="movies"
            division={String(params?.category)}
            modalData={popularData?.results}
          />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
