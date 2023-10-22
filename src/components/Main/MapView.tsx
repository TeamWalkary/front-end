import styled from "styled-components";
import React, { useEffect, useRef } from 'react';
import { ReactComponent as PinIcon } from "../../assests/pin.svg";
import { ReactComponent as GpsIcon } from "../../assests/gps.svg";
import CurrentLoc from "../../assests/currentLocation.svg"

declare global {
  interface Window {
    kakao: any;
  }
}

const MapView: React.FC = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(37.5132612, 127.1001336), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    mapRef.current = new window.kakao.maps.Map(container!, options);

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {

        const lat = position.coords.latitude,
              lon = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        displayMarker(mapRef.current, locPosition);
        
      });
      
    } else {

      const locPosition = new window.kakao.maps.LatLng(37.5132612, 127.1001336);
      displayMarker(mapRef.current, locPosition);
      
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

function handleGpsClick() {
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
			const latlng=new window.kakao.maps.LatLng(position.coords.latitude,position.coords.longitude)
			mapRef.current.setCenter(latlng)
			displayMarker(mapRef.current,latlng)
	});
} else { 
	alert("Geolocation is not supported by this browser.");
}
}

  return (
    <Map>
      {/* 지도를 표시할 div 입니다 */}
      <div id="map" style={{ width: '100%', height: '232px'}}>
      </div>
      <MapBtns>
        <Gps onClick={handleGpsClick}/>
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

const Gps = styled(GpsIcon)`
  cursor:pointer;
`
const Pin = styled(PinIcon)`
  cursor:pointer;
`