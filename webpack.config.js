const defaults = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const I18nLoaderWebpackPlugin = require('@automattic/i18n-loader-webpack-plugin');

const path = require('path');
const config = { ...defaults };

// Add server only for development mode and not for production.
if ('production' !== process.env.NODE_ENV) {
    config.devServer = {
        devMiddleware: {
            writeToDisk: true,
        },
        allowedHosts: 'all',
        host: 'localhost',
        port: 8887,
        proxy: {
            '/assets': {
                pathRewrite: {
                    '^/assets': '',
                },
            },
        },
    };
}

module.exports = {
    ...config,
    entry: {
        ...getWebpackEntryPoints(), // For blocks.
        'i18n-loader': './tools/i18n-loader.ts',
        index: './src/index.tsx', // For admin scripts.
    },
    output: {
        path: path.resolve(__dirname, 'assets'), // Change output directory to `assets`
        filename: '[name].js',
    },
    plugins: [
        ...defaults.plugins,
        new I18nLoaderWebpackPlugin({
            textdomain: 'essential-extensions-for-woocommerce',
            loaderModule: 'essential_extensions_wcI18nLoader',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    externals: {
        essential_extensions_wcI18nLoader: ['window', 'essential_extensions_wcI18nLoader'],
    },
};
