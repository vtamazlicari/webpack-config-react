import { BuildOptions } from "../types/types";
import { removeDataTestidBabelPlugin } from "./removeDataTestidBabelPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === "development";

  const plugins = [];

  if (!isDev) {
    // this is our own plugin used to remove data-testid attributes from html elements
    plugins.push([removeDataTestidBabelPlugin, { props: ["data-testid"] }]);
  }

  return {
    test: /\.m?tsx$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: isDev ? "automatic" : "classic" }],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}
