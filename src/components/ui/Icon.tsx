import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
	readonly icon: IconDefinition;
	readonly className?: string;
	readonly size?: 'xs' | 'sm' | 'lg' | 'xl' | '2x' | '3x' | '4x' | '5x';
}

export function Icon({ icon, className = '', size }: IconProps) {
	return <FontAwesomeIcon icon={icon} className={className} size={size} />;
}
