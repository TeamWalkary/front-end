import { S } from "./style";
//
import { ReactComponent as MenuBtn } from "../../../assests/menuBtn.svg";
import { ReactComponent as Calendar } from "../../../assests/calendar.svg";
import { ReactComponent as Logo } from "../../../assests/newLogo.svg";
import SideNav from "./SideNav/index";
import { useEffect, useState } from "react";
import Today from "../Today";
import { useLocation, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { axiosInstance } from "../../../core/api/axios";

export default function Nav() {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}${month}${day}`;
  };

  const getMonthDiary = () => {
    const paramDate = formatDate(new Date());
    const config = {
      params: { date: paramDate },
    };
    axiosInstance
      .get(`${import.meta.env.VITE_APP_BASE_URL}/apis/calendar/check?`, config)
      .then(res => {
        setHaveDiary(`${res.data.diaryDay},${res.data.pinDay}`.split(","));
      });
  };

  useEffect(() => {
    getMonthDiary(); // 컴포넌트가 마운트될 때 getMonthDiary 함수를 호출합니다.
  }, []);

  const [sideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname.startsWith("/main");
  console.log(isMainPage);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [haveDiary, setHaveDiary] = useState<string[]>();

  const handleMonthChange = (date: Date) => {
    const paramDate = formatDate(date);
    const config = {
      params: { date: paramDate },
    };
    axiosInstance
      .get(`${import.meta.env.VITE_APP_BASE_URL}/apis/calendar/check?`, config)
      .then(res => {
        setHaveDiary(`${res.data.diaryDay},${res.data.pinDay}`.split(","));
      });
  };

  const haveRecord = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const cleanedDiary = haveDiary
      .map(d => d.trim().padStart(2, "0"))
      .filter(Boolean);
    return cleanedDiary.includes(day) ? "hasData" : "";
  };

  return (
    <>
      {sideNavOpen && <SideNav setSideNavOpen={setSideNavOpen} />}
      <S.MainHeader>
        <MenuBtn onClick={() => setSideNavOpen(true)} />
        {isMainPage ? (
          <Today selectedDate={selectedDate} />
        ) : (
          <Logo
            width='61'
            height='16'
            onClick={() => {
              navigate("main");
            }}
          />
        )}
        <StyledDatePicker>
          <ReactDatePicker
            selected={selectedDate}
            maxDate={new Date()}
            onChange={date => {
              setSelectedDate(date);
              const clickedDate = formatDate(date);
              navigate(`/main/${clickedDate}`);
            }}
            formatWeekDay={nameOfDay => nameOfDay.substring(0, 1)}
            dayClassName={haveRecord}
            onMonthChange={handleMonthChange}
          ></ReactDatePicker>
        </StyledDatePicker>
      </S.MainHeader>
    </>
  );
}

const StyledDatePicker = styled.div`
  .react-datepicker-popper {
    z-index: 9999;
  }

  .hasData {
    color: orange;
  }
`;
