const fs = require("fs");
const path = require("path");
const IMAGE_PATH = path.join(__dirname, "..", "maps", "thumb");
const README_BASE_PATH = path.join(__dirname, "readme_base.md");
const README_PATH = path.join(__dirname, "..", "README.md");

const images = fs.readdirSync(IMAGE_PATH);

let appendedMapNames = "";
images.forEach((image) => {
    appendedMapNames += `+ ${path.parse(image).name}\n`;
});

fs.readFile(README_BASE_PATH, "utf8", (err, content) => {
    if (err) {
        throw err;
    }

    const newContent = content.replace("%MAPS%", appendedMapNames);
    fs.writeFile(README_PATH, newContent, "utf8", (err) => {
        if (err) {
            throw err;
        }
    });
});
