import withAuth from "@/components/withAuth";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import * as Yup from "yup";

function CompleteProfile() {
	// const formik = useFormik({
	// 	initialValues: {
	// 		firstName: "",
	// 		lastName: "",
	// 		email: "",
	// 		dateOfBirth: null,
	// 		phoneNumber: "",
	// 	},
	// 	onSubmit: (values) => {
	// 		alert(JSON.stringify(values, null, 2));
	// 	},
	// });

	// useEffect(() => {
	// 	if (formik.values.phoneNumber.length === 3) {
	// 		formik.setFieldValue(
	// 			"phoneNumber",
	// 			"(" + formik.values.phoneNumber + ") "
	// 		);
	// 	} else if (formik.values.phoneNumber.length === 9) {
	// 		formik.setFieldValue("phoneNumber", formik.values.phoneNumber + "-");
	// 	}
	// }, [formik.values.phoneNumber]);
	const initialValues = {
		phoneNumber: "",
	};

	const SignupSchema = Yup.object().shape({
		phoneNumber: Yup.string().min(10).max(10).required("Required"),
	});

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{(formik) => {
					const { errors, touched, isValid, dirty, handleChange } = formik;
					return (
						<Stack spacing={4}>
							{/* <FormControl isRequired>
						<FormLabel>First Name</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl>
						<FormLabel>Display Name</FormLabel>
						<Input type="text" />
						<FormHelperText>
							Enter your name as you'd like it displayed on your profile
						</FormHelperText>
					</FormControl> */}
							<FormControl
								isInvalid={
									touched.phoneNumber && formik.values.phoneNumber.length === 10
										? false
										: true
								}
							>
								<FormLabel>Phone number</FormLabel>
								<InputGroup>
									<InputLeftAddon children="+1" />
									<Field
										component={Input}
										type="tel"
										name="phoneNumber"
										id="password"
										placeholder="(000)000-0000"
										className={
											errors.phoneNumber && touched.phoneNumber
												? "input-error"
												: null
										}
										onChange={handleChange}
									/>
								</InputGroup>
								<ErrorMessage
									name="phoneNumber"
									component={FormErrorMessage}
									className="error"
								/>
							</FormControl>

							<ErrorMessage
								name="password"
								component="span"
								className="error"
							/>

							{/* <FormControl>
						<FormLabel>About</FormLabel>
						<Textarea placeholder="Tell us about yourself" />
					</FormControl> */}
							<Button>Complete Profile</Button>
						</Stack>
					);
				}}
			</Formik>
		</div>
	);
	///>
}

export default withAuth(CompleteProfile);
