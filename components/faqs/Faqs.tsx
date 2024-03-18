import BodySingle from "../layouts/body/single/body-single";
import { FaqsType } from "./faqsData";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";

interface Props {
    faqs: FaqsType[]
}
export const Faqs = ({ faqs }: Props) => {
  return (
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
  )
}
