export type Feature = "AlternateWelcomeMessage";

export type FeatureFlags = Record<Feature, boolean>;

type Dependencies = {
  fetch: typeof fetch;
};

export const makeFetchFeatureFlags =
  ({ fetch }: Dependencies) =>
  async (): Promise<FeatureFlags> => {
    const response = await fetch("https://example.com/featureFlags");
    const data = await response.json();

    return data;
  };
