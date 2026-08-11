import React, { useState } from 'react';
import { Key, ShieldCheck, X, Check, Trash2, Zap } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, setApiKey, t }) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(tempKey.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleRemove = () => {
    setApiKey('');
    setTempKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Key className="w-5 h-5 text-makkah-gold-500" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-makkah-navy-800">
              {t.modal.title}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              OpenAI GPT-4o / GPT-4o-mini Integration
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {t.modal.desc}
        </p>

        {/* Status Indicator */}
        <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
          apiKey
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          <Zap className={`w-4 h-4 ${apiKey ? 'text-emerald-500' : 'text-amber-500'}`} />
          <span>{apiKey ? t.modal.statusActive : t.modal.statusInactive}</span>
        </div>

        {/* Key Input Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              {t.modal.inputLabel}
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="sk-proj-..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-xs font-mono focus:border-makkah-emerald-500 focus:ring-2 focus:ring-makkah-emerald-200 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-makkah-emerald-500 hover:bg-makkah-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>{t.modal.saveBtn}</span>
              )}
            </button>

            {apiKey && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
                title={t.modal.removeBtn}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
