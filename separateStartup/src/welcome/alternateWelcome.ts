import { Welcome } from "./welcome";

type Dependencies = {
  logger: (string: string) => void;
};

export const makeAlternateWelcome =
  ({ logger }: Dependencies): Welcome =>
  (name) => {
    const message = `WAAZZZUUUP, ${name}!`;

    logger(message);

    return message;
  };
