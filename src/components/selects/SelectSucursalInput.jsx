import { forwardRef, useEffect } from "react";
import { useDB } from "../../hooks/useDB";

const SelectSucursalInput = forwardRef(
  ({ onChange, onBlur, name, label, children, error }, ref) => {
    //error classes
    const labelClassError =
      "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
    const inputFieldClassError =
      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400";
    //ok classes
    const labelOKClass =
      "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
    const inputOKClass =
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const classlabel = error ? labelClassError : labelOKClass;
    const inputlabel = error ? inputFieldClassError : inputOKClass;

    const { data, getBranch } = useDB();

    useEffect(() => {
      getBranch();
    }, []);

    return (
      <>
        <div className="mb-6">
          <label htmlFor="suc" className={classlabel}>
            {label}
          </label>
          <select
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            id="suc"
            className={inputlabel}
            defaultValue="default"
          >
            <option  disabled value="default">
              Seleccione uno
            </option>
            {data ? (
              data.map((item) => (
                <option value={item.suc}>{item.suc}</option>
              ))
            ) : (
              <option> cargando...</option>
            )}
          </select>
          {children}
        </div>
      </>
    );
  }
);

export default SelectSucursalInput;
