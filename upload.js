const fs = require("fs");

function generateUniqueFileName() {
  const timestamp = Date.now().toString(36); // Get the current timestamp in base36
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string in base36
  const uniqueFileName = `${timestamp}-${randomString}`; // Combine timestamp and random string
  return uniqueFileName;
}

module.exports = (folder) => async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const files = req.files.images;

    if (files.length > 5) {
      return res.status(400).send("You can upload up to 5 files.");
    }

    const uploadPath = __dirname + `/public/${folder}`;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    const imagesName = [];

    if (Array.isArray(files)) {
      files.forEach((file) => {
        const fileExtension = file.name.split(".").pop();
        const fileName = generateUniqueFileName() + "." + fileExtension;
        imagesName.push(fileName);
        file.mv(`${uploadPath}/${fileName}`);
      });
    } else {
      const fileExtension = files.name.split(".").pop();
      const fileName = generateUniqueFileName() + "." + fileExtension;
      imagesName.push(fileName);
      files.mv(`${uploadPath}/${fileName}`);
    }

    console.log("ok");

    return res.json({ status: "success", data: { imagesName, imagesName } });
  } catch (error) {
    console.log(error);
  }
};
