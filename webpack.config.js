const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './wagtail_shortcode/static_src/main.tsx',
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    /* These are provided by Wagtail */
    'react': 'React',
    'react-dom': 'ReactDOM',
    'draftail': 'Draftail',
    'draft-js': 'DraftJS',
  },
  output: {
    path: path.resolve(
      __dirname,
      'wagtail_shortcode/static/wagtail_shortcode/js',
    ),
    filename: 'wagtail-shortcode.js',
  },
};
