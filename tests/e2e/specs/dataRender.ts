// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

import { Pages } from '../../../src/router/pages';
const { Frameworks, Metrics, Timings } = Pages;
export const frameworkCount = 7;
export const metricCount = 6;
export const timingCount = 6;

describe('Data Rendering', () => {
	it(`The ${Frameworks.name} page has correct data`, () => {
		cy.visit(Frameworks.path);

		cy.get(`[data-cy=${Frameworks.name}]`)
			.children()
			.should('have.length', frameworkCount);
	});

	it(`The ${Metrics.name} page has correct data`, () => {
		cy.visit(Metrics.path);

		cy.get(`[data-cy=${Metrics.name}]`)
			.children()
			.should('have.length', metricCount);
	});

	it(`The ${Timings.name} page has correct data`, () => {
		cy.visit(Timings.path);
		cy.get(`[data-cy=${Timings.name}]`)
			.children()
			.should('have.length', timingCount);
	});
});
