import { forwardRef, useEffect, useCallback } from "react";

export const AutoResizeTextarea = forwardRef(function AutoResizeTextarea(
  { value, onChange, onKeyDown, onBlur, className = "", placeholder, ...props },
  ref,
) {
  const adjustHeight = useCallback(() => {
    if (!ref.current) return;

    ref.current.style.height = "auto";

   
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [ref]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e) => {
    onChange?.(e);
    adjustHeight();
  };

  return (
    <textarea
      ref={ref}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      rows={1}
      {...props}
      className={`overflow-hidden resize-none bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
    />
  );
});
