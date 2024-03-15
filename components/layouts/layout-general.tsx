import * as React from 'react';
import {FC, PropsWithChildren} from "react";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import GeneralHeader from "dh-marvel/components/layouts/header/general-header.component";
import GeneralFooter from "dh-marvel/components/layouts/footer/general-footer.component";
import Head from 'next/head';

interface LayautProps {
    title: string;
    description: string;
    keywords?: string;
    children: React.ReactNode;
}

const LayoutGeneral: FC<LayautProps> = ({children, title, description, keywords}) => {

    return (<>
            <Stack direction={"column"} height={'100%'}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="viewport" content="width-device-width, initial-scale=1.0"/>
                <link rel="shortcut icon" href="/Marvel_Logo.svg" type="image/x-icon"/>
            </Head>
                <GeneralHeader />
                <Box component='main' display={'flex'} flexGrow={1} justifyContent={'center'}>
                    {children}
                </Box>
                <GeneralFooter />
            </Stack>
        </>
    );
};
export default LayoutGeneral;
