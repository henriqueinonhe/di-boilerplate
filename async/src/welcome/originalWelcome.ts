import { Welcome } from "./welcome";

type Dependencies = {
  logger: (string: string) => void;
};

export const makeOriginalWelcome =
  ({ logger }: Dependencies): Welcome =>
  (name) => {
    logger(`Welcome, ${name}!`);
  };
