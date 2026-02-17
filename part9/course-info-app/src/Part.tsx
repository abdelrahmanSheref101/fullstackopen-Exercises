import type { CoursePart } from "./types";

function Part({ part }: { part: CoursePart }) {
        return (
                <div>
                        <h3>${part.name}${part.exerciseCount}</h3>
                        {RenderPart(part)}
                </div>
        );
}



function RenderPart(part: CoursePart) {
        switch (part.kind) {
                case "basic":
                        return <p> {part.description}</p>
                case "group":
                        return <p> project exercises {part.groupProjectCount}</p>
                case "background":
                        return (
                                <div>
                                        <p>  {part.description}</p>
                                        <p> background material {part.backgroundMaterial}</p>
                                </div>
                        );
                default:

        }
}
export default Part
