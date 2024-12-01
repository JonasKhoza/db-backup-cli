// import nodemailer from "nodemailer";
// import { config } from "dotenv";
// import logger from "./logger";

// //load .env file env variables into process.env
// config();

// const sendEmail = (message: string) => {
//   console.log(
//     process.env.SERVICE,
//     process.env.E_HOST,
//     process.env.EMAIL,
//     parseInt(process.env.E_HOST_PORT!),
//     process.env.E_PASS
//   );
//   // Define the transporter with type-safe configuration
//   const transporter = nodemailer.createTransport({
//     service: process.env.SERVICE, // e.g., "gmail"
//     host: process.env.E_HOST, // e.g., "smtp.gmail.com"
//     port: parseInt(process.env.E_HOST_PORT || "587"), // Port must be a number
//     secure: true, // Set `true` for port 465, `false` for other ports
//     auth: {
//       user: process.env.EMAIL, // Your email address
//       pass: process.env.E_PASS, // Your email password or app-specific password
//     },
//   });

//   logger.info("Transporter initialized:", transporter);

//   transporter.verify((error, success) => {
//     if (error) {
//       logger.error("Transporter verification failed:", error);
//     } else {
//       logger.info("Transporter is ready to send email", success);
//     }
//   });

//   transporter.sendMail(
//     {
//       from: process.env.EMAIL,
//       to: "jonas@bargainbooks.co.za",
//       subject: "Testing my backup failer/success notifier",
//       text: message,
//     },
//     (error, info) => {
//       if (error) {
//         logger.error(
//           "Something went wrong whilst trying to send the email!",
//           error
//         );
//       } else {
//         logger.info("Email sent successfully", info);
//       }
//     }
//   );
// };

// sendEmail("Backup completed successfully.");
import nodemailer from "nodemailer";
import { config } from "dotenv";
import logger from "./logger";

// Load environment variables
config();

// Validate required environment variables
const requiredEnvVars = [
  "SERVICE",
  "E_HOST",
  "E_HOST_PORT",
  "EMAIL",
  "E_PASS",
  "DEFAULT_RECIPIENT",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    logger.error(`Missing environment variable: ${envVar}`);
  }
});

const sendEmail = async (
  message: string,
  databaseName: string,
  backupLocation: string = "",
  recipient: string = process.env.DEFAULT_RECIPIENT!
) => {
  try {
    const isSecure = parseInt(process.env.E_HOST_PORT!) === 465;

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      host: process.env.E_HOST,
      port: parseInt(process.env.E_HOST_PORT || "587"),
      secure: isSecure,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.E_PASS,
      },
    });

    logger.info("Transporter initialized");

    await transporter.verify();
    logger.info("Transporter is ready to send emails");
    //Determining whether we have backup output path

    let locationPath = "";
    if (backupLocation) {
      locationPath =
        "<li><strong>Backup Location:</strong> ${backupLocation}</li>";
    }

    //Email body html tempate
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Backup/Restore Operation Notification</h1>
        </div>
        <div class="content">
          <ul>
            <li><strong>Status:</strong> <span class="status">${message}</span></li>
            <li><strong>Completion Time:</strong> ${new Date().toLocaleString()}</li>
            <li><strong>Database:</strong> ${databaseName.toUpperCase()}</li>
            ${locationPath}
          </ul>
          <p>Best regards,</p>
          <p>The Backup Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Backup Service. All rights reserved.</p>
          <p><a href="mailto:support@example.com">Contact Support</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipient,
      subject: "Database backup status notification",
      html: htmlTemplate,
    });

    logger.info("Email sent successfully", info);
  } catch (error) {
    logger.error("Error occurred while sending email:", error);
  }
};

export default sendEmail;
