import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { MessageText, SliderContainer } from "./style";


const messages = [
    "Free Shipping on Orders Over 250TL!",
    "Book Week Sale Starts NOW!",
    "%20 off on your first order!",
];

export default function Sliders() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setShow(false)
        },3000)

        const intervalId = setInterval(() => {
            setMessageIndex((i) => (i+1)%messages.length)

            setShow(true);

            setTimeout(() => {
                setShow(false)
            },3000)
        },4000);

        return () => {
            clearInterval(intervalId);
        }
    },[])

    return (
        <SliderContainer>
            <Slide direction={show ? "left": "right"} in={show}
                timeout = {{
                    enter:500,
                    exit:100
                }}
            >

            <Box display={"flex"} justifyContent="center" alignItems={"center"}> 
                <MessageText>
                    {messages[messageIndex]}
                </MessageText>
            </Box>
            </Slide>
        </SliderContainer>
    )
}