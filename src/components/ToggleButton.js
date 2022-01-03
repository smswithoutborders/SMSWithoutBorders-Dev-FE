import React from "react";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";

const IconButton = styled.span.attrs({
    className: "absolute top-3 right-3 flex items-center  cursor-pointer"
})``;

export const ToggleButton = (props) => {
    return (
        <IconButton onClick={() => props.toggleFunc(!props.value)}>
            {props.value ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </IconButton>
    )
}
