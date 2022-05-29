import { createContainer, InjectionMode } from "awilix";
import { merge } from "lodash";

import { syncDependencies, Container, Dependencies } from "../container";

export type MockedDependencies = {
  [Key in keyof Dependencies]?: unknown;
};

export const createContainerMock = (mockedDependencies: MockedDependencies) => {
  const awilixContainer = createContainer<Container>({
    injectionMode: InjectionMode.PROXY,
  });

  awilixContainer.register(merge(syncDependencies, mockedDependencies));

  return awilixContainer.cradle;
};
