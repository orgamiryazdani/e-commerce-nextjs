import BaseIcon from '@/app/[locale]/_components/icons/base-icon';
import { SvgIconType } from '@/app/[locale]/_components/icons/icon.types';

export default function SvgIcon(props: SvgIconType) {
  return (
    <BaseIcon {...props}>
      <path d="M12.364 12.95L17.314 8L18.728 9.414L12.364 15.778L6.00003 9.414L7.41403 8L12.364 12.95Z" />
    </BaseIcon>
  );
}
