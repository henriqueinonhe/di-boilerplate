import { createContainer } from "./container";

const main = async () => {
  const container = await createContainer();

  container.welcome("Dude");
};

main();
