import { FaqsType } from "dh-marvel/components/faqs/faqsData";

export const getFaqs = async () => {
    const urlVercel = `https://ctd-esp-fe3-final-eta-one.vercel.app`
    /*const urlLocal = `http://localhost:3000`*/
    try {
        const response = await fetch(`${urlVercel}/api/preguntas-frecuentes`);
        if (!response.ok) {
            throw new Error('La solicitud de FAQs no fue exitosa');
        }
        const data: FaqsType[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el fetch de getFaqs:', error);
        throw new Error('Ocurrió un error al obtener los FAQs');
    }
};