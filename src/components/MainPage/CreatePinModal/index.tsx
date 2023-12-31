import { S } from "./style";
import PinModalCloseButton from "../../../assests/PinModalCloseButton";
import PinModalAddressNameClearButton from "../../../assests/PinModalAddressNameClearButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { pinList } from "../../../core/atom";
import { useSetRecoilState } from "recoil";
import { pinResponseType } from "../../../types/pin";

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
  //console.log(props)
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
        setInputPinContents("");
      }
    };

    geocoder.coord2Address(longitude, latitude, callback);
  }, []);

  const [inputPinContents, setInputPinContents] = useState<string>("");

  const handleClearbutton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setInputPinContents("");
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
    const token = localStorage.getItem("token");
    if (inputPinContents.length >= 1) {
      //console.log(latitude,longitude)
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
            withCredentials: true,
          }
        )
        .then((res) => {
          const config = {
            headers: { Authorization: token },
            withCredentials: true,
            params: { sortBy: "LATEST" },
          };
          axios
            .get<pinResponseType>(
              "https://api.walkary.fun/apis/main/maps-pin",
              config
            )
            .then((res) => {
              setPinList(res.data.pins);
              setModalShow(false);
            });
        })
        .catch((res) => {});
    }
  };

  return (
    <>
      <S.Container
        ref={pinModalRef}
        onClick={(event) => clickModalOutSide(event)}
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
                  inputPinContents.length === 0 ? "아늑하고 포근한 우리집" : ""
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
