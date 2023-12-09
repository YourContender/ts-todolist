import { FC } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormsViewProps {
    setShowModalForm: React.Dispatch<React.SetStateAction<boolean>>
    selectedCategory: string
    changeCategoryTask: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    addTaskToDatabase: (values: any) => void;
}

const FormsView: FC<FormsViewProps> = ({ 
    setShowModalForm, selectedCategory, changeCategoryTask, addTaskToDatabase 
}) => {
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
		initialValues: {
			title: '',
            description: ''
		},
		validationSchema: Yup.object().shape({
			title: Yup
                .string()
				.required("Обов'язкове поле")
				.min(5, "Min 5 words")
				.max(20, "Max enter 20 words"),
			description: Yup
                .string()
                .required("Обов'язкове поле")
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

    return (
        <div className="forms">
            <div className="forms_container">
                <div className="forms_container-hide">
                    <button
                        onClick={() => setShowModalForm(false)}
                    >
                        &times;
                    </button>  
                </div>
                <div className="forms_container-fields">
                    <div className="forms_container-fields-item">
                        <label>category: </label>
                        <select 
                            value={selectedCategory}
                            name="category"
                            onChange={changeCategoryTask}
                        >
                            <option value="home">home</option>
                            <option value="life">life</option>
                            <option value="work">work</option>
                        </select>
                    </div>

                    <div className="forms_container-fields-item">
                        <label>title: </label>
                        <input 
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            type="text"
                            placeholder="enter title"
                        />
                    </div>

                    <div className="forms_container-fields-item">
                        <label>description: </label>
                        <input 
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            type="text"
                            placeholder="enter description"
                        />
                    </div>
                
                    <button 
                        onClick={() => addTaskToDatabase(values)} 
                        className="forms_container-create"
                    >
                        create
                    </button>
                </div>
            </div>
        </div>
    )
}

export { FormsView };