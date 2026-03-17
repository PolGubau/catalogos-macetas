import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import type { ReactNode } from 'react';

interface DrawerRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
}

function DrawerRoot({ open, onOpenChange, children, swipeDirection = 'down' }: DrawerRootProps) {
  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange} swipeDirection={swipeDirection}>
      {children}
    </BaseDrawer.Root>
  );
}

function DrawerPortal({ children }: { children: ReactNode }) {
  return <BaseDrawer.Portal>{children}</BaseDrawer.Portal>;
}

function DrawerBackdrop() {
  return (
    <BaseDrawer.Backdrop className="[--backdrop-opacity:0.5] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] z-[9998]" />
  );
}

interface DrawerContentProps {
  children: ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  showHandle?: boolean;
}

function DrawerContent({ children, position = 'bottom', showHandle = true }: DrawerContentProps) {
  const positionClasses = {
    bottom: 'fixed bottom-0 left-0 right-0 rounded-t-2xl border-t [transform:translateY(var(--drawer-swipe-movement-y))] data-ending-style:[transform:translateY(calc(100%-var(--bleed)))] data-starting-style:[transform:translateY(calc(100%-var(--bleed)))]',
    top: 'fixed top-0 left-0 right-0 rounded-b-2xl border-b [transform:translateY(var(--drawer-swipe-movement-y))] data-ending-style:[transform:translateY(calc(-100%+var(--bleed)))] data-starting-style:[transform:translateY(calc(-100%+var(--bleed)))]',
    left: 'fixed top-0 left-0 bottom-0 rounded-r-2xl border-r [transform:translateX(var(--drawer-swipe-movement-x))] data-ending-style:[transform:translateX(calc(-100%+var(--bleed)))] data-starting-style:[transform:translateX(calc(-100%+var(--bleed)))]',
    right: 'fixed top-0 right-0 bottom-0 rounded-l-2xl border-l [transform:translateX(var(--drawer-swipe-movement-x))] data-ending-style:[transform:translateX(calc(100%-var(--bleed)))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)))]',
  };

  return (
    <BaseDrawer.Popup
      className={`
        [--bleed:3rem]
        ${positionClasses[position]}
        z-[9999]
        bg-background
        border-border
        shadow-2xl
        max-h-[85vh]
        flex
        flex-col
        overflow-y-auto
        overscroll-contain
        touch-auto
        transition-transform
        duration-450
        ease-[cubic-bezier(0.32,0.72,0,1)]
        data-swiping:select-none
        data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]
      `.replace(/\s+/g, ' ').trim()}
    >
      {showHandle && (position === 'bottom' || position === 'top') && (
        <div className={`flex justify-center ${position === 'bottom' ? 'pt-4 pb-2' : 'pb-4 pt-2'}`}>
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
        </div>
      )}
      {children}
    </BaseDrawer.Popup>
  );
}

function DrawerHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      {children}
    </div>
  );
}

function DrawerTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-foreground">
      {children}
    </h2>
  );
}

function DrawerDescription({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground">
      {children}
    </p>
  );
}

function DrawerBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      {children}
    </div>
  );
}

function DrawerClose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <BaseDrawer.Close className={`p-2 rounded-lg hover:bg-muted transition-colors ${className}`.trim()}>
      {children}
    </BaseDrawer.Close>
  );
}

export const Drawer = {
  Root: DrawerRoot,
  Portal: DrawerPortal,
  Backdrop: DrawerBackdrop,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Close: DrawerClose,
};

