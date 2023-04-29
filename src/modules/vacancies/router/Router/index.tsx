import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Vacancies = React.lazy(
	() => import('@modules/vacancies/pages/Vacancies')
);

const Vacancy = React.lazy(() => import('@modules/vacancies/pages/Vacancy'));

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Vacancies />} />
			<Route path="/:id" element={<Vacancy />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default Router;
