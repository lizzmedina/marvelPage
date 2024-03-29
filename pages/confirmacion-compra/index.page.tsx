import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { GetServerSideProps, NextPage } from "next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ConfirmationPay: NextPage<{data: string | undefined }> = ({  data }) => {

    const router = useRouter();
    const checkoutData = data ? JSON.parse(data as string) : null;

    return (
        <LayoutCheckout>
        <BodySingle title="Confirmación de compra">
            <Box
            sx={{ padding: { xs: "20px", sm: "20px" } }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            >
            <Box
                sx={{
                marginBottom: "5px",
                backgroundColor: "#43a14d",
                color: "white",
                paddingLeft: "50px",
                paddingRight: "50px",
                borderRadius: "10px",
                minHeight: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                >
                <CheckCircleIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
                ¡Qué disfrutes de tu compra!
                </Typography>
            </Box>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 300 }} image={checkoutData.order.image} />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {checkoutData.order.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Nombre y apellido: {checkoutData.name} {checkoutData.lastname}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Email: {checkoutData.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Dirección de entrega: {checkoutData.address.address1}, ciudad: {checkoutData.address.city}, estado: {checkoutData.address.state}, código postal: {checkoutData.address.zipCode}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Valor del pago: ${checkoutData.order.price}
                </Typography>
                </CardContent>
            </Card>
            </Box>
        </BodySingle>
        </LayoutCheckout>
    );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const { namecomic, data } = query;

    return {
        props: {
            data: data as string | undefined,
        },
    };
};
export default ConfirmationPay;
