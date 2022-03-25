import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.09);
  position: sticky;

  svg {
    margin-bottom: 2px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
