import { FC } from 'react';

import { Icon } from '@chakra-ui/react';

import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
}

const FormattedIcon: FC<IconProps> = ({ icon }: IconProps) => (
  <Icon as={icon} />
);

export default FormattedIcon;
