"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) => {
  if (totalPages <= 1) return null;

  // 페이지 번호 범위 계산 (항상 5개씩)
  const pageNumbers = [];
  let start = 1;
  let end = totalPages;

  if (totalPages <= 5) {
    start = 1;
    end = totalPages;
  } else if (currentPage <= 3) {
    start = 1;
    end = 5;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 4;
    end = totalPages;
  } else {
    start = currentPage - 2;
    end = currentPage + 2;
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  const baseButtonStyle =
    "flex items-center justify-center px-2 py-1 min-w-8 min-h-8 rounded transition-colors duration-200";
  const activeButtonStyle = "bg-primary text-white";
  const inactiveButtonStyle = "text-gray-600 hover:bg-gray-100";
  const disabledButtonStyle = "text-gray-300 cursor-not-allowed";

  return (
    <div className={`mt-4 flex items-center justify-center gap-1 ${className}`}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`${baseButtonStyle} ${currentPage === 1 ? disabledButtonStyle : inactiveButtonStyle}`}
        aria-label="첫 페이지"
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonStyle} ${currentPage === 1 ? disabledButtonStyle : inactiveButtonStyle}`}
        aria-label="이전 페이지"
      >
        &lsaquo;
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`${baseButtonStyle} ${
            num === currentPage ? activeButtonStyle : inactiveButtonStyle
          }`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonStyle} ${
          currentPage === totalPages ? disabledButtonStyle : inactiveButtonStyle
        }`}
        aria-label="다음 페이지"
      >
        &rsaquo;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`${baseButtonStyle} ${
          currentPage === totalPages ? disabledButtonStyle : inactiveButtonStyle
        }`}
        aria-label="마지막 페이지"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
