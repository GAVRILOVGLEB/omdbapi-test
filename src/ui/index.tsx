import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import {
    FluentProvider,
    Theme,
    makeStyles,
    shorthands,
    tokens,
    mergeClasses,
} from "@fluentui/react-components";
import { useStatemanjs } from "@persevie/statemanjs-react";
import "./styles/common/index.scss";
import { themeState } from "./theme";
import { AppPage } from "./entities";
import { routes, pathnameState, route } from "./router";

window.onpopstate = (): void => {
    route();
};

type AppThemeWrapper = {
    children: JSX.Element;
};

const useStyles = makeStyles({
    loader: {
        position: "absolute",
        ...shorthands.margin("auto", "auto"),
        height: "100%",
        width: "100%",
    },
    root: { backgroundColor: tokens.colorNeutralBackground1 },
});

function getAppPage(pathname: string): AppPage {
    switch (pathname) {
        case routes.movies:
            return AppPage.Movies;

        default:
            return AppPage.Movies;
    }
}

function AppThemeWrapper(props: AppThemeWrapper): JSX.Element {
    const theme: Theme = useStatemanjs(themeState);
    const classes = useStyles();

    return (
        <FluentProvider theme={theme}>
            <div className={mergeClasses(classes.root, "app-wrapper")}>
                {props.children}
            </div>
        </FluentProvider>
    );
}

function AppRouterWrapper(): JSX.Element {
    const pathname = useStatemanjs(pathnameState);
    const appPage = getAppPage(pathname);

    return (
        <AppThemeWrapper>
            <App appPage={appPage} />
        </AppThemeWrapper>
    );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppRouterWrapper />);
