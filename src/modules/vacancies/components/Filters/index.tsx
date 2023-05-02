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
import { FiltersForm } from './types';
import { filterSchema } from './validation';

const PAYMENT_STEP = 50;

interface FiltersProps {
	fields?: Catalogue[];
	values?: FiltersForm;
	sticky?: boolean;
	onChange: (values: FiltersForm) => void;
	className?: string;
}

const Filters: React.FC<FiltersProps> = ({
	fields,
	values = { catalogues: '', payment_from: '', payment_to: '' },
	sticky,
	onChange,
	className,
}) => {
	const { handleSubmit, control, reset } = useForm<FiltersForm>({
		resolver: yupResolver(filterSchema),
		defaultValues: values,
	});

	const [top, setTop] = useState<number>();

	const paperRef = useRef<HTMLFormElement>(null);
	const { classes, cx } = useStyles();

	const handledFields = useMemo(
		() =>
			fields?.map((field) => ({
				label: field.title_trimmed,
				value: field.key.toString(),
			})) ?? [],
		[fields]
	);

	const onSubmit = useCallback(
		(formValues: FiltersForm) => {
			const from = formValues.payment_from
				? Number(formValues.payment_from)
				: '';

			const to = formValues.payment_to ? Number(formValues.payment_to) : '';

			onChange({
				catalogues: formValues.catalogues,
				payment_from: from,
				payment_to: to,
			});
		},
		[onChange]
	);

	const onReset = useCallback(() => {
		reset();
		onChange({ catalogues: '', payment_from: '', payment_to: '' });
	}, [onChange]);

	useEffect(() => {
		reset(values);
	}, [values]);

	useEffect(() => {
		setTop(paperRef.current?.getBoundingClientRect().top);
	}, []);

	return (
		<Paper
			ref={paperRef}
			onSubmit={handleSubmit(onSubmit)}
			component="form"
			className={cx(className, classes.filterDesktop__wrapper)}
			pos={sticky ? 'sticky' : undefined}
			top={sticky ? top : undefined}
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
								data-elem="industry-select"
								{...field}
								size="md"
								placeholder="Выберите отрасль"
								className={classes.filters__select}
								rightSection={
									<img
										src={IconChevronDown}
										alt=""
										className={classes.chevronDownIcon}
									/>
								}
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
								data-elem="salary-from-input"
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
								data-elem="salary-to-input"
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
			<Button
				mt={20}
				fullWidth
				size="md"
				type="submit"
				data-elem="search-button"
			>
				Применить
			</Button>
		</Paper>
	);
};

export default React.memo(Filters);

export * from './types';
