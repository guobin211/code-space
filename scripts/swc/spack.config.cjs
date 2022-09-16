const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    android: `${__dirname}./android.ts`,
  },
  output: {
    path: `${__dirname}./dist`,
    name: 'android.js',
  },
  module: {},
});
