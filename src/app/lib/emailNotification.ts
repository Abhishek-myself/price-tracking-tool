import nodemailer from "nodemailer";

export async function sendEmailNotification({
    to,
    productName,
    oldPrice,
    newPrice,
    url
}: {
    to: string;
    productName: string;
    oldPrice: string;
    newPrice: string;
    url: string;
}) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: `Price Drop Alert: ${productName}`,
        html: `
      <h2>Price Drop Notification</h2>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Old Price:</strong> ${oldPrice}</p>
      <p><strong>New Price:</strong> ${newPrice}</p>
      <p><a href="${url}">View Product</a></p>
    `,
    });
}
