// GlobalModal.js
import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import closePng from "@/assets/imgs/close.png";

const GlobalModal = ({ isOpen, onClose, children, haveClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="global-modal-overlay">
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
        <div className="global-modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
        {
          haveClose && (
            <div className="global-modal-close-button" onClick={onClose}>
              <img src={closePng} />关闭
            </div>
          )
        }
      </div>
    </div>,
    document.getElementById('root') // 将模态组件挂载到根元素上
  );
};

export default memo(GlobalModal);
