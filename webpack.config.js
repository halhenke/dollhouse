module.exports = {
  entry: {
    react: './webpack.entry.react.js',
    ng: './webpack.entry.ng.js'
  },  
  output: {
    // filename: 'react/bundle.js',
    filename: '[name]/bundle.js',
    // filename: './public/bundle.js',

    // // export itself to a global var
    // libraryTarget: "var",
    // // name of the global var: "Foo"
    // library: "webpacked",
    // libraryTarget: "commonjs2"
    // Export everything to the global namesapce
    libraryTarget: "this"
  },
  module: {
      loaders: [
          // { test: /\.jade$/, loader: "jade" },
          // => "jade" loader is used for ".jade" files
          { test: /\.css$/, loader: "style!css" },
          // Alternative syntax:
          // { test: /\.css$/, loaders: ["style", "css"] },
      ]
  }
};
