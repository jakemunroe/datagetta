/*
* Creates the defensive shifting model svg based on the percentages it is given.
* 
* author: Braden Mosley
* lastEdit: 04-14-2024
*/

// Auburn Branding Color Codes in rgb format
const NAVY_DARK    = [11, 35, 65];
const NAVY_LIGHT   = [109, 123, 141];
const ORANGE_DARK  = [204, 78, 11];
const ORANGE_LIGHT = [248, 173, 118];

// Creates a rgb color between the lightColor and darkColor based on the ratio given
function blendColors(lightColor: number[], darkColor: number[], ratio: number) {    
    let color : string[] = [];

    for (let i in lightColor) {
        color.push(((lightColor[i] * (1 - ratio)) + (darkColor[i] * ratio)).toFixed(0));
    };

    // Format: 'rgb(red, green, blue)'
    return 'rgb('.concat(color + ')');
}

// Determines the colors for each infield section
function createInfieldColors(percentages: number[]) {
    let colors : string[] = [];
    const maxPercent = Math.max(...percentages);
    
    for (let percent in percentages) {
        colors.push(blendColors(ORANGE_LIGHT, ORANGE_DARK, percentages[percent]/maxPercent));
    }

    return colors;
}

const decimalToPercent = (decimal: number) => (decimal * 100).toFixed(0).concat('%');

export default function ShiftingModel({percentages}: {percentages: number[]}) {
    const infield = createInfieldColors(percentages);
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170">
            <path d="M197,69C180.9,30.36,143.46,4.78,101.94,4.01,59.05,3.22,19.66,29.06,3,69c0,0,97,97,97,97l97-97Z" fill="none" stroke="#0b2341" strokeMiterlimit="10" strokeWidth="4"/>
            
            <path d="M3,69l97,97L31.13,30.2c-4.64,3.94-10.17,9.34-15.52,16.49-6.17,8.24-10.1,16.14-12.61,22.31Z" fill={infield[0]} strokeWidth="0"/>
            <path d="M31.13,30.2l68.87,135.8L74.78,6.92c-6.25,1.69-13.97,4.37-22.31,8.73-9.09,4.75-16.17,10.06-21.34,14.55Z" fill={infield[1]} strokeWidth="0"/>
            <path d="M74.78,6.92l25.22,159.08L124.25,6.92c-6.16-1.47-14.06-2.78-23.28-2.91-10.54-.14-19.48,1.3-26.19,2.91Z" fill={infield[2]} strokeWidth="0"/>
            <path d="M124.25,6.92l-24.25,159.08L167.9,29.23c-4.97-4.2-11.74-9.15-20.37-13.58-8.79-4.51-16.89-7.14-23.28-8.73Z" fill={infield[3]} strokeWidth="0"/>
            <path d="M167.9,29.23l-67.9,136.77,97-97c-2.13-5.36-5.21-11.73-9.7-18.43-6.54-9.75-13.73-16.69-19.4-21.34Z" fill={infield[4]} strokeWidth="0"/>
            
            <text transform="translate(11.99 73.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[0])}</tspan></text>
            <text transform="translate(43.99 43.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[1])}</tspan></text>
            <text transform="translate(83.99 28.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[2])}</tspan></text>
            <text transform="translate(123.99 43.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[3])}</tspan></text>
            <text transform="translate(155.99 73.03)" fill="#fff" fontSize="16" fontWeight="700"><tspan x="0" y="0">{decimalToPercent(percentages[4])}</tspan></text>
        </svg>
    );
}