
import transporter from "../config/nodemailer";

// Function to send email

const sendEMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from : process.env.SMTP_USER,
            to,
            subject,
            text 
        });

        console.log("Email sent successfully");
    }
    catch (error) {
        console.log(error);
    }
}

export default sendEMail;