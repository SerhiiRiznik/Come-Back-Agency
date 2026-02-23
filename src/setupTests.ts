import "@testing-library/jest-dom";

if (typeof globalThis.fetch === "undefined") {
  globalThis.fetch = () =>
    Promise.resolve({
      ok: true,
      json: async () => ({}),
    } as unknown as Response);
}

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ name: "Kyiv" }),
}));

jest.mock("react-redux", () => {
  const actual = jest.requireActual("react-redux");
  const defaultState = {
    cities: { cities: [{ name: "Kyiv" }, { name: "London" }] },
  };
  return {
    ...actual,
    useSelector: (selector: (state: unknown) => unknown) =>
      typeof selector === "function"
        ? selector(defaultState as unknown)
        : undefined,
    useDispatch: () => () => undefined,
  };
});
