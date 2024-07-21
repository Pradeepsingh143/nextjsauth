import env from "@/config/env"
type welcomeEmailOptions = {
    username: string;
    name: string;
    companyName: string;
    EMAIL_SENDER_NAME: string;
    EMAIL_SENDER_JOB_TITLE: string;
}

const welcomeUserEmail = ({ username, name, companyName, EMAIL_SENDER_NAME, EMAIL_SENDER_JOB_TITLE }: welcomeEmailOptions) => `
<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome Email</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header h1 {
                  margin: 0;
                  color: #4CAF50;
              }
              .content {
                  margin-bottom: 20px;
              }
              .footer {
                  text-align: center;
                  color: #777;
                  font-size: 0.9em;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Welcome to ${companyName}!</h1>
              </div>
              <div class="content">
                  <p>Hello dear ${name},</p>
                  <p>Welcome to [${companyName}]! We’re excited to have you with us.</p>
                  <h3>Your Account Details:</h3>
                  <p><strong>Username:</strong> ${username}</p>
                  <p>To get started, you can sign in using the link below:</p>
                  <p><a href={${env.CLIENT_SIDE_URL}/signin} target="_blank">Sign In</a></p>
                  <p>If you ever forget your password, you can reset it here:</p>
                  <p><a href="{${env.CLIENT_SIDE_URL}/forgot-password}" target="_blank">Forgot Password</a></p>
                  <p>If you have any questions or need assistance, feel free to reach out to us at [support email/phone number].</p>
                  <p>Thank you for joining us!</p>
              </div>
              <div class="footer">
                  <p>Best regards,<br>[${EMAIL_SENDER_NAME}]<br>[${EMAIL_SENDER_JOB_TITLE}]<br>[${companyName}]</p>
              </div>
          </div>
      </body>
      </html>
`

export default welcomeUserEmail;