import { StyledHeader, Nav } from "../styles/Header.styles";
import { Container } from "../styles/Container.styles";
import { Button } from "../styles/Button.styles";
import Link from "next/link";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TOKEN } from "../utils/redux/types";

const Header = () => {
  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.userReducer.authTokens);

  return (
    <StyledHeader>
      <Container>
        <Nav>
          <Nav>
            <Logo />
            <Link href="/">
              <Button mgLeft="20px">Home</Button>
            </Link>
            <Button mgLeft="20px">About</Button>
          </Nav>
          {authTokens ? (
            <div>
              <Button onClick={() => dispatch({ type: DELETE_TOKEN })}>
                Log Out
              </Button>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
              <Link href="/register">
                <Button bg="#F0BE3E" mgLeft="20px">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </Nav>
      </Container>
    </StyledHeader>
  );
};

export default Header;
