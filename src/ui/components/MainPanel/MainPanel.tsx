import { Button, makeStyles } from "@fluentui/react-components";
import {
    bundleIcon,
    FilmstripFilled,
    FilmstripRegular,
    GridDotsFilled,
} from "@fluentui/react-icons";
import { useStatemanjs } from "@persevie/statemanjs-react";
import React from "react";
import { AppPage, MainPanelKind } from "../../entities";
import { routeHref, routes } from "../../router";
import { closeMainPanel, openedMainPanelState } from "../../state";
import Panel from "../Panel/Panel";
import "./MainPanel.scss";

const FilmOpen = bundleIcon(FilmstripFilled, FilmstripRegular);

const useStyles = makeStyles({
    launcher: {
        width: "48px",
        maxWidth: "100%",
        minWidth: "48px",
        height: "48px",
        paddingTop: 0,
        borderSize: 0,
        paddingBottom: 0,
        position: "relative",
    },
});

function switchApp(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
): void {
    closeMainPanel();
    routeHref(event);
}

function AppLauncher(): JSX.Element {
    const classes = useStyles();

    return (
        <div className="main-panel">
            <header className="main-panel__header">
                <Button
                    className={classes.launcher}
                    shape="square"
                    appearance="subtle"
                    icon={<GridDotsFilled />}
                    aria-label="App Launcher"
                    onClick={closeMainPanel}
                />
            </header>
            <div className="main-panel__body">
                {/* TODO: add bubbling (switchApp) */}
                <div className="app-launcher-apps">
                    <a href={routes.movies} onClick={switchApp}>
                        <Button
                            appearance="subtle"
                            size="large"
                            icon={<FilmOpen data-app-kind={AppPage.Movies} />}
                            data-app-kind={AppPage.Movies}
                        >
                            Movies
                        </Button>
                    </a>
                </div>
                <div className="app-launcher-info"></div>
            </div>
        </div>
    );
}

function MainPanel(): JSX.Element {
    const openedPanel = useStatemanjs(openedMainPanelState);

    const PanelBody = (): JSX.Element => {
        switch (openedPanel) {
            case MainPanelKind.AppLauncher:
                return <AppLauncher />;

            default:
                return <></>;
        }
    };

    return (
        <Panel
            position="left"
            isOpen={openedPanel !== MainPanelKind.None}
            appereance="main"
        >
            <PanelBody />
        </Panel>
    );
}

export default MainPanel;
