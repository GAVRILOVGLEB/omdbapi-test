import React, { useEffect, useMemo } from "react";
import {
    Button,
    Divider,
    makeStyles,
    shorthands,
    Text,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { useStatemanjs } from "@persevie/statemanjs-react";

import { moviesState } from "../../../infrastructure/storage/storageService";
import { PagePanelKind } from "../../entities";
import {
    closePagePanel,
    movieSelectionState,
    openedPagePanelState,
    togglePagePanel,
} from "../../state";
import Panel from "../Panel/Panel";

const useStyles = makeStyles({
    noMarginText: { ...shorthands.margin(0) },
});

function MoreAboutMovie(): JSX.Element {
    const classes = useStyles();
    const movieSelection = useStatemanjs(movieSelectionState);
    const movies = useStatemanjs(moviesState);

    useEffect(() => {
        const selectionValues = movieSelection.values();
        const index = selectionValues.next();

        if (index.value === undefined) {
            togglePagePanel(PagePanelKind.None);
        }
    }, [movieSelection]);

    const showData = useMemo(() => {
        const selectionValues = movieSelection.values();
        const index = selectionValues.next();
        const obj = movies[index.value];

        let poster = "";
        const list = [];

        for (const property in obj) {
            const element = (obj as any)[property]; // eslint-disable-line @typescript-eslint/no-explicit-any
            if (property === "Poster") {
                poster = element;
                continue;
            }

            if (Array.isArray(element)) {
                continue;
            } else {
                list.push(`${property}: ${element}`);
            }
        }

        return (
            <>
                <img src={poster} alt="" />
                <ul>
                    {list.map((el, index) => (
                        <li key={el + index}>{el}</li>
                    ))}
                </ul>
            </>
        );
    }, [movieSelection, movies]);

    return (
        <div className="settings-panel">
            <header className="settings-panel__header">
                <Text as="h3" size={600} className={classes.noMarginText}>
                    More About Movie
                </Text>

                <div>
                    <Button
                        onClick={closePagePanel}
                        appearance="subtle"
                        icon={<DismissRegular />}
                    />
                </div>
            </header>
            <div className="settings-panel__body">
                <Divider />
                <div className="settings-panel__body-group">{showData}</div>
            </div>
        </div>
    );
}

function PagePanel(): JSX.Element {
    const openedPanel = useStatemanjs(openedPagePanelState);

    const PanelBody = (): JSX.Element => {
        switch (openedPanel) {
            case PagePanelKind.MoreAboutMovie:
                return <MoreAboutMovie />;

            default:
                return <></>;
        }
    };

    return (
        <Panel
            position="right"
            isOpen={openedPanel !== PagePanelKind.None}
            appereance="page"
        >
            <PanelBody />
        </Panel>
    );
}

export default PagePanel;
