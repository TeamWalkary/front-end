import { S } from './style';
import React, { useEffect, useRef } from 'react';
import CurrentLoc from '../../../assests/currentLocation.svg';
import pinDraw from '../../../assests/pinDraw.svg';
import pinClick from '../../../assests/pinClick.svg';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { pinList, position } from '../../../core/atom';
import { pinResponseType } from '../../../types/pin';
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
  const [pins, setPinList] = useRecoilState(pinList);
  const setPosition = useSetRecoilState(position);
  // const setPinList = useSetRecoilState(pinList);

  console.log(pins);
  console.log(pinList);
  const imageSize = new window.kakao.maps.Size(24, 24);
  const markerImage = new window.kakao.maps.MarkerImage(pinDraw, imageSize);

  // useEffect(() => {
  //   const fetchData = async () => {
  //   try {
  //   const response = await ();
  //   // 여기서 비동기 응답을 받아와 상태를 업데이트합니다.
  //   setPinList(response);
  //   } catch (error) {
  //   console.error('Error fetching data:', error);
  //   }
  //   };

  //   // fetchData 함수 호출
  //   fetchData();
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: token },
          params: { sortBy: 'LATEST' },
        };
        const res = await axios.get<pinResponseType>(
          `${import.meta.env.VITE_APP_BASE_URL}/apis/main/maps-pin`,
          config
        );
        setPinList(res.data.pins);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5132612, 127.1001336), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    mapRef.current = new window.kakao.maps.Map(container!, options);
    createClickMarker();
    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    //저장된 핀이 있을경우
    if (pins.length > 0) {
      let linePath = [];
      const lineLine = new window.kakao.maps.Polyline();
      let polyline;

      // 저장된핀마커표시
      for (let i = 0; i < pins.length; i++) {
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
      mapRef.current.setBounds(bounds);

      // 지도에 선을 표시합니다
      polyline.setMap(mapRef.current);

      //           const latlng = new window.kakao.maps.LatLng(
      //             pins[i].longitude,
      //             pins[i].latitude
      //           );

      //         // 마커 생성
      //         new window.kakao.maps.Marker({
      //           map: mapRef.current,
      //           position: latlng,
      //           title: pins[i].contents,
      //           image: markerImage,
      //         });

      //         // LatLngBounds 객체에 좌표를 추가합니다
      //         bounds.extend(latlng); // 화면이동

      //         }
      //         console.log("pins");
      //         console.log(pins);

      //       const polyline = new window.kakao.maps.Polyline({
      //           path: linePath, // 선을 구성하는 좌표배열
      //           strokeWeight: 4, // 선의 두께
      //           strokeColor: '#7bed9f', // 선의 색깔
      //           strokeOpacity: 1, // 선의 불투명도
      //           strokeStyle: 'solid', // 선의 스타일
      //         });

      //       polyline.setMap(mapRef.current); // 라인그리기

      // mapRef.current.setBounds(bounds);
      // 지도에 선을 표시합니다
    } else {
      currentPosition();
    }
  }, [pins]);

  //현재위치를 가져옴
  function currentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude,
          lon = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        displayMarker(mapRef.current, locPosition);
        console.log('currentPosition');
        console.log(locPosition);
      });
    } else {
      const locPosition = new window.kakao.maps.LatLng(37.5132612, 127.1001336);
      displayMarker(mapRef.current, locPosition);
    }
  }

  //현재위치(빨간동그라미)마커표시
  function displayMarker(map: any, locPosition: any) {
    const imageSize = new window.kakao.maps.Size(15, 15);
    const currentImage = new window.kakao.maps.MarkerImage(
      CurrentLoc,
      imageSize
    );

    const currentMarker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
      // position: mapRef.current,
      image: currentImage,
    });

    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    const iwContent =
      '<div style="padding:5px;">현재위치에 핀을 찍을수있어요!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
    });

    // 마커에 마우스오버 이벤트를 등록합니다
    window.kakao.maps.event.addListener(
      currentMarker,
      'mouseover',
      function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, currentMarker);
      }
    );

    // 마커에 마우스아웃 이벤트를 등록합니다
    window.kakao.maps.event.addListener(currentMarker, 'mouseout', function () {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      infowindow.close();
    });

    window.kakao.maps.event.addListener(
      currentMarker,
      'click',
      function (mouseEvent: any) {
        //   console.log("locPosition")
        //   console.log(locPosition.latitude)

        // const latlng = new window.kakao.maps.LatLng(
        //   locPosition.latitude,
        //   locPosition.longitude
        // );
        // 클릭한 위도, 경도 정보를 가져옵니다

        const latlng = mouseEvent.locPosition;
        console.log('현재위치latlng');

        let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        setPosition({
          currentLatitude: latlng.getLat(),
          currentLongitude: latlng.getLng(),
        });
        console.log(message);
      }
    );
    map.setCenter(locPosition);
  }

  //버튼클릭시 현재위치로 이동
  function handleGpsClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // setPosition({
        //   currentLatitude: position.coords.latitude,
        //   currentLongitude: position.coords.longitude,
        // });

        const latlng = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        mapRef.current.setCenter(latlng);
        displayMarker(mapRef.current, latlng);
      });

      // function panTo() {
      //   // 이동할 위도 경도 위치를 생성합니다
      //   var moveLatLon = new window.kakao.maps.LatLng(position);

      //   // 지도 중심을 부드럽게 이동시킵니다
      //   // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      //   mapRef.current.panTo(moveLatLon);
      // }
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  function handlePinClick() {
    setModalShow(true);
  }

  function createClickMarker() {
    const clickMarkerImage = new window.kakao.maps.MarkerImage(
      pinClick,
      imageSize
    );

    //클릭한 위치에 마커표시
    const clickMarker = new window.kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: mapRef.current.getCenter(),
      image: clickMarkerImage,
    });
    // 지도에 마커를 표시합니다
    clickMarker.setMap(mapRef.current);

    const iwContent = '<div style="padding:5px">핀을 원하는 장소에 찍어보세요!', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      position: mapRef.current.getCenter(),
      content: iwContent,
      removable: iwRemoveable,
      zIndex: 1,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(mapRef.current, clickMarker);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(
      mapRef.current,
      'click',
      function (mouseEvent: any) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;
        console.log(latlng);
        // 마커 위치와 인포윈도우를 클릭한 위치로 옮깁니다
        clickMarker.setPosition(latlng);
        infowindow.setPosition(latlng);

        let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        setPosition({
          currentLatitude: latlng.getLat(),
          currentLongitude: latlng.getLng(),
        });
        console.log(message);
      }
    );
  }

  return (
    <S.Map>
      <S.MapViewArea id='map'></S.MapViewArea>
      <S.MapBtns>
        <S.Gps onClick={handleGpsClick} />
        <S.Pin onClick={handlePinClick} />
      </S.MapBtns>
    </S.Map>
  );
};

export default MapView;
