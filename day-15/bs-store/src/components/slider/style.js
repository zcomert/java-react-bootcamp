import { colors, Typography } from "@mui/material";
import { styled, Box } from "@mui/system"


export const SliderContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    overflow: 'hidden',
    backgroundColor: '#212121'
}));

export const MessageText = styled(Typography)(() => ({
    fontFamily:"-moz-initial",
    fontStyle:"italic",
    color: "CaptionText",
    fontSize: '1.5rem',
    color: '#efebe9'
}))