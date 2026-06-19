
import transporter from "../config/nodemailer.js";

const sendEmailMessage = async (to, subject, message, html) => {
    try {

        const info = await transporter.sendMail({
            from : process.env.SMTP_USER,
            to,
            subject,
            message,
            html, 
        });

        // console.log(info);

        console.log('Email Sent Successfully');

    } catch (error) {
        console.error('Email Sending Failed:', error.message);
    }
};

export default sendEmailMessage;