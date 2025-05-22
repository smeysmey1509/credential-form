var fs = require("fs");
// Sample design token structure (replace with your full structure)
var designTokens = {
    xl: {
        disable: {
            default: {
                Light: {
                    color: {
                        color: "{Light-color.Light-blue.color-light-blue-300}",
                    },
                    size: {
                        size: "{Font-size.Font-size.x-sm}",
                    },
                    weight: {
                        weight: "{Font-weight.Font-weight.secondary}",
                    },
                    height: {
                        height: "0.75rem",
                    },
                    radius: {
                        radius: "{Border-radius.Border-radius.md}",
                    },
                },
            },
        },
        primary: {
            default: {
                Light: {
                    color: {
                        color: "{Light-color.Light-blue.color-light-blue-300}",
                    },
                    size: {
                        size: "{Font-size.Font-size.x-sm}",
                    },
                    weight: {
                        weight: "{Font-weight.Font-weight.secondary}",
                    },
                    height: {
                        height: "0.75rem",
                    },
                    radius: {
                        radius: "{Border-radius.Border-radius.md}",
                    },
                },
            },
        },
    },
};
function extractTokenName(token) {
    return token.replace(/[{}]/g, "").split(".").pop().toLowerCase();
}
function generateCSS(tokens) {
    var css = "";
    for (var size in tokens) {
        var variants = tokens[size];
        for (var variant in variants) {
            var states = variants[variant];
            for (var state in states) {
                var themes = states[state];
                for (var theme in themes) {
                    var properties = themes[theme];
                    var className = ".btn-".concat(variant, "-").concat(state, "-").concat(size);
                    css += "".concat(className, " {\n");
                    for (var propGroup in properties) {
                        var propObject = properties[propGroup];
                        for (var prop in propObject) {
                            var value = propObject[prop];
                            if (typeof value === "string" && value.startsWith("{")) {
                                var tokenName = extractTokenName(value);
                                value = "var(--".concat(tokenName, ")");
                            }
                            css += "  ".concat(prop, ": ").concat(value, ";\n");
                        }
                    }
                    css += "}\n\n";
                }
            }
        }
    }
    return css;
}
// Generate CSS
var cssOutput = generateCSS(designTokens);
// Write to file or console
fs.writeFileSync("output.css", cssOutput);
// console.log(cssOutput);
