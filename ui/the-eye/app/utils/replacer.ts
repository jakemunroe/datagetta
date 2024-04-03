/*
* Replacer methods used in JSON.strigify() functions.
* Fixes compatibilty issues with bigint type when passing it as a prop.
* Converts bigint to the number type to solve this issue.
* Rounds decimal value to 3 decimal places.
* 
* author: Braden Mosley
* lastEdit: 04-03-2024
*/

export const batter_replacer = (key: any, value: any) => {
    if (typeof value === 'bigint') {
        return Number(value.toString());
    } 
    
    else if (typeof value === 'string') {
        
        if (key === 'Batter' || key === 'BatterTeam') {
            return value;
        }
        else {
            return Number(Number(value).toFixed(3));
        }

    } 
    
    else {
        return value;
    };
};

export const pitcher_replacer = (key: any, value: any) => {
    if (typeof value === 'bigint') {
        return Number(value.toString());
    } 
    
    else if (typeof value === 'string') {
        
        if (key === 'Pitcher' || key === 'PitcherTeam') {
            return value;
        }
        else {
            return Number(value);
        }

    } 
    
    else {
        return value;
    };
};