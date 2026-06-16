
import cloudinaryConfig from "../config/cloudinary.js";

// create one function for upload image

export const uploadImage = async (file) => {

    const options = {
        file_name : file.originalname,
        unique_filename : false,
        overwrite: true,
    }

    try {

        const result = await cloudinaryConfig.uploader.upload(file.path, options);

        console.log(result);

        return result;
    }
    catch (error) {
        console.error(error);
    }
}