import React from "react";
import Splitting from "splitting";

// The Splitting module is dependent of window/client objects
// These client objects are not available in SSR
// Thus the module need to be load in the client only :
// https://www.gatsbyjs.org/docs/debugging-html-builds/
// Both following components depend on these modules and are loaded with react-loadable
// https://github.com/jamiebuilds/react-loadable

const AnimatedButton = ({ className, label, style, onClick }) => {

    return (
        <button className={"c-btn-animated " + className}
            onClick={onClick}
            style={style}
            dangerouslySetInnerHTML={{ __html: Splitting.html({ content: label, by: 'chars' })}}>
        </button>
    )
}

export default { AnimatedButton };


