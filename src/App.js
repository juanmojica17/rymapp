import "./App.css";
import SearchBox from "./SearchBox";
import LocationContainer from "./LocationContainer";
import { useState, useEffect } from "react";
import ResidentContainer from "./ResidentContainer";

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState("");
  const [page, setPage] = useState(0);
  const [info, setInfo] = useState("");
  const [buttons, setButtons] = useState([]);

  const fetcher = (url) => {
    return fetch(url).then((response) => response.json());
  };

  useEffect(() => {
    for (let i = 1; i <= 6; i++) {
      fetcher(`https://rickandmortyapi.com/api/location?page=${i}`)
          .then((response) => response.results.map((object) => object.name))
          .then((data) => {
            setList((oldData) => oldData.concat(data));
          });
    }

    if (typeof list == "string") {
      setList(list.split(","));
    }
  }, []);
  useEffect(() => {
    if (info) {
      let x = new Array(Math.ceil(info.residents.length / 10))
          .fill()
          .map((item, index) => {
            item = index + 1;
            return item;
          });
      setButtons(x);
    }
  }, [info]);

  const pageHandler = (value) => {
    setPage(value);
  };

  useEffect(() => {
    fetcher(
        `https://rickandmortyapi.com/api/location/${Math.floor(
            Math.random() * 100
        )}`
    ).then((data) => setInfo(data));
    setPage(1);
  }, []);

  return (
      <div className="App">
        <h1>Rick and Morty</h1>
          <h6>MOJICAAPP</h6>
        <SearchBox
            value={value}
            setValue={setValue}
            list={list}
            fetcher={fetcher}
            setInfo={setInfo}
            setPage={setPage}
        />
        {info && <LocationContainer info={info} />}
        <div>
          {buttons &&
          buttons.map((item, index) => (
              <button
                  onClick={(e) => {
                    pageHandler(item);
                  }}
                  key={index}
              >
                {item}
              </button>
          ))}
        </div>
        <div className="residents">
          {info && (
              <>{info.residents.map((item, index) => (
                  <ResidentContainer
                      key={index}
                      value={index}
                      resident={item}
                      fetcher={fetcher}
                      page={page}
                  />
              ))}</>)}
        </div>
      </div>
  );
}

export default App;