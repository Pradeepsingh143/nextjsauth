import mailTransporter from "@/config/mailTransporterConfig"
import env from "@/config/env";

type mailOptions = {
    email : string;
    subject: string;
    text?: string;
    html?: string
}

const mailHelper = async({email, html, subject, text}: mailOptions)=>{
    const message = {
        from: env.SENDER_EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      };

    await mailTransporter.sendMail(message)
}

export default mailHelper