import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";

import { MoviesContextProvider } from "./context/moviesContext";

export function App() {
  return (
    <MoviesContextProvider>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />

        <Content />
      </div>
    </MoviesContextProvider>
  );
}
