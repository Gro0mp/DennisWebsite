import React from 'react';
import {RevealOnScroll} from "../RevealOnScroll.jsx";

export const Footer = () => {
    return (
        <section id="footer" className="w-full bg-black bg-opacity-70 text-gray-300 text-center py-2">
            <RevealOnScroll>
                <div className={`max-w-3xl mx-auto px-4`}>
                    <h2>
                        © {new Date().getFullYear()} Dennis Wong. All rights reserved.
                    </h2>
                    <h2>
                        Model from: https://codesandbox.io/p/sandbox/ykfpwf
                    </h2>
                    <h2 className={`text-3xl font-bold mb-8 bg-clip-text text-transparent text-center`}>
                    </h2>
                </div>
            </RevealOnScroll>
        </section>
    );
};