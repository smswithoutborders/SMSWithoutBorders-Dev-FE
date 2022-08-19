import styled from "styled-components";
import clsx from "clsx";
import waves from "images/waves.jpg";

export const Button = styled.button.attrs(
  ({ className, disabled, outline }) => ({
    className: clsx(
      "px-4 py-2 outline-none rounded-lg focus:outline-none justify-center inline-flex items-center",
      disabled
        ? "text-gray-500 bg-gray-200"
        : outline
        ? "bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-900 hover:text-white"
        : "text-white bg-blue-800 hover:bg-blue-900",
      className
    ),
  })
)``;

export const ErrorMessage = styled.small.attrs({
  className: "text-red-500 mt-2",
})``;

export const FormGroup = styled.div.attrs({
  className: "relative mb-4",
})``;

export const Input = styled.input.attrs((props) => ({
  className: clsx(
    "w-full text-sm px-3 py-2 block rounded-md border-gray-400 text-gray-500 shadow-sm",
    props.error
      ? "border-red-500 focus:border-red-500"
      : " focus:border-blue-800"
  ),
}))``;

export const Label = ({ required, children }) => {
  return (
    <label className="text-sm leading-8 text-gray-600">
      <span>{children}</span>
      {required ? (
        <span className="ml-1 text-red-600">*</span>
      ) : (
        <span className="ml-1">(optional)</span>
      )}
    </label>
  );
};

export const CheckBox = styled.input.attrs((props) => ({
  type: "checkbox",
  className: clsx(
    "rounded border-gray-400 text-blue-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50",
    props.error && "border-red-500 focus:border-red-500"
  ),
}))``;

export const Container = styled.div.attrs(({ className }) => ({
  className: clsx("bg-cover bg-center", className),
}))`
  ${({ imageSrc }) => `background-image: url("${imageSrc || waves}");`}
`;
