import styled from 'styled-components';
import { ReactComponent as Check } from '../../assests/check.svg';
import { ReactComponent as BackArrow } from '../../assests/backArrow.svg';
import { ReactComponent as Picture } from '../../assests/picture.svg';
import { useState, ChangeEvent, useRef } from 'react';
import Today from '../Common/Today';
import { useNavigate } from 'react-router-dom';
import { diaryApi } from '../../core/api/diary';

export default function DiaryPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files![0];

    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInputHandler = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!text || !title) {
      alert('일기의 제목과 내용을 작성해주세요!');
      return;
    }

    if (text.length > 500) {
      alert('일기의 내용이 500자를 초과했습니다.');
      return;
    }

    const postData = {
      title: title,
      content: text,
      image: imageUrl,
    };

    try {
      await diaryApi.postDiary(postData);
      //console.log(postData);
      navigate('/main', { state: { todayDiary: true } });
    } catch (error) {
      //console.error(error);
    }
  };

  return (
    <Container>
      <DiaryHeader>
        <BackArrow onClick={() => navigate('/main')} />
        <Today />
        <Check
          //style={{ opacity: `${validate ? "1" : "0.4"}` }}
          //onClick={validate ? handleSubmit : () => {}}
          onClick={handleSubmit}
        />
      </DiaryHeader>
      <InputArea>
        <TitleInput
          placeholder='제목'
          value={title}
          onChange={handleChangeTitle}
        />
        {imageUrl && (
          <ImageWrapper>
            <PreviewImage src={imageUrl} alt='preview' />
          </ImageWrapper>
        )}
        <ContentInput
          value={text}
          onChange={handleChangeContent}
        ></ContentInput>
        <DiaryFooter>
          <div>
            <Picture onClick={fileInputHandler} />
            <input
              type='file'
              onChange={handleChangeImage}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </div>
          <ContentLength>{text.length} / 500</ContentLength>
        </DiaryFooter>
      </InputArea>
    </Container>
  );
}

const Container = styled.section`
  height: auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem 0;
`;
const PreviewImage = styled.img`
  width: 33.5rem;
  height: 18.8rem;
`;

const DiaryHeader = styled.header`
  padding: 0.5rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  line-height: 2.4rem;
  font-size: 1.4rem;
  letter-spacing: -0.021rem;
  height: 4rem;
  box-shadow: 0px 4px 4px 0px rgba(51, 51, 51, 0.08);
`;

const InputArea = styled.div`
  padding: 2rem;
  position: relative;
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  background-color: inherit;
  color: #a1a1a1;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: -0.021rem;
  border-bottom: 1px solid #dcdcdc;
  outline: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  background-color: inherit;
  height: 50rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: -0.021rem;
`;

const DiaryFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;

  width: 100%
  height: 2.5rem

  color: #a1a1a1;
  background-color: white;
`;

const ContentLength = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 0.2rem;

  background-color: white;
`;
