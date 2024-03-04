import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        // it can allow as to change svg styles using props like when we work with icons
        options: {
          icon: true,
          // this allow as to change icon text color
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    // it is very important order to be in such mode
    use: [
      // create css files nodes from JS strings, we can use instead `style-loader` to create css strings in js files
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // translate css into CommonJS
      cssLoaderWithModules,
      // compiles sass to css
      "sass-loader",
    ],
  };
  // can work with jsx, widout typescript we use babel-loader
  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        // is used to do building process fast and to not display error in logs
        options: {
          transpileOnly: isDev,
          // it is used for hot refresh
          // getCustomTransformers: () => ({
          //   before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          // }),
        },
      },
    ],
    exclude: /node_modules/,
  };
  const babelLoader = buildBabelLoader(options);

  return [assetLoader, scssLoader, /*tsLoader*/ babelLoader, svgLoader];
}
