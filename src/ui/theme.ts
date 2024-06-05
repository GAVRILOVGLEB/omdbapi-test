import { Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { isDarkThemeState, themeState } from "./state";

const themeCacheKey = "isDarkTheme";

function isDarkThemeInCache(): boolean {
    const cachedTheme = localStorage.getItem(themeCacheKey);

    if (cachedTheme === null) {
        return false;
    }

    return cachedTheme === "true";
}

function cacheTheme(theme: boolean): void {
    localStorage.setItem(themeCacheKey, `${theme}`);
}

function matchTheme(isDarkTheme: boolean): Theme {
    return isDarkTheme ? webDarkTheme : webLightTheme;
}

function toggleTheme(): void {
    const themeValue = !isDarkThemeInCache();
    themeState.set(matchTheme(themeValue));
    cacheTheme(themeValue);
    isDarkThemeState.set(themeValue);
}

const val = isDarkThemeInCache();
isDarkThemeState.set(val);
themeState.set(matchTheme(val));

export { themeState, toggleTheme, isDarkThemeState };
