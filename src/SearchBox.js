import { useState, useEffect } from "react";

function SearchBox(props) {

    const [options, setoptions] = useState([]);

    const [id, setId] = useState(1);
    const sugestionsHandler = (text) => {
        let matches = [];
        if (text.length > 0) {
            matches = props.list.filter((data) => {
                const formatter = text.replace(/[°"§%(){}=\\?´`'#<>|,;.:+_-]+/g, (y) => `\\${y}`);
                const regex = new RegExp(`${formatter}`, "gi");
                return data.match(regex);
            });
        }
        setoptions(matches);
    };
    useEffect(() => {
        for (let i in props.list) {
            if (props.value == props.list[i]) {
                setId(i);
            }
        }
    }, [props.value, props.list]);

    const idHandler = () => {
        if (id) {
            props
                .fetcher(`https://rickandmortyapi.com/api/location/${id}`)
                .then((data) => props.setInfo(data));
        }
    };

    return (
        <div className="SearchBox">
            <input
                placeholder="Type a location"
                value={props.value}
                onChange={(e) => {
                    props.setValue(e.target.value);
                    sugestionsHandler(e.target.value);
                    props.setPage(1);
                }}
            />

            {options[0] && (
                <ul className="suggestions">
                    {options.map(
                        (_, index) =>
                            index < 4 &&
                            options[0] != props.value && (
                                <li
                                    key={index}
                                    onClick={(e) => {
                                        props.setValue(e.target.innerText);
                                        sugestionsHandler(e.target.value);
                                    }}
                                >
                                    {options[index]}
                                </li>
                            )
                    )}
                </ul>
            )}

            <button
                onClick={() => {
                    idHandler();
                }}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBox;