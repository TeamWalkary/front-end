import styled from "styled-components";
import React, { useEffect } from 'react';
import { ReactComponent as Pin } from "../../assests/pin.svg";
import { ReactComponent as Gps } from "../../assests/gps.svg";
import CurrentLoc from "../../assests/currentLocation.svg"


declare global {
  interface Window {
    kakao: any;
  }
}


const MapView: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(37.5132612, 127.1001336), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    const map = new window.kakao.maps.Map(container!, options);

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {

        const lat = position.coords.latitude,
            lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        displayMarker(map, locPosition);
        
      });
      
    } else {

      const locPosition = new window.kakao.maps.LatLng(37.5132612, 127.1001336);
         

      displayMarker(map, locPosition);
      
    }

  }, []);

  
  function displayMarker(map:any ,locPosition:any ) {

  const imageSize = new window.kakao.maps.Size(15, 15); 
	const markerImage = new window.kakao.maps.MarkerImage(CurrentLoc, imageSize);

	const marker = new window.kakao.maps.Marker({
		map: map,
		position: locPosition,
		image : markerImage,
	});



	map.setCenter(locPosition);
}

  return (
    <Map>
      {/* 지도를 표시할 div 입니다 */}
      <div id="map" style={{ width: '100%', height: '232px'}}>
      </div>
      <MapBtns>
        <Gps/>
        <Pin/>
      </MapBtns>
    </Map>
  );
};

export default MapView;

const Map = styled.main`
  position: relative;
`;

const MapBtns = styled.div`
  display:flex;
  flex-direction:column;
  position:absolute;
  right:18px; 
  bottom:18px;
  z-index:1;
`;
