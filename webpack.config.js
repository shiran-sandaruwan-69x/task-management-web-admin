const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;
const webpack = require("webpack");

dotenv.config();

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "./index.html"
});

module.exports = {
    entry: "./src/main.tsx",
    mode: "development",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js",
        publicPath: "http://localhost:3001/",
    },
    devServer: {
        port: 3001,
        liveReload: true,
        historyApiFallback: {
            index: "/index.html",
        },
    },
    name: "top-nav",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: "shell",
            filename: "remoteEntry.js",
            remotes: {
                UserDashboard: "taskManagement@http://localhost:3000/remoteEntry.js",
            },
            exposes: {},
            shared: {
                "react": {
                    singleton: true,
                    requiredVersion: dependencies.react,
                    eager: true
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                    eager: true
                },
                "react-router": {
                    singleton: true,
                    requiredVersion: dependencies["react-router"],
                    eager: true
                },
                "react-router-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-router-dom"],
                    eager: true
                },
                "tempo-devtools": {
                    singleton: true,
                    requiredVersion: dependencies["tempo-devtools"],
                    eager: true
                },
                "antd": {
                    singleton: true,
                    requiredVersion: dependencies["antd"],
                    eager: true
                },
                "axios": {
                    singleton: true,
                    requiredVersion: dependencies["axios"],
                    eager: true
                },
                "lucide-react": {
                    singleton: true,
                    requiredVersion: dependencies["lucide-react"],
                    eager: true
                },
                "moment": {
                    singleton: true,
                    requiredVersion: dependencies["moment"],
                    eager: true
                },
                "react-toastify": {
                    singleton: true,
                    requiredVersion: dependencies["react-toastify"],
                    eager: true
                },
                "autoprefixer": {
                    singleton: true,
                    requiredVersion: dependencies["autoprefixer"],
                    eager: true
                },
                "tailwindcss": {
                    singleton: true,
                    requiredVersion: dependencies["tailwindcss"],
                    eager: true
                },
                "postcss": {
                    singleton: true,
                    requiredVersion: dependencies["postcss"],
                    eager: true
                },
                "postcss-loader": {
                    singleton: true,
                    requiredVersion: dependencies["postcss-loader"],
                    eager: true
                },
                "tailwindcss-animate": {
                    singleton: true,
                    requiredVersion: dependencies["tailwindcss-animate"],
                    eager: true
                },
                "tailwind-merge": {
                    singleton: true,
                    requiredVersion: dependencies["tailwind-merge"],
                    eager: true
                },
                "react-phone-input-2": {
                    singleton: true,
                    requiredVersion: dependencies["react-phone-input-2"],
                    eager: true
                },
            }
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Add TypeScript extensions
        alias: {
            "@": path.resolve(__dirname, "src"), // Add this line to configure the @ alias
        },
    },

};
