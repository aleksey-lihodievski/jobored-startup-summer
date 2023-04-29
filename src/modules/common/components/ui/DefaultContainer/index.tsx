import { Container } from '@mantine/core';
import React from 'react';

interface DefaultContainerProps {
	className?: string;
	children: React.ReactNode;
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({
	className,
	children,
}) => {
	return (
		<Container size="xl" className={className} px="0">
			{children}
		</Container>
	);
};

export default DefaultContainer;
