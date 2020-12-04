import styled from 'styled-components';

const SidebarContainerStyled = styled.div`
  padding-top:30px;
  width: 100%;
  white-space: nowrap;
   background-color: white;
  display: flex;
  justify-content: space-around;
  height:100%;
  z-index:100;
  margin-top:0;
`;

const ContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ContainerStyled = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const ContentChidlrenStyled = styled.div`
  overflow-y: scroll;
  padding: 10px 15px;
`;


const NavitemContainerStyled = styled.div`
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
  padding:10px;
  justify-content: flex-end;
  cursor: pointer;
  transition: all ease 0.2s;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;

const ItemNameStyled = styled.div`
  font-size: 22px;
  line-height: 150%;
  display: flex;
  justify-content: right;
  text-align: right;
  color: #898989;
  span {
    white-space: nowrap;
  }
`;

const NavItemLogoStyled = styled.i`
  display: inline-block;
  margin-right: 20px;
  margin-left: 20px;
  max-width: 20px;
`;


const LogoStyled = styled.i`
  margin-right: 30px;
  margin-left: 30px;
  display: inline-block;
  max-width: 20px;
`;

export {
  SidebarContainerStyled,
  LogoStyled,
  ContainerStyled,
  NavItemLogoStyled,
  ItemNameStyled,
  ContentStyled,
  NavitemContainerStyled,
  ContentChidlrenStyled,
};
