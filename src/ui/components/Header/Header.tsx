import {
    Button,
    makeStyles,
    mergeClasses,
    Tooltip,
    Subtitle2,
} from "@fluentui/react-components";
import React from "react";
import { GridDotsFilled, SettingsRegular } from "@fluentui/react-icons";
import { tokens } from "@fluentui/react-theme";
import logo from "../../assets/logo192.png";
import "./Header.scss";
import Search from "../Search/Search";
import { AppPanelKind, MainPanelKind } from "../../entities";
import { toggleAppPanel, toggleMainPanel } from "../../state";

const useStyles = makeStyles({
    header: { backgroundColor: tokens.colorBrandBackground },
    commandButton: {
        width: "48px",
    },
    userButton: {
        display: "grid",
        gridAutoFlow: "column",
        columnGap: "8px",
        alignItems: "center",
        alignContent: "center",
    },
    button: {
        maxWidth: "100%",
        minWidth: "48px",
        height: "48px",
        paddingTop: 0,
        borderSize: 0,
        paddingBottom: 0,
        position: "relative",
        ":hover": {
            backgroundColor: tokens.colorSubtleBackgroundInvertedHover,
        },
    },
    whiteClr: {
        color: "#ffffff",
    },
    darkBackground: {
        backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ringer: {
        ":hover": {
            "& #ringerBadge": {
                backgroundColor: "#ffffff",
                color: "#000000",
            },
        },
    },
    ringerBadge: {
        position: "absolute",
        top: "3px",
        right: "8px",
    },
});

function Header(): JSX.Element {
    const classes = useStyles();

    return (
        // TODO: add bubbling (open appPanel)
        <header className={mergeClasses(classes.header, "header")}>
            <Tooltip
                showDelay={1000}
                content="App Launcher"
                relationship="label"
            >
                <Button
                    className={mergeClasses(
                        classes.button,
                        classes.commandButton,
                    )}
                    shape="square"
                    appearance="subtle"
                    icon={<GridDotsFilled className={classes.whiteClr} />}
                    aria-label="App Launcher"
                    onClick={(): void =>
                        toggleMainPanel(MainPanelKind.AppLauncher)
                    }
                />
            </Tooltip>

            <div className="header__logo">
                <img height={32} width={40} src={logo} alt="sp logo" />
                <Subtitle2 as="h1" className={classes.whiteClr}>
                    OMDb
                </Subtitle2>
            </div>

            <Search />

            <div className="header__actions">
                <Button
                    appearance="transparent"
                    shape="square"
                    className={mergeClasses(
                        classes.button,
                        classes.commandButton,
                    )}
                    icon={<SettingsRegular className={classes.whiteClr} />}
                    data-panel-kind={AppPanelKind.Settings}
                    onClick={(): void => toggleAppPanel(AppPanelKind.Settings)}
                />
            </div>
        </header>
    );
}

export default Header;
