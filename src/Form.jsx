/* eslint-disable no-unused-vars */
import {Button, Card, Label, TextInput} from "flowbite-react";
import { Controller,useForm } from "react-hook-form";
function Form() {
    const VALIDATION_ERRORS = {
        email: {
            required: "Email daxil edin",
            minlength: 3,
        },
        password:{
            required: "Şifrəni daxil edin",
            minLength: 7,
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            message:'Zəhmət olmasa en azı bir rəqəm bir hərf ve xüsusi simvol istifadə edin'
        }
    }

    const {formState:{errors}, watch,register,control, handleSubmit } = useForm({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmits = (data) => {
        console.log(data)
    };



    const NameInput = ({field:{value,onChange}})=> (
        <div>
            <div>
                <Label htmlFor="email" value="Email" className="block pb-1"/>
            </div>
            <TextInput
                name="email"
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={value}
                onChange={onChange}
                color={errors?.email ? 'failure':'success'}
                helperText={errors?.email && errors?.email.message}
            />
        </div>
    )

    const PasswordInput = ({field:{value,onChange}})=> (
        <div>
            <div>
                <Label htmlFor="password" value="Password" className="block pb-1"/>
            </div>
            <TextInput
                name="password"
                id="password"
                type="password"
                placeholder="*******"
                value={value}
                onChange={onChange}
                color={errors.password? 'failure':'success'}
                helperText={errors?.password && errors?.password.message}
            />
        </div>
    )



    return (
        <div className="flex items-center justify-center h-screen">
            <Card className={'shadow-2xl'}>
                <form
                    onSubmit={handleSubmit(onSubmits)}
                    className="w-80 flex flex-col gap-5"
                >
                    <h2 className='font-bold text-3xl text-center'>Log in</h2>
                    <Controller render={NameInput}  control={control} name={'email'} rules={{
                        required:{
                            value: true,
                            message:VALIDATION_ERRORS.email.required
                        },
                        minLength:{
                            value: VALIDATION_ERRORS.email.minlength,
                            message:`${VALIDATION_ERRORS.email.minlength} hərfdən uzun olmalıdır`}

                    }}
                    />
                    <Controller render={PasswordInput}  control={control} name={'password'} rules={{
                        required:{
                            value: true,
                            message:VALIDATION_ERRORS.password.required
                        },
                        minLength:{
                            value:VALIDATION_ERRORS.password.minLength,
                            message:`${VALIDATION_ERRORS.password.minLength} hərfdən uzun olmalıdır`
                        },
                        pattern:{
                            value:VALIDATION_ERRORS.password.pattern,
                            message:VALIDATION_ERRORS.password.message
                        }
                    }} />
                    <Button type="submit">Gonder</Button>
                </form>
            </Card>
        </div>
    );
}

export default Form;
