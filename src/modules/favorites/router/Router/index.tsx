import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Favorites = React.lazy(
	() => import('@modules/favorites/pages/Favorites')
);

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Favorites />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default Router;
