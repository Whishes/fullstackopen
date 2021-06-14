import React from 'react'
import { CoursePart } from "../types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part: CoursePart}) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <h2>
                        {part.name} {part.exerciseCount}
                    </h2>
                    <p>
                        {part.description}
                    </p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <h2>
                        {part.name} {part.exerciseCount}
                    </h2>
                    <p>
                        project exercises {part.groupProjectCount}
                    </p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <h2>
                        {part.name} {part.exerciseCount}
                    </h2>
                    <p>
                        {part.description}
                    </p>
                    <p>
                        submit to {part.exerciseSubmissionLink}
                    </p>
                </div>
            )
        case "special":
            return (
                <div>
                    <h2>
                        {part.name} {part.exerciseCount}
                    </h2>
                    <p>
                        {part.description}
                    </p>
                    <p>
                        required skills {part.requirements.map((r, index) => <span key={index}>{r} {index < part.requirements.length - 1 ? ',' : ''} </span>)}
                    </p>
                </div>
            )
        default:
            return assertNever(part);
    }
}

export default Part
