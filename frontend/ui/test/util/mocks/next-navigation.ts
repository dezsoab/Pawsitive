export const mockNextNavigation = () => ({
 usePathname: jest.fn().mockReturnValue("/"),
  useRouter: jest.fn().mockReturnValue({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: jest.fn().mockReturnValue({ locale: "en" }),
  useSelectedLayoutSegment: jest.fn().mockReturnValue({ locale: "en" })
});
// export const mockNextNavigation = () => ({
//   usePathname: () => "/",
//   useRouter: () => ({
//     back: jest.fn(),
//     forward: jest.fn(),
//     refresh: jest.fn(),
//     push: jest.fn(),
//     prefetch: jest.fn(),
//     replace: jest.fn(),
//   }),
//   useParams: () => ({ locale: "en" }),
//   useSelectedLayoutSegment: () => ({ locale: "en" }),
// });
