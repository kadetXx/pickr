import React, { HTMLAttributes, useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { StyledOverlay, Backdrop, Handle, HandleBar } from "./Overlay.module";

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  onClose?: () => void;
}

const MOBILE_BREAKPOINT = 600;
const DISMISS_THRESHOLD = 100;

export const Overlay: React.FC<OverlayProps> = ({ children, visible, onClose }) => {
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updatePos = () => {
      const parent = anchorRef.current?.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      setPos({
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + window.scrollX,
      });
    };

    updatePos();

    if (visible) {
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("resize", updatePos);
      };
    }
  }, [visible, isMobile]);

  // Lock body scroll on mobile when visible
  useEffect(() => {
    if (isMobile && visible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, visible]);

  // Reset drag offset when opening
  useEffect(() => {
    if (visible) setDragOffset(0);
  }, [visible]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    // Only allow dragging downward
    setDragOffset(Math.max(0, delta));
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (dragOffset > DISMISS_THRESHOLD) {
      onClose?.();
    }
    setDragOffset(0);
  }, [dragOffset, onClose]);

  return (
    <>
      <div ref={anchorRef} style={{ display: "none" }} />
      {ReactDOM.createPortal(
        isMobile ? (
          <>
            <Backdrop
              visible={visible}
              data-pickr-overlay
            />
            <StyledOverlay
              visible={visible}
              data-pickr-overlay
              mobile
              style={{
                transform: visible
                  ? `translateY(${dragOffset}px)`
                  : "translateY(100%)",
                transition: isDragging ? "none" : undefined,
              }}
            >
              <HandleBar
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Handle />
              </HandleBar>
              {children}
            </StyledOverlay>
          </>
        ) : (
          <StyledOverlay
            visible={visible}
            data-pickr-overlay
            style={{ top: pos.top, left: pos.left }}
          >
            {children}
          </StyledOverlay>
        ),
        document.body
      )}
    </>
  );
};
