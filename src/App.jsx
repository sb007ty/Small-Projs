import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PaginationComponent from "./projects/pagination/PaginationComponent";
import StopWatch from "./projects/stopwatch/StopWatch";
import Trello from "./projects/trello/Trello";
import ThemeContext from "./projects/trello/ThemeProvider";
import ThemeProvider from "./projects/trello/ThemeProvider";
import Folder from "./projects/folderProj/Folder";
import Form from "./projects/forms/Form";
import NotificationComp from "./projects/NotificationList/NotificationComp";
import Prac from "./projects/prac/Prac";
import Game from "./projects/colorgame/Game";
import Shape from "./projects/interactiveshape/Shape";
import Prac2 from "./projects/prac/Prac2";
import CapitalGame from "./projects/CapitaGame/CapitalGame";
import { DATA } from "./projects/CapitaGame/data";
import ProgressBar from "./projects/ProgressBar/ProgressBar";

function App() {
  return (
    <>
      {/* <PaginationComponent /> */}
      {/* <StopWatch /> */}
      {/* <ThemeProvider>
        <Trello />
      </ThemeProvider> */}
      {/* <Folder /> */}
      {/* <Form /> */}
      {/* <NotificationComp /> */}
      {/* <Prac /> */}
      {/* <Game total={12} /> */}
      {/* <Shape /> */}
      {/* <Prac2 /> */}
      {/* <CapitalGame data={DATA} /> */}
      <ProgressBar time={10000} />
    </>
  );
}

export default App;
