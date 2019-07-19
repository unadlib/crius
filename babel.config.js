module.exports = {
  "presets": [
    ["@babel/preset-env"],
    ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
  ],
  "plugins": [
    ["@babel/plugin-syntax-jsx"],
    ["@babel/plugin-transform-runtime"]
  ]
};
