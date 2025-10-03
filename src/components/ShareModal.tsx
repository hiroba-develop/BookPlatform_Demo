import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareToX: () => void;
  onShareToFacebook: () => void;
  onShareLater: () => void;
  bookTitle: string;
  bookAuthor: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShareToX,
  onShareToFacebook,
  onShareLater,
  bookTitle,
  bookAuthor
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">読書をシェア</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">{bookTitle}</h3>
            <p className="text-sm text-gray-600">著者: {bookAuthor}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onShareToX}
            className="w-full flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Xへシェア
          </button>
          
          <button
            onClick={onShareToFacebook}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Facebookへシェア
          </button>
          
          <button
            onClick={onShareLater}
            className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            後でシェア
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;