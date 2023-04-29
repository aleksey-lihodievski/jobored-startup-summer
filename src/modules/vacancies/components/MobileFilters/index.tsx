import { Accordion } from '@mantine/core';
import React from 'react';

import { Catalogue } from '@modules/vacancies/types';

import Filters, { FiltersForm } from '../Filters';
import { useStyles } from './styles';

interface MobileFiltersProps {
	fields?: Catalogue[];
	values?: FiltersForm;
	onChange: (values: FiltersForm) => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
	fields,
	values,
	onChange,
}) => {
	const { classes, cx } = useStyles();

	return (
		<Accordion
			className={cx(classes.hiddenDesktop, classes.accordion)}
			variant="filled"
		>
			<Accordion.Item value="filters">
				<Accordion.Control>Фильтры</Accordion.Control>
				<Accordion.Panel>
					<Filters
						fields={fields}
						values={values}
						onChange={onChange}
						className={classes.mobileFilters}
					/>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};

export default MobileFilters;
