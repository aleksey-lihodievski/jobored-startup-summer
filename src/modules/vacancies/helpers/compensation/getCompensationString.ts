export const getCompensationString = (from?: number, to?: number) => {
	if (from && to) return `з/п ${from} - ${to} rub`;
	if (from && !to) return `з/п от ${from} rub`;
	if (!from && to) return `з/п до ${to} rub`;

	return 'з/п не указана';
};
