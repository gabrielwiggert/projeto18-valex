import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as errors from "../errors"

export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export async function createCard(idEmployee: number, cardType: TransactionTypes) {
  const employee = await checkEmployee(idEmployee, cardType);

  if (employee) {
    const cardData = {
      employeeId: idEmployee,
      number: "123",
      cardholderName: employee.fullName,
      securityCode: "123",
      expirationDate: "123",
      password: "123",
      isVirtual: true,
      originalCardId: 123,
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