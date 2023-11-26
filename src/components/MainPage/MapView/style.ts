import styled from 'styled-components';
import { ReactComponent as PinBtn } from '../../../assests/pinBtn.svg';
import { ReactComponent as GpsBtn } from '../../../assests/gpsBtn.svg';

export const S = {
     Map: styled.main`
      position: relative;
    `,

     MapViewArea: styled.div`
      width: 100%;
      height: 232px;
     `,

     MapBtns: styled.div`
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 1;
    `,
    
    Gps: styled(GpsBtn)`
      cursor: pointer;
    `,
    Pin: styled(PinBtn)`
      cursor: pointer;
      color: white;
      z-index: 990;
    `,


}