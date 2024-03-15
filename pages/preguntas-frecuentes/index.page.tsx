import { FaqsType } from "dh-marvel/components/faqs/faqsData";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { GetStaticProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFaqs } from "dh-marvel/services/methods/getFaqs.service";

interface FaqsPageProps {
    faqs: FaqsType[];
};
const FaqsPage: NextPage<FaqsPageProps> = ({faqs}) => {
    
    return (
        <LayoutGeneral title='faqs page' description='some frequent questions about amiibo website.' keywords='faqs'>
            <Box sx={{ width: "80%", margin: "auto"}}>
            <Typography component='h1' variant="h2" padding={1} textAlign='center'> FAQS</Typography>            
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
            </Box>            
        </LayoutGeneral>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {        
        try {
            const faqs = await getFaqs();
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
