import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

class SignInUser extends Component {
  render() {
    return (
      <StyledPage>
        <AppText>
          T<span className="logo-i">i</span>pout
        </AppText>
        <StyledContainer />
      </StyledPage>
    );
  }
}

const StyledContainer = styled.div`
  padding-top: 7vh;
  background-color: #c4c4c4;
  color: white;
  margin: 0 auto;
`;

const StyledPage = styled.div`
  height: 100vh;
  max-height: 110vh
  width: 100vw;
  background-color: #c4c4c4;
  margin: 0 auto;

  .logo-i {
    color: rgb(0, 188, 212);
    position: relative;
  }

  .logo-i:before {
    content: "ı";
    position: absolute;
    color: white;
  }

`;

const AppText = styled.h2`
  margin: 0 auto;
  padding-top: 40vh;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 90px;
`;

export default withRouter(SignInUser);
