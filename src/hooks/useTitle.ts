import { useEffect } from 'react';

/**
 * Custom hook to set the document title with a prefix
 * @param title - The page-specific part of the title
 * @param prefix - Optional prefix for the title, defaults to "HandReceipt Civilian |"
 */
export const useTitle = (title: string, prefix = 'HandReceipt Civilian | '): void => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${prefix}${title}`;

    return () => {
      document.title = previousTitle;
    };
  }, [title, prefix]);
}; 