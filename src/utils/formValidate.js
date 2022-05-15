export const formValidate = () => {

    return {
        required: {
            value: true,
            message: "Campo obligatorio"
        },

        minLength: {
            value: 6,
            message: "minimo 6 caracteres",
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || "no soooonnn"
            };
        },

        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No seas 🤡, escribe algo";
                }
                return true;
            },

        },
    };
};