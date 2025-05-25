export enum backendRoutes {
  AUTH = "auth",
  REGISTER = AUTH + "/register",
  LOGIN = AUTH + "/login",
  LOGOUT = AUTH + "/logout",
  ISAUTHENTICATED = AUTH + "/authenticated",
  PET = "pet",
  NFCTAG = "nfcTag",
  CONTACTUS = "mail/emailContactUs",
  ISAUTHENTICATEDUSEROWNEROFPET = "owner/isAuthenticatedUserOwnerOfPet",
  PROFILE = "profile",
  UPDATEPROFILE = "profile/update",
}
