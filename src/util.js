import { CircularProgress } from "@material-ui/core";

export const numberWithCommas = (x) => {
    x=x?.toString();
    var lastThree = x?.substring(x.length-3);
    var otherNumbers = x?.substring(0,x.length-3);
    if(otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    // return x?.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');  International System
    return x ? res : <CircularProgress color="secondary"/>
}

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a,b)=>(a.cases>b.cases?-1:1))
}

export const caseTypeColors = {
    cases: {
        color: "#cc1034",
        multiplier: 800
    },
    recovered: {
        color: "#7dd71d",
        multiplier: 800
    },
    active: {
        color: "#1769aa",
        multiplier: 800
    },
    deaths: {
        color: "#333",
        multiplier: 1200
    }
}