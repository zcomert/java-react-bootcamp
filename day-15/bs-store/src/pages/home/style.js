import { colors, Typography } from "@mui/material";
import { styled, Box } from "@mui/system"


export const RightsContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    overflow: 'hidden',
    backgroundColor: '#212121'
}));

export const RightsText = styled(Typography)(() => ({
    fontFamily:"-moz-initial",
    fontStyle:"italic",
    color: "CaptionText",
    fontSize: '1rem',
    color: '#efebe9'
}))