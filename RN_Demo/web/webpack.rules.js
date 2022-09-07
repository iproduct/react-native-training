const path = require('path');
module.exports = [
    {
        test: /\.(js|ts)x?$/, // add |ts
        include: [
            path.resolve('../index.web.js'),
            path.resolve('../src'),
            path.resolve('../node_modules/react-native-uncompiled'),
        ],
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
                presets: [
                    'module:metro-react-native-babel-preset',
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                ],
                // Re-write paths to import only the modules needed by the app
                plugins: [
                    'react-native-web',
                    [
                        'module-resolver',
                        {
                            alias: {
                                '^react-native$': 'react-native-web',
                            },
                        },
                    ],
                ],
            },
        },
    },
    // {
    //     test: /\.(tsx|ts|jsx|js|mjs)$/,
    //     exclude: /node_modules/,
    //     loader: 'ts-loader',
    // },
    // {
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   loader: 'source-map-loader',
    // },
];
