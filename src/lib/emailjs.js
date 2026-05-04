import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const EMAILJS_WELCOME_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID;
const EMAILJS_CONTACT_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID;

function ensureEnv(name, value) {
  if (!value) {
    throw new Error(`EmailJS env var ${name} is required`);
  }
  return value;
}

ensureEnv("REACT_APP_EMAILJS_SERVICE_ID", EMAILJS_SERVICE_ID);
ensureEnv("REACT_APP_EMAILJS_PUBLIC_KEY", EMAILJS_PUBLIC_KEY);
ensureEnv("REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID", EMAILJS_WELCOME_TEMPLATE_ID);
ensureEnv("REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID", EMAILJS_CONTACT_TEMPLATE_ID);

emailjs.init(EMAILJS_PUBLIC_KEY);

export function sendEmail(templateId, params) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    templateId,
    params,
    EMAILJS_PUBLIC_KEY
  );
}

export function sendWelcomeEmail({ name, email }) {
  return sendEmail(EMAILJS_WELCOME_TEMPLATE_ID, {
    to_name: name,
    to_email: email,
  });
}

export function sendContactEmail({ name, email, title, message }) {
  return sendEmail(EMAILJS_CONTACT_TEMPLATE_ID, {
    name,
    email,
    title,
    message,
  });
}
