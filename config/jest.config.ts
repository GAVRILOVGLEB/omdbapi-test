import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    preset: "ts-jest",
    rootDir: "../",
    testEnvironment: "jest-environment-jsdom",
};

export default config;
