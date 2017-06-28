import ExtractTextPlugin from 'extract-text-webpack-plugin';

const common = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.(eot|svg|ttf|TTF|woff|woff2)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 100000,
        name: 'fonts/[name].[ext]?[hash]',
      },
    }],
  },
  {
    test: /\.(gif|jpg|jpe?g|png)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 100000,
        name: 'img/[name].[ext]?[hash]',
      },
    }],
  },
];

const development = [
  ...common,
  {
    test: /\.(scss|sass|css)$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    }, {
      loader: 'resolve-url-loader',
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    }, {
      loader: 'sass-loader',
      options: {
        includePaths: ['node_modules'],
        sourceMap: true,
        sourceMapContents: true,
      },
    }],
  },
];

const production = [
  ...common,
  {
    test: /\.(scss|sass|css)$/,
    loader: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      }, {
        loader: 'resolve-url-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: ['node_modules'],
          sourceMap: true,
          sourceMapContents: true,
        },
      }],
      fallback: 'style-loader',
    }),
  },
];

export default {
  development,
  production,
};

