import {fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import FaqsPage from 'dh-marvel/pages/preguntas-frecuentes/index.page';
jest.mock("dh-marvel/components/faqs/faqsData.ts");
jest.mock("dh-marvel/pages/api/preguntas-frecuentes/index.route.ts");
import '@testing-library/jest-dom/extend-expect';

interface Question {
    id: number;
    question: string;
    answer: string;
};

const questions: Question[] = [
    { id: 1, question: 'Question 1', answer: 'Answer 1' },
    { id: 12, question: 'Question 2', answer: 'Answer 2' },    
];

describe('Tests on FaqsPage', () => {

    test('should render FAQs correctly', async () => {
        render(<FaqsPage faqs={questions} />);
        expect(screen.getByText('Question 1')).toBeInTheDocument();
        expect(screen.getByText('Answer 2')).toBeInTheDocument();
    });   

    test('should expand accordion on click', async () => {
        render(<FaqsPage faqs={questions} />);
        
        const accordionButton = screen.getByText('Question 1');        
        fireEvent.click(accordionButton);
        
        const answerElement = screen.getByText('Answer 1');
        expect(answerElement).toBeInTheDocument();
    });   

    test('should render title when API returns empty array', async () => {
        render(<FaqsPage faqs={[]} />);
        
        const pageTitle = screen.getByText('Preguntas frecuentes (FAQs)');
        expect(pageTitle).toBeInTheDocument();
    });    

    test('should render error message when fetching FAQs fails', () => {        
            const errorMessage = 'La solicitud de FAQs no fue exitosa';
            render(<FaqsPage faqs={[]} error={new Error(errorMessage)} />);
            
            const errorElement = screen.getByText(errorMessage);
            expect(errorElement).toBeInTheDocument();
        });
    
});