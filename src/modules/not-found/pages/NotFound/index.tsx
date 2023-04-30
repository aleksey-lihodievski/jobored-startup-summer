import { Helmet } from 'react-helmet';

import { DefaultContainer } from '@modules/common/components';
import { getPageTitle } from '@modules/common/services';
import { NothingHere } from '@modules/not-found/components';

import { useStyles } from './styles';

const NotFound = () => {
	const { classes } = useStyles();

	const title = getPageTitle('Здесь ничего нет');

	return (
		<DefaultContainer>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<NothingHere className={classes.nothingHere} />
		</DefaultContainer>
	);
};

export default NotFound;
