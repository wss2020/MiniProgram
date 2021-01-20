import React, {useState, useEffect,useContext} from 'react';

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

const ThemeContext = React.createContext(themes.light);

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    );
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}


// 本来下面的代码应该出现在 页面中
export function App() {
    return (
        <div>
            <ThemeContext.Provider value={themes.light}>
                <Toolbar />
            </ThemeContext.Provider>
            <div style={{height: '30px'}}></div>
            <ThemeContext.Provider value={themes.dark}>
                <Toolbar />
            </ThemeContext.Provider>
        </div>
    );
}


