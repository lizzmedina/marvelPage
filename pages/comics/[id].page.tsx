import { Box, CircularProgress } from "@mui/material";
import { CardComic } from "dh-marvel/components/comics/CardComic";
import ErrorPage from "dh-marvel/components/error/ErrorMessage";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { IComic, Result } from "interface/comics";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface ComicProps {
    comic: IComic;
};

const ComicPage: NextPage<ComicProps & { error?: string }> = ({ comic, error  })=> {
    const router = useRouter();

    if (router.isFallback) {
        return <Box sx={{ display: 'flex' }} color='primary'><CircularProgress /></Box>
    };

    if (!comic || Object.keys(comic).length === 0) {
        return <ErrorPage />;
    };

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

    if (!id) {
        return {
            props: {
                comic: {},
            },
        };
    }
    
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

