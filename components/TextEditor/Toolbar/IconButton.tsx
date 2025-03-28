import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ToolbarIconButtonProps extends ButtonProps {
  isActive: boolean;
  children: React.ReactNode;
}
export const ToolbarIconButton = ({
  isActive,
  children,
  onClick,
  ...props
}: ToolbarIconButtonProps) => {
  return (
    <Button
      type="button"
      className={cn(
        'p-0 h-6 w-7 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400',
        isActive ? 'bg-slate-200 dark:bg-slate-700' : 'bg-transparent'
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
