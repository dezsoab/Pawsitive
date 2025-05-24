"use client";
import Button from "@/components/button/Button";
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
import { RegisterOwnerDTO } from "@/types/RegisterOwnerDTO";
import { createOwner } from "@/api/post/createOwner";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  phone: HTMLInputElement;
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
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("tagId");
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

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
          sx={(theme: { getColorSchemeSelector: (arg0: string) => any }) => ({
            width: { xs: "100%", md: "50vw" },
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(var(--color-white), .2)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(0 0 0 / .2)",
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
              paddingTop: "12rem",
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
                      Register now!
                    </Typography>
                    <ColorSchemeToggle />
                  </Box>
                  <Typography
                    sx={{ fontSize: "var(--font-mini)", fontWeight: "600" }}
                  >
                    become a part of our mission
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-mini)",
                      fontWeight: "300",
                      marginTop: "1rem",
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      href={`/authenticate/login?tagId=${id}`}
                      style={{
                        fontWeight: "600",
                        color: "var(--color-pink-mid)",
                        textDecoration: "none",
                      }}
                    >
                      Log in here
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;

                    if (
                      password1Ref.current?.value != password2Ref.current?.value
                    ) {
                      toast.error("The password fields must match!", {
                        position: "bottom-right",
                      });
                      return;
                    }

                    const owner: RegisterOwnerDTO = {
                      firstName: formElements.firstName.value,
                      lastName: formElements.lastName.value,
                      email: formElements.email.value,
                      password: formElements.password.value,
                      phone: formElements.phone.value,
                      persistLogin: formElements.persistent.checked,
                    };

                    toast
                      .promise(
                        createOwner(owner),
                        {
                          pending: "Creating user account",
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
                        formElements.firstName.value = "";
                        formElements.lastName.value = "";
                        formElements.email.value = "";
                        formElements.password.value = "";
                        formElements.phone.value = "";
                        formElements.persistent.checked = true;
                      })
                      .then(() => {
                        toast.info("Redirecting to your profile...", {
                          position: "bottom-right",
                        });
                      })
                      .then(() => setIsLoggedIn(true))
                      .then(() => {
                        router.push(`/profile?tagId=${id}`);
                      })
                      .catch((e) => {
                        console.log(e.message);
                      });
                  }}
                >
                  <FormControl required>
                    <FormLabel
                      sx={{
                        fontSize: "var(--font-small)",
                      }}
                    >
                      First Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      sx={{
                        fontSize: "var(--font-small)",
                      }}
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel sx={{ fontSize: "var(--font-small)" }}>
                      Last Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      sx={{ fontSize: "var(--font-small)" }}
                    />
                  </FormControl>

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
                      Telephone
                    </FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      sx={{ fontSize: "var(--font-small)" }}
                    />
                  </FormControl>

                  <FormControl required>
                    <FormLabel sx={{ fontSize: "var(--font-small)" }}>
                      Password
                    </FormLabel>
                    <Input
                      slotProps={{ input: { ref: password1Ref } }}
                      type="password"
                      name="password"
                      sx={{ fontSize: "var(--font-small)" }}
                    />
                  </FormControl>

                  <FormControl required>
                    <FormLabel sx={{ fontSize: "var(--font-small)" }}>
                      Password again
                    </FormLabel>
                    <Input
                      slotProps={{ input: { ref: password2Ref } }}
                      type="password"
                      name="password2"
                      sx={{ fontSize: "var(--font-small)" }}
                    />
                  </FormControl>

                  <Stack sx={{ gap: 4, mt: 2 }}>
                    <Checkbox
                      sx={{
                        zoom: 1.3,
                      }}
                      size="lg"
                      label="Remember me"
                      name="persistent"
                      defaultChecked
                    />

                    <Button
                      text="Register"
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
            <Box
              component="header"
              sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
            ></Box>
          </Box>
        </Box>
        <Box
          sx={(theme: { getColorSchemeSelector: (arg0: string) => any }) => ({
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
            backgroundImage: "url(/assets/registerWhite.jpg)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundImage: "url(/assets/registerBlack.jpg)",
            },
          })}
        />
      </CssVarsProvider>
    </>
  );
};

export default RegisterForm;
