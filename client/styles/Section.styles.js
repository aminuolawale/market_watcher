import styled from "styled-components";

export const HomeShowcase = styled.section`
  min-height: 550px;
  background: url("https://res.cloudinary.com/wizzle3d/image/upload/v1647884080/samples/Background_w6ecf4.jpg")
    no-repeat -200px -300px;
  padding-top: 130px;

  & h1 {
    margin: 0;
    font-size: ${({ theme }) => theme.font_size.xxlarge};
  }
  & p {
    margin: 5px 0 10px 0;
    font-size: ${({ theme }) => theme.font_size.normal};
    color: #000;
  }
`;

export const MiniShowcase = styled.section`
  min-height: 100px;
  background: url("https://res.cloudinary.com/wizzle3d/image/upload/v1647884080/samples/Background_w6ecf4.jpg")
    no-repeat -200px -300px;

  & p {
    font-size: ${({ theme }) => theme.font_size.large};
  }
`;
export const StatStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 110px;

  & h1 {
    font-size: ${({ theme }) => theme.font_size.xlarge};
  }
  & p {
    font-size: ${({ theme }) => theme.font_size.normal};
  }
`;

export const CryptoListStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  & div {
    display: flex;
    align-items: center;
    flex: 30%;

    & img {
      display: flex;
      align-items: center;
    }
    & p {
      margin-left: 20px;
    }
    & span {
      color: grey;
    }
  }
  & p {
    flex: 30%;
    font-size: ${({ theme }) => theme.font_size.small};
  }
  & span {
    flex: 10%;
    text-align: right;
    font-size: ${({ theme }) => theme.font_size.small};
  }
`;

export const GreyBG = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBG};
  padding: 70px 0;
`;
