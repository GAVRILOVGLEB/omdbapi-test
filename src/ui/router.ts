import { createState } from "@persevie/statemanjs";

const routes = {
    movies: "/movies",
};

const routesList = Object.values(routes);

const pathnameState = createState(window.location.pathname);

function routeHref(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
): void {
    event.preventDefault();

    if (event.currentTarget.tagName === "A") {
        const { pathname: path } = new URL(event.currentTarget.href);

        if (!window.history.state || window.history.state.path !== path) {
            window.history.pushState({ path }, "", path);
            route();
        }

        event.stopPropagation();
    }
}

function redirect(dest: string): void {
    const { pathname: path } = new URL(window.location.origin + dest);
    window.history.pushState({ path }, "", path);
    route();
}

function route(): void {
    pathnameState.set(window.location.pathname);
}

export { routes, routesList, pathnameState, routeHref, redirect, route };
