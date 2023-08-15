import React, {useEffect} from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// const triggers = ["hover","click","loop","loop-on-hover","morph","boomerang"]

function LordIconComponent(props){
    useEffect(() => {
        defineElement(lottie.loadAnimation);
    }, []);

    return (
            <lord-icon
                src={props.src}
                trigger={props.trigger ? props.trigger : "morph"}
                colors={props.colors ? props.colors : "" }
                style={props.style ? props.style : { width: '100px', height: '100px' } }
            >
            </lord-icon>
    );
};

export default LordIconComponent;
