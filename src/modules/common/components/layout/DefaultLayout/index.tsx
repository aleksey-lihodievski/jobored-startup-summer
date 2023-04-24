import {
	AppShell,
	Box,
	Burger,
	Drawer,
	Group,
	Header,
	ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { LogoFull } from '@assets/img';

import { NavLink } from '@modules/common/components';

import { useStyles } from './styles';

const links = [
	{ href: '/vacancies', title: 'Поиск Вакансий' },
	{ href: '/favorites', title: 'Избранное' },
];

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export function HeaderMenu() {
	const location = useLocation();

	const headerHeight = 84;

	const { classes, cx } = useStyles({ headerHeight });

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	useEffect(() => {
		closeDrawer();
	}, [location.pathname]);

	return (
		<Box>
			<Header height={headerHeight} className={classes.header} px="md">
				<Group position="apart" className={classes.header__container}>
					<Group className={classes.fullHeight}>
						<Link to="/">
							<img src={LogoFull} alt="Jobored Logo" />
						</Link>
					</Group>

					<Group
						spacing={0}
						className={cx(classes.hiddenMobile, classes.fullHeight)}
					>
						{links.map((link) => (
							<NavLink
								key={link.href}
								to={link.href}
								className={classes.header__link}
							>
								{link.title}
							</NavLink>
						))}
					</Group>

					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						className={cx(classes.hiddenDesktop, classes.header__burger)}
					/>
				</Group>
			</Header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				closeOnEscape
				padding="md"
				size="100%"
				scrollAreaComponent={ScrollArea.Autosize}
				className={cx(classes.hiddenDesktop, classes.drawer)}
				closeButtonProps={{
					size: '2rem',
				}}
			>
				{links.map((link) => (
					<NavLink
						key={link.href}
						to={link.href}
						className={classes.header__link}
					>
						{link.title}
					</NavLink>
				))}
			</Drawer>
		</Box>
	);
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<AppShell
			header={<HeaderMenu />}
			styles={(theme) => ({
				main: {
					backgroundColor: theme.colors.gray[0],
				},
			})}
		>
			{children}
		</AppShell>
	);
};

export default DefaultLayout;
