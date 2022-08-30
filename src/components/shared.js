import styled from "styled-components";
import clsx from "clsx";
import waves from "images/waves.jpg";

export const Button = styled.button.attrs(
  ({ className, disabled, outline }) => ({
    className: clsx(
      "px-4 py-2 outline-none rounded-lg focus:outline-none justify-center inline-flex items-center tracking-wide",
      disabled
        ? "text-gray-500 bg-gray-200"
        : outline
        ? "bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-900 hover:text-white"
        : "text-white bg-blue-800 hover:bg-blue-900",
      className
    ),
  })
)``;

export const ErrorMessage = styled.p.attrs({
  className: "text-red-700 mt-2 text-xs",
})``;

export const FormGroup = styled.div.attrs({
  className: "relative mb-4",
})``;

export const Input = styled.input.attrs((props) => ({
  className: clsx(
    "w-full text-sm px-3 py-2 border block rounded-md shadow-sm bg-transparent",
    props.error
      ? "border border-red-700 focus:border-red-700 focus:ring-1 focus:ring-red-700"
      : "border-gray-600 focus:border-blue-800"
  ),
}))``;

export const Label = ({ required, children }) => {
  return (
    <label className="text-sm leading-8">
      <span>{children}</span>
      {required ? (
        <span className="ml-1 text-red-700">*</span>
      ) : (
        <span className="ml-1">(optional)</span>
      )}
    </label>
  );
};

export const CheckBox = styled.input.attrs((props) => ({
  type: "checkbox",
  className: clsx(
    "h-5 w-5 rounded text-blue-800 focus:ring-0 focus:ring-offset-0  bg-transparent",
    props.error ? "border-red-700 focus:border-red-700" : "border-gray-600"
  ),
}))``;

export const Container = styled.div.attrs(({ className }) => ({
  className: clsx("bg-cover bg-center", className),
}))`
  ${({ imageSrc }) => `background-image: url("${imageSrc || waves}");`}
`;
