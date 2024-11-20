import React, { useState } from "react";
import UseStateExample1 from "./Example/UseStateExample1";
import UseStateExample2 from "./Example/UseStateExample2";
import UseEffectExample1 from "./Example/UseEffectExample1";
import UseEffectExample2 from "./Example/UseEffectExample2";
import UseRefExample1 from "./Example/UseRefExample1";
import UseRefExample2 from "./Example/UseRefExample2";
import UseRefExample3 from "./Example/UseRefExample3";

const App = () => {
    const [activeComponent, setActiveComponent] = useState("home");

    const renderComponent = () => {
        switch (activeComponent) {
            case "usestate1":
                return <UseStateExample1 />;
            case "usestate2":
                return <UseStateExample2 />;
            case "useeffect1":
                return <UseEffectExample1 />;
            case "useeffect2":
                return <UseEffectExample2 />;
            case "useref1":
                return <UseRefExample1 />;
            case "useref2":
                return <UseRefExample2 />;
            case "useref3":
                return <UseRefExample3 />;
                }
            };

        return (
            <div>
                <h1>React Hooks Examples</h1>
                <nav>
                    <ul>
                        <li onClick={() => setActiveComponent("usestate1")}>
                            <button>UseState Example 1</button>
                        </li>
                        <li onClick={() => setActiveComponent("usestate2")}>
                            <button>UseState Example 2</button>
                        </li>
                        <li onClick={() => setActiveComponent("useeffect1")}>
                            <button>UseEffect Example 1</button>
                        </li>
                        <li onClick={() => setActiveComponent("useeffect2")}>
                            <button>UseEffect Example 2</button>
                        </li>
                        <li onClick={() => setActiveComponent("useref1")}>
                            <button>UseRef Example 1</button>
                        </li>
                        <li onClick={() => setActiveComponent("useref2")}>
                            <button>UseRef Example 2</button>
                        </li>
                        <li onClick={() => setActiveComponent("useref3")}>
                            <button>UseRef Example 3</button>
                        </li>
                    </ul>
                </nav>

            <div>{renderComponent()}</div>
        </div>
    );
};

export default App;