import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const BannerContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0px 0px',
    backgroundColor: '#efebe9'
    
}));

export const BannerImage = styled('img')(({src}) => ({
    src: `url(${src})`,
    width: '500px'
}))

export const BannerContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxwidth: 420,
    padding: '30px'
}));

export const BannerTitle = styled(Typography)(() => ({
    lineHeight: 1.5,
    fontSize: '72px',
    marginBottom: '20px'
}));

export const BannerDescription = styled(Typography)(() => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: '3em'
}))