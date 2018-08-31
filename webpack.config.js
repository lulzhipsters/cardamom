const VueLoaderPlugin = require("vue-loader/lib/plugin");
require("@babel/polyfill");

module.exports = {
    entry: {
        "./dist/main": ["@babel/polyfill", "./app/main.ts"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: "vue-loader"
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
        extensions: [".js", ".ts", ".vue", ".json"]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};