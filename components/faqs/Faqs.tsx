import BodySingle from "../layouts/body/single/body-single";
import { FaqsType } from "./faqsData";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from "@mui/material";

interface Props {
    faqs: FaqsType[]
}
export const Faqs = ({ faqs }: Props) => {
    return (
        <BodySingle title="Preguntas frecuentes (FAQs)">
            {
                faqs.map((faq, index) => (
                    <Box key={faq.id} sx={{ width: "100%", margin: 'auto', marginBottom: index !== faqs.length - 1 ? '16px' : '0' , }}>
                        <Accordion >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header" 
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#d50000', 
                                        color: '#ffffff' 
                                    },
                                    backgroundColor: '#ffffff', 
                                    color: '#000000',
                                    fontWeight: 'bold',
                                }}           
                            >
                                <Typography sx={{ fontWeight: 'bold'  }}>{faq.question} </Typography>                   
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color='primary' >{faq.answer} </Typography>     
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ))
            }
        </BodySingle>    
    )
}
