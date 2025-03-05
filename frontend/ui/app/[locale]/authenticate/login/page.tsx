"use client";
import React from "react";
import Button from "@/components/button/Button";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";
import { loginOwner } from "@/api/post/loginOwner";
import { toast, ToastContainer } from "react-toastify";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";

import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Navbar from "@/components/navigation/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="lg"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
      style={{ scale: 1.3 }}
    >
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}

const LoginForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("tagId");
  const router = useRouter();

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Form-maxWidth": "1250px",
              "--Transition-duration": ".3s",
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width: { xs: "100%", md: "50vw" },
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255 255 255 / 0.2)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(0 0 0 / 0.4)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              width: "100%",
              px: 2,
            }}
          >
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                ["& .MuiFormLabel-asterisk"]: {
                  visibility: "hidden",
                },
              }}
            >
              <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="h1"
                      sx={{ fontSize: "var(--font-big)" }}
                    >
                      Sign in
                    </Typography>
                    <ColorSchemeToggle />
                  </Box>
                  <Typography
                    sx={{ fontSize: "var(--font-mini)", fontWeight: "300" }}
                  >
                    New to Pawsitive?{" "}
                    <Link
                      href={`/authenticate/register?tagId=${id}`}
                      style={{
                        fontWeight: "600",
                        textDecoration: "none",
                        color: "var(--color-pink-mid)",
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;

                    const loginOwnerObject: LoginOwnerDTO = {
                      email: formElements.email.value,
                      password: formElements.password.value,
                      persistLogin: formElements.persistent.checked,
                    };

                    toast
                      .promise(
                        loginOwner(loginOwnerObject),
                        {
                          pending: "Logging in...",
                          success: {
                            render: ({ data }: { data: { message: string } }) =>
                              data.message,
                          },
                          error: {
                            render: ({ data }: { data: { message: string } }) =>
                              data.message,
                          },
                        },
                        {
                          position: "bottom-right",
                        }
                      )
                      .then(() => {
                        formElements.email.value = "";
                        formElements.password.value = "";
                      })
                      .then(() => router.push(`/profile/edit?tagId=${id}`))
                      .catch((e) => {
                        console.error(e.message);
                      });
                  }}
                >
                  <FormControl required>
                    <FormLabel sx={{ fontSize: "var(--font-small)" }}>
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      sx={{ fontSize: "var(--font-small)" }}
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel sx={{ fontSize: "var(--font-small)" }}>
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      name="password"
                      sx={{ fontSize: "var(--font-small)" }}
                    />
                  </FormControl>
                  <Stack sx={{ gap: 4, mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        sx={{
                          zoom: 1.3,
                        }}
                        size="lg"
                        label="Remember me"
                        name="persistent"
                      />
                      <Link
                        style={{
                          fontSize: "var(--font-mini)",
                          color: "var(--color-pink-mid)",
                        }}
                        href={"#"}
                      >
                        Forgot your password?
                      </Link>
                    </Box>
                    <Button
                      text="Login"
                      style={{
                        padding: "1rem 1.5rem",
                        backgroundColor: "var(--color-pink-mid)",
                        color: "var(--color-white)",
                      }}
                    />
                  </Stack>
                </form>
              </Stack>
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-md" sx={{ textAlign: "center" }}>
                © Pawsitive Collar {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            left: { xs: 0, md: "50vw" },
            transition:
              "background-image var(--Transition-duration), left var(--Transition-duration) !important",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/assets/loginWhite.jpeg)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundImage: "url(/assets/loginBlack.jpg)",
            },
          })}
        />
      </CssVarsProvider>
    </>
  );
};

export default LoginForm;
