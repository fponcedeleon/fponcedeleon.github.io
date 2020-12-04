/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  SidebarContainerStyled,
  ContainerStyled,
  NavitemContainerStyled,
  NavItemLogoStyled,
  ContentStyled,
  ItemNameStyled,
  ContentChidlrenStyled,
} from "./styles";

import { MdKeyboardArrowRight } from "react-icons/md";

export const CustomSidebar = ({ currentTab, setCurrentTab, children }: any) => {
  return (
    <>
      <ContainerStyled>
        <SidebarContainerStyled>
          <div onClick={() => setCurrentTab(0)}>
            <NavitemContainerStyled>
              <NavItemLogoStyled>
                {" "}
                <MdKeyboardArrowRight size={25} color={"#898989"} />
              </NavItemLogoStyled>
              <ItemNameStyled>
                {" "}
                <span>Maquina</span>
              </ItemNameStyled>
            </NavitemContainerStyled>
          </div>

          <div onClick={() => setCurrentTab(1)}>
            <NavitemContainerStyled>
              <NavItemLogoStyled>
                {" "}
                <MdKeyboardArrowRight size={25} color={"#898989"} />{" "}
              </NavItemLogoStyled>
              <ItemNameStyled>
                {" "}
                <span>Componentes</span>
              </ItemNameStyled>
            </NavitemContainerStyled>
          </div>

          <div onClick={() => setCurrentTab(2)}>
            <NavitemContainerStyled>
              <NavItemLogoStyled>
                {" "}
                <MdKeyboardArrowRight size={30} color={"#898989"} />{" "}
              </NavItemLogoStyled>
              <ItemNameStyled>
                {" "}
                <span>Piezas</span>
              </ItemNameStyled>
            </NavitemContainerStyled>
          </div>
        </SidebarContainerStyled>
        <ContentStyled>
          <ContentChidlrenStyled>{children}</ContentChidlrenStyled>
        </ContentStyled>
      </ContainerStyled>
    </>
  );
};

export const Sidebar = ({ currentTab, setCurrentTab, children }: any) => {
  return (
    <CustomSidebar currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {children}
    </CustomSidebar>
  );
};
