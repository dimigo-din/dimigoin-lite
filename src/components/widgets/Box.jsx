'use client';

import React, { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

export default function Box({ title, description, children, isExpandable = true, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-spacing-400 p-spacing-400 w-full bg-components-fill-standard-primary border border-line-outline rounded-radius-600">
      <div
        onClick={toggleExpand}
        onKeyDown={(e) => {
          if (isExpandable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggleExpand();
          }
        }}
        role={isExpandable ? 'button' : undefined}
        tabIndex={isExpandable ? 0 : undefined}
        className={`w-full flex flex-row justify-between items-center ${isExpandable ? 'cursor-pointer' : ''}`}>
        <div className="flex flex-col justify-start items-start gap-spacing-100">
          <strong className="text-label text-content-standard-primary">{title}</strong>
          <span className="text-footnote text-content-standard-tertiary">{description}</span>
        </div>
        {isExpandable && (
          <MaterialSymbol
            icon={isExpanded ? 'arrow_drop_up' : 'arrow_drop_down'}
            size={24}
            weight={300}
            className="text-content-standard-tertiary"
          />
        )}
      </div>
      {(!isExpandable || isExpanded) && (
        <div className="w-full flex flex-col items-start justify-start md:px-spacing-500 md:py-spacing-200">
          {children}
        </div>
      )}
    </div>
  );
}
