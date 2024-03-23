const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource", // EXAMPLE HERE
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    })],
};
