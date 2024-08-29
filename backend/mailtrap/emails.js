import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [
        { email }
    ];

    try {
        const response = await mailtrapClient.send({
                from: sender,
                to: recipient,
                subject: "Verify Your Email Address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken)
            });
        console.log("Email Sent Succesfully", response)
    } catch (error) {
        console.log("Error Sending Verification Email", error)
        throw new Error(`Error sending verification email: ${error}`);
    }
}
