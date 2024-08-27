import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 20px;
  background: black;
  border-bottom: 2px solid #3399ff;
  font-size: 2rem;
  font-family: 'Verdana';
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 2.5s ease-in-out;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    padding: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 10px;
    width: 100%;
  }
`;
const SmallHeading = styled.h4`
  display: flex;
  align-items: center;
  animation: ${slideDown} 3s ease-out;
  font-family: 'Verdana';
  color: grey;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  span {
    color: purple;
  }
`;

const LogoContainer = styled.div`
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 15px;
  }

  @media (max-width: 480px) {
    margin-right: 10px;
  }
`;

const StyledLogo = styled.img`
  width: 80px; /* Adjust size as needed */
  height: auto;

  @media (max-width: 768px) {
    width: 60px; /* Adjust size for medium screens */
  }

  @media (max-width: 480px) {
    width: 50px; /* Adjust size for small screens */
  }
`;
const SlidingHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideDown} 3s ease-out;
  font-family: 'Verdana';
  color: grey;
  margin: 0;
  font-size: 2.3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  span {
    color: purple;
  }

  .heading-container {
    text-align: center;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <SlidingHeading>
        <LogoContainer>
          <StyledLogo src="/prodigy-removebg-preview (1).png" alt="Prodigy Logo" />
        </LogoContainer>
        <div className="heading-container">
          Prodigy<span>Peak</span>
          <SmallHeading>ELEVATE YOUR POTENTIAL</SmallHeading>
        </div>
      </SlidingHeading>
      </HeaderContainer>
  );
       
}

export default Header;