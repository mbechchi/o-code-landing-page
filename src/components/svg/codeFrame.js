import React from "react";
import Img from "gatsby-image"

const CodeFrame = ({ className, fixedPicture }) => {
return (
    <div className={"c-code-frame " + className}>

        <Img className="c-code-frame__picture" fixed={fixedPicture} />

        <svg className={"c-code-frame__frame"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.664 153.72">
            <g><path d="M56.336 5.291a5.294 5.294 0 10-5.294 5.293 5.293 5.293 0 005.294-5.293" fill="#0053ff"/><path d="M41.086 5.291a5.294 5.294 0 10-5.293 5.293 5.293 5.293 0 005.293-5.293" fill="#0053ff"/><path d="M48.711 18.194a5.293 5.293 0 10-5.293 5.294 5.294 5.294 0 005.293-5.294" fill="#0053ff"/><path d="M56.336 31.291a5.294 5.294 0 10-5.294 5.294 5.293 5.293 0 005.294-5.294" fill="#101010"/><path d="M33.462 18.194a5.293 5.293 0 10-5.294 5.294 5.294 5.294 0 005.294-5.294" fill="#0053ff"/><path d="M48.711 44.24a5.293 5.293 0 10-5.293 5.294 5.293 5.293 0 005.293-5.294" fill="#101010"/><path d="M41.086 57.289a5.294 5.294 0 10-5.293 5.293 5.293 5.293 0 005.293-5.293" fill="#101010"/><path d="M10.587 57.289a5.294 5.294 0 10-5.294 5.293 5.293 5.293 0 005.294-5.293" fill="#101010"/><path d="M48.711 70.287a5.293 5.293 0 10-5.293 5.294 5.293 5.293 0 005.293-5.294" fill="#101010"/><path d="M56.336 57.289a5.294 5.294 0 10-5.294 5.293 5.293 5.293 0 005.294-5.293" fill="#101010"/><path d="M114.578 148.428a5.293 5.293 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#101010"/><path d="M122.203 135.281a5.294 5.294 0 105.294-5.293 5.294 5.294 0 00-5.294 5.293" fill="#101010"/><path d="M137.453 135.281a5.293 5.293 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#101010"/><path d="M106.953 135.281a5.293 5.293 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#0053ff"/><path d="M91.704 135.281a5.292 5.292 0 105.293-5.293 5.294 5.294 0 00-5.293 5.293" fill="#0053ff"/><path d="M76.453 135.281a5.293 5.293 0 105.294-5.293 5.294 5.294 0 00-5.294 5.293" fill="#0053ff"/><path d="M45.957 135.281a5.293 5.293 0 105.293-5.293 5.294 5.294 0 00-5.293 5.293" fill="#101010"/><path d="M30.704 135.281a5.293 5.293 0 105.293-5.293 5.294 5.294 0 00-5.293 5.293" fill="#0053ff"/><path d="M99.328 148.428a5.294 5.294 0 105.294-5.293 5.294 5.294 0 00-5.294 5.293" fill="#0053ff"/><path d="M84.078 148.428a5.293 5.293 0 105.294-5.293 5.293 5.293 0 00-5.294 5.293" fill="#0053ff"/><path d="M68.828 148.428a5.294 5.294 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#0053ff"/><path d="M53.579 148.428a5.294 5.294 0 105.294-5.293 5.293 5.293 0 00-5.294 5.293" fill="#0053ff"/><path d="M129.828 122.381a5.293 5.293 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#101010"/><path d="M114.578 122.381a5.293 5.293 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#101010"/><path d="M145.078 122.381a5.293 5.293 0 105.295-5.293 5.293 5.293 0 00-5.295 5.293" fill="#101010"/><path d="M45.957 109.283a5.293 5.293 0 105.293-5.293 5.294 5.294 0 00-5.293 5.293" fill="#0053ff"/><path d="M99.328 122.381a5.294 5.294 0 105.294-5.293 5.294 5.294 0 00-5.294 5.293" fill="#0053ff"/><path d="M84.078 122.381a5.293 5.293 0 105.294-5.293 5.293 5.293 0 00-5.294 5.293" fill="#0053ff"/><path d="M68.828 122.381a5.294 5.294 0 105.293-5.293 5.293 5.293 0 00-5.293 5.293" fill="#101010"/><path d="M15.454 109.283a5.294 5.294 0 105.294-5.293 5.294 5.294 0 00-5.294 5.293" fill="#0053ff"/><path d="M22.876 96.338a5.293 5.293 0 105.293-5.293 5.294 5.294 0 00-5.293 5.293" fill="#0053ff"/><path d="M7.625 96.338a5.294 5.294 0 105.294-5.293 5.294 5.294 0 00-5.294 5.293" fill="#0053ff"/><path d="M30.5 83.286a5.293 5.293 0 105.294-5.294 5.293 5.293 0 00-5.294 5.294" fill="#101010"/><path d="M.001 83.286a5.294 5.294 0 105.293-5.294 5.293 5.293 0 00-5.293 5.294" fill="#101010"/><path d="M25.836 83.286a5.293 5.293 0 10-5.293 5.294 5.293 5.293 0 005.293-5.294" fill="#101010"/><path d="M56.336 83.286a5.293 5.293 0 10-5.293 5.294 5.293 5.293 0 005.293-5.294" fill="#101010"/><path d="M33.818 44.319a5.294 5.294 0 10-5.294 5.294 5.293 5.293 0 005.294-5.294" fill="#101010"/></g>
        </svg>
    </div>
)}

export default CodeFrame;

