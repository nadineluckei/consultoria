import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, company, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Campos obrigatórios ausentes." });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    logger.error("Gmail credentials not configured");
    res.status(500).json({ error: "Serviço de email não configurado." });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Nadine Strategy Site" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[Nadine Strategy] Novo contato de ${name} — ${company || "sem empresa"}`,
      html: `
        <h2>Novo contato recebido pelo site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company || "—"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    req.log.info({ name, company, email }, "Contact form submitted");
    res.status(200).json({ ok: true });
  } catch (err) {
    req.log.error(err, "Failed to send contact email");
    res.status(500).json({ error: "Falha ao enviar email." });
  }
});

export default router;
