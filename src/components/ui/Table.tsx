import React from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <table
      className={twMerge(
        "w-full border-collapse border border-0 border-t-[2px] border-solid border-table-border border-t-[#344563] text-[14px] leading-[24px] text-font-default",
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
};

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader = ({ children, ...props }: TableHeadProps) => {
  return <thead {...props}>{children}</thead>;
};

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode;
  rowSpan?: number;
  colSpan?: number;
}

export const TableHead = ({
  children,
  className,
  rowSpan,
  colSpan,
  ...props
}: TableHeaderProps) => {
  const content = children === "" || children === null ? undefined : children;

  return (
    <th
      scope="col"
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={twMerge(
        "border-b border-table-border bg-membership-bigBg px-4 py-2 text-[#172B4D]",
        className
      )}
      {...props}
    >
      {content}
    </th>
  );
};

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  rowSpan?: number;
  colSpan?: number;
  width?: string;
}

export const TableCell = ({
  children,
  className,
  rowSpan,
  colSpan,
  width,
  ...props
}: TableCellProps) => {
  const content = children === "" || children === null ? undefined : children;

  return (
    <td
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={twMerge(
        `border-b border-table-border px-4 py-2 [&:not(:first-child)]:border-l [&:not(:last-child)]:border-r ${
          width ? `max-w-[${width}]` : ""
        }`,
        className
      )}
      {...props}
    >
      {content}
    </td>
  );
};

interface TableCaptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const TableCaption = ({ children, className, ...props }: TableCaptionProps) => {
  return (
    <caption className={twMerge("sr-only", className)} {...props}>
      {children}
    </caption>
  );
};

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = ({ children, ...props }: TableBodyProps) => {
  return <tbody {...props}>{children}</tbody>;
};

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr className={twMerge("", className)} {...props}>
      {children}
    </tr>
  );
};

export default Table;
