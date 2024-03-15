import { FaqsType } from "dh-marvel/components/faqs/faqsData";

export const getFaqs = async () => {
    try {
        const response = await fetch('https://ctd-esp-fe3-final-eta-one.vercel.app/api/preguntas-frecuentes');
        if (!response.ok) {
            throw new Error('La solicitud de FAQs no fue exitosa');
        }
        const data: FaqsType[] = await response.json();
        console.log('data from getFaqs', data);        
        return data;
    } catch (error) {
        console.error('Error en el fetch de getFaqs:', error);
        throw new Error('Ocurrió un error al obtener los FAQs');
    }
};


         // cambiar ruta antes de hacer push para la construcción de vercel:
		                                            //http://localhost:3000/api/preguntas-frecuentes