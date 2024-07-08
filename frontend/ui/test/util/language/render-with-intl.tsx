import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { AppRouterContextProviderMock } from "../mocks/app-router-context-provider-mock";

const renderWithIntl = (
  ui: React.ReactElement,
  locale: string,
  messages: ENMessages
) => {
  const push = jest.fn();

  return render(
    <AppRouterContextProviderMock router={{ push }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {ui}
      </NextIntlClientProvider>
    </AppRouterContextProviderMock>
  );
};

export default renderWithIntl;
