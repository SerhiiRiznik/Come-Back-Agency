import citiesReducer, {
  addCity,
  removeCity,
} from "../features/weather/citiesSlice";

describe("citiesSlice", () => {
  it("should return the initial state", () => {
    expect(citiesReducer(undefined, { type: "@@INIT" })).toEqual({
      cities: [],
    });
  });

  it("should handle addCity", () => {
    const previousState = { cities: [] };
    expect(citiesReducer(previousState, addCity({ name: "Kyiv" }))).toEqual({
      cities: [{ name: "Kyiv" }],
    });
  });

  it("should handle removeCity", () => {
    const previousState = { cities: [{ name: "Kyiv" }, { name: "London" }] };
    expect(citiesReducer(previousState, removeCity("London"))).toEqual({
      cities: [{ name: "Kyiv" }],
    });
  });
});
