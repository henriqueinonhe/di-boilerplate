import { createContainer, InjectionMode } from "awilix";
import { merge } from "lodash";

import { Container } from "../container";
import { StartupContainer, startupDependenciesResolvers } from "../startup";

export type MockedStartupDepedenciesResolvers = {
  [Key in keyof Omit<
    StartupContainer,
    "createDependenciesResolvers" | "createContainer"
  >]?: unknown;
};

export type MockedDependenciesResolvers = {
  [Key in keyof Container]?: unknown;
};

export const createContainerMock = async (
  mockedStartupDependenciesResolvers: MockedStartupDepedenciesResolvers,
  mockedDependenciesResolvers: MockedDependenciesResolvers
) => {
  const startupContainerBuilder = createContainer<StartupContainer>({
    injectionMode: InjectionMode.PROXY,
  });

  startupContainerBuilder.register(
    merge(startupDependenciesResolvers, mockedStartupDependenciesResolvers)
  );

  const startupContainer = startupContainerBuilder.cradle;

  const dependenciesResolvers =
    await startupContainer.createDependenciesResolvers();

  const containerBuilder = createContainer<Container>({
    injectionMode: InjectionMode.PROXY,
  });

  containerBuilder.register(
    merge(dependenciesResolvers, mockedDependenciesResolvers)
  );

  return containerBuilder.cradle;
};
