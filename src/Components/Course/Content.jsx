import { Part } from "./Part";

export const Content = ({ course }) => {
  const { parts } = course;
  const total = parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      {parts.map((element) => {
        return (
          <Part
            key={element.name}
            part={element.name}
            exercises={element.exercises}
          />
        );
      })}
     <p>All courses{total}</p>
    </div>
  );
};
