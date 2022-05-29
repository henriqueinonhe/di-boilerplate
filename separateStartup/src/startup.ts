import {
  asFunction,
  asValue,
  createContainer as createContainerBuilder,
  InjectionMode,
} from "awilix";
import {
  makeCreateContainer,
  makeCreateDependenciesResolvers,
} from "./container";
import { makeFetchFeatureFlags } from "./features";
import { featuresFakeFetch } from "./featuresFakeFetch";
import { AwilixUtils } from "./utils/awilix";

export const startupDependenciesResolvers = {
  fetch: asValue(featuresFakeFetch as unknown as typeof fetch),
  fetchFeatureFlags: asFunction(makeFetchFeatureFlags).singleton(),
  createDependenciesResolvers: asFunction(
    makeCreateDependenciesResolvers
  ).singleton(),
  createContainer: asFunction(makeCreateContainer).singleton(),
};

const startupContainerBuilder = createContainerBuilder<
  AwilixUtils.Container<typeof startupDependenciesResolvers>
>({
  injectionMode: InjectionMode.PROXY,
});

startupContainerBuilder.register(startupDependenciesResolvers);

export const startupContainer = startupContainerBuilder.cradle;

export type StartupContainer = typeof startupContainer;
