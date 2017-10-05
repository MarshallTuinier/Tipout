import React from 'react';
import styled from 'styled-components';
import Background from '../assets/landing-photo.jpeg';
import { Link, withRouter } from 'react-router-dom';

const Landing = props => {
  return (
    <StyledPage>
      <ImageContainer />
      <Content>
        <div className="text">Welcome to</div>
        <div className="logo">
          T<span className="logo-i">i</span>pout
        </div>
        <div>
          <p style={{ marginTop: '3em', fontSize: '20px' }}>
            The world's best cloud-based t<span className="logo-i">i</span>p
            track<span className="logo-i">i</span>ng app.
          </p>
          <Button onClick={() => props.history.push('/CreateUser')}>
            <p>Sign up for free!</p>
          </Button>
          <p>
            Already have an account?{' '}
            <span>
              <StyledLink to="/SignInUser">Log In.</StyledLink>
            </span>
          </p>
        </div>
      </Content>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #c4c4c4;
`;
const Button = styled.div`
  border-radius: 4px;
  display: flex;
  background-color: rgb(0, 188, 212);
  width: 200px;
  height: 3em;
  margin: 20px auto;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
  &:hover {
    cursor: pointer;
    background: #367680;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  margin: 5px;
  margin-top: -65vh;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);

  .text {
    font-size: 60px;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 600px) {
    .text {
      font-size: 40px;
    }
  }

  .logo {
    font-weight: bold;
    font-size: 90px;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  }

  .logo-i {
    color: rgb(0, 188, 212);
    position: relative;
  }

  .logo-i:before {
    content: 'ı';
    position: absolute;
    color: white;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  background-image: url(${Background});
  background-position-x: center;
  background-position-y: 70%;
  background-size: cover;
  filter: blur(3px) brightness(0.6);
  z-index: 1;
`;

const StyledLink = styled(Link)`color: white;`;

export default withRouter(Landing);
