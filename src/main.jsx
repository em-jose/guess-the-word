import React from "react";
import ReactDOM from "react-dom/client";
import { GuessTheWord } from "./components/GuessTheWord.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GuessTheWord />
    </React.StrictMode>
);
