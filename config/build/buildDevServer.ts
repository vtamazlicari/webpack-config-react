import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    // it is used to allow SPA routing when you use HTML5 History API
    // it work just with dev-server, using nginx need to do proxy to index.html
    historyApiFallback: true,
    // not refresh page after code changes but apply all changes in current runtime (need react-refresh-webpack-plugin and react-refresh-typescript to work correctly)
    hot: true,
  };
}
