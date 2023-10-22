import styled from 'styled-components';
import { useState } from 'react';
import CreatePinModal from './CreatePinModal';

const MainView = () => {
  ///핀 버튼과 모달 연결 위해 메인 뷰에 추가할 부분
  const [modalShow, setModalShow] = useState<Boolean>(false);

  const handlePinButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModalShow(true);
  };
  ///
  return (
    <>
      {modalShow ? (
        <CreatePinModal
          setModalShow={setModalShow}
          latitude={33.450701}
          longitude={126.570667}
        ></CreatePinModal>
      ) : (
        <>
          <PinButton onClick={handlePinButton}> 핀 버튼</PinButton>
        </>
      )}
    </>
  );
};

const PinButton = styled.button``;

export default MainView;
