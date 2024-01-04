import { S } from './style';
import PinModalCloseButton from '../../../assests/PinModalCloseButton';
import PinModalAddressNameClearButton from '../../../assests/PinModalAddressNameClearButton';
import { useEffect, useRef, useState } from 'react';
import { pinList } from '../../../core/atom';
import { useSetRecoilState } from 'recoil';
import { pinResponseType } from '../../../types/pin';
import { axiosInstance } from '../../../core/api/axios';

interface modalProps {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function CreatePinModal(props: modalProps) {
  const { setModalShow, latitude, longitude } = props;
  const pinModalRef = useRef<HTMLDivElement>(null);
  const clickModalOutSide = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | undefined
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event != undefined) {
      if (pinModalRef.current === event.target) {
        setModalShow(false);
      }
    }
  };
  const setPinList = useSetRecoilState(pinList);

  const geocoder = new window.kakao.maps.services.Geocoder();

  useEffect(() => {
    const callback = (result: any, status: any) => {
      if (
        status === window.kakao.maps.services.Status.OK &&
        result[0].road_address !== null
      ) {
        const placeAddress: string = result[0].road_address.address_name;

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(
          placeAddress,
          (data: any, status: any, pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setInputPinContents(data[0].place_name);
            }
          }
        );
      } else {
        setInputPinContents('');
      }
    };

    geocoder.coord2Address(longitude, latitude, callback);
  }, []);

  const [inputPinContents, setInputPinContents] = useState<string>('');

  const handleClearbutton = () => {
    setInputPinContents('');
  };

  const handlePinContentsInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pinContentsOnChange: string = event.target.value;
    setInputPinContents(pinContentsOnChange);
  };

  const handleClosebutton = () => {
    setModalShow(false);
  };

  const handleSaveButton = () => {
    if (inputPinContents.length >= 1 && longitude > 0 && latitude > 0) {
      axiosInstance
        .post(
          `${import.meta.env.VITE_APP_BASE_URL}/apis/pin
          `,
          {
            contents: inputPinContents,
            latitude,
            longitude,
          }
        )
        .then(() => {
          const config = {
            params: { sortBy: 'LATEST' },
          };
          axiosInstance
            .get<pinResponseType>(
              `${import.meta.env.VITE_APP_BASE_URL}/main/maps-pin`,
              config
            )
            .then(res => {
              setPinList(res.data.pins);
              setModalShow(false);
            });
        })
        .catch(res => {
          console.log(res);
        });
    }
  };

  return (
    <>
      <S.Container
        ref={pinModalRef}
        onClick={event => clickModalOutSide(event)}
      >
        <S.ModalContainer>
          <S.FirstSection>
            <S.FirstTextContainer>
              <S.FirstText>핀 추가하기</S.FirstText>
              <S.CloseButtonContainer onClick={handleClosebutton}>
                <PinModalCloseButton />
              </S.CloseButtonContainer>
            </S.FirstTextContainer>
            <S.SecondText>이 장소에 대해 알려주세요. (20자 이내)</S.SecondText>
          </S.FirstSection>
          <S.SecondSection>
            <S.InputWrapper>
              <S.Input
                onChange={handlePinContentsInput}
                value={inputPinContents}
                maxLength={20}
                placeholder={
                  inputPinContents.length === 0 ? '아늑하고 포근한 우리집' : ''
                }
              />
              <S.CloseButtonContainer onClick={handleClearbutton}>
                <PinModalAddressNameClearButton />
              </S.CloseButtonContainer>
            </S.InputWrapper>
          </S.SecondSection>
          <S.ThirdSection>
            <S.SaveButton
              disabled={inputPinContents.length === 0 ? true : false}
              onClick={handleSaveButton}
            >
              완료
            </S.SaveButton>
          </S.ThirdSection>
        </S.ModalContainer>
      </S.Container>
    </>
  );
}
