"use client";
import React, { useRef } from "react";

import styles from "./LoginForm.module.css";
import Button from "@/components/button/Button";
import { LoginOwnerDTO } from "@/types/LoginOwnerDTO";
import { loginOwner } from "@/api/post/loginOwner";
import { toast, ToastContainer } from "react-toastify";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const btnStyle = {
  padding: "1rem 1.5rem",
  backgroundColor: "var(--color-pink-light)",
};

// const LoginForm = () => {
//   const formRef = useRef<HTMLFormElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     const loginOwnerObject: LoginOwnerDTO = {
//       email: emailRef.current!.value,
//       password: passwordRef.current!.value,
//     };

//     toast
//       .promise(
//         loginOwner(loginOwnerObject),
//         {
//           pending: "Logging in...",
//           success: "Successful login!",
//           error: "Something went wrong...",
//         },
//         {
//           position: "bottom-right",
//         }
//       )
//       .then(() => {
//         formRef.current?.reset();
//       })
//       .catch((e) => {
//         console.error(e.message);
//       });
//   };

//   return (
//     <div className={styles.formContainer}>
//       <ToastContainer />
//       <form onSubmit={handleLogin} ref={formRef}>
//         <div className={styles.form}>
//           <input
//             type="email"
//             id="email"
//             className={styles.form__input}
//             placeholder=" "
//             ref={emailRef}
//             required
//           />
//           <label htmlFor="email" className={styles.form__label}>
//             Email:
//           </label>
//         </div>

//         <div className={styles.form}>
//           <input
//             type="password"
//             id="password"
//             className={styles.form__input}
//             placeholder=" "
//             ref={passwordRef}
//             required
//           />
//           <label htmlFor="password" className={styles.form__label}>
//             Password:
//           </label>
//         </div>
//         <Button text="Login" style={btnStyle} />
//       </form>
//     </div>
//   );
// };

import { CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { colors } from "@mui/material";
import Navbar from "@/components/navigation/Navbar";

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
  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
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
                [`& .MuiFormLabel-asterisk`]: {
                  visibility: "hidden",
                },
              }}
            >
              <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: "var(--font-big)" }}
                  >
                    Register now!
                  </Typography>
                  <Typography sx={{ fontSize: "var(--font-mini)" }}>
                    become a part of our mission
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;
                    const data = {
                      email: formElements.email.value,
                      password: formElements.password.value,
                      persistent: formElements.persistent.checked,
                    };
                    alert(JSON.stringify(data, null, 2));
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
                      <Link sx={{ fontSize: "var(--font-mini)" }}>
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
            <Box
              component="header"
              sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
            >
              <ColorSchemeToggle />
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
            backgroundImage: `url(/assets/loginWhite.jpeg)`,
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
