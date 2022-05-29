export type Feature = "AlternateWelcomeMessage";

export type FeatureFlags = Record<Feature, boolean>;

export const fetchFeatureFlags = (): Promise<FeatureFlags> =>
  Promise.resolve({
    AlternateWelcomeMessage: false,
  });
