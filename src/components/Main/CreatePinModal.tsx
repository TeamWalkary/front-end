import styled from 'styled-components';
import { ReactComponent as Closebutton } from '../../assests/closebutton.svg';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { pinList, pinResponseType } from '../../store/atom';
import { useSetRecoilState } from 'recoil';

interface modalProps {
  setModalShow: React.Dispatch<React.SetStateAction<Boolean>>;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const CreatePinModal = (props: modalProps) => {
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
  const navigate = useNavigate();
  const geocoder = new window.kakao.maps.services.Geocoder();

  useEffect(() => {
    const callback = (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
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

  const handleClearbutton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setInputPinContents('');
  };

  const handlePinContentsInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pinContentsOnChange: string = event.target.value;
    setInputPinContents(pinContentsOnChange);
  };

  const handleClosebutton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModalShow(false);
  };

  const handleSaveButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const token = localStorage.getItem('token');
    if (inputPinContents.length >= 1) {
      axios
        .post(
          'https://api.walkary.fun/apis/pin',
          {
            contents: inputPinContents,
            latitude,
            longitude,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(res => {
          const config = {
            headers: { Authorization: token },
            params: { sortBy: 'LATEST' },
          };
          axios
            .get<pinResponseType>(
              'https://api.walkary.fun/apis/main/maps-pin',
              config
            )
            .then(res => {
              setPinList(res.data.pins);
              setModalShow(false);
            });
        })
        .catch(res => {});
    }
  };

  return (
    <>
      <Container ref={pinModalRef} onClick={event => clickModalOutSide(event)}>
        <ModalContainer>
          <FirstSection>
            <FirstTextContainer>
              <FirstText>핀 추가하기</FirstText>
              <CloseButtonContainer onClick={handleClosebutton}>
                <Closebutton width='13.5' height='13.5'></Closebutton>
              </CloseButtonContainer>
            </FirstTextContainer>
            <SecondText>이 장소에 대해 알려주세요. (20자 이내)</SecondText>
          </FirstSection>
          <SecondSection>
            <InputWrapper>
              <Input
                onChange={handlePinContentsInput}
                value={inputPinContents}
                maxLength={20}
              />
              <CloseButtonContainer onClick={handleClearbutton}>
                <Closebutton width='13.5' height='13.5'></Closebutton>
              </CloseButtonContainer>
            </InputWrapper>
          </SecondSection>
          <ThirdSection>
            <SaveButton onClick={handleSaveButton}>완료</SaveButton>
          </ThirdSection>
        </ModalContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  background-color: #00000080;
`;

const ModalContainer = styled.div`
  width: 323px;
  height: 206px;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const FirstSection = styled.div`
  padding: 20px;
`;
const SecondSection = styled.div`
  padding: 0px 20px 0px 20px;
`;
const ThirdSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const FirstTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 283px;
  height: 24px;
`;

const FirstText = styled.p`
  font-weight: 700;
  font-family: 'Pretendard-Regular';
  text-align: center;
  color: #333333;
`;

const CloseButtonContainer = styled.button`
  background: none;
  border: none;
`;

const SecondText = styled.p`
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  font-size: 12px;
  color: #a1a1a1;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  width: 283px;
  height: 24px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.5px solid #dcdcdc;
`;
const Input = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: inherit;
  padding: 0px;
  width: 283px;
  height: 24px;
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  font-size: 16px;
  color: #dcdcdc;
`;

const SaveButton = styled.button`
  padding: 8px 52px;
  width: 160px;
  height: 40px;
  background: #333333;
  border-radius: 99px;
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  font-size: 16px;
  color: #dcdcdc;
`;
export default CreatePinModal;
