
import { S } from './style';
import React, { useEffect, useRef } from 'react';
import CurrentLoc from '../../../assests/currentLocation.svg';
import pinDraw from '../../../assests/pinDraw.svg';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { pinList, position } from '../../../core/atom';
import {pinResponseType} from '../../../types/pin';
import axios from 'axios';


declare global {
  interface Window {
    kakao: any;
  }
}

const positions = [
  {
    title: '진저베어',
    latlng: new window.kakao.maps.LatLng(37.509138, 127.105394),
  },
  {
    title: '석촌호수',
    latlng: new window.kakao.maps.LatLng(37.511667, 127.105191),
  },
  {
    title: '롯데백화점',
    latlng: new window.kakao.maps.LatLng(37.5125295, 127.102305),
  },
];

const bounds = new window.kakao.maps.LatLngBounds();

interface modalProps {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const MapView = (props: modalProps) => {
  const { setModalShow } = props;
  const mapRef = useRef<any>(null);
  const pins = useRecoilValue(pinList);
  const setPosition = useSetRecoilState(position);
  const setPinList = useSetRecoilState(pinList);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: token },
      params: { sortBy: 'LATEST' },
    };
    axios
      .get<pinResponseType>(
        `${import.meta.env.VITE_APP_BASE_URL}/apis/main/maps-pin`,
        config
      )
      .then(res => {
        setPinList(res.data.pins);
      });
  }, []);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5132612, 127.1001336), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    mapRef.current = new window.kakao.maps.Map(container!, options);

    if (pins.length > 0) {
      let linePath;
      const lineLine = new window.kakao.maps.Polyline();
      let polyline;

      // 저장된핀마커표시
      for (let i = 0; i < pins.length; i++) {
        const imageSize = new window.kakao.maps.Size(24, 24);
        const markerImage = new window.kakao.maps.MarkerImage(
          pinDraw,
          imageSize
        );

        const latlng = new window.kakao.maps.LatLng(
          pins[i].longitude,
          pins[i].latitude
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: mapRef.current,
          position: latlng,
          title: pins[i].contents,
          image: markerImage,
        });

        marker.setMap(mapRef.current);

        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(latlng);
        if (i != 0) {
          const prevlatlng = new window.kakao.maps.LatLng(
            pins[i - 1].longitude,
            pins[i - 1].latitude
          );
          linePath = [prevlatlng, latlng];
        }
        lineLine.setPath(linePath);

        polyline = new window.kakao.maps.Polyline({
          map: mapRef.current,
          path: linePath, // 선을 구성하는 좌표배열
          strokeWeight: 4, // 선의 두께
          strokeColor: '#7bed9f', // 선의 색깔
          strokeOpacity: 1, // 선의 불투명도
          strokeStyle: 'solid', // 선의 스타일
        });
      }
      setBounds();

      // 지도에 선을 표시합니다
      polyline.setMap(mapRef.current);
    } else {
      currentPosition();
    }

    function setBounds() {
      mapRef.current.setBounds(bounds);
    }
  }, []);

  //현재위치를 가져옴
  function currentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude,
          lon = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        displayMarker(mapRef.current, locPosition);
      });
    } else {
      const locPosition = new window.kakao.maps.LatLng(37.5132612, 127.1001336);
      displayMarker(mapRef.current, locPosition);
    }
  }

  //현재위치마커표시
  function displayMarker(map: any, locPosition: any) {
    const imageSize = new window.kakao.maps.Size(15, 15);
    const markerImage = new window.kakao.maps.MarkerImage(
      CurrentLoc,
      imageSize
    );

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage,
    });

    map.setCenter(locPosition);
  }

  //버튼클릭시 현재위치로 이동
  function handleGpsClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
        });

        const latlng = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        mapRef.current.setCenter(latlng);
        displayMarker(mapRef.current, latlng);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  function handlePinClick() {
    setModalShow(true);
  }

  return (
    <S.Map>
      <S.MapViewArea id="map">
      </S.MapViewArea>
      <S.MapBtns>
        <S.Gps onClick={handleGpsClick} />
        <S.Pin onClick={handlePinClick} />
      </S.MapBtns>
    </S.Map>
  );
};

export default MapView;
