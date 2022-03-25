import styled from "styled-components";

export const LoginBox = styled.div`
  background-color: ${({ theme }) => theme.colors.body};
  padding: 40px;
  width: ${({ width }) => width || "600px"};
  max-width: 100%;
  margin: 0px auto;
  box-sizing: border-box;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.09);
    & form {
        display: flex;
        flex-wrap: wrap;
    }
  & div {
      flex: 40%;
      margin: 5px 15px 40px 15px;
  }

  & input {
    width: 100%;
    height: 50px;
    border: 1px solid #c9c9c9;
    border-radius: 3px;
    font-size: ${({ theme }) => theme.font_size.normal};
    padding: 0 10px;
    margin: 5px 0;

    & :focus {
        outline: none;
        border: 1px solid #5392da;
        box-shadow: 0px 0px 0px 3px #c0dbff;
        transition-duration: 0.3s;
        box-sizing: border-box;
  }
`;
