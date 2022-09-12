import styled from 'styled-components';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';
import { makeImagePath } from '../utils';
import { IMovie } from '../api';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  z-index: 12;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IModal {
  id: string;
  division: string;
  modalData?: IMovie[];
}

export function Modal({ id, division, modalData }: IModal) {
  /** Modal */
  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/${id}/${division}/:movieId`);
  const { scrollY } = useScroll();

  const onOverlayClick = () => {
    if (id === 'movies') {
      navigate(`/`);
    } else if (id === 'tvs') {
      navigate(`/tvs`);
    } else {
      navigate(`/`);
    }
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    modalData?.find(
      (movie) => String(movie.id) === bigMovieMatch?.params.movieId
    );

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={bigMovieMatch.params.movieId}
          >
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}
