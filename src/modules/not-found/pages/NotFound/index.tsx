import { Helmet } from 'react-helmet';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { NothingHere } from '@modules/not-found/components';

import { useStyles } from './styles';

const NotFound = () => {
	const { classes } = useStyles();

	return (
		<DefaultLayout>
			<Helmet>
				<title>Здесь ничего нет | Jobored</title>
			</Helmet>
			<DefaultContainer>
				<NothingHere className={classes.nothingHere} />
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default NotFound;
