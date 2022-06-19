const fs = require('fs');
const sass = require('sass');

function compile(filename) {
    var result = sass.renderSync({
        file: filename + ".scss"
    });
    fs.writeFile(filename + ".css", result.css, err => {
        if (err) {
            console.log("Error while compiling sass: " + err);
        }
    });
};

compile("./src/css/app");
compile("./src/css/controller");
compile("./src/css/global");
compile("./src/css/graph");
compile("./src/css/home");
compile("./src/css/login");