import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setFields] = useState(initialState);
  return [
    fields,
    function(event) {
      const { id, value } = event.target;
      setFields(prevFields => ({
        ...prevFields,
        [id]: value
      }));
    }
  ];
}
