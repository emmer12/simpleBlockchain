import { web3Provider } from "../connector/web3modal";

export const web3: any = async () => {
  try {
    let web3 = await web3Provider();
    return web3;
  } catch (error) {
    console.log(error, "err");
  }
};
