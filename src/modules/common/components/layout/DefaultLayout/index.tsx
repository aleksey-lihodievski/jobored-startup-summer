import {
	AppShell,
	Burger,
	Drawer,
	Group,
	Header,
	ScrollArea,
	Styles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { LogoFull } from '@assets/img';

import { DefaultContainer, NavLink } from '@modules/common/components';

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

	const [drawerOpen, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const disableScroll = useCallback(() => {
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
	}, []);

	const enableScroll = useCallback(() => {
		document.body.style.position = 'static';
		document.body.style.width = 'auto';
	}, []);

	useEffect(() => {
		if (drawerOpen) {
			disableScroll();
			return;
		}

		enableScroll();
	}, [drawerOpen]);

	useEffect(() => {
		closeDrawer();
	}, [location.pathname]);

	return (
		<>
			<Header height={headerHeight} className={classes.header} px="md">
				<DefaultContainer className={classes.header}>
					<Group position="apart" className={classes.header__layout}>
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
							opened={drawerOpen}
							onClick={toggleDrawer}
							className={cx(classes.hiddenDesktop, classes.header__burger)}
						/>
					</Group>
				</DefaultContainer>
			</Header>

			<Drawer
				opened={drawerOpen}
				onClose={closeDrawer}
				closeOnEscape
				padding="md"
				size="100%"
				scrollAreaComponent={ScrollArea.Autosize}
				className={cx(classes.hiddenDesktop, classes.drawer)}
				lockScroll={false}
				closeButtonProps={{
					size: 'xl',
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
		</>
	);
}

const defaultStyles: Styles<
	'body' | 'main' | 'root',
	Record<string, unknown>
> = (theme) => ({
	main: {
		backgroundColor: theme.colors.gray[0],
		paddingTop: '7.5rem',
	},
});

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<AppShell fixed header={<HeaderMenu />} styles={defaultStyles}>
			{children}
		</AppShell>
	);
};

export default DefaultLayout;
