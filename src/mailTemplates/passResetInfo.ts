/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Types
 */
type TemplateParams = {
  name?: string;
  supportLink?: string;
  companyName?: string;
  currentYear?: number;
};

export const passResetInfoTemplate = ({
  name,
  companyName = 'Shortly',
  currentYear = new Date().getFullYear(),
}: TemplateParams) => {
  return `
   <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          p { margin: 0; }
          a { text-decoration: none !important; color: inherit !important;}

          .container {
            font-family: Arial, sans-serif;
            font-size: 16px !important;
            color: #111;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
          }

          .wrapper {
            border: 1px solid #ddd;
            border-radius: 16px;
            overflow: hidden;
          }

          .header, .footer {
            text-align: center;
          }

          .header {
            padding: 32px;
            background-color: #c5f0a4;
            color: #0f1709;
          }

          .logo {
            display: block;
            margin: 0 auto 12px;
          }

          .title {
            font-size: 20px;
            font-weight: bold;
          }

          .content {
            padding: 32px;
          }

          .button {
            display: block;
            text-align: center;
            padding: 16px;
            font-weight: bold;
            background-color: #c5f0a4;
            color: #0f1709 !important;
            border-radius: 10px;
          }

          .footer { margin-top: 32px; }

          .footer-text {
            font-size: 13px;
            color: #444;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="wrapper">
            <div class="header">
              <img src="https://shortly.codewithsadee.com/images/logo-dark.svg" width="147" height="36" class="logo" alt="${companyName}" />
              <div class="title">Your Password Has Been Reset Successfully!</div>
            </div>
            <div class="content">

              <p style="margin-bottom: 20px"><strong>Hey ${name},</strong></p>

              <p style="margin-bottom: 20px">
                Your password was successfully changed. You can now log in with your new credentials.
              </p>

              <p style="margin-bottom: 20px">
                If you didn't request this change, please contact us immediately so we can secure your account.
              </p>

              <a href="mailto:support@shortly.li" class="button">Contact Support</a>

              <p style="margin-top: 20px">
                For your security, we recommend never sharing your password with anyone and using a strong, unique password for each service.
              </p>
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              If you need help, feel free to contact our support team

              <a href="mailto:support@shortly.li"><strong>support@shortly.li</strong></a>
            </div>

            <div style="margin-top: 12px;" class="footer-text">${currentYear} ${companyName} — All rights reserved</div>
          </div>
        </div>
      </body>
    </html>
  `;
};
