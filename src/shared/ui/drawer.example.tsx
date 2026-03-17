/**
 * Drawer Component - Usage Examples
 * 
 * A reusable drawer component with smooth animations and swipe-to-dismiss gestures.
 * Built on top of Base UI's Drawer component.
 */

import { useState } from 'react';
import { Drawer } from './drawer';

// Example 1: Basic Bottom Drawer (default)
export function BasicDrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Content position="bottom" showHandle>
            <Drawer.Header>
              <div>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.Description>This is a description</Drawer.Description>
              </div>
              <Drawer.Close>
                <span>✕</span>
              </Drawer.Close>
            </Drawer.Header>

            <Drawer.Body>
              <p>Your content goes here...</p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Example 2: Right Side Drawer
export function RightDrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Right Drawer</button>

      <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Content position="right" showHandle={false}>
            <Drawer.Header>
              <Drawer.Title>Side Menu</Drawer.Title>
              <Drawer.Close>✕</Drawer.Close>
            </Drawer.Header>

            <Drawer.Body>
              <nav>
                <ul>
                  <li>Menu Item 1</li>
                  <li>Menu Item 2</li>
                  <li>Menu Item 3</li>
                </ul>
              </nav>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Example 3: Left Side Drawer
export function LeftDrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Left Drawer</button>

      <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="left">
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Content position="left" showHandle={false}>
            <Drawer.Header>
              <Drawer.Title>Navigation</Drawer.Title>
              <Drawer.Close>✕</Drawer.Close>
            </Drawer.Header>

            <Drawer.Body>
              <p>Navigation content...</p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Example 4: Top Drawer
export function TopDrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Top Drawer</button>

      <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="up">
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Content position="top" showHandle>
            <Drawer.Header>
              <Drawer.Title>Notifications</Drawer.Title>
              <Drawer.Close>✕</Drawer.Close>
            </Drawer.Header>

            <Drawer.Body>
              <p>Notification content...</p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

/**
 * Props Reference:
 * 
 * Drawer.Root:
 *   - open: boolean - Controls drawer visibility
 *   - onOpenChange: (open: boolean) => void - Callback when drawer state changes
 *   - swipeDirection?: 'up' | 'down' | 'left' | 'right' - Direction to swipe to dismiss (default: 'down')
 * 
 * Drawer.Content:
 *   - position?: 'bottom' | 'top' | 'left' | 'right' - Position of the drawer (default: 'bottom')
 *   - showHandle?: boolean - Show drag handle (default: true)
 * 
 * Drawer.Header, Drawer.Title, Drawer.Description, Drawer.Body, Drawer.Close:
 *   - children: ReactNode - Content to render
 * 
 * Drawer.Close:
 *   - className?: string - Additional CSS classes
 */

