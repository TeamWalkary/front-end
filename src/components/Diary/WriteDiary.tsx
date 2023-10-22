import styled from "styled-components";
import { useState, ChangeEvent } from "react";
//import axios from "axios";
//import { realReq } from "../../api/axios";

export default function WriteDiary() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    // const postData = {
    //   title: title,
    //   text: text,
    //   imageUrl: imageUrl,
    // };
    try {
      // const response = await axios.post(
      //   "http://15.165.134.29:8080/apis/diary",
      //   postData
      // );
      // const response = await realReq.POST(
      //   "http://15.165.134.29:8080/apis/diary",
      //   postData
      // );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <input placeholder="제목" value={title} onChange={handleChangeTitle} />
      {imageUrl && <PreviewImage src={imageUrl} alt="preview" />}
      <textarea value={text} onChange={handleChangeContent}></textarea>
      <div>
        <input type="file" onChange={handleChangeImage} />
      </div>
      <div>{text.length} / 500</div>
      <button onClick={handleSubmit}>작성 완료</button>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const PreviewImage = styled.img`
  margin: 2rem;
  height: auto;
  aspect-ratio: 16 / 9;
`;
