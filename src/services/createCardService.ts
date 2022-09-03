import axios from "axios";
import * as createCardRepository from "../repositories/createCardRepository";

export async function createCard() {
  const { data } = await axios.get(`https://api.github.com/users/repos`);
  return data;
}