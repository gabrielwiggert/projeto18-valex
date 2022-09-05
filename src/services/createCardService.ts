import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as errors from "../errors"
import { faker } from '@faker-js/faker';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export async function createCard(idEmployee: number, cardType: TransactionTypes) {
  const employee = await checkEmployee(idEmployee, cardType);

  if (employee) {
    const today = new Date();
    const cardData = {
      employeeId: idEmployee,
      number: faker.finance.creditCardNumber(),
      cardholderName: employee.fullName,
      securityCode: cryptr.encrypt(`${faker.finance.creditCardCVV()}`),
      expirationDate: `${today.getMonth()+1}/${today.getFullYear()+5}`,
      password: "123",
      isVirtual: true,
      isBlocked: true,
      type: cardType
    }
    await cardRepository.insert(cardData);
  }
}

export async function checkEmployee(idEmployee: number, cardType: TransactionTypes) {
  const employeeExists = await employeeRepository.findById(idEmployee);
  if (!employeeExists) {
    throw errors.notFoundError('employee'); //vai interromper automaticamente tudo? vai travel all the layers back sozinho até o catch mais prox? perg
  }

  const cardExists = await cardRepository.findByTypeAndEmployeeId(cardType, idEmployee);
  if (cardExists) {
    throw errors.alreadyExists('An employee with this type of card');
  }

  return employeeExists;
}