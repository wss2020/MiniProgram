import ReactDOM from 'react-dom';
import {App} from "./0.MAIN CONCEPTS/5. State and Lifecycle/6.2"
import {LoginControl} from "./0.MAIN CONCEPTS/7. Conditional Rendering/2.2"
import {Page} from "./0.MAIN CONCEPTS/7. Conditional Rendering/5.2"
import {NameForm} from "./0.MAIN CONCEPTS/9.Forms/2.1 Controlled Components"
import {NameForm1} from "./0.MAIN CONCEPTS/9.Forms/2.2"
import {EssayForm} from "./0.MAIN CONCEPTS/9.Forms/3.2"
import {FlavorForm} from "./0.MAIN CONCEPTS/9.Forms/4.2"
import {Reservation} from "./0.MAIN CONCEPTS/9.Forms/5.3"
import {Calculator as Test} from "./0.MAIN CONCEPTS/10.Lifting State Up/6/index"
import React from "react";
import {FilterableProductTable, PRODUCTS} from "./0.MAIN CONCEPTS/12. Thinking In React/code1/3.Add Inverse Data Flow/index";

// ============================================================================================


ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);
///ReactDOM.render(<Test />, document.getElementById("root"));



