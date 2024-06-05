import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { tokens } from "@fluentui/react-theme";
import { makeStyles, shorthands } from "@fluentui/react-components";
import PageNavigation from "../components/PageNavigation/PageNavigation";
import "./App.scss";
import Movies from "../components/Movies/Movies";
import CommandBar from "../components/CommandBar/CommandBar";
import { AppPage } from "../entities";
import { openedAppPageState } from "../state";
import AppPanel from "../components/AppPanel/AppPanel";
import PagePanel from "../components/PagePanel/PagePanel";
import MainPanel from "../components/MainPanel/MainPanel";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const useStyles = makeStyles({
    pageNavigation: { backgroundColor: tokens.colorNeutralBackground1Selected },
    loader: {
        position: "absolute",
        ...shorthands.margin("auto", "auto"),
        height: "100%",
        width: "100%",
    },
});

type AppPageProps = {
    openedAppPage: AppPage;
};

function Page(props: AppPageProps): JSX.Element {
    switch (props.openedAppPage) {
        case AppPage.Movies:
            return <Movies />;

        default:
            throw new Error("[APP_PAGE]: Wrong page");
    }
}

type AppProps = {
    appPage: AppPage;
};

function App(props: AppProps): JSX.Element {
    const classes = useStyles();

    useEffect(() => {
        openedAppPageState.set(props.appPage);
    }, [props.appPage]);

    return (
        <ErrorBoundary>
            <>
                <Header />

                <div className="app__layout">
                    <aside className={classes.pageNavigation}>
                        <PageNavigation />
                    </aside>
                    <main className="app__main">
                        <CommandBar />

                        <div className="app__body">
                            <div className="app__content">
                                <Page openedAppPage={props.appPage} />
                            </div>
                            <PagePanel />
                        </div>
                    </main>

                    <AppPanel />
                </div>

                <MainPanel />
                <ErrorMessage />
            </>
        </ErrorBoundary>
    );
}

export default App;
