import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCaretDown, 
    faCaretRight 
} from '@fortawesome/free-solid-svg-icons';

type Props = {
    size: any;
    style: any;
  };

export const CaretDown: React.FC<Props> = (props) => {
    return (
        <FontAwesomeIcon icon={faCaretDown} style={props.style} size={props.size} />
    )
}

export const CaretRight: React.FC<Props> = (props) => {
    return (
        <FontAwesomeIcon icon={faCaretRight} style={props.style} size={props.size} />
    )
}