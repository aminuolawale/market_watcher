import styled from "styled-components";

export const Container = styled.div`
  width: ${({ width }) => width || "1440px"};
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;
`;

export const SubcribeBox = styled.div`
  margin-top: 50px;
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    margin: 10px;
  }
  & input {
    margin: 10px;
    height: 32px;
    width: 40%;
  }
`;
