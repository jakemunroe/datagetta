/*
* Creates the defensive shifting model svg based on the percentages it is given.
* 
* author: Braden Mosley
* lastEdit: 04-07-2024
*/

const percentToColor = (decimal: number) => {
    if (decimal < 0.1) {
        return '#F4B080';
    } else if (decimal < 0.2) {
        return '#F1A066';
    } else if (decimal < 0.3) {
        return '#EF904D';
    } else if (decimal < 0.4) {
        return '#ED8133';
    } else if (decimal < 0.5) {
        return '#EA711A';
    } else if (decimal < 0.6) {
        return '#E86100';
    } else if (decimal < 0.7) {
        return '#DF5100';
    } else if (decimal < 0.8) {
        return '#BF4200';
    } else if (decimal < 0.9) {
        return '#9F3400';
    } else {
        return '#802700';
    }
}

const decimalToPercent = (decimal: number) => (decimal * 100).toFixed(0).concat('%')

export default function ShiftingModel({percentages}: {percentages: number[]}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170">
            <path d="M197,69C180.9,30.36,143.46,4.78,101.94,4.01,59.05,3.22,19.66,29.06,3,69c0,0,97,97,97,97l97-97Z" fill="none" stroke="#0b2341" strokeMiterlimit="10" strokeWidth="4"/>
            
            <path d="M3,69l97,97L31.13,30.2c-4.64,3.94-10.17,9.34-15.52,16.49-6.17,8.24-10.1,16.14-12.61,22.31Z" fill={percentToColor(percentages[0])} strokeWidth="0"/>
            <path d="M31.13,30.2l68.87,135.8L74.78,6.92c-6.25,1.69-13.97,4.37-22.31,8.73-9.09,4.75-16.17,10.06-21.34,14.55Z" fill={percentToColor(percentages[1])} strokeWidth="0"/>
            <path d="M74.78,6.92l25.22,159.08L124.25,6.92c-6.16-1.47-14.06-2.78-23.28-2.91-10.54-.14-19.48,1.3-26.19,2.91Z" fill={percentToColor(percentages[2])} strokeWidth="0"/>
            <path d="M124.25,6.92l-24.25,159.08L167.9,29.23c-4.97-4.2-11.74-9.15-20.37-13.58-8.79-4.51-16.89-7.14-23.28-8.73Z" fill={percentToColor(percentages[3])} strokeWidth="0"/>
            <path d="M167.9,29.23l-67.9,136.77,97-97c-2.13-5.36-5.21-11.73-9.7-18.43-6.54-9.75-13.73-16.69-19.4-21.34Z" fill={percentToColor(percentages[4])} strokeWidth="0"/>
            
            <text transform="translate(11.99 73.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[0])}</tspan></text>
            <text transform="translate(43.99 43.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[1])}</tspan></text>
            <text transform="translate(83.99 28.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[2])}</tspan></text>
            <text transform="translate(123.99 43.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[3])}</tspan></text>
            <text transform="translate(155.99 73.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[4])}</tspan></text>
        </svg>
    );
}