interface FrameCornerProps {
    className: string;
}

const FrameCorner = ({ className }: FrameCornerProps) => {
    return (
        // <svg className={className} width="84" height="85" viewBox="0 0 84 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <line x1="0.5" y1="1" x2="0.5" y2="85" stroke="currentColor"/>
        //     <line y1="0.5" x2="84" y2="0.5" stroke="currentColor"/>
        // </svg>
        <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="4.3711e-08" x2="0.999998" y2="40" stroke="currentColor" strokeWidth="2"/>
            <line y1="1" x2="40" y2="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
    )
}

export default FrameCorner;