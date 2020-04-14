import React from "react"

const LocaleContext = React.createContext();

const LocaleContextConsumer = LocaleContext.Consumer;

const LocaleContextProvider = ({ children, locale }) => {

    return (
        <LocaleContext.Provider value={locale}>
            {children}
        </LocaleContext.Provider>
    );
}

export { LocaleContext, LocaleContextConsumer, LocaleContextProvider }
