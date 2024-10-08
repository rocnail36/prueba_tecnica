"use client"
import React, { LegacyRef, ReactNode, useContext, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { LanguageContext } from '@/app/dictionaries/LanguageProvider';

const GeneratePdf = ({children,imgSize}:{children:ReactNode,imgSize:[number,number,number,number]}) => {
    const ref = useRef<HTMLDivElement>(null);
    const  {d} = useContext(LanguageContext)
    const generarPDF = async () => {
        const doc = new jsPDF();
        const imgData = await toPng(ref.current!,{height:1200,width: 1200,quality:1});
        doc.addImage(imgData, 'PNG', ...imgSize);
        doc.save('tablas.pdf');
        
    };

    return (
        <div className='py-4 overflow-y-scroll  h-[700px] min-w-[500px]'>
            <button onClick={generarPDF} className='ml-4'>{d?.pdf.button}</button>
            <div className='px-8 py-8' ref={ref}>
               {children}
            </div>
        </div>
    );
};

export default GeneratePdf;