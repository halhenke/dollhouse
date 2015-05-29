module.exports = {
  entry: {
    react: './webpack.entry.react.js',
    ng: './webpack.entry.ng.js'
  },
  // In gulp task everything is spat into "public/js/"
  // We could do that here instead by setting
  // output.publicPath = "public/"
  // which would mean file-loader would write the correct URL
  // in script tags...i think? (keystone maps "public/" to "/")
  // Actually makes it worse - adds '/public' to the filename
  // "/public/public/styles/fullcalendar.min.css"
  output: {
    // filename: '[name]/bundle.js',
    filename: 'public/js/[name]/bundle.js',
    libraryTarget: "this",
    // publicPath: "/public/"
  },
  module: {
      loaders: [
          // { test: /\.jade$/, loader: "jade" },
          // => "jade" loader is used for ".jade" files
          // { test: /\.css$/, loader: "style/url!css" },
          // { test: /\.css$/, loader: "style/url!file!css" },

          // { test: /\.css$/, loader: "style/url!file?name=public/styles/[name].[ext]!" },
          // { test: /public\/styles\/bower\/.*\.css$/, loader: "style/url!css!" },
          // Fucking name and limit parameters dont work together
          // { test: /\.css$/, loader: "style/url!url?name=[path][name].[ext]?limit=1!" },
          // { test: /\.css$/, loader: "style/url!url?name=[path][name].[ext]!" },

          // Alternative syntax:
          // { test: /\.css$/, loaders: ["style", "css"] },
      ]
  }
};
