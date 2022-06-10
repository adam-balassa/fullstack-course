import { CoursePart } from "./App";
import { assertNever } from "./utils";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    return <>{
      (() => {
        switch (coursePart.type) {
          case 'normal':
              return <p>
                <strong>{coursePart.name}</strong> {coursePart.exerciseCount}<br/>
                <i>{coursePart.description}</i>
              </p>
          case 'groupProject':
              return <p>
                <strong>{coursePart.name}</strong> {coursePart.exerciseCount} <br/>
                group projects: {coursePart.groupProjectCount}
              </p>
          case 'submission':
              return <p>
                <strong>{coursePart.name}</strong> {coursePart.exerciseCount} <br/>
                <i>{coursePart.description}</i> <br/>
                submit to {coursePart.exerciseSubmissionLink}
              </p>
          case 'special':
              return <p>
                <strong>{coursePart.name}</strong> {coursePart.exerciseCount} <br/>
                required skills: {coursePart.requirements.join(', ')}
              </p>
          default:
              assertNever(coursePart);
  
      }})()
    }</>
};
  
export default Part;