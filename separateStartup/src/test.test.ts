import { asValue } from "awilix";
import { FeatureFlags } from "./features";
import {
  createContainerMock,
  MockedDependenciesResolvers,
  MockedStartupDepedenciesResolvers,
} from "./testUtils/createContainerMock";

describe("When using original welcome", () => {
  it("Says correct welcome", async () => {
    const fetchFeatureFlags = () =>
      Promise.resolve({
        AlternateWelcomeMessage: false,
      });

    const mockedStartupDependenciesResolvers: MockedStartupDepedenciesResolvers =
      {
        fetchFeatureFlags: asValue(fetchFeatureFlags),
      };

    const loggerMock = jest.fn();

    const mockedDependenciesResolvers: MockedDependenciesResolvers = {
      logger: asValue(loggerMock),
    };

    const containerMock = await createContainerMock(
      mockedStartupDependenciesResolvers,
      mockedDependenciesResolvers
    );

    const welcome = containerMock.welcome;

    const actualMessage = welcome("Dude");
    const expectedMessage = "Welcome, Dude!";

    expect(actualMessage).toBe(expectedMessage);
  });
});
