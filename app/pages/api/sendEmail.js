import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, course, type = 'enquiry' } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFICATION_EMAIL) {
      return res.status(500).json({ error: 'Email configuration missing' });
    }

    try {
      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New ${type === 'reservation' ? 'Seat Reservation' : 'Enquiry'}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}\nType: ${type}`,
        html: `
          <h2>New ${type === 'reservation' ? 'Seat Reservation' : 'Enquiry'}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Course:</strong> ${course}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ error: 'Failed to send notification' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
