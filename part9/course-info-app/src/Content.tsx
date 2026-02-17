import Part from "./Part";
import type { CoursePart } from "./types";

export default function Content(props: ContentProps) {
        return (
                <div>

                        {

                                props.courseParts.map((part) =>
                                        <Part key={part.name} part={part} />
                                )
                        }
                </div>
        )
};



interface ContentProps {
        courseParts: CoursePart[];
}
