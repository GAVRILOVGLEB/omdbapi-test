import React from "react";
import {
    Button,
    makeStyles,
    mergeClasses,
    tokens,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import "./CommandBar.scss";
import { useStatemanjs } from "@persevie/statemanjs-react";
import { movieSelectionState, resetmovieSelection } from "../../state";

const useStyles = makeStyles({
    commandBar: {
        height: "44px",
        width: "100%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: tokens.colorNeutralBackground1Selected,
    },
    toggleButton: {
        "& span": {
            color: `${tokens.colorNeutralForeground1} !important`,
        },

        ":hover": {
            "& span": {
                color: `${tokens.colorBrandForeground1} !important`,
            },
        },
    },
});

function CommandBar(): JSX.Element {
    const movieSelection = useStatemanjs(movieSelectionState);

    const classes = useStyles();

    return (
        <header className={mergeClasses(classes.commandBar, "command-bar")}>
            <div className="command-bar__group">{/*Add some actions*/}</div>
            <div className="command-bar__group">
                {movieSelection.size > 0 && (
                    <Button
                        appearance="subtle"
                        icon={<DismissRegular />}
                        onClick={resetmovieSelection}
                    >
                        Selected {movieSelection.size}
                    </Button>
                )}
            </div>
        </header>
    );
}

export default CommandBar;
