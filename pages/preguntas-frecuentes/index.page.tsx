import { FaqsType } from "dh-marvel/components/faqs/faqsData";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { GetStaticProps, NextPage } from "next";
import { Box } from "@mui/material";
import { Faqs } from "dh-marvel/components/faqs/Faqs";
import { FaqsErrorFetch } from "dh-marvel/components/faqs/FaqsErrorFetch";

interface FaqsPageProps {
    faqs: FaqsType[];
    error?: Error
};
const FaqsPage: NextPage<FaqsPageProps> = ({faqs, error}) => {

    if (error instanceof Error) {
        return (
            <LayoutGeneral title='faqs page' description='some frequent questions about amiibo website.' keywords='faqs'>
                <FaqsErrorFetch error={error}/>
        </LayoutGeneral>
        );
    }
    return (
        <LayoutGeneral title='faqs page' description='some frequent questions about amiibo website.' keywords='faqs'>
            <Box sx={{ width: "80%", margin: "auto"}}>
                <Faqs faqs={faqs}/>
            </Box>            
        </LayoutGeneral>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {    
    const urlVercel = `https://ctd-esp-fe3-final-eta-one.vercel.app`    
        try {            
            const response = await fetch(`${urlVercel}/api/preguntas-frecuentes`);
            if (!response.ok) {
                throw new Error('La solicitud de FAQs no fue exitosa');
            }
            const faqs: FaqsType[] = await response.json();            
            return {
                props: {
                    faqs
                },
            }
        } catch (error) {
            console.error('Error en getStaticProps:', error);
            return {
                props: {
                    faqs: [] 
                },
            }
        }
}
export default FaqsPage;
