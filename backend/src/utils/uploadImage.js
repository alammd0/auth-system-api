import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(
            file.tempFilePath,
            {
                folder: "auth-system",
                resource_type: "auto"
            }
        );
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Image upload failed");
    }
};