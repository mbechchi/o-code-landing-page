import React from "react";
import Loadable from "react-loadable"

// The AnimatedButton component is client-side dependent.
// React-loadable makes it only be loaded in the client

const LoadAnimatedButton = Loadable({
    loader: () => import("../components/splitting"),
    render(loaded, props) {
        let { AnimatedButton } = loaded.default;
        return <AnimatedButton {...props}/>;
    },
    loading() {
        return <div className="c-spinner"></div>
    },
    delay: 500
});

const AnimatedButton = ({ className, label, style, onClick }) => {
    return (
        <LoadAnimatedButton className={className} label={label} style={style} onClick={onClick} />
    )
}

export default AnimatedButton;


