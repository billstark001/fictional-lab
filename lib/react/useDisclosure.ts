// mimics Chakra UI

import { useCallback, useState } from 'react';
import { useCallbackRef } from './useCallbackRef';

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id,
  } = props;

  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

  const onClose = useCallback(() => {
    if (isOpenProp === undefined) {
      setIsOpen(false);
    }
    handleClose?.();
  }, [handleClose, isOpenProp]);

  const onOpen = useCallback(() => {
    if (isOpenProp === undefined) {
      setIsOpen(true);
    }
    handleOpen?.();
  }, [handleOpen, isOpenProp]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled: isOpenProp !== undefined,
    getButtonProps: (props: any = {}) => ({
      ...props,
      'aria-expanded': isOpen,
      'aria-controls': id,
      onClick(event: React.MouseEvent) {
        props.onClick?.(event);
        onToggle();
      },
    }),
    getDisclosureProps: (props: any = {}) => ({
      ...props,
      id,
      hidden: !isOpen,
    }),
  };
}