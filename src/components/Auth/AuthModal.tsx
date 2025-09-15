import React from 'react';
import { X as CloseIcon, Search, Mail, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (method: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative card max-w-sm w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center relative overflow-hidden shadow-2xl border border-purple-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="text-white font-black text-xl tracking-widest transform -skew-x-6 relative z-10 drop-shadow-lg">
                W
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-cyan-300/20"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-sm"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">WEGRAM</h2>
              <p className="text-secondary text-sm">Web3 SocialFi app</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-semibold text-primary mb-6">Social signup</h3>

        <div className="space-y-3">
          <button
            onClick={() => onAuth('google')}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <Search className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            onClick={() => onAuth('twitter')}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">𝕏</div>
            Continue with X
          </button>
          <button
            onClick={() => onAuth('email')}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <Mail className="w-5 h-5" />
            Continue with Email
          </button>
          <button
            onClick={() => onAuth('phone')}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <Phone className="w-5 h-5" />
            Continue with Phone
          </button>
          
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }}></div>
            <span className="text-secondary text-sm">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }}></div>
          </div>
          
          <button
            onClick={() => onAuth('guest')}
            className="btn-secondary w-full py-4"
          >
            Continue without account
          </button>
        </div>

        <p className="text-xs text-secondary text-center mt-6">
          By continuing you agree to our Terms & Privacy
        </p>
      </div>
    </div>
  );
};