// -----------------------------------------------------------------------------
// Webpack will hotload any JavaScript changes as you make them without the need
// to refresh your browser. However, any changes to the webpack.config.js file
// will require a server restart to take effect.
// -----------------------------------------------------------------------------
var path = require('path');
var webpack = require('webpack');
// Vendor dependencies taken from `package.json`:
var packageJSON = require('./package.json');
var vendorLibs = Object.keys(packageJSON.dependencies);

module.exports = {

    // Pack this stuff...
    entry: {
        main: './main.js',
    },
    // ..into these packages.
    output: {
        // `[name]` takes the key name from the entry section.
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            // Throws an error in `dc.js` if this is not set.
            'crossfilter': 'crossfilter2'
        }
    },
    plugins: [
    ],
    // Loaders
    module: {
        rules: [
        ]
    },
    // The devServer is run with `--inline --hot` which means that it will 
    // try to reload just the modules that changed and then th whole page
    // if HMR does not work.
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        port: 8080,
        inline: true,
        hot: true,
        contentBase: './',
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                secure: false // fixes CORS?
            }
        }
    },
    // Make source maps.
    devtool: '#eval-source-map'
};
