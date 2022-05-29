export const featuresFakeFetch = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        AlternateWelcomeMessage: true,
      }),
  });
