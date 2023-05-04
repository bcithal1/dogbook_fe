import withAuth from "@/components/withAuth";
import { Form, Formik, Field, ErrorMessage } from "formik";
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Spinner,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useGetUserInfo, useUpdateProfile } from "@/queries/user.queries";
import { User } from "@/types/user";
import { useRouter } from "next/router";

export default function CompleteProfileForm() {
	const { data: session, status } = useSession();
	const updateProfile = useUpdateProfile(session?.accessToken);
	const { data: userData, status: userQueryStatus } = useGetUserInfo(session?.accessToken, session?.user?.id);
	const router = useRouter();
	if(status === "loading" || userQueryStatus === "loading"){
		return (<Spinner></Spinner>);
	}

	function updatePhoneNumber(formik, e) {
		if (e.target.value.length === 3) {
			formik.setFieldValue("phoneNumber", "(" + e.target.value + ") ");
		} else if (e.target.value.length === 9) {
			formik.setFieldValue("phoneNumber", e.target.value + "-");
		} else {
			formik.setFieldValue("phoneNumber", e.target.value);
		}
	}

	const [firstName, lastName] = session.user.name.split(' ');
	let dateOfBirth = undefined;
	if(userData.date_of_birth){
		const date = new Date(userData.date_of_birth[0], userData.date_of_birth[1], userData.date_of_birth[2]);
		dateOfBirth = new Intl.DateTimeFormat("fr-CA", { month:'2-digit', day:'2-digit', year:'numeric' }).format(date);
	}
	
	const initialValues = {
		phoneNumber: userData?.phoneNumber || "",
		firstName: firstName,
		lastName: lastName || "",
		displayName: userData?.displayName || "",
		about: "",
		dateOfBirth: dateOfBirth,
	};

	const phoneRegex = /^\(?[(]([2-9])?([0-9]{2})?[)][ ]([0-9]{3})[-]([0-9]{4})$/;
	const dobRegex = /^\(?([1-2])([0-9]{3})[-]([0-1])([0-9])[-]([0-3])([0-9])$/;

	const SignupSchema = Yup.object().shape({
		phoneNumber: Yup.string()
			.min(14, "Phone number must contain 10 digits")
			.max(14, "Phone number must contain 10 digits")
			.matches(
				phoneRegex,
				"Please enter a valid phone number matching the following format (XXX) XXX-XXXX"
			)
			.required("This field is required"),
		firstName: Yup.string()
			.min(2, "First name must be at least two characters")
			.required("This field is required"),
		lastName: Yup.string()
			.min(2, "Last name must be at least two characters")
			.required("This field is required"),
		displayName: Yup.string().required("This field is required"),
		about: Yup.string(),
		dateOfBirth: Yup.string()
			.required("This field is required")
			.matches(dobRegex, "Please enter a valid date"),
	});

	const submitUserUpdate = async (formValues) => {
		const userData: User = {
			id: session.user.id,
			fullName: formValues.firstName + ' ' + formValues.lastName,
			displayName: formValues.displayName,
			phoneNumber: formValues.phoneNumber,
			email: session.user.email,
			date_of_birth: formValues.dateOfBirth,
			profilePhotoUrl: session.user.image
		};

		try{
			await updateProfile.mutateAsync(userData);
		} catch (e) {
			return;
		}
		router.push('/home');
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={submitUserUpdate}
			validationSchema={SignupSchema}
		>
			{(formik) => (
				<Form style={{ margin: "10px 20px 0 20px " }}>
					<Stack spacing={4}>
						<FormControl
							isRequired
							isInvalid={
								formik.errors.firstName && formik.touched.firstName
									? true
									: false
							}
						>
							<FormLabel>First Name</FormLabel>
							<Input
								type="text"
								name="firstName"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.firstName}
							/>
							<FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							isInvalid={
								formik.errors.lastName && formik.touched.lastName ? true : false
							}
						>
							<FormLabel>Last Name</FormLabel>
							<Input
								type="text"
								name="lastName"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.lastName}
							/>
							<FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							isInvalid={
								formik.errors.displayName && formik.touched.displayName
									? true
									: false
							}
						>
							<FormLabel>Display Name</FormLabel>
							<Input
								type="text"
								name="displayName"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.displayName}
							/>
							{!formik.errors.displayName ? (
								<FormHelperText>
									Enter your name as you'd like it displayed on your profile.
								</FormHelperText>
							) : null}
							<FormErrorMessage>{formik.errors.displayName}</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							isInvalid={
								formik.errors.dateOfBirth && formik.touched.dateOfBirth
									? true
									: false
							}
						>
							<FormLabel>Date of Birth</FormLabel>
							<Input
								type="date"
								name="dateOfBirth"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.dateOfBirth}
							/>
							<FormErrorMessage>{formik.errors.dateOfBirth}</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							isInvalid={
								formik.errors.phoneNumber && formik.touched.phoneNumber
									? true
									: false
							}
						>
							<FormLabel>Phone Number</FormLabel>
							<InputGroup>
								<InputLeftAddon children="+1" />
								<Input
									type="tel"
									name="phoneNumber"
									onChange={(e) => {
										updatePhoneNumber(formik, e);
									}}
									onBlur={formik.handleBlur}
									placeholder={"(000) 000-0000"}
									value={formik.values.phoneNumber}
								></Input>
							</InputGroup>
							<FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
						</FormControl>

						<FormControl>
							<FormLabel>About</FormLabel>
							<Textarea placeholder="Tell us about yourself" name="about" />
						</FormControl>
						<Button type="submit">Complete Profile</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	);
}
