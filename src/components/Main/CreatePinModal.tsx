import styled from 'styled-components';
import { ReactComponent as Closebutton } from '../../assests/closebutton.svg';
import { ReactComponent as Clearbutton } from '../../assests/clearBtn.svg';
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
          `${import.meta.env.VITE_APP_BASE_URL}/apis/pin
          `,
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
                <Closebutton width='24' height='24'></Closebutton>
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
                placeholder={
                  inputPinContents.length === 0 ? '아늑하고 포근한 우리집' : ''
                }
              />
              <CloseButtonContainer onClick={handleClearbutton}>
                <Clearbutton width='13.5' height='13.5'></Clearbutton>
              </CloseButtonContainer>
            </InputWrapper>
          </SecondSection>
          <ThirdSection>
            <SaveButton
              disabled={inputPinContents.length === 0 ? true : false}
              onClick={handleSaveButton}
            >
              완료
            </SaveButton>
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
  width: 32.3rem;
  height: 20.6rem;
  background: #ffffff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
`;

const FirstSection = styled.div`
  padding: 2rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const FirstTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 28.3rem;
  height: 2.4rem;
  margin-bottom: 0.8rem;
`;

const FirstText = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: -0.023rem;
  text-align: center;
  color: #333333;
`;

const CloseButtonContainer = styled.button`
  background: none;
  border: none;
`;

const SecondSection = styled.div`
  width: 32.3rem;
  height: 4rem;
  padding: 0 2rem 0 2rem;
`;

const SecondText = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  color: #a1a1a1;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0 0.8rem 0;
  width: 28.3rem;
  height: 4rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.05rem solid #dcdcdc;
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: inherit;
  padding: 0;
  width: 28.3rem;
  height: 2rem;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: #333333;

  &::placeholder {
    color: dcdcdc;
  }

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }
`;

const ThirdSection = styled.div`
  width: 32.3rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 2rem 0;
`;

const SaveButton = styled.button`
  padding: 0.8rem, 5.2rem;
  width: 16rem;
  height: 4rem;
  background: #333333;
  border-radius: 9.9rem;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: #dcdcdc;
  border: none;

  &:disabled {
    cursor: not-allowed;
    background: #dcdcdc;
    color: #ffffff;
  }
`;

export default CreatePinModal;
