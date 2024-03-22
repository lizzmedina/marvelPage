
import { CardComic } from "dh-marvel/components/comics/CardComic";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { IComic, Result } from "interface/comics";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface ComicProps {
    comic: IComic;
}
const ComicPage: NextPage<ComicProps> = ({ comic })=> {

        return (
            <LayoutGeneral title={`Comic ${comic.title}`} description="">
                <CardComic comic={comic}/>
            </LayoutGeneral>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const apiComics = await getComics();

    const paths = apiComics.data.results.map((comic: Result) => ({
        params: { id: String(comic.id) },
    }));
    return {
        paths,
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id;
    
    try {
        const comic = await getComic(Number(id));
        return {
            props: {
            comic,
            },
        };
    } catch (error) {
        console.error("No se encontro el comic", error);
        return {
            props: {
            comic: {},
            },
        };
    }
};
export default ComicPage;

