/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const root = path.join(process.cwd());
const nodeModules = path.join(root, "node_modules");
const build = path.resolve(root, "build");
const public = path.resolve(root, "public");
const client = path.join(root, "src");
const domain = path.join(client, "domain");
const application = path.join(client, "application");
const services = path.join(client, "services");
const ui = path.join(client, "ui");
const components = path.join(ui, "components");
const assets = "assets";
const static = "static";
const media = "media";

module.exports = {
    nodeModules,
    root,
    build,
    public,
    client,
    domain,
    application,
    services,
    ui,
    components,
    assets,
    static,
    media,
};
