import path from "path"

function readImageFile(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
            let image = new Image();
            image.src = reader.result;
            image.onload = () => {
                resolve({image: image, result: reader.result});
            }
        };

        reader.readAsDataURL(file);
    });
}

export async function loadImageData(file) {
    let fileData = {
        name: path.parse(file.name).name,
        type: path.parse(file.name).ext,
        bytes: undefined,
        width: undefined, height: undefined
    }

    let resultFile = await readImageFile(file);

    fileData.bytes = resultFile.result.split(',')[1]
    fileData.width = resultFile.image.naturalWidth;
    fileData.height = resultFile.image.naturalHeight;

    return fileData;
}

export async function loadImagesData(files) {
    let filesData = [];

    for (const file of files) {
        let fileData = await loadImageData(file)
        filesData.push(fileData)
    }

    return filesData;
}