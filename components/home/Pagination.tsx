import { Box, Pagination } from '@mui/material';
import { useRouter } from 'next/router';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalItems, itemsPerPage }) => {
    const router = useRouter();

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = (page - 1) * itemsPerPage + itemsPerPage;
        router.push(`/?page=${page}`);
    };

    return (
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
            <Pagination
                count={Math.ceil(totalItems / itemsPerPage)}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                size="large"
                data-testid="pagination-component"            
            />
        </Box>
    );
};

export default PaginationComponent;