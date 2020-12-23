// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

// can't use newer array methods in cypress with my config for some reason.
// expect(metricNames.slice(0, 5).every((name) => name === metricNames[0])).to.be.true;

import { Pages } from '../../../src/router/pages';
const { Comparison } = Pages;

describe('Sorting and Filtering', () => {
	it(`It sorts by metrics`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=metricFrameworkSelectType]`).select('Metric');
		cy.get(`[data-cy=TimingType]`)
			.then(getCells)
			.then(metricFrameworkSortAssertions);
	});

	it(`It sorts by frameworks`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=metricFrameworkSelectType]`).select('Framework');
		cy.get(`[data-cy=TimingFramework]`)
			.then(getCells)
			.then(metricFrameworkSortAssertions);
	});

	it(`It sorts by total duration`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Total Duration');
		cy.get(`[data-cy=TotalDur]`)
			.then(getCells)
			.then(timingSortAssertions);
	});
	it(`It sorts by click duration`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Click Duration');
		cy.get(`[data-cy=ClickDur]`)
			.then(getCells)
			.then(timingSortAssertions);
	});

	it(`It sorts by render after click`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Render After Click');
		cy.get(`[data-cy=RenderAfterClick]`)
			.then(getCells)
			.then(timingSortAssertions);
	});

	it(`It sorts by render during click`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Render During Click');
		cy.get(`[data-cy=RenderDuringClick]`)
			.then(getCells)
			.then(timingSortAssertions);
	});

	it(`It filters by framework`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=react]`).uncheck();
		cy.get(`[data-cy=TimingFramework]`)
			.then(getCells)
			.then((cells) => {
				expect(isRemoved(cells, 'react')).to.be.true;
			});

		cy.get(`[data-cy=vue]`).uncheck();
		cy.get(`[data-cy=TimingFramework]`)
			.then(getCells)
			.then((cells) => {
				expect(isRemoved(cells, 'vue')).to.be.true;
				expect(isRemoved(cells, 'rust-fel')).to.be.false;
				expect(cells).to.have.length(24);
			});
	});

	it(`It filters by metric`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=k]`).uncheck();
		cy.get(`[data-cy=TimingType]`)
			.then(getCells)
			.then((cells) => {
				expect(isRemoved(cells, 'k')).to.be.true;
			});

		cy.get(`[data-cy=clear-k]`).uncheck();
		cy.get(`[data-cy=TimingType]`)
			.then(getCells)
			.then((cells) => {
				expect(isRemoved(cells, 'clear-k')).to.be.true;
				expect(isRemoved(cells, 'ten-k')).to.be.false;
				expect(cells).to.have.length(24);
			});
	});
	it(`It changes by throttle type`, () => {
		let firstUnthrottledCell = '';
		let lastUnthrottledCell = '';

		cy.visit(Comparison.path);
		cy.get(`[data-cy=TotalDur]`)
			.then(getCells)
			.then((cells) => {
				firstUnthrottledCell = cells[0];
				lastUnthrottledCell = cells[cells.length - 1];
				cy.get(`[data-cy=throttledSelectType]`).select('4x slowdown');
				cy.get(`[data-cy=TotalDur]`)
					.then(getCells)
					.then((cells) => {
						expect(parseFloat(firstUnthrottledCell)).to.be.lessThan(parseFloat(cells[0]));
						expect(parseFloat(lastUnthrottledCell)).to.be.lessThan(parseFloat(cells[cells.length - 1]));
					});
			});
	});
});

function isRemoved(arr: string[], filterItem: string) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === filterItem) {
			return false;
		}
	}
	return true;
}

function timingSortAssertions(timings: string[]) {
	const slicesArr = createSlices(timings, 6);
	for (let i = 0; i < slicesArr.length; i++) {
		expect(isSortedByNumber(slicesArr[i])).to.be.true;
	}
}

function metricFrameworkSortAssertions(metricNames: string[]) {
	const slicesArr = createSlices(metricNames, 6);
	expect(metricNames).to.have.length(36);

	for (let i = 0; i < slicesArr.length; i++) {
		expect(isSortedByString(slicesArr[i])).to.be.true;
	}
}

function createSlices(arr: string[], len: number): string[][] {
	const arrOfArrs: string[][] = [];
	let temp = [];

	for (let i = 0; i < arr.length; i++) {
		temp.push(arr[i]);
		if (i > 0 && (i + 1) % len === 0) {
			arrOfArrs.push(temp);
			temp = [];
		}
	}

	return arrOfArrs;
}

function getCells(tableDataCells: JQuery<HTMLElement>): string[] {
	const cells = [...tableDataCells];
	const data = [];
	for (let i = 0; i < cells.length; i++) {
		data.push(cells[i].innerHTML);
	}
	return data;
}

function isSortedByString(arr: string[]) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[0] !== arr[i]) {
			return false;
		}
	}
	return true;
}

function isSortedByNumber(arr: string[]) {
	for (let i = 0; i < arr.length; i++) {
		if (i < arr.length) {
			if (parseFloat(arr[i]) > parseFloat(arr[i + 1])) {
				return false;
			}
		}
	}
	return true;
}
