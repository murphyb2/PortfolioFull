import React from "react";

export const Highlight = ({ text, exp }) => {
  if (!exp) return <></>;

  var words = text ? text.split(" ") : "";
  const reg = new RegExp(exp.keywords, "g");
  var key = 0;

  const processed = words
    ? words.map((part) =>
        part.match(reg) ? (
          <b className="font-italic font-weight-bold" key={key++}>
            {part}{" "}
          </b>
        ) : (
          part + " "
        )
      )
    : "";

  return <>{processed}</>;
};
