import { makeStyles } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import React from "react";

type PanelProps = {
    appereance: "main" | "app" | "page";
    isOpen: boolean;
    children: JSX.Element;
    position: "left" | "right";
};

const useStyles = makeStyles({
    panel: {
        height: "100%",
        backgroundColor: tokens.colorNeutralBackground1,
        transitionProperty: "width, opacity",
        transitionDuration: "0.15s, 0.25s",
        transitionTimingFunction: "cubic-bezier(0.65, 0.05, 0.36, 1)",
        transitionDelay: "0s",
        width: "0px",
        opacity: 0,
    },
    panelAbsolute: {
        position: "absolute",
        zIndex: "10",
    },
    panelRight: {
        right: "0",
    },
    panelLeft: {
        left: "0",
    },
    panelMain: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        boxShadow: tokens.shadow8,
    },
    panelApp: {
        boxShadow: tokens.shadow4,
    },
    panelPage: {
        boxShadow: tokens.shadow2,
    },
    panelOpened: {
        opacity: 1,
        width: "350px",

        "@media screen and (max-width: 600px)": {
            position: "absolute",
            right: 0,
            width: "100vw",
        },
    },
    panelClosed: {
        width: 0,
        opacity: 0,
    },
});

function Panel(props: PanelProps): JSX.Element {
    const classes = useStyles();

    let panelClass = classes.panel;

    switch (props.appereance) {
        case "main":
            panelClass += ` ${classes.panelMain}`;
            break;

        case "app":
            panelClass += ` ${classes.panelApp}`;
            break;

        case "page":
            panelClass += ` ${classes.panelPage}`;
            break;
    }

    if (props.isOpen) {
        panelClass += ` ${classes.panelOpened}`;
    } else {
        panelClass += ` ${classes.panelClosed}`;
    }

    return <aside className={panelClass}>{props.children}</aside>;
}

export default Panel;
