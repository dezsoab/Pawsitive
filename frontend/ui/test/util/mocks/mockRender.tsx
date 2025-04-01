import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "../../../components/navigation/Navbar";
import { AppRouterContextProviderMock } from "@/test/util/mocks/app-router-context-provider-mock";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ReactElement } from "react";
import { setImmediate } from "timers";
import { AuthProvider } from "@/context/AuthContext";
global.setImmediate = setImmediate;

export const setup = ({
  Component,
  messages,
  locale,
}: {
  Component: ReactElement;
  messages: AbstractIntlMessages;
  locale: string;
}) => {
  const push = jest.fn();
  const back = jest.fn();
  const forward = jest.fn();
  const replace = jest.fn();
  const refresh = jest.fn();
  const prefetch = jest.fn();
  const routerMock = {
    push,
    back,
    forward,
    replace,
    refresh,
    prefetch,
  };

  render(
    <AuthProvider>
      <AppRouterContextProviderMock router={routerMock}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {Component}
        </NextIntlClientProvider>
      </AppRouterContextProviderMock>
    </AuthProvider>
  );

  return { push, back, forward, replace, refresh, prefetch };
};
