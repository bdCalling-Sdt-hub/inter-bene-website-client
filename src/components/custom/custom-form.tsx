import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
  } from "react-hook-form";
  
  import { Resolver } from "react-hook-form";
  type TFormConfig = {
    resolver?: Resolver<FieldValues>;
    defaultValues?: FieldValues;
  };
  type TFormProps = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
  } & TFormConfig;
  
  const CustomForm = ({
    children,
    onSubmit,
    resolver,
    defaultValues,
  }: TFormProps) => {
    const formConfig: TFormConfig = {};
  
    if (resolver) {
      formConfig["resolver"] = resolver;
    }
  
    if (defaultValues) {
      formConfig["defaultValues"] = defaultValues;
    }
  
    const methods = useForm(formConfig);
    const { handleSubmit, reset } = methods;
  
    const submit: SubmitHandler<FieldValues> = (data) => {
      // console.log(data);
      onSubmit(data);
      reset();
    };
  
    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>{children}</form>
      </FormProvider>
    );
  };
  
  export default CustomForm;