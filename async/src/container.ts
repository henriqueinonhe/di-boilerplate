import {
  asFunction,
  asValue,
  createContainer as createAwilixContainer,
  InjectionMode,
} from "awilix";
import { fetchFeatureFlags } from "./features";
import { AwilixUtils } from "./utils/awilix";
import { makeOriginalWelcome } from "./welcome/originalWelcome";
import { makeAlternateWelcome } from "./welcome/alternateWelcome";

export const syncDependencies = {
  logger: asValue(console.log),
};

const createDependencies = async () => {
  const featureFlags = await fetchFeatureFlags();

  const asyncDependencies = {
    featureFlags: asValue(featureFlags),
    welcome: featureFlags.AlternateWelcomeMessage
      ? asFunction(makeAlternateWelcome).singleton()
      : asFunction(makeOriginalWelcome).singleton(),
  };

  const dependencies = {
    ...syncDependencies,
    ...asyncDependencies,
  };

  return dependencies;
};

export const createContainer = async () => {
  const dependencies = await createDependencies();

  const awilixContainer = createAwilixContainer<
    AwilixUtils.Container<Dependencies>
  >({
    injectionMode: InjectionMode.PROXY,
  });

  awilixContainer.register(dependencies);

  const container = awilixContainer.cradle;

  return container;
};

export type Dependencies = Awaited<ReturnType<typeof createDependencies>>;
export type SyncDependencies = typeof syncDependencies;
export type AsyncDependencies = Omit<Dependencies, keyof SyncDependencies>;

export type Container = Awaited<ReturnType<typeof createContainer>>;
