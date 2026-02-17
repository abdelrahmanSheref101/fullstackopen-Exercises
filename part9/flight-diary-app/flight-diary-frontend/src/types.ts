export interface DiaryEntery {
        id: number,
        date: string,
        weather: string,
        visibility: string,
}

export interface NewDiaryEntery extends DiaryEntery {
        comment: string;
}
