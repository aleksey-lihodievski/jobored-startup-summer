import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DefaultLayout, DefaultLoader } from '@modules/common/components';

const VacanciesRouter = React.lazy(() => import('@modules/vacancies/router'));
const FavoritesRouter = React.lazy(() => import('@modules/favorites/router'));

const Router = () => {
	return (
		<Suspense fallback={<DefaultLoader />}>
			<Routes>
				<Route path="/vacancies/*" element={<VacanciesRouter />} />

				<Route path="/favorites/*" element={<FavoritesRouter />} />

				<Route path="/" element={<Navigate to="/vacancies" replace />} />

				<Route
					path="*"
					element={
						<DefaultLayout>
							<div>not found</div>
						</DefaultLayout>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default Router;
