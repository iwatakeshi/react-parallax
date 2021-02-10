import React, { HTMLAttributes, ReactNode } from 'react';
import './style.css';

type ElementProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  children?: ReactNode;
};

export default function Element({ children, name, ...props }: ElementProps) {
  return (
    <div className="element" {...props}>
      <div className="element__inner absolute left-0 top-0 w-full h-full flex items-center justify-center">
        <div className="element__inner__box">{name}</div>
        {children}
      </div>
    </div>
  );
}
