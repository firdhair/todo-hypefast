import styles from "./Button.module.scss"

const Button = ({name, isAddNew, setIsAddNew}) => {
  return (
        <button onClick={() => setIsAddNew(!isAddNew)}>{name}</button>
  );
};
export default Button;
