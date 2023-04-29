import { Helmet } from 'react-helmet';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { getPageTitle } from '@modules/common/services';
import { NothingHere } from '@modules/not-found/components';

import { useStyles } from './styles';

const NotFound = () => {
	const { classes } = useStyles();

	const title = getPageTitle('Здесь ничего нет');

	return (
		<DefaultLayout>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<DefaultContainer>
				<NothingHere className={classes.nothingHere} />
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default NotFound;
