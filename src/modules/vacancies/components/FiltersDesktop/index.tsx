import { yupResolver } from '@hookform/resolvers/yup';
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
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IconChevronDown, IconClose } from '@assets/icons';

import { FormGroup } from '@modules/common/components';
import { Catalogue } from '@modules/vacancies/types';

import { useStyles } from './styles';
import { FormSchema } from './types';
import { filterSchema } from './validation';

const PAYMENT_STEP = 50;

interface FilterDesktopProps {
	fields?: Catalogue[];
	onChange: (catalogue: string, from: number | '', to: number | '') => void;
}

// const PAYMENT_MIN = 200;
// const PAYMENT_MAX = 100_000;

const FilterDesktop: React.FC<FilterDesktopProps> = ({ fields, onChange }) => {
	const { handleSubmit, control, reset } = useForm<FormSchema>({
		resolver: yupResolver(filterSchema),
		defaultValues: {
			payment_from: '',
			payment_to: '',
			catalogues: '',
		},
	});

	const [top, setTop] = useState<number>();

	const paperRef = useRef<HTMLFormElement>(null);
	const { classes } = useStyles();

	const handledFields = useMemo(
		() =>
			fields?.map((field) => ({
				label: field.title_trimmed,
				value: field.key.toString(),
			})) ?? [],
		[fields]
	);

	const onSubmit = useCallback(
		(values: FormSchema) => {
			const from = values.payment_from ? Number(values.payment_from) : '';
			const to = values.payment_to ? Number(values.payment_to) : '';

			onChange(values.catalogues, from, to);
		},
		[onChange]
	);

	const onReset = useCallback(() => {
		reset();
		onChange('', '', '');
	}, [onChange]);

	useEffect(() => {
		setTop(paperRef.current?.getBoundingClientRect().top);
	}, []);

	return (
		<Paper
			ref={paperRef}
			onSubmit={handleSubmit(onSubmit)}
			component="form"
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

				<Flex
					align="center"
					className={classes.resetText__wrapper}
					onClick={onReset}
				>
					<Text color="red" className={classes.resetText}>
						Сбросить все
					</Text>
					<img src={IconClose} alt="" className={classes.closeIcon} />
				</Flex>
			</Group>

			<Stack spacing={15} mt={22}>
				<FormGroup title="Отрасль">
					<Controller
						name="catalogues"
						render={({ field }) => (
							<Select
								data={handledFields}
								{...field}
								size="md"
								placeholder="Выберите отрасль"
								rightSection={<img src={IconChevronDown} alt="" />}
								styles={{ rightSection: { pointerEvents: 'none' } }}
							/>
						)}
						control={control}
					/>
				</FormGroup>

				<FormGroup title="Оклад">
					<Controller
						name="payment_from"
						render={({ field, fieldState }) => (
							<NumberInput
								size="md"
								placeholder="От"
								error={fieldState.error ? fieldState.error.message : undefined}
								{...field}
								className={classes.numberInput}
								step={PAYMENT_STEP}
							/>
						)}
						control={control}
					/>

					<Controller
						name="payment_to"
						render={({ field, fieldState }) => (
							<NumberInput
								size="md"
								placeholder="До"
								error={fieldState.error ? fieldState.error.message : undefined}
								{...field}
								className={classes.numberInput}
								step={PAYMENT_STEP}
							/>
						)}
						control={control}
					/>
				</FormGroup>
			</Stack>
			<Button mt={20} fullWidth size="md" type="submit">
				Применить
			</Button>
		</Paper>
	);
};

export default FilterDesktop;
