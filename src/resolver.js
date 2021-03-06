const resolver = require("enhanced-resolve").create.sync({
  conditionNames: ["require", "node", "default"],
  extensions: [".js", ".json", ".node", ".ts", ".tsx"],
});

module.exports = function (request, options) {
  if (request === "fs") {
    return options.defaultResolver(request, options);
  }
  return resolver(options.basedir, request);
};
