import { IMovie } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const VisualInfo = styled.div`
  width: 70%;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  line-height: 1.5;
  word-break: keep-all;
  width: 100%;
  white-space: normal;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

const DetailBtn = styled(motion.button)`
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background: rgb(226, 8, 19, 1);
  border-width: 0;
  border-radius: 4px;
  margin: 20px 0 0 0;
  padding: 5px 10px;
  color: ${(props) => props.theme.white.lighter};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const ReleaseDate = styled.span`
  display: inline-block;
  font-size: 18px;
  margin: 0 0 10px 5px;
  padding: 5px 10px;
  letter-spacing: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
`;

interface IBanner {
  id: string;
  division: string;
  bannerData?: IMovie[];
}

export function BannerBox({ id, division, bannerData }: IBanner) {
  const [data, setData] = useState<IMovie>();
  useEffect(() => {
    if (bannerData) setData(bannerData[0]);
  }, [bannerData]);

  /** Modal */
  const navigate = useNavigate();
  const onBoxClicked = (id: string, movieId: number) => {
    navigate(`/${id}/${division}/${movieId}`);
  };

  return (
    <Banner bgPhoto={makeImagePath(data?.backdrop_path || '')}>
      <VisualInfo>
        <ReleaseDate>상영일: {data?.release_date || '미예정'}</ReleaseDate>
        <Title>{data?.title || data?.name}</Title>
        <Overview>{data?.overview}</Overview>
        <DetailBtn onClick={() => onBoxClicked(id, Number(data?.id))}>
          자세히 보기
        </DetailBtn>
      </VisualInfo>
    </Banner>
  );
}
