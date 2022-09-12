import { useState } from 'react';
import { IMovie } from '../api';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import useWindowDimensions from './useWidowDimensions';
import { useNavigate } from 'react-router-dom';

const Slider = styled.div`
  position: relative;
  top: -100px;
  height: 32vw;
  margin-bottom: 50px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 58px;
    z-index: 1;
    width: 120px;
    height: calc(100% - 90px);
  }
  &:before {
    content: '';
    left: 0;
    background: linear-gradient(to right, rgb(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  &:after {
    content: '';
    right: 0;
    background: linear-gradient(to left, rgb(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: calc(100% - 120px);
  margin: 0 60px;
  height: 25vw;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  color: rgb(226, 8, 19, 1);
  font-size: 66px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const SubTitle = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
  padding: 0 60px;
`;

const NextBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 50%;
  z-index: 2;
  font-size: 30px;
  font-weight: 700;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.lighter};
  background: ${(props) => props.theme.black.lighter};
  svg {
    transition: 0.5s;
  }
  &:hover {
    svg {
      transform: translate3d(50%, 0, 0);
      path {
        fill: rgb(226, 8, 19, 1);
      }
    }
  }
`;
const PrevBtn = styled(NextBtn)`
  right: inherit;
  left: 5px;
  transform: rotateY(180deg);
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 0.7vw;
    font-weight: 400;
    word-break: keep-all;
    color: ${(props) => props.theme.white.lighter};
  }
`;

interface ISlider {
  id: string;
  title: string;
  division: string;
  slideData?: IMovie[];
}

const offset = 6;
export const rowVariants = {
  hidden: ({ width, isBack }: { width: number; isBack: boolean }) => ({
    x: isBack ? -width - 5 : width + 5,
  }),
  visible: {
    x: 0,
  },
  exit: ({ width, isBack }: { width: number; isBack: boolean }) => ({
    x: isBack ? width + 5 : -width - 5,
  }),
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -10,
    transition: {
      delay: 0.2,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
  },
};

export function Slide({ id, title, division, slideData }: ISlider) {
  /** Slide */
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const width = useWindowDimensions();

  const nextSlide = () => {
    if (slideData) {
      if (leaving) return;
      setIsBack(false);
      toggleLeaving();
      const totalMovies = slideData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const prevSlide = () => {
    if (slideData) {
      if (leaving) return;
      setIsBack(true);
      toggleLeaving();
      const totalMovies = slideData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  /** Modal */
  const navigate = useNavigate();
  const onBoxClicked = (id: string, movieId: number) => {
    navigate(`/${division}/${id}/${movieId}`);
  };

  return (
    <>
      <Slider>
        <SubTitle>{title}</SubTitle>
        <AnimatePresence
          custom={{ width, isBack }}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <PrevBtn onClick={prevSlide} key={id + 'prev'}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 473.654 473.654"
            >
              <path
                d="M358.075,216.091c-27.011-27.011-54.018-54.022-81.029-81.033
	c-25.56-25.564-65.08,14.259-39.456,39.883c11.009,11.009,22.019,22.019,33.028,33.032c-43.353,0-86.706,0-130.055,0
	c-36.225,0-36.543,56.109-0.404,56.109c43.491,0,86.982,0,130.47,0c-11.084,11.084-22.168,22.168-33.252,33.252
	c-25.564,25.56,14.259,65.08,39.883,39.456c27.011-27.007,54.018-54.014,81.029-81.025
	C369.133,244.916,368.838,226.85,358.075,216.091z"
              />
            </svg>
          </PrevBtn>
          <Row
            custom={{ width, isBack }}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {slideData
              ?.slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + ''}
                  variants={BoxVariants}
                  initial="normal"
                  whileHover="hover"
                  onClick={() => onBoxClicked(id, movie.id)}
                  key={movie.id}
                  bgphoto={makeImagePath(movie.poster_path, 'w500')}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <NextBtn onClick={nextSlide} key={id + 'next'}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 473.654 473.654"
            >
              <path
                d="M358.075,216.091c-27.011-27.011-54.018-54.022-81.029-81.033
	c-25.56-25.564-65.08,14.259-39.456,39.883c11.009,11.009,22.019,22.019,33.028,33.032c-43.353,0-86.706,0-130.055,0
	c-36.225,0-36.543,56.109-0.404,56.109c43.491,0,86.982,0,130.47,0c-11.084,11.084-22.168,22.168-33.252,33.252
	c-25.564,25.56,14.259,65.08,39.883,39.456c27.011-27.007,54.018-54.014,81.029-81.025
	C369.133,244.916,368.838,226.85,358.075,216.091z"
              />
            </svg>
          </NextBtn>
        </AnimatePresence>
      </Slider>
    </>
  );
}
