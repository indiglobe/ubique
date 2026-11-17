"use client";

import * as React from "react";
import { cn } from "@repo/styles/cn";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";
import { Button, buttonVariants } from "@/components/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "default",
  buttonAppearance = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  buttonAppearance?: React.ComponentProps<typeof Button>["appearance"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      className={cn(
        "group/calendar w-fit rounded-2xl border border-primary-100 bg-background p-3 text-foreground",
        "shadow-sm shadow-primary-950/5",
        "[--cell-radius:var(--radius-lg)] [--cell-size:--spacing(9)]",
        "in-data-[slot=card-content]:border-0 in-data-[slot=card-content]:bg-transparent in-data-[slot=card-content]:shadow-none",
        "in-data-[slot=popover-content]:border-0 in-data-[slot=popover-content]:bg-transparent in-data-[slot=popover-content]:shadow-none",
        "dark:border-primary-900/70 dark:shadow-black/10",
        className,
      )}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),

        months: cn(
          "relative flex flex-col gap-6 sm:flex-row",
          defaultClassNames.months,
        ),

        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),

        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),

        button_previous: cn(
          buttonVariants({
            variant: buttonVariant,
            appearance: buttonAppearance,
            size: "icon",
          }),
          "size-8 rounded-lg border border-primary-100 text-foreground/70",
          "hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
          "disabled:pointer-events-none disabled:opacity-30",
          "dark:border-primary-900 dark:hover:bg-primary-950 dark:hover:text-primary-200",
          defaultClassNames.button_previous,
        ),

        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "size-8 rounded-lg border border-primary-100 text-foreground/70",
          "hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
          "disabled:pointer-events-none disabled:opacity-30",
          "dark:border-primary-900 dark:hover:bg-primary-950 dark:hover:text-primary-200",
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          "flex h-9 w-full items-center justify-center px-10",
          defaultClassNames.month_caption,
        ),

        dropdowns: cn(
          "flex h-9 w-full items-center justify-center gap-2 text-sm font-semibold",
          defaultClassNames.dropdowns,
        ),

        dropdown_root: cn(
          "relative rounded-lg border border-primary-200/70 bg-primary-50/60 px-2 py-1",
          "text-foreground transition-colors",
          "hover:border-primary-300 dark:border-primary-900 dark:bg-primary-950/50",
          defaultClassNames.dropdown_root,
        ),

        dropdown: cn(
          "absolute inset-0 cursor-pointer opacity-0",
          defaultClassNames.dropdown,
        ),

        caption_label: cn(
          "font-brand-secondary text-sm font-semibold tracking-tight text-foreground",
          captionLayout === "label"
            ? "select-none"
            : "flex items-center gap-1 rounded-lg [&>svg]:size-3.5 [&>svg]:text-primary-500",
          defaultClassNames.caption_label,
        ),

        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),

        weekdays: cn(
          "flex border-b border-primary-100 pb-2 dark:border-primary-900/70",
          defaultClassNames.weekdays,
        ),

        weekday: cn(
          "flex-1 text-center font-brand-secondary text-[0.7rem] font-semibold uppercase tracking-wider text-foreground/45 select-none",
          defaultClassNames.weekday,
        ),

        week: cn("mt-1.5 flex w-full", defaultClassNames.week),

        week_number_header: cn(
          "w-(--cell-size) text-[0.7rem] font-medium text-foreground/40 select-none",
          defaultClassNames.week_number_header,
        ),

        week_number: cn(
          "text-xs text-foreground/40 select-none",
          defaultClassNames.week_number,
        ),

        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none",
          "[&:last-child[data-selected=true]_button]:rounded-r-lg",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-lg"
            : "[&:first-child[data-selected=true]_button]:rounded-l-lg",
          defaultClassNames.day,
        ),

        range_start: cn(
          "relative isolate z-0 rounded-l-lg bg-primary-100 dark:bg-primary-950/80",
          defaultClassNames.range_start,
        ),

        range_middle: cn(
          "rounded-none bg-primary-50 dark:bg-primary-950/40",
          defaultClassNames.range_middle,
        ),

        range_end: cn(
          "relative isolate z-0 rounded-r-lg bg-primary-100 dark:bg-primary-950/80",
          defaultClassNames.range_end,
        ),

        today: cn(
          "rounded-lg bg-secondary-100/70 text-secondary-800",
          "dark:bg-secondary-950/50 dark:text-secondary-200",
          "data-[selected=true]:rounded-none data-[selected=true]:bg-primary-600 data-[selected=true]:text-white",
          defaultClassNames.today,
        ),

        outside: cn(
          "text-foreground/25 aria-selected:text-foreground/30",
          defaultClassNames.outside,
        ),

        disabled: cn(
          "pointer-events-none text-foreground/20 opacity-50",
          defaultClassNames.disabled,
        ),

        hidden: cn("invisible", defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),

        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },

        DayButton: (props) => <CalendarDayButton locale={locale} {...props} />,

        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center text-xs text-foreground/40">
              {children}
            </div>
          </td>
        ),

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  const isSingleSelected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;

  return (
    <Button
      ref={ref}
      variant="primary"
      appearance="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={isSingleSelected}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative z-10 flex aspect-square size-auto w-full min-w-(--cell-size)",
        "items-center justify-center rounded-lg border-0 p-0",
        "font-brand-primary text-[0.8rem] font-medium tabular-nums",
        "text-foreground/80 transition-all duration-150",
        "hover:bg-primary-100 hover:text-primary-800",
        "focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-primary-500/40",
        "dark:text-foreground/80 dark:hover:bg-primary-900/60 dark:hover:text-primary-200",
        "data-[selected-single=true]:bg-primary-600 data-[selected-single=true]:text-white",
        "data-[selected-single=true]:shadow-sm data-[selected-single=true]:shadow-primary-600/20",
        "data-[range-start=true]:rounded-l-lg data-[range-start=true]:bg-primary-600 data-[range-start=true]:text-white",
        "data-[range-end=true]:rounded-r-lg data-[range-end=true]:bg-primary-600 data-[range-end=true]:text-white",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-primary-100 data-[range-middle=true]:text-primary-800",
        "dark:data-[range-middle=true]:bg-primary-900/70 dark:data-[range-middle=true]:text-primary-200",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-20",
        "[&>span]:text-[0.6rem] [&>span]:font-normal [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
