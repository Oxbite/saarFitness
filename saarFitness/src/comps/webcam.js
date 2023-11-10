import { Button } from "@mui/material"
import { Box } from "mdi-material-ui"
import { useRef } from "react"
import {Webcam} from "react-webcam"


export default function Cam({height= 200, width= 200 }) {
  const webref = useRef(null);
  return (
    <Box>
    <Webcam height= {height} width={width} ref={webref} />
    <Button />
    </Box>
  )
}

