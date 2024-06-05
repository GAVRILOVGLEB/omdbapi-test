import { Theme } from "@fluentui/react-theme";
import { createState } from "@persevie/statemanjs";
import {
    AppPage,
    AppPanelKind,
    MainPanelKind,
    PagePanelKind,
} from "./entities";

// states

const isDarkThemeState = createState(false);
const themeState = createState<Theme>({} as Theme);

const openedAppPageState = createState<AppPage>(AppPage.Movies);

const openedMainPanelState = createState<MainPanelKind>(MainPanelKind.None);
const openedAppPanelState = createState<AppPanelKind>(AppPanelKind.None);
const openedPagePanelState = createState<PagePanelKind>(PagePanelKind.None);

const _defaultMovieSelectionValue: Set<string | number> = new Set([]);
const movieSelectionState = createState<Set<string | number>>(
    _defaultMovieSelectionValue,
);

// actions

function toggleAppPanel(kind: AppPanelKind): void {
    switch (openedAppPanelState.get()) {
        case AppPanelKind.None:
            openedAppPanelState.set(kind);
            break;

        case kind:
            openedAppPanelState.set(AppPanelKind.None);
            break;

        default:
            openedAppPanelState.set(AppPanelKind.None);
            setTimeout(() => {
                openedAppPanelState.set(kind);
            }, 250);
            break;
    }
}

function closeAppPanel(): void {
    openedAppPanelState.set(AppPanelKind.None);
}

function showMovieDetailsPanel(kind: PagePanelKind): void {
    openedPagePanelState.set(kind);
}

function togglePagePanel(kind: PagePanelKind): void {
    openedPagePanelState.set(
        openedPagePanelState.get() === kind ? PagePanelKind.None : kind,
    );
}

function closePagePanel(): void {
    openedPagePanelState.set(PagePanelKind.None);
}

function toggleMainPanel(kind: MainPanelKind): void {
    openedMainPanelState.set(
        openedMainPanelState.get() === kind ? MainPanelKind.None : kind,
    );
}

function closeMainPanel(): void {
    openedMainPanelState.set(MainPanelKind.None);
}

function resetmovieSelection(): void {
    movieSelectionState.set(_defaultMovieSelectionValue);
}

function switchAppPage(pageKind: AppPage): void {
    if (openedAppPageState.get() !== pageKind) {
        closePagePanel();
        openedAppPageState.set(pageKind);
    }
}

export {
    // states
    isDarkThemeState,
    themeState,
    openedAppPageState,
    openedMainPanelState,
    openedAppPanelState,
    openedPagePanelState,
    movieSelectionState,
    // actions
    toggleAppPanel,
    closeAppPanel,
    togglePagePanel,
    showMovieDetailsPanel,
    closePagePanel,
    toggleMainPanel,
    closeMainPanel,
    resetmovieSelection,
    switchAppPage,
};
