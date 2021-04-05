import { Configuration } from 'webpack'
import { resolve } from 'path'
import { LambdasNames } from './services/LambdasNames'

const config: Configuration = {
    mode: 'none',
    entry: {
        [LambdasNames.CREATE_SPACE]: './services/spaces/Create.ts',
        [LambdasNames.READ_SPACE]: './services/spaces/Read.ts',
    },
    target: 'node',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.webpack.json'
                    }
                }
            }
        ]
    },
    externals :{
        'aws-sdk': 'aws-sdk'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, 'build'),
        filename: '[name]/[name].js'
    }
}

export default config