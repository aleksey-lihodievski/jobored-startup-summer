import {
	Button,
	Flex,
	Group,
	NumberInput,
	Paper,
	Select,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

import { IconChevronDown, IconClose } from '@assets/icons';

import { FormGroup } from '@modules/common/components';

import { useStyles } from './styles';

const PAYMENT_STEP = 50;

const FilterDesktop = () => {
	const [top, setTop] = useState<number>();

	const paperRef = useRef<HTMLDivElement>(null);
	const { classes } = useStyles();

	useEffect(() => {
		setTop(paperRef.current?.getBoundingClientRect().top);
	}, []);

	return (
		<Paper
			ref={paperRef}
			pos="sticky"
			top={top}
			p={20}
			pt={14}
			miw={315}
			withBorder
		>
			<Group position="apart">
				<Title order={3} className={classes.title}>
					Фильтры
				</Title>

				<Flex align="center" className={classes.resetText__wrapper}>
					<Text color="red" className={classes.resetText}>
						Сбросить все
					</Text>
					<img src={IconClose} alt="" className={classes.closeIcon} />
				</Flex>
			</Group>

			<Stack spacing={15} mt={22}>
				<FormGroup title="Отрасль">
					<Select
						data={[]}
						size="md"
						placeholder="Выберите отрасль"
						rightSection={<img src={IconChevronDown} alt="" />}
						styles={{ rightSection: { pointerEvents: 'none' } }}
					/>
				</FormGroup>

				<FormGroup title="Оклад">
					<NumberInput
						type="number"
						size="md"
						placeholder="От"
						className={classes.numberInput}
						step={PAYMENT_STEP}
					/>
					<NumberInput
						type="number"
						size="md"
						placeholder="До"
						className={classes.numberInput}
						step={PAYMENT_STEP}
					/>
				</FormGroup>
			</Stack>
			<Button mt={20} fullWidth size="md">
				Применить
			</Button>
		</Paper>
	);
};

export default FilterDesktop;
