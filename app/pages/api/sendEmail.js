import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, course, type = 'enquiry' } = req.body;

  // Basic validation
  if (!name || !email || !phone || !course) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check environment variables
  const { EMAIL_USER, EMAIL_PASS, NOTIFICATION_EMAIL } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !NOTIFICATION_EMAIL) {
    return res.status(500).json({ error: 'Email configuration missing' });
  }

  // Simple sanitizer to prevent injection
  const sanitize = (str) => String(str).replace(/[<>]/g, '');

  try {
    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Notification email to admin
    const adminMailOptions = {
      from: EMAIL_USER,
      to: NOTIFICATION_EMAIL,
      subject: `New ${type === 'reservation' ? 'Seat Reservation' : 'Enquiry'}`,
      text: `Name: ${sanitize(name)}\nEmail: ${sanitize(email)}\nPhone: ${sanitize(phone)}\nCourse: ${sanitize(course)}\nType: ${sanitize(type)}`,
      html: `
        <h2>New ${type === 'reservation' ? 'Seat Reservation' : 'Enquiry'}</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Phone:</strong> ${sanitize(phone)}</p>
        <p><strong>Course:</strong> ${sanitize(course)}</p>
        <p><strong>Type:</strong> ${sanitize(type)}</p>
      `
    };

    await transporter.sendMail(adminMailOptions);

    // Optional: Confirmation email to user
    const userMailOptions = {
      from: EMAIL_USER,
      to: sanitize(email),
      subject: 'We received your enquiry!',
      html: `
        <p>Hi ${sanitize(name)},</p>
        <p>Thank you for reaching out regarding the <strong>${sanitize(course)}</strong> course.</p>
        <p>We’ve received your ${type === 'reservation' ? 'reservation' : 'enquiry'} and will get back to you soon.</p>
        <br/>
        <p>Best regards,<br/>Team</p>
      `
    };

    await transporter.sendMail(userMailOptions);

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
