import { TabList, Tab } from "@fluentui/react-components";
import {
    FilmstripFilled,
    FilmstripRegular,
    bundleIcon,
} from "@fluentui/react-icons";
import { useStatemanjs } from "@persevie/statemanjs-react";
import React from "react";
import { AppPage } from "../../entities";
import { routeHref, routes } from "../../router";
import { openedAppPageState } from "../../state";

const FilmOpen = bundleIcon(FilmstripFilled, FilmstripRegular);

function PageNavigation(): JSX.Element {
    const openedAppPage = useStatemanjs(openedAppPageState);

    return (
        <TabList
            defaultSelectedValue={AppPage.Movies}
            vertical
            size="large"
            appearance="subtle"
            selectedValue={openedAppPage}
        >
            <a href={routes.movies} onClick={routeHref}>
                <Tab
                    icon={<FilmOpen data-app-kind={AppPage.Movies} />}
                    value={AppPage.Movies}
                    aria-label="Files"
                />
            </a>
        </TabList>
    );
}

export default PageNavigation;
