import styled from "styled-components";

export const S = {
  NavBackGround: styled.div`
    position: absolute;
    width: 37.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    height: 100%;
    z-index: 5;
  `,

  NavArea: styled.div`
    height: 100%;
    width: 50%;
    position: absolute;
    background-color: #fffefc;
    z-index: 999;
  `,

  NavBarHeader: styled.div`
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    color: white;
  `,

  NavMenu: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 1.2rem;
  `,

  Navitem: styled.li`
    padding: 1.2rem 2rem;
    font-size: 1.4rem;
    line-height: 2rem;
    cursor: pointer;
    &:active {
      font-weight: 800;
    }
  `,

  LogOut: styled.div`
    position: absolute;
    bottom: 1.6rem;
    color: #333333;
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 1.2rem 2rem;
  `,
};
