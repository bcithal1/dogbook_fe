import withAuth from "@/components/withAuth";
import { useFormik } from "formik";
import {
	FormControl,
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
	const SignupSchema = Yup.object().shape({
		phoneNumber: Yup.string().min(11).max(11).required("Required"),
	});

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			dateOfBirth: null,
			phoneNumber: "",
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	useEffect(() => {
		if (formik.values.phoneNumber.length === 3) {
			formik.setFieldValue(
				"phoneNumber",
				"(" + formik.values.phoneNumber + ") "
			);
		} else if (formik.values.phoneNumber.length === 9) {
			formik.setFieldValue("phoneNumber", formik.values.phoneNumber + "-");
		}
	}, [formik.values.phoneNumber]);

	return (
		<div>
			<form>
				<Stack spacing={4}>
					<FormControl isRequired>
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
					</FormControl>
					<FormControl
						isInvalid={
							formik.values.phoneNumber.length > 14 ||
							formik.values.phoneNumber.length < 14
							// || formik.values.phoneNumber.includes("")
						}
					>
						<FormLabel>Phone number</FormLabel>
						<InputGroup>
							<InputLeftAddon children="+1" />
							<Input
								type="tel"
								name="phoneNumber"
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								placeholder="(000)000-0000"
							/>
						</InputGroup>
					</FormControl>
					<FormControl>
						<FormLabel>About</FormLabel>
						<Textarea placeholder="Tell us about yourself" />
					</FormControl>
				</Stack>
			</form>
		</div>
	);
	///>
}

export default withAuth(CompleteProfile);
