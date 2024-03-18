import { FaqsType, faqsData } from "dh-marvel/components/faqs/faqsData";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { GetStaticProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

interface FaqsPageProps {
    faqs: FaqsType[];
    error?: Error
};
const FaqsPage: NextPage<FaqsPageProps> = ({faqs, error}) => {
    if (error instanceof Error) {
        return (
            <LayoutGeneral title='faqs page' description='some frequent questions about amiibo website.' keywords='faqs'>
            <Box sx={{ width: "80%", margin: "auto"}}>
            <BodySingle title="Preguntas frecuentes (FAQs)">
                <Typography component='p'>{error.message}</Typography>
            </BodySingle>    
                
            </Box>            
        </LayoutGeneral>
        );
    }
    return (
        <LayoutGeneral title='faqs page' description='some frequent questions about amiibo website.' keywords='faqs'>
            <Box sx={{ width: "80%", margin: "auto"}}>
            <BodySingle title="Preguntas frecuentes (FAQs)">
                {faqs.map((faq) => (
                    <Box key={faq.id} sx={{ width: "100%", margin: 'auto' }}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {faq.question}                       
                            </AccordionSummary>
                            <AccordionDetails>
                                {faq.answer}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
            ))}
            </BodySingle>    
                
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
