const react = require("react");

module.exports = function(api) {
  api.cache(true);
  return {
    "presets": [
      [
        "babel-preset-expo",
        {
          "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
          "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
          "throwIfNamespace": false, // defaults to true
          "runtime": "classic" // defaults to classic
          // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
        }
      ]
    ]
  };
};
