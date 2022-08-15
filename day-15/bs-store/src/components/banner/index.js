import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerTitle } from "./styles";


export default function Banner() {
    // const theme = useTheme();

    return(
        <BannerContainer>
            <BannerImage src="/banner/banner.jpg"></BannerImage>
            <BannerContent>
                <Typography variant='h6'>HUGE COLLECTION</Typography>
                <BannerTitle variant='h2'>NEW BOOKS</BannerTitle>

                <BannerDescription variant='subtitle'>
                Lorem ipsum dolor sit amet. Eum enim atque a laudantium nobis non 
                dolores porro et libero corporis ea quia numquam.
                </BannerDescription>
            </BannerContent>
        </BannerContainer>
    )
}