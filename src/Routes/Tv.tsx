import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import {
  getPopularTvs,
  getOnTheAirTodayTvs,
  getTopRatedTvs,
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
  // 인기 TV
  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(['popularTvs', 'tvs'], getPopularTvs);

  // 방송중인 TV
  const { data: onTheAirData, isLoading: onTheAirLoading } =
    useQuery<IGetMoviesResult>(['onTheAirTvs', 'tvs'], getOnTheAirTodayTvs);

  // 평점높은 TV
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(['topRatedTvs', 'tvs'], getTopRatedTvs);

  const isLoading =
    popularLoading || onTheAirLoading || topRatedLoading || false;

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
            <title>Home | TV</title>
          </Helmet>

          {/* 상단 */}
          <BannerBox
            id="tvs"
            division="popularData"
            bannerData={popularData?.results}
          />

          {/* 인기 TV */}
          <Slide
            id="popularData"
            title="인기 TV"
            division="tvs"
            slideData={popularData?.results}
          />

          {/* 방송중인 TV */}
          <Slide
            id="onTheAirData"
            title="방송중인 TV"
            division="tvs"
            slideData={onTheAirData?.results}
          />

          {/* 평점높은 TV*/}
          <Slide
            id="topRatedData"
            title="평점높은 TV"
            division="tvs"
            slideData={topRatedData?.results}
          />

          <Modal
            id="tvs"
            division={String(params?.category)}
            modalData={popularData?.results}
          />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
