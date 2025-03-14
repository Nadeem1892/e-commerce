require("dotenv").config();  // Ensure dotenv is loaded first

const { Resend } = require('resend');
const RESEND_API = process.env.RESEND_API;  // Now this will correctly get the value from the .env file

if (!RESEND_API) {
    console.log("Provide RESEND_API in the .env file");
    process.exit(1); // Exit the app if the API key is missing
}

const resend = new Resend(RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Deems-Shop <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data;

    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;
