"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import styles from "./FAQ.module.css";
import { useTranslations } from "next-intl";
import Navbar from "@/components/navigation/Navbar";
import ContactForm from "@/components/contactForm/ContactForm";
import Footer from "@/components/footer/Footer";

const FaqPage = () => {
  const t = useTranslations();

  return (
    <main className={styles.main}>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div className={styles.wrapper}>
        <Accordion className={styles.accordion}>
          <AccordionItem
            key="nfcIcon"
            aria-label="nfcIcon"
            indicator={<NFCIcon />}
            title={t("FAQ.product.q1")}
          >
            {t("FAQ.product.a1")}
          </AccordionItem>
          <AccordionItem
            key="appIcon"
            aria-label="appIcon"
            indicator={<AppIcon />}
            title={t("FAQ.product.q2")}
          >
            {t("FAQ.product.a2")}
          </AccordionItem>
          <AccordionItem
            key="petIcon"
            aria-label="petIcon"
            indicator={<PetIcon />}
            title={t("FAQ.product.q3")}
          >
            {t("FAQ.product.a3")}
          </AccordionItem>
          <AccordionItem
            key="editIcon"
            aria-label="editIcon"
            indicator={<EditIcon />}
            title={t("FAQ.product.q4")}
          >
            {t("FAQ.product.a4")}
          </AccordionItem>
          <AccordionItem
            key="findIcon"
            aria-label="findIcon"
            indicator={<FindIcon />}
            title={t("FAQ.product.q5")}
          >
            {t("FAQ.product.a5")}
          </AccordionItem>
          <AccordionItem
            key="durabilityIcon"
            aria-label="durabilityIcon"
            indicator={<DurabilityIcon />}
            title={t("FAQ.product.q6")}
          >
            {t("FAQ.product.a6")}
          </AccordionItem>
          <AccordionItem
            key="waterproofIcon"
            aria-label="waterproofIcon"
            indicator={<WaterproofIcon />}
            title={t("FAQ.product.q7")}
          >
            {t("FAQ.product.a7")}
          </AccordionItem>
          <AccordionItem
            key="shippingIcon"
            aria-label="shippingIcon"
            indicator={<ShippingIcon />}
            title={t("FAQ.order.q1")}
          >
            {t("FAQ.order.a1")}
          </AccordionItem>
          <AccordionItem
            key="cancelIcon"
            aria-label="cancelIcon"
            indicator={<CancelIcon />}
            title={t("FAQ.order.q2")}
          >
            {t("FAQ.order.a2")}
          </AccordionItem>
          <AccordionItem
            key="cashIcon"
            aria-label="cashIcon"
            indicator={<CashIcon />}
            title={t("FAQ.order.q3")}
          >
            {t("FAQ.order.a3")}
          </AccordionItem>
          <AccordionItem
            key="returnIcon"
            aria-label="returnIcon"
            indicator={<ReturnIcon />}
            title={t("FAQ.return.q1")}
          >
            {t("FAQ.return.a1")}
          </AccordionItem>
          <AccordionItem
            key="costIcon"
            aria-label="costIcon"
            indicator={<CostIcon />}
            title={t("FAQ.return.q2")}
          >
            {t("FAQ.return.a2")}
          </AccordionItem>
          <AccordionItem
            key="exceptionIcon"
            aria-label="exceptionIcon"
            indicator={<ExceptionIcon />}
            title={t("FAQ.return.q3")}
          >
            {t("FAQ.return.a3_1")}
            <br />
            <br />
            {t("FAQ.return.a3_2")}
            <br />
            {t("FAQ.return.a3_3")}
            <br />
            {t("FAQ.return.a3_4")}
            <br />
            <br />
            {t("FAQ.return.a3_5")}
            <br />
            {t("FAQ.return.a3_6")}
            <br />
            {t("FAQ.return.a3_7")}
          </AccordionItem>
          <AccordionItem
            key="doIcon"
            aria-label="doIcon"
            indicator={<DoIcon />}
            title={t("FAQ.return.q4")}
          >
            {t("FAQ.return.a4")}
          </AccordionItem>
          <AccordionItem
            key="eyeIcon"
            aria-label="eyeIcon"
            indicator={<EyeIcon />}
            title={t("FAQ.security.q1")}
          >
            {t("FAQ.security.a1")}
          </AccordionItem>
          <AccordionItem
            key="databaseIcon"
            aria-label="databaseIcon"
            indicator={<DatabaseIcon />}
            title={t("FAQ.security.q2")}
          >
            {t("FAQ.security.a2")}
          </AccordionItem>
          <AccordionItem
            key="deleteIcon"
            aria-label="deleteIcon"
            indicator={<DeleteIcon />}
            title={t("FAQ.security.q3")}
          >
            {t("FAQ.security.a3")}
          </AccordionItem>
          <AccordionItem
            key="faqIcon"
            aria-label="faqIcon"
            indicator={<FAQIcon />}
            title={t("FAQ.security.q4")}
          >
            {t("FAQ.security.a4")}
          </AccordionItem>
        </Accordion>
        <br />
        <br />
        <br />
        <br />
        <br />
        <ContactForm messagePlaceholder={t("FAQ.form.question")} />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </main>
  );
};

export default FaqPage;

const NFCIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        d="m5 8l5 8m8.722 4.5a17 17 0 0 0 0-17M14.392 18a12 12 0 0 0 0-12M9.928 16a8 8 0 0 0 0-8m-4.856 8a8 8 0 0 1 0-8"
      />
    </svg>
  );
};

const AppIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 6.548l.355-.645a.816.816 0 0 1 1.129-.322c.42.225.548.742.322 1.129l-3.548 6.097h2.549c.806 0 1.258.967.967 1.645H6.258a.8.8 0 0 1-.806-.807c0-.451.354-.806.806-.806h2.097l2.677-4.71l-.87-1.452c-.227-.419-.098-.903.322-1.129s.903-.096 1.129.323zm-3.194 8.807l-.774 1.355a.816.816 0 0 1-1.129.322a.816.816 0 0 1-.322-1.129l.58-1.032q1.065-.34 1.645.484m6.84-2.484h2.128c.452 0 .807.355.807.806a.8.8 0 0 1-.807.807h-1.193l.806 1.42c.226.419.097.902-.323 1.128c-.419.226-.903.097-1.129-.322c-1.354-2.355-2.354-4.065-3.032-5.258c-.677-1.194-.193-2.355.258-2.775c.58.904 1.387 2.323 2.484 4.194M12 2C6.452 2 2 6.452 2 12s4.452 10 10 10s10-4.452 10-10S17.548 2 12 2m8.742 10c0 4.774-3.871 8.742-8.742 8.742c-4.774 0-8.742-3.871-8.742-8.742c0-4.774 3.871-8.742 8.742-8.742c4.774 0 8.742 3.871 8.742 8.742"
      />
    </svg>
  );
};

const PetIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M.75 11.018v-7.59l1.254 1.004c.633.506 1.42.782 2.23.782H7L8.292 2.63a1.786 1.786 0 0 1 1.597-.987h.682v2.232l2.679.893v.893c0 .986-.8 1.785-1.786 1.785H9.68v3.572a1.34 1.34 0 1 1-2.679 0v-.447c0-.493-.4-.892-.893-.892H4.321c-.493 0-.892.4-.892.892v.447a1.34 1.34 0 1 1-2.679 0" />
        <path d="M7.012 5.097c.175.717 1 2.195 2.895 2.375" />
      </g>
    </svg>
  );
};

const EditIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
        <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
      </g>
    </svg>
  );
};

const FindIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="22"
      height="22"
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M17 5.954C17 2.665 14.317 0 11.009 0C7.698 0 5.016 2.665 5.016 5.954c0 3.287 2.683 5.952 5.993 5.952c3.308 0 5.991-2.665 5.991-5.952zm-11.066.065A5.082 5.082 0 0 1 11.026.943a5.08 5.08 0 0 1 5.088 5.076a5.08 5.08 0 0 1-5.088 5.075c-2.813 0-5.092-2.272-5.092-5.075zm-3.112 9.945L1 14.142l4.037-4.038s.096.765.58 1.247c.482.484 1.242.576 1.242.576l-4.037 4.037z" />
        <path d="M14.398 5.073c0 .572.44.356.44-.439c0-1.37-1.109-2.48-2.479-2.48c-.797 0-1.012.439-.439.439a2.479 2.479 0 0 1 2.478 2.48z" />
      </g>
    </svg>
  );
};

const DurabilityIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm1-8h4v2h-6V7h2v5Z"
      />
    </svg>
  );
};

const WaterproofIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <g fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" d="M12 18a2 2 0 0 1-1.932-1.482" />
        <path d="M10.424 4.679c.631-1.073.947-1.61 1.398-1.69a1 1 0 0 1 .356 0c.451.08.767.617 1.398 1.69l1.668 2.836a27.187 27.187 0 0 1 2.707 6.315c1.027 3.593-1.67 7.17-5.408 7.17h-1.086c-3.737 0-6.435-3.577-5.408-7.17a27.187 27.187 0 0 1 2.707-6.315z" />
      </g>
    </svg>
  );
};

const ShippingIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="25"
      height="25"
      viewBox="0 0 35 35"
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 6v2h19v15h-6.156c-.446-1.719-1.992-3-3.844-3c-1.852 0-3.398 1.281-3.844 3H4v-5H2v7h3.156c.446 1.719 1.992 3 3.844 3c1.852 0 3.398-1.281 3.844-3h8.312c.446 1.719 1.992 3 3.844 3c1.852 0 3.398-1.281 3.844-3H32v-8.156l-.063-.157l-2-6L29.72 10H21V6zm1 4v2h9v-2zm20 2h7.281L30 17.125V23h-1.156c-.446-1.719-1.992-3-3.844-3c-1.852 0-3.398 1.281-3.844 3H21zM2 14v2h6v-2zm7 8c1.117 0 2 .883 2 2s-.883 2-2 2s-2-.883-2-2s.883-2 2-2zm16 0c1.117 0 2 .883 2 2s-.883 2-2 2s-2-.883-2-2s.883-2 2-2z"
      />
    </svg>
  );
};

const CancelIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M2.75 12c0 5.523 4.477 10 10 10s10-4.477 10-10s-4.477-10-10-10M5.399 5.079q.207-.22.427-.428M8.697 2.73q.273-.122.553-.229M3.482 7.942q-.124.275-.232.558m12.5.5l-3 3m0 0l-3 3m3-3l3 3m-3-3l-3-3"
        color="currentColor"
      />
    </svg>
  );
};

const ReturnIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      >
        <path d="M12.9998 8L6 14L12.9998 21" />
        <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" />
      </g>
    </svg>
  );
};

const CostIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.996 40.094c0 .562.258 1.078.633 1.453l7.664 7.64c.75.774 1.594 1.126 2.414 1.126c.82 0 1.617-.376 2.367-1.126l7.688-7.664c.398-.398.633-.914.633-1.453c0-1.054-.844-1.851-1.782-1.851c-.703 0-1.148.258-1.523.633l-2.016 2.015l-3.61 4.102l.235-7.57v-17.79c0-5.93 3.281-9.914 8.742-9.914c5.063 0 8.602 3.54 8.602 8.86c0 5.133-3.469 8.742-8.25 8.742c-1.664 0-2.086-.352-2.906-.352c-1.008 0-1.828.68-1.828 1.735c0 .703.351 1.242.89 1.64c.89.703 2.367.961 3.727.961c7.453 0 12.328-5.203 12.328-12.726c0-7.735-5.133-12.867-12.563-12.867c-7.617 0-12.773 5.062-12.773 14.085v17.649l.234 7.547l-3.562-4.078l-2.04-2.016c-.374-.375-.82-.633-1.523-.633c-.937 0-1.78.797-1.78 1.852"
      />
    </svg>
  );
};

const CashIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.75 2.5H1.25A1.25 1.25 0 0 0 0 3.75v8.5a1.25 1.25 0 0 0 1.25 1.25h13.5A1.25 1.25 0 0 0 16 12.25v-8.5a1.25 1.25 0 0 0-1.25-1.25zM1.25 3.75h2a1.86 1.86 0 0 1-2 1.75zm0 8.5V10.5a1.86 1.86 0 0 1 2 1.75zm13.5 0H12.8a1.86 1.86 0 0 1 1.95-1.75zm0-3a3.1 3.1 0 0 0-3.2 3h-7.1a3.1 3.1 0 0 0-3.2-3v-2.5a3.1 3.1 0 0 0 3.2-3h7.1a3.1 3.1 0 0 0 3.2 3zm0-3.75a1.86 1.86 0 0 1-1.95-1.75h1.95z"
      />
      <path
        fill="currentColor"
        d="M8 5a3.1 3.1 0 0 0-3.2 3A3.1 3.1 0 0 0 8 11a3.1 3.1 0 0 0 3.2-3A3.1 3.1 0 0 0 8 5zm0 4.75A1.86 1.86 0 0 1 6.05 8A1.86 1.86 0 0 1 8 6.25A1.86 1.86 0 0 1 10 8a1.86 1.86 0 0 1-2 1.75z"
      />
    </svg>
  );
};

const ExceptionIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

const DoIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M119.76 217.94A8 8 0 0 1 112 224a8.13 8.13 0 0 1-2-.24l-32-8a8 8 0 0 1-2.5-1.11l-24-16a8 8 0 1 1 8.88-13.31l22.84 15.23l30.66 7.67a8 8 0 0 1 5.88 9.7Zm132.69-96.46a15.89 15.89 0 0 1-8 9.25l-23.68 11.84l-55.08 55.09a8 8 0 0 1-7.6 2.1l-64-16a8.06 8.06 0 0 1-2.71-1.25l-55.52-39.64l-24.28-12.14a16 16 0 0 1-7.16-21.46l24.85-49.69a16 16 0 0 1 21.46-7.16l22.06 11l53-15.14a8 8 0 0 1 4.4 0l53 15.14l22.06-11a16 16 0 0 1 21.46 7.16l24.85 49.69a15.9 15.9 0 0 1 .89 12.21Zm-46.18 12.94L179.06 80h-31.82L104 122c12.66 8.09 32.51 10.32 50.32-7.63a8 8 0 0 1 10.68-.61l34.41 27.57Zm-187.54-18l17.69 8.85l24.85-49.69l-17.69-8.85ZM188 152.66l-27.71-22.19c-19.54 16-44.35 18.11-64.91 5a16 16 0 0 1-2.72-24.82a.6.6 0 0 1 .08-.08l44.86-43.51l-9.6-2.74l-50.42 14.41l-27.37 54.73l49.2 35.15l58.14 14.53Zm49.24-36.24l-24.82-49.69l-17.69 8.85l24.85 49.69Z"
      />
    </svg>
  );
};

const EyeIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="24"
      height="24"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M515.472 321.408c-106.032 0-192 85.968-192 192c0 106.016 85.968 192 192 192s192-85.968 192-192s-85.968-192-192-192zm0 320c-70.576 0-129.473-58.816-129.473-129.393s57.424-128 128-128c70.592 0 128 57.424 128 128s-55.935 129.393-126.527 129.393zm508.208-136.832c-.368-1.616-.207-3.325-.688-4.91c-.208-.671-.624-1.055-.864-1.647c-.336-.912-.256-1.984-.72-2.864c-93.072-213.104-293.663-335.76-507.423-335.76S95.617 281.827 2.497 494.947c-.4.897-.336 1.824-.657 2.849c-.223.624-.687.975-.895 1.567c-.496 1.616-.304 3.296-.608 4.928c-.591 2.88-1.135 5.68-1.135 8.592c0 2.944.544 5.664 1.135 8.591c.32 1.6.113 3.344.609 4.88c.208.72.672 1.024.895 1.68c.336.88.256 1.968.656 2.848c93.136 213.056 295.744 333.712 509.504 333.712c213.776 0 416.336-120.4 509.44-333.505c.464-.912.369-1.872.72-2.88c.224-.56.655-.976.848-1.6c.496-1.568.336-3.28.687-4.912c.56-2.864 1.088-5.664 1.088-8.624c0-2.816-.528-5.6-1.104-8.497zM512 800.595c-181.296 0-359.743-95.568-447.423-287.681c86.848-191.472 267.68-289.504 449.424-289.504c181.68 0 358.496 98.144 445.376 289.712C872.561 704.53 693.744 800.595 512 800.595z"
      />
    </svg>
  );
};

const DatabaseIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="20"
      height="20"
      viewBox="0 0 14 14"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M7 5.5c3.59 0 6.5-1.12 6.5-2.5S10.59.5 7 .5S.5 1.62.5 3S3.41 5.5 7 5.5" />
        <path d="M.5 3v8c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5V3" />
        <path d="M13.5 7c0 1.38-2.91 2.5-6.5 2.5S.5 8.38.5 7" />
      </g>
    </svg>
  );
};

const DeleteIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="m9.129 0l1.974.005c.778.094 1.46.46 2.022 1.078c.459.504.7 1.09.714 1.728h5.475a.69.69 0 0 1 .686.693a.689.689 0 0 1-.686.692l-1.836-.001v11.627c0 2.543-.949 4.178-3.041 4.178H5.419c-2.092 0-3.026-1.626-3.026-4.178V4.195H.686A.689.689 0 0 1 0 3.505c0-.383.307-.692.686-.692h5.47c.014-.514.205-1.035.554-1.55C7.23.495 8.042.074 9.129 0Zm6.977 4.195H3.764v11.627c0 1.888.52 2.794 1.655 2.794h9.018c1.139 0 1.67-.914 1.67-2.794l-.001-11.627ZM6.716 6.34c.378 0 .685.31.685.692v8.05a.689.689 0 0 1-.686.692a.689.689 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692Zm2.726 0c.38 0 .686.31.686.692v8.05a.689.689 0 0 1-.686.692a.689.689 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692Zm2.728 0c.378 0 .685.31.685.692v8.05a.689.689 0 0 1-.685.692a.689.689 0 0 1-.686-.692v-8.05a.69.69 0 0 1 .686-.692ZM9.176 1.382c-.642.045-1.065.264-1.334.662c-.198.291-.297.543-.313.768l4.938-.001c-.014-.291-.129-.547-.352-.792c-.346-.38-.73-.586-1.093-.635l-1.846-.002Z"
      />
    </svg>
  );
};

const FAQIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      width="20"
      height="20"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.5 2A2.5 2.5 0 0 1 10 4.5c0 .523-.167.923-.423 1.24a3 3 0 0 1-.624.561l-.167.117c-.262.182-.451.317-.586.483a.88.88 0 0 0-.2.598v1a.5.5 0 0 1-1 0v-1c0-.519.168-.916.425-1.23c.185-.226.413-.404.616-.55l.173-.121c.26-.181.449-.317.584-.485A.9.9 0 0 0 9 4.5a1.5 1.5 0 0 0-3 0a.5.5 0 0 1-1 0A2.5 2.5 0 0 1 7.5 2m0 8.1a.875.875 0 1 1 0 1.75a.875.875 0 0 1 0-1.75"
      />
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M7.5 14c1.18 0 2.19-.137 3.05-.389c1 .699 2.33 1.42 4.05 2.27c.916.456 1.79-.578 1.21-1.42c-.727-1.07-1.36-2.11-1.86-3.29c.736-1.17 1.04-2.61 1.04-4.17c0-3.87-1.88-7-7.5-7s-7.5 3.14-7.5 7c0 3.87 1.88 7 7.5 7zm5.61-3.36a1 1 0 0 0-.077.92c.516 1.23 1.17 2.31 1.89 3.37c-1.65-.823-2.88-1.5-3.8-2.14a1 1 0 0 0-.852-.14c-.758.221-1.67.349-2.77.349c-2.63 0-4.2-.728-5.13-1.73C1.43 10.249 1 8.789 1 6.999s.434-3.26 1.37-4.27c.927-1 2.5-1.73 5.13-1.73s4.2.728 5.13 1.73c.94 1.02 1.37 2.48 1.37 4.27c0 1.44-.284 2.68-.888 3.64z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
