import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

const renderWithIntl = (
  ui: React.ReactElement,
  locale: string,
  messages: Messages
) => {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

export default renderWithIntl;
