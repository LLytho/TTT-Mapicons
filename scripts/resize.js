const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_PATH = path.join(__dirname, "..", "maps", "thumb");

const files = fs.readdirSync(IMAGE_PATH);

const run = async () => {
    for (const file of files) {
        const fullFile = path.join(IMAGE_PATH, file);

        const metadata = await sharp(fullFile).metadata();
        if (metadata.width === 128 && metadata.height === 128) {
            continue;
        }

        if (metadata.width != metadata.height) {
            continue;
        }

        sharp(fullFile)
            .resize({ width: 128, height: 128 })
            .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
            .toBuffer((error, buffer) => {
                if(error) {
                    throw error;
                }

                fs.writeFile(fullFile, buffer, (err) => {
                    if(err) {
                        throw err;
                    }

                    console.log(`Map Image ${file} was resized successfully.`);
                });
            });
    }
};

run();
