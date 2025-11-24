// src/components/Modal.tsx
import React from "react";

export const Modal: React.FC<{open:boolean,onClose:()=>void,title?:string,children?:any}> = ({open,onClose,title,children}) => {
  if (!open) return null;
  return (
    <div className="sg-modal-backdrop" onClick={onClose}>
      <div className="sg-modal" onClick={e=>e.stopPropagation()}>
        <div className="sg-modal__header">
          <strong>{title||"Modal"}</strong>
          <button className="sg-btn" onClick={onClose}>✖</button>
        </div>
        <div className="sg-modal__body">{children}</div>
      </div>
    </div>
  );
};
