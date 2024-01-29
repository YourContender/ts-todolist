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
				.required("Title field is required")
				.min(2, "Min 2 words")
				.max(50, "Max enter 50 words"),
			description: Yup
                .string()
                .required("Description field is required")
                .min(5, "Min 5 words")
				.max(100, "Max enter 100 words")
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});
    
    const createTask = () => {
        if (!errors.title && !errors.description && 
            values.title !== '' && values.description !== '') {
            addTaskToDatabase(values);
        }
    }

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
                            className={errors.title && touched.title  ? 
                                "forms_container-fields-item-input error" : 
                                "forms_container-fields-item-input"}
                            onChange={handleChange}
                            value={values.title}
                            onBlur={handleBlur}
                            name="title"
                            type="text"
                            placeholder="enter title"
                        />
                        {errors.title && touched.title ? (
                            <div className="field_error">{errors.title}</div>
                        ) : null}
                    </div>
                    

                    <div className="forms_container-fields-item">
                        <label>description: </label>
                        <input 
                            className={errors.description && touched.description ? 
                                "forms_container-fields-item-input error":
                                "forms_container-fields-item-input"}
                            onChange={handleChange}
                            value={values.description}
                            onBlur={handleBlur}
                            name="description"
                            type="text"
                            placeholder="enter description"
                        />
                        {errors.description && touched.description ? (
                            <div className="field_error">{errors.description}</div>
                        ) : null}
                    </div>

                
                    <button 
                        onClick={() => createTask()} 
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