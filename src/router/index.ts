import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { Pages } from '@/router/pages.ts';
const { HomePage, Frameworks, Metrics, Comparison, Timings, PageNotFound } = Pages;

const routes: Array<RouteRecordRaw> = [
	{
		path: HomePage.path,
		name: HomePage.name,
		component: Home,
	},
	{
		path: Frameworks.path,
		name: Frameworks.name,
		component: () => import(/* webpackChunkName: "Frameworks" */ '../views/Frameworks.vue'),
	},
	{
		path: Metrics.path,
		name: Metrics.name,
		component: () => import(/* webpackChunkName: "Metrics" */ '../views/Metrics.vue'),
	},
	{
		path: Comparison.path,
		name: Comparison.name,
		component: () => import(/* webpackChunkName: "Comparison" */ '../views/Comparison.vue'),
	},
	{
		path: Timings.path,
		name: Timings.name,
		component: () => import(/* webpackChunkName: "Timings" */ '../views/Timings.vue'),
	},

	{
		path: PageNotFound.path,
		name: PageNotFound.name,
		component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/PageNotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
