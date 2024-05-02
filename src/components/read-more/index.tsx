"use client";

import React from "react";

type Props = {
  content: string;
};

export const ReadMore: React.FC<Props> = ({ content }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    // Check if content exceeds three lines and set expanded state accordingly
    console.log("contentRef.current", contentRef.current);
    if (contentRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight
      );
      const contentHeight = contentRef.current.clientHeight;
      const maxHeight = lineHeight * 3; // Limit to three lines
      setExpanded(contentHeight <= maxHeight);
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative mt-4">
      <div
        className={`overflow-hidden transition-height duration-300 ease-in-out`}
        style={{ maxHeight: expanded ? `${contentHeight}px` : "3rem" }}
      >
        <div
          ref={contentRef}
          className="leading-normal text-slate-500"
          aria-label="Content Description"
        >
          {content}
        </div>
      </div>
      {!expanded && (
        <button
          className="absolute top-15 left-0 bg-white text-slate-400 px-2 py-1"
          onClick={toggleExpanded}
        >
          ...more
        </button>
      )}
    </div>
  );
};
