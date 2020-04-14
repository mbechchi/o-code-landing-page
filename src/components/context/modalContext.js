import React from "react"

const ModalContext = React.createContext();

const ModalContextConsumer = ModalContext.Consumer;

const ModalContextProvider = ({ children, ...props}) => {

    const [modalOpen, setModalOpen] = React.useState(false);

    const toggleOpenModal = () => {
        setModalOpen(!modalOpen);
        // Side effect
        document && document.querySelector('body').classList[modalOpen ? 'remove' : 'add']("u-overflow-hidden");
    };

    return (
        <ModalContext.Provider value={{modalOpen, toggleOpenModal}}>
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext, ModalContextConsumer, ModalContextProvider }
