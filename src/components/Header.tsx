import styled from 'styled-components';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { Link, useMatch } from 'react-router-dom';
import { useEffect } from 'react';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  top: 0;
  font-size: 16px;
  padding: 20px 60px;
  transition: 0.2s;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 110px;
  height: 40px;
  cursor: pointer;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 10px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  font-weight: 700;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;

  a {
    position: relative;
    margin: 0 2rem;
    white-space: nowrap;
    &.active,
    &:hover {
      color: rgb(226, 8, 19, 1);
    }
  }
`;

// const Search = styled.button`
//   font-size: 16px;
//   border: none;
//   font-weight: 700;
//   color: ${(props) => props.theme.white.darker};
//   background: transparent;
//   cursor: pointer;
// `;

const Laval = styled(motion.span)`
  position: absolute;
  bottom: -15px;
  left: 50%;
  width: 50px;
  height: 5px;
  margin-left: -25px;
  background-color: rgb(226, 8, 19, 1);
  border-radius: 2px;
`;

// const Select = styled.select`
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   appearance: none;
//   min-width: 70px;
//   padding: 0.6em 0.5em;
//   border: 1px solid #999;
//   border-radius: 0px;

//   &::-ms-expand {
//     display: none;
//   }
// `;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const path = {
  start: {
    pathLength: 0,
  },
  end: {
    pathLength: 1,
  },
};

const scrollVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

function Header() {
  // Laval
  const homeMatch = useMatch('/');
  const movieIdMatch = useMatch('/movies/:movieId');
  const tvMatch = useMatch('/tvs');
  const tvIdMatch = useMatch('/tvs/:movieId');
  const searchMatch = useMatch('/search');

  // scroll
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() < 80) {
        navAnimation.start('top');
      } else {
        navAnimation.start('scroll');
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={scrollVariants} initial={'top'} animate={navAnimation}>
      <Col>
        <Link to="/">
          <Logo
            variants={logoVariants}
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <motion.path
              variants={path}
              initial="start"
              animate="end"
              transition={{
                default: { duration: 7 },
              }}
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            />
          </Logo>
        </Link>
      </Col>
      <Col>
        <Items>
          <Item>
            {homeMatch || movieIdMatch ? (
              <Link to="/" className="active">
                영화 <Laval />
              </Link>
            ) : (
              <Link to="/">영화</Link>
            )}
          </Item>
          <Item>
            {tvMatch || tvIdMatch ? (
              <Link to="/tvs" className="active">
                TV <Laval />
              </Link>
            ) : (
              <Link to="/tvs">TV</Link>
            )}
          </Item>
          <Item>
            {searchMatch ? (
              <Link to="/search" className="active">
                검색 <Laval />
              </Link>
            ) : (
              <Link to="/search">검색</Link>
            )}
          </Item>
          {/* <Item>
            <Select>
              <option value="kr">한국어</option>
              <option value="en">영어</option>
            </Select>
          </Item> */}
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;
