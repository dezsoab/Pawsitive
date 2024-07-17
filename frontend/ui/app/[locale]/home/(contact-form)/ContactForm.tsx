"use client";

import { useTranslations } from "next-intl";
import React, { ChangeEvent, useState, FormEvent } from "react";

import styles from "./ContactForm.module.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const t = useTranslations("Index.contact");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contactForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      // Handle error when testing
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name">{t("name")}:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("name_placeholder")}
          required
        />
      </div>
      <div>
        <label htmlFor="email">{t("email")}:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("email_placeholder")}
          required
        />
      </div>
      <div>
        <label htmlFor="message">{t("message")}:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("message_placeholder")}
          required
          rows={5}
        />
      </div>
      <button type="submit">{t("send_text")}</button>
      {submitted && <p>{t("thank_you")}</p>}
    </form>
  );
};

export default ContactForm;
