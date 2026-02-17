interface CoursePartBase {
        name: string;
        exerciseCount: number;
}

interface CoursePartDescWrapper extends CoursePartBase {
        description: string;
}

export interface CoursePartBasic extends CoursePartDescWrapper {
        kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
        groupProjectCount: number;
        kind: "group"
}

export interface CoursePartBackground extends CoursePartDescWrapper {
        backgroundMaterial: string;
        kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;


