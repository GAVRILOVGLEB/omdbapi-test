import {
    makeStyles,
    shorthands,
    Button,
    Switch,
    Divider,
    Text,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { tokens } from "@fluentui/react-theme";
import { useStatemanjs } from "@persevie/statemanjs-react";
import React from "react";
import { AppPanelKind } from "../../entities";
import {
    closeAppPanel,
    isDarkThemeState,
    openedAppPanelState,
} from "../../state";
import { toggleTheme } from "../../theme";
import Panel from "../Panel/Panel";
import "./AppPanel.scss";

const useStyles = makeStyles({
    noMarginText: { ...shorthands.margin(0) },
    switch: {
        alignItems: "center",
        "& label": {
            ...shorthands.padding(0),
        },
    },
    noPadding: { ...shorthands.padding(0) },
    linkClr: { color: tokens.colorBrandForegroundLink },
});

function SettingsPanel(): JSX.Element {
    const isDarkTheme = useStatemanjs(isDarkThemeState);
    const classes = useStyles();

    return (
        <div className="settings-panel">
            <header className="settings-panel__header">
                <Text as="h3" size={600} className={classes.noMarginText}>
                    Settings
                </Text>

                <Button
                    onClick={closeAppPanel}
                    appearance="subtle"
                    icon={<DismissRegular />}
                />
            </header>
            <div className="settings-panel__body">
                <div className="settings-panel__body-group">
                    <Switch
                        checked={isDarkTheme}
                        label="Dark mode"
                        labelPosition="before"
                        onChange={toggleTheme}
                        className={classes.switch}
                    />
                </div>

                <Divider />
            </div>
        </div>
    );
}

function AppPanel(): JSX.Element {
    const openedPanel = useStatemanjs(openedAppPanelState);

    const PanelBody = (): JSX.Element => {
        switch (openedPanel) {
            case AppPanelKind.Settings:
                return <SettingsPanel />;

            default:
                return <></>;
        }
    };

    return (
        <Panel
            position="right"
            isOpen={openedPanel !== AppPanelKind.None}
            appereance="app"
        >
            <PanelBody />
        </Panel>
    );
}

export default AppPanel;
