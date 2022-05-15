const FormError = ({error}) =>{

    return(
        <div>
            {error &&  (
            <p className="-mt-3 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops! </span> 
                {error.message} 
                </p>
            )}
        </div>
    )
}

export default FormError;
