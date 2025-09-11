import React from "react";
import { useField } from "formik";

const CustomTimeInput = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    const handleHourChange = (e) => {
        const time = `${e.target.value.padStart(2, '0')}:${field.value.split(":")[1]}`;
        helpers.setValue(time);
    };

    const handleMinuteChange = (e) => {
        const time = `${field.value.split(":")[0]}:${e.target.value.padStart(2, '0')}`;
        helpers.setValue(time);
    };

    return (
        <div className="input-group">
            <label htmlFor={props.id || props.name}>{label}</label>
            <div className="field-wrappers">
                <select value={field.value.split(":")[0]} onChange={handleHourChange}>
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                    ))}
                </select>
                <select value={field.value.split(":")[1]} onChange={handleMinuteChange}>
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                    ))}
                </select>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}

        </div>
    );
};

export default CustomTimeInput;
