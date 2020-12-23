// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

import { Pages } from '../../../src/router/pages';
const { Account } = Pages;

describe('User Auth', () => {
	it(`It logs in and out`, () => {
		cy.visit(Account.path);
		cy.get(`[data-cy=email]`).type('t@gmail.com');
		cy.get(`[data-cy=password]`).type('12345678');
		cy.get(`[data-cy=submit]`).click();
		cy.contains('Logout');
		cy.get(`[data-cy=logout]`).click();
		cy.contains('Login');
	});

	it(`It shows validation errors`, () => {
		cy.visit(Account.path);
		cy.get(`[data-cy=email]`).type('t@gmail.com');
		cy.get(`[data-cy=password]`).type('1234567');
		cy.get(`[data-cy=submit]`).click();
		cy.contains('The password must be at least 8 characters');
		cy.get(`[data-cy=email]`).clear();
		cy.get(`[data-cy=email]`).type('t');
		cy.get(`[data-cy=submit]`).click();
		cy.contains('The email format is invalid');
		cy.get(`[data-cy=email]`).clear();
		cy.get(`[data-cy=password]`).clear();
		cy.get(`[data-cy=submit]`).click();
		cy.contains('The email field is required');
		cy.contains('The password field is required');
	});
});
