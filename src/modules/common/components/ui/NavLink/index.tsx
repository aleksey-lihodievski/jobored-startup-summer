import { NavLink as MantineNavLink } from '@mantine/core';
import React from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';

import { useStyles } from './styles';

interface NavLinkProps {
	to: string;
	className?: string;
	children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, className, children }) => {
	const { classes, cx } = useStyles();

	return (
		<MantineNavLink
			component={ReactNavLink}
			label={children}
			to={to}
			className={cx(classes.link, className)}
		/>
	);
};

export default NavLink;
