import styled from "styled-components";
import clsx from "clsx";
import waves from "images/waves.jpg";

export * from "./Loader";
export * from "./ToggleButton";
export * from "./ClipBoard";
export * from "./ToolTip";
export * from "./PrivateRoute";
export { default as Navbar } from "./Navbar";
export { default as SideNav } from "./SideNav";
export { default as TabBar } from "./TabBar";

export const ErrorMessage = styled.small.attrs({
  className: "text-red-500 mt-2",
})``;

export const FormGroup = styled.div.attrs({
  className: "relative mb-4",
})``;

export const Input = styled.input.attrs((props) => ({
  className: clsx(
    "w-full text-sm px-3 py-2 block rounded-md border-gray-300 text-gray-500 shadow-sm focus:ring",
    props.error
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "focus:border-indigo-400 focus:ring-indigo-200"
  ),
}))``;

export const Label = styled.label.attrs({
  className: "leading-7 text-gray-600",
})``;

export const CheckBox = styled.input.attrs((props) => ({
  type: "checkbox",
  className: clsx(
    "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50",
    props.error && "border-red-500 focus:border-red-500"
  ),
}))``;

export const Button = styled.button.attrs(({ className, disabled }) => ({
  className: clsx(
    "px-8 py-2 text-lg border-0 rounded-lg focus:outline-none block w-full",
    disabled
      ? "text-gray-500 bg-gray-300"
      : "text-white bg-indigo-600 hover:bg-indigo-700",
    className
  ),
}))``;

export const Container = styled.div.attrs(({ className }) => ({
  className: clsx("bg-cover bg-center", className),
}))`
  ${({ imageSrc }) => `background-image: url("${imageSrc || waves}");`}
`;
