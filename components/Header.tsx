import React from 'react';

interface HeaderProps {
    logoSrc: string;
    N_Premium: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isForm: boolean;
}

export const Header: React.FC<HeaderProps> = ({ logoSrc, N_Premium, onChange, isForm }) => {
    return (
        <header className="flex items-center justify-between pb-1 mb-1 border-b-2 border-slate-200">
            <div className="flex items-center w-1/3">
                {logoSrc && <img src={logoSrc} alt="Premium Logo" className="w-32 h-auto object-contain" />}
            </div>
            <div className="text-center w-1/3">
                <h1 className="text-base font-bold text-slate-800 tracking-wide">AVISO DE SINISTRO PREMIUM</h1>
            </div>
            <div className="text-center w-1/3">
                <label className="text-sm text-gray-600 uppercase" htmlFor={isForm ? 'n_premium' : undefined}>Nº do Sinistro</label>
                {isForm ? (
                    <input
                        type="text"
                        id="n_premium"
                        name="N_Premium"
                        value={N_Premium}
                        onChange={onChange}
                        className="h-5 px-1 w-full border-0 border-b border-gray-400 bg-gray-50 focus:ring-0 focus:border-blue-600 text-sm text-gray-800 text-center"
                    />
                ) : (
                    <div className="mt-1 flex justify-center">
                        <div className="bg-[#0943ED] rounded-md px-3 h-8 flex items-start justify-center">
                            <span className="font-bold text-base text-white pt-0.5">{N_Premium || 'N/A'}</span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};