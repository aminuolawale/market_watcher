import styled from "styled-components";

export const Button = styled.button`
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 15px 7px 15px;
  margin-left: ${({ mgLeft }) => mgLeft || 0};
  background: ${({ bg }) => bg || "none"};
  color: ${({ color }) => color || "#333"};

  &:hover {
    opacity: 0.9;
    transition-duration: 0.2s;
    color: ${({ bg }) => bg || "#F0BE3E"};
  }
`;

export const WideButton = styled.button`
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font_size.normal};
  width: 100%;
  height: 50px;
  padding: 8px 15px 7px 15px;
  background: ${({ bg }) => bg || "none"};
  color: ${({ color }) => color || "#333"};

  &:hover {
    opacity: 0.9;
    transition-duration: 0.2s;
    color: ${({ bg }) => bg || "#F0BE3E"};
  }
`;

export const LinkStyle = styled.button`
  border: none;
  background: none;
  color: #7369f1;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font_size.normal};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transition-duration: 0.2s;
    color: #f0be3e;
  }
`;
