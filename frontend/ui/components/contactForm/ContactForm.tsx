"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { FormEvent, useRef } from "react";

import styles from "./ContactForm.module.css";
import { ContactUsEmailRequestDTO } from "@/types/ContactUsEmailRequestDTO";
import { sendContactUsInquiry } from "@/api/post/sendContactUsInquiry";
import { ToastContainer, toast } from "react-toastify";

interface ContactFormProps {
  messagePlaceholder: string;
}

const ContactForm = ({ messagePlaceholder }: ContactFormProps) => {
  const locale = useLocale();
  const t = useTranslations("Index.contact");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    const formData: ContactUsEmailRequestDTO = {
      senderName: nameRef.current?.value || "",
      senderEmail: emailRef.current?.value || "",
      emailBody: messageRef.current?.value || "",
      language: locale,
    };

    e.preventDefault();

    toast
      .promise(
        sendContactUsInquiry(formData),
        {
          pending: "Sending inquiry to us...",
          success: {
            render: ({ data }: { data: { message: string } }) => data.message,
          },
          error: {
            render: ({ data }: { data: { message: string } }) => data.message,
          },
        },
        {
          position: "bottom-right",
        }
      )
      .then(() => {
        nameRef.current!.value = "";
        emailRef.current!.value = "";
        messageRef.current!.value = "";
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="name">{t("name")}:</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
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
            ref={emailRef}
            placeholder={t("email_placeholder")}
            required
          />
        </div>
        <div>
          <label htmlFor="message">{t("message")}:</label>
          <textarea
            id="message"
            name="message"
            ref={messageRef}
            placeholder={messagePlaceholder}
            required
            rows={5}
          />
        </div>
        <button type="submit">{t("send_text")}</button>
      </form>
    </>
  );
};

export default ContactForm;
