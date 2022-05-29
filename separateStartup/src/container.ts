import {
  asFunction,
  asValue,
  createContainer as createContainerBuilder,
  InjectionMode,
} from "awilix";
import { FeatureFlags } from "./features";
import { AwilixUtils } from "./utils/awilix";
import { makeAlternateWelcome } from "./welcome/alternateWelcome";
import { makeOriginalWelcome } from "./welcome/originalWelcome";

type CreateDependenciesResolversDependencies = {
  fetchFeatureFlags: () => Promise<FeatureFlags>;
};

export const makeCreateDependenciesResolvers =
  ({ fetchFeatureFlags }: CreateDependenciesResolversDependencies) =>
  async () => {
    const featureFlags = await fetchFeatureFlags();

    return {
      logger: asValue(console.log),
      welcome: featureFlags.AlternateWelcomeMessage
        ? asFunction(makeAlternateWelcome).singleton()
        : asFunction(makeOriginalWelcome).singleton(),
      featureFlags: asValue(featureFlags),
    };
  };

type CreateContainerDependencies = {
  createDependenciesResolvers: ReturnType<
    typeof makeCreateDependenciesResolvers
  >;
};

export const makeCreateContainer =
  ({ createDependenciesResolvers }: CreateContainerDependencies) =>
  async () => {
    const dependenciesResolvers = await createDependenciesResolvers();

    const containerBuilder = createContainerBuilder<
      AwilixUtils.Container<typeof dependenciesResolvers>
    >({
      injectionMode: InjectionMode.PROXY,
    });

    containerBuilder.register(dependenciesResolvers);

    return containerBuilder.cradle;
  };

export type Container = Awaited<
  ReturnType<ReturnType<typeof makeCreateContainer>>
>;
