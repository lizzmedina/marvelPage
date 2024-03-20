import type { GetServerSideProps, NextPage } from 'next';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { CardHomeProps } from 'dh-marvel/components/home/CardHome';
import { Comics, Result } from 'interface/comics';
import PaginationComponent from 'dh-marvel/components/home/Pagination';
import GridCardsForHome from 'dh-marvel/components/home/GridCardsForHome';

interface IndexProps {
    marvelCards: CardHomeProps[];
    comics: Comics;
};

const itemsPerPage = 12;

const HomePage: NextPage<IndexProps> = ({ marvelCards, comics }) => {
    console.log('from home ', comics);
    
    return (
        <LayoutGeneral title='homePage marvel comics' description='pagina principal marvel comics' keywords='home'>
            <BodySingle title='Marvel Comics'>
                <GridCardsForHome comics={marvelCards} />
                <PaginationComponent totalItems={comics.data.total} itemsPerPage={itemsPerPage} />
            </BodySingle>
        </LayoutGeneral>
    );
};

export const getServerSideProps: GetServerSideProps<IndexProps>  = async ({ res, query }) => {
    
    const page = Number(query.page ?? 1);
    const offset = (page - 1) * itemsPerPage;
    const comics = await getComics(offset, itemsPerPage);

    res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate");

    const marvelCards: CardHomeProps[] = comics.data.results.map((item: Result) => ({
        id: item.id,
        title: item.title,
        image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
    }));

    return {
        props: {
            marvelCards,
            comics,
        },
    };
};

export default HomePage;