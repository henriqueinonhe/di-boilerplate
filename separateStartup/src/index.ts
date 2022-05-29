import { startupContainer } from "./startup";

const main = async () => {
  const createContainer = startupContainer.createContainer;

  const container = await createContainer();

  container.welcome("Dude");
};

main();
