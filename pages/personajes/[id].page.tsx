import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import CardCharacter, { PropsCharacterCard } from 'dh-marvel/components/characters/CardCharacter';
import ErrorPage from 'dh-marvel/components/error/ErrorMessage';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { getCharacter } from 'dh-marvel/services/marvel/marvel.service';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';


interface PropsCharacter {
    character: PropsCharacterCard;
}
const CharacterDetails: NextPage<PropsCharacter & { error?: string }> = ({ character, error }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} color='primary'><CircularProgress /></Box>
    };

    if (!character || Object.keys(character).length === 0) {
        return <ErrorPage />;
    };

    return (    
        <LayoutGeneral title={''} description={''} >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Box sx={{ margin: '1rem', width: '400' }}>
                    <CardCharacter
                        name={character?.name}
                        description={character?.description}
                        thumbnail={character.thumbnail}
                        id={character?.id} 
                    />                
                </Box >
            </Box>
        </LayoutGeneral>
    );
};

export const getServerSideProps: GetServerSideProps= async ({ params }) => {
    try {
        const id = parseInt(params?.id as string);
        const character = await getCharacter(id);

        if (!character) {
            return {
                props: {
                    error: 'Character not found.'
                },
            };
        }

        return {
            props: {
                character
            },
        };
    } catch (error) {
        return {
            props: {
                error: 'Error fetching character data.'
            },
        };
    }
};

export default CharacterDetails;