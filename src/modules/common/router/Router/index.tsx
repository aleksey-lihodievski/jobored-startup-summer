import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultLoader } from '@modules/common/components';

const VacanciesRouter = React.lazy(() => import('@modules/vacancies/router'));
const FavoritesRouter = React.lazy(() => import('@modules/favorites/router'));
const NotFound = React.lazy(() => import('@modules/not-found/pages/NotFound'));

const Router = () => {
	return (
		<Suspense fallback={<DefaultLoader />}>
			<Routes>
				<Route path="/vacancies/*" element={<VacanciesRouter />} />

				<Route path="/favorites/*" element={<FavoritesRouter />} />

				<Route path="/" element={<Navigate to="/vacancies" replace />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};

export default Router;
